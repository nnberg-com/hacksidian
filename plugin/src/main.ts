import { registerLiveExamples } from "./live-example";
import { t, setLanguageResolver, resolveInterfaceLanguage, resolveContentLanguage, type Language } from "../i18n";
import { validateGeneratedCss } from "./css";
import { migrateAttempts, summarizeAttempts, unknownUsage } from "./api-ledger";
import type { ApiAttempt } from "./types";
import { selectColoringPaths } from "./content-language";
import { splitLegacyStyle } from "./snippet-groups";
import {
  getLanguage,
  parseYaml,
  MarkdownView,
  MarkdownRenderer,
  Notice,
  Plugin,
  TFile,
  WorkspaceLeaf,
} from "obsidian";
import { readFileStyle, writeFileStyle } from "./file-style";
import { installSnippetTemplates, refreshNativeSnippets, migrateSnippetGroups } from "./snippets";
import { styleDirectory } from "./storage";
import { captureReadingView } from "./capture";
import { collectComputedStyleContext } from "./context";
import { CSS_UNDO_LIMIT, DEFAULT_SETTINGS, DEFAULT_STATE, PROMPT_VERSION, VIEW_TYPE_CALLMERED } from "./constants";
import { applySnippetUpdates, compileStyle, importStyle, replaceStyleModule } from "./style-modules";
import { discoverCompatibleFonts, LOCALE_OPTIONS, type FontDiscoveryResult } from "./fonts";
import { buildTurnPrompt, SYSTEM_PROMPT } from "./prompt";
import { createProvider } from "./provider";
import { CallMeRedSettingTab } from "./settings";
import type { CallMeRedSettings, PersistedState, TurnRecord, UsageRecord } from "./types";
import { loadPricing, pricingKey } from "./pricing";
import { PROVIDERS } from "./llm-catalog";
import { addHack, removeHack, hasHack, hackId, type HackContext, type HackSpec } from "./hacks";
import { ConversationView } from "./view";

interface PluginData {
  apiAttempts?: ApiAttempt[];
  snippetsInstalled?: boolean;
  settings?: Partial<CallMeRedSettings>;
  state?: Partial<PersistedState>;
}

export default class CallMeRedPlugin extends Plugin {
  apiAttempts: ApiAttempt[] = [];
  settings: CallMeRedSettings = { ...DEFAULT_SETTINGS };
  state: PersistedState = structuredClone(DEFAULT_STATE);
  private lastMarkdownLeaf: WorkspaceLeaf | null = null;
  private fileSyncBusy = false;
  private historyBusy = false;
  private pendingSave: Promise<void> = Promise.resolve();
  private fileSyncError = "";
  private fontDiscoveryKey = "";
  private fontDiscoveryPromise: Promise<FontDiscoveryResult> | null = null;

  get interfaceLanguage(): Language {
    return resolveInterfaceLanguage(this.settings.interfaceLanguage, getLanguage());
  }

  get contentLanguage(): Language {
    return resolveContentLanguage(this.settings.contentLanguage, this.interfaceLanguage);
  }

  async updateLanguage(): Promise<void> {
    await this.savePluginData();
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_CALLMERED)) {
      if (leaf.view instanceof ConversationView) await leaf.view.refreshLanguage();
    }
    // Commands are registered objects; refreshing their names preserves callbacks.
    for (const [id, key] of [
      ["open-panel", "main.open_conversation_panel"],
      ["next-coloring", "main.open_next_sample"],
      ["undo-style", "main.undo_visual_iteration"],
    ] as const) {
      const command = this.languageCommands.get(id);
      if (command) command.name = t(key);
    }
    this.ribbonEl?.setAttribute("aria-label", t("main.open_hacksidian"));
  }
  private languageCommands = new Map<string, { name: string }>();
  private ribbonEl?: HTMLElement;

  async onload(): Promise<void> {
    setLanguageResolver(() => this.interfaceLanguage);
    registerLiveExamples(this);
    await this.loadPluginData();
    await this.savePluginData();
    await refreshNativeSnippets(this.app);
    this.registerInterval(window.setInterval(() => {
      if (this.fileSyncBusy) return;
      this.fileSyncBusy = true;
      void this.reloadFileStyle().then(() => { this.fileSyncError = ""; }).catch((error) => {
        const message = String(error);
        if (message !== this.fileSyncError) new Notice(t("main.css_was_not_updated", { p0: message }));
        this.fileSyncError = message;
      }).finally(() => { this.fileSyncBusy = false; });
    }, 1000));

    this.registerView(VIEW_TYPE_CALLMERED, (leaf) => new ConversationView(leaf, this));
    this.addSettingTab(new CallMeRedSettingTab(this.app, this));

    this.ribbonEl = this.addRibbonIcon("palette", t("main.open_hacksidian"), () => void this.activateView());
    { const command = { id: "open-panel", name: t("main.open_conversation_panel"), callback: () => void this.activateView() }; const id = command.id; this.languageCommands.set(id, this.addCommand(command)); }
    { const command = { id: "next-coloring", name: t("main.open_next_sample"), callback: () => void this.openNextColoring() }; const id = command.id; this.languageCommands.set(id, this.addCommand(command)); }
    { const command = { id: "undo-style", name: t("main.undo_visual_iteration"), callback: () => void this.undo() }; const id = command.id; this.languageCommands.set(id, this.addCommand(command)); }

    this.registerEvent(
      this.app.workspace.on("active-leaf-change", (leaf) => {
        if (leaf?.view instanceof MarkdownView) this.lastMarkdownLeaf = leaf;
        void this.refreshView();
      }),
    );
    this.registerEvent(this.app.workspace.on("file-open", () => void this.refreshView()));
    this.registerEvent(this.app.metadataCache.on("changed", () => void this.refreshView()));
    this.registerEvent(this.app.vault.on("modify", (file) => {
      if (file instanceof TFile && file.extension === "md" && (file.path.startsWith(`${this.settings.coloringsFolder}/`) || file.path.includes("/atlas/! hacks/"))) {
        void this.refreshView();
      }
    }));

    this.app.workspace.onLayoutReady(() => {
      const markdownLeaf = this.app.workspace.getLeavesOfType("markdown").find((leaf) => leaf.view instanceof MarkdownView);
      if (markdownLeaf) this.lastMarkdownLeaf = markdownLeaf;
    });
  }

  async activateView(): Promise<void> {
    let leaf: WorkspaceLeaf | null = this.app.workspace.getLeavesOfType(VIEW_TYPE_CALLMERED)[0] ?? null;
    if (!leaf) {
      leaf = this.app.workspace.getRightLeaf(false);
      if (!leaf) throw new Error(t("main.could_not_create_the_hacksidian_right_sidebar"));
      await leaf.setViewState({ type: VIEW_TYPE_CALLMERED, active: true });
    }
    await this.app.workspace.revealLeaf(leaf);
  }

  async loadPluginData(): Promise<void> {
    const data = (await this.loadData()) as PluginData | null;
    this.settings = { ...structuredClone(DEFAULT_SETTINGS), ...(data?.settings ?? {}) };
    if (!["auto", "ru", "en"].includes(this.settings.interfaceLanguage)) this.settings.interfaceLanguage = "auto";
    if (!["auto", "ru", "en"].includes(this.settings.contentLanguage)) this.settings.contentLanguage = "auto";
    if (!(this.settings.provider in PROVIDERS)) this.settings.provider = "openai";
    if (data?.settings?.customModel === undefined) this.settings.customModel = !(this.settings.model in PROVIDERS[this.settings.provider].models);
    if (!data?.snippetsInstalled) {
      const names = await installSnippetTemplates(styleDirectory(this));
      await refreshNativeSnippets(this.app, names);
      await this.saveData({ ...data, snippetsInstalled: true });
    }
    const names = await migrateSnippetGroups(styleDirectory(this));
    if (names.length) await refreshNativeSnippets(this.app, names);
    const savedState = data?.state ?? {};
    this.apiAttempts = migrateAttempts(data?.apiAttempts, savedState.turns ?? []);
    // Historical values are regrouped too, so old Undo steps remain usable.
    for (const version of savedState.versions ?? []) {
      if (version.style?.modules[0]?.id === "m-00-settings") {
        version.style = splitLegacyStyle(version.style);
        version.css = compileStyle(version.style);
      }
    }
    const style = await readFileStyle(styleDirectory(this));
    this.state = {
      activeCss: compileStyle(style), style,
      versions: savedState.versions?.length ? savedState.versions : [],
      turns: savedState.turns ?? [],
    };
    const last = this.state.versions.at(-1);
    if (!last || last.css !== this.state.activeCss) {
      this.state.versions.push({ id: `files-${Date.now()}`, css: this.state.activeCss, style: structuredClone(style), createdAt: new Date().toISOString(), source: "recovery" });
    }
  }

  async reloadFileStyle(): Promise<void> {
    const style = await readFileStyle(styleDirectory(this));
    const css = compileStyle(style);
    const changed = css !== this.state.activeCss;
    this.state.style = style;
    this.state.activeCss = css;
    if (changed) { await refreshNativeSnippets(this.app); await this.refreshView(); }
  }

  async savePluginData(): Promise<void> {
    this.state.versions = this.state.versions.slice(-(CSS_UNDO_LIMIT + 1));
    this.state.turns = this.state.turns.map((turn) => {
      const { cssBefore, cssAfter, ...record } = turn as TurnRecord & { cssBefore?: string; cssAfter?: string };
      return record;
    });
    // Active CSS is read from files only. Snapshots below are historical Undo data.
    const data = structuredClone({ apiAttempts: this.apiAttempts, snippetsInstalled: true, settings: this.settings, localization: { interfaceLanguage: this.interfaceLanguage, contentLanguage: this.contentLanguage }, state: { versions: this.state.versions, turns: this.state.turns } });
    const write = this.pendingSave.then(() => this.saveData(data));
    this.pendingSave = write.catch(() => {});
    await write;
  }

  async getCurrentColoringContext(): Promise<{
    file: TFile;
    view: MarkdownView;
    markdown: string;
  } | null> {
    const view = this.findMarkdownView();
    const file = view?.file;
    if (!view || !file) return null;
    const markdown = await this.app.vault.read(file);
    return { file, view, markdown };
  }

  getCurrentPageContainer(): HTMLElement | null {
    return this.findMarkdownView()?.containerEl ?? null;
  }

  async getCurrentPage(): Promise<{ path: string; title: string } | null> {
    const view = this.findMarkdownView();
    const file = view?.file;
    if (!file || !view) return null;
    const plainText = (element: HTMLElement) => {
      const clone = element.cloneNode(true) as HTMLElement;
      clone.querySelectorAll(".heading-collapse-indicator, .heading-anchor").forEach(node => node.remove());
      clone.querySelectorAll("br").forEach(node => node.replaceWith(" "));
      return (clone.textContent ?? "").replace(/\s+/g, " ").trim();
    };
    const heading = view.getMode() === "preview" ? view.containerEl.querySelector<HTMLElement>(".markdown-preview-view h1") : null;
    if (heading && !Array.from(heading.querySelectorAll("code")).some(code => /^(?:=|\$=)/.test(code.textContent?.trim() ?? ""))) {
      const title = plainText(heading);
      if (title) return { path: file.path, title };
    }
    const cache = this.app.metadataCache.getFileCache(file);
    let source = cache?.headings?.find(heading => heading.level === 1)?.heading
      || (typeof cache?.frontmatter?.title === "string" ? cache.frontmatter.title : file.basename);
    const dataview = (this.app as unknown as { plugins: { plugins: Record<string, { api?: {
      page(path: string): unknown;
      evaluate(expression: string, context: unknown, origin: string): { successful: boolean; value?: unknown };
    } }> } }).plugins?.plugins?.dataview?.api;
    source = source.replace(/`=([^\`]+)`/g, (_match, expression: string) => {
      try {
        const result = dataview?.evaluate(expression.trim(), { this: dataview.page(file.path) }, file.path);
        return result?.successful ? String(result.value ?? "") : "";
      } catch { return ""; }
    });
    // Unsupported or still-pending inline code is never shown as the page title.
    if (/`\$=/.test(source)) return { path: file.path, title: file.basename };
    const container = document.createElement("div");
    await MarkdownRenderer.render(this.app, source, container, file.path, this);
    return { path: file.path, title: plainText(container) || file.basename };
  }

  async getCurrentHack(): Promise<HackContext | null> {
    const file = this.findMarkdownView()?.file;
    if (!file) return null;
    const directory = file.path.slice(0, file.path.lastIndexOf("/"));
    const folderId = directory.split("/").at(-1)!;
    const adapter = this.app.vault.adapter;
    const commonPath = `${directory}/${folderId}.md`;
    if (!await adapter.exists(commonPath)) return null;
    const common = await adapter.read(commonPath);
    const metadata = parseYaml(common.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "") ?? {};
    const id = hackId(file.path, metadata.tags);
    if (!id) return null;
    const language = file.basename.match(/^Description\.(ru|en)$/)?.[1] ?? this.contentLanguage;
    const descriptionPath = `${directory}/Description.${language}.md`;
    let title = id;
    if (await adapter.exists(descriptionPath)) {
      const description = await adapter.read(descriptionPath);
      const localized = parseYaml(description.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "") ?? {};
      if (localized.translation_status !== "pending" && typeof localized.title === "string") title = localized.title;
    }
    if (!await adapter.exists(`${directory}/hack.json`)) return null;
    const spec = JSON.parse(await adapter.read(`${directory}/hack.json`)) as HackSpec;
    return { id, installed: hasHack(this.state.style, id), path: file.path, title, spec, css: await adapter.read(`${directory}/recipe.css`) };
  }

  async applyCurrentHack(expectedPath: string, enabled = true): Promise<boolean> {
    let changed = false;
    await this.withHistoryLock(async () => {
      const hack = await this.getCurrentHack();
      if (!hack || hack.path !== expectedPath) throw new Error(t("main.the_open_card_has_changed_select_the"));
      await this.reloadFileStyle();
      const result = enabled
        ? (hasHack(this.state.style, hack.id) ? { style: this.state.style!, changed: false } : addHack(this.state.style!, hack))
        : removeHack(this.state.style!, hack.id);
      if (result.changed) {
        await this.commitCssVersion(`hack-${hack.id}-${crypto.randomUUID()}`, compileStyle(result.style), "hack", result.style);
        changed = true;
      }
      const manifest = JSON.parse(await this.app.vault.adapter.read(`${this.app.vault.configDir}/snippets/hacksidian-manifest.json`));
      const entry = manifest.modules.find((m: {id: string}) => m.id === hack.spec.target);
      if (enabled && entry) await refreshNativeSnippets(this.app, [entry.file.replace(/\.css$/, "")]);
      await this.refreshView();
    });
    return changed;
  }

  async processFeedback(userText: string, onStatus: (message: string) => void): Promise<void> {
    await this.withHistoryLock(() => this.runFeedback(userText, onStatus));
  }

  private async withHistoryLock(operation: () => Promise<void>): Promise<void> {
    if (this.historyBusy) throw new Error(t("main.wait_for_the_current_hacksidian_operation_to"));
    this.historyBusy = true;
    try { await operation(); } finally { this.historyBusy = false; }
  }

  async clearHistory(): Promise<void> {
    await this.withHistoryLock(async () => {
      await this.reloadFileStyle();
      const previousVersions = this.state.versions;
      const previousTurns = this.state.turns;
      // The sole current baseline permits future Undo without retaining past steps.
      this.state.versions = [{ id: `cleared-${crypto.randomUUID()}`, css: this.state.activeCss,
        style: structuredClone(this.state.style), createdAt: new Date().toISOString(), source: "initial" }];
      this.state.turns = [];
      try { await this.savePluginData(); }
      catch (error) { this.state.versions = previousVersions; this.state.turns = previousTurns; throw error; }
      await this.refreshView();
    });
  }

  private async runFeedback(userText: string, onStatus: (message: string) => void): Promise<void> {
    await this.reloadFileStyle();
    const context = await this.getCurrentColoringContext();
    if (!context) throw new Error(t("main.open_a_sample_in_reading_view"));

    const requestSettings = structuredClone(this.settings);
    const spending = summarizeAttempts(this.apiAttempts);
    if (requestSettings.spendLimitUsd > 0 && (spending.unknownCount > 0 || spending.knownCostUsd >= requestSettings.spendLimitUsd)) {
      throw new Error(t("ledger.limit_reached"));
    }
    if (requestSettings.autoPricing) {
      onStatus(t("main.loading_the_model_s_official_pricing"));
      try {
        requestSettings.pricing = await loadPricing(requestSettings.provider, requestSettings.model, requestSettings.pricing);
        if (this.settings.autoPricing && pricingKey(this.settings.provider, this.settings.model) === requestSettings.pricing.key) this.settings.pricing = requestSettings.pricing;
      }
      catch { requestSettings.pricing = undefined; }
    }
    const cssAtStart = this.state.activeCss;
    const styleAtStart = structuredClone(this.state.style ?? importStyle(cssAtStart));
    const turnId = crypto.randomUUID();
    let screenshotBase64: string | undefined;
    if (requestSettings.sendScreenshot) {
      onStatus(t("main.capturing_the_current_sample_for_the_llm"));
      screenshotBase64 = await captureReadingView(context.view);
    }

    const availableColorings = this.getColoringFiles().map((file) => file.path);
    const fontDiscovery = await this.getCompatibleFonts(false, () => onStatus(t("main.checking_installed_fonts_for_the_selected_languages")));
    const allowClarification = this.state.turns.at(-1)?.action !== "ask_question";
    const prompt = buildTurnPrompt({
      allowClarification,
      userText,
      interfaceLanguage: this.interfaceLanguage,
      coloringPath: context.file.path,
      markdown: context.markdown,
      modulesJson: JSON.stringify(styleAtStart.modules),
      computedStyles: collectComputedStyleContext(context.view.containerEl),
      conversation: this.state.turns.map((turn) => ({
        userText: turn.userText,
        systemMessage: turn.systemMessage,
      })),
      availableColorings,
      compatibleFonts: fontDiscovery.families,
      localeLabels: LOCALE_OPTIONS.filter((option) => this.settings.supportedLocales.includes(option.id)).map(
        (option) => option.label,
      ),
    });

    onStatus(t("main.waiting_for_the_llm_the_new_appearance"));
    const provider = createProvider(requestSettings);
    const attempt: ApiAttempt = { id: turnId, createdAt: new Date().toISOString(), provider: requestSettings.provider,
      model: requestSettings.model, promptVersion: PROMPT_VERSION, status: "pending", usage: unknownUsage(), responseId: "" };
    this.apiAttempts.push(attempt);
    // Persist intent before sending; a crash must not silently erase an API attempt.
    await this.savePluginData();
    try {
      const result = await provider.createIteration({
        instructions: SYSTEM_PROMPT,
        allowClarification,
        prompt,
        screenshotBase64,
        onUsage: async (usage, responseId) => {
          attempt.usage = usage; attempt.responseId = responseId; attempt.status = "received";
          await this.savePluginData();
        },
      });
      // Also supports providers returning a result without the receipt callback.
      attempt.usage = result.usage; attempt.responseId = result.responseId;
      await this.savePluginData();

      await this.reloadFileStyle();
      if (JSON.stringify(this.state.style) !== JSON.stringify(styleAtStart) || this.state.activeCss !== cssAtStart) throw new Error(t("main.the_style_changed_during_the_request_the"));

      if (result.decision.action === "ask_question" && !allowClarification) {
        throw new Error(t("main.the_model_tried_to_ask_a_second"));
      }

      if (result.decision.action === "update_css") {
        const next = applySnippetUpdates(styleAtStart, result.decision.modules);
        compileStyle(next);
        for (const module of next.modules) {
          if (styleAtStart.modules.find(old => old.id === module.id)?.css === module.css) continue;
          const errors = validateGeneratedCss(module.css, fontDiscovery.families);
          if (errors.length) throw new Error(errors.join(" "));
        }
        await this.commitCssVersion(turnId, compileStyle(next), "model", next);
      } else if (result.decision.action === "switch_coloring") {
        await this.openColoring(result.decision.targetColoring);
      } else if (result.decision.action === "ask_question" && result.decision.message.length > 140) {
        throw new Error(t("main.the_model_s_clarifying_question_is_too"));
      }

      const record: TurnRecord = {
        id: turnId,
        createdAt: new Date().toISOString(),
        coloringPath: context.file.path,
        userText,
        action: result.decision.action,
        systemMessage: result.decision.message,
        provider: requestSettings.provider,
        model: requestSettings.model,
        promptVersion: PROMPT_VERSION,
        usage: result.usage,
        rawResponseId: result.responseId,
      };

      this.state.turns.push(record);
      attempt.status = "completed";
    } catch (error) {
      attempt.status = "failed";
      throw error;
    } finally {
      await this.savePluginData();
      await this.refreshView();
    }
  }

  async commitModuleUpdate(id: string, moduleId: string, css: string, fonts?: string[]): Promise<string> {
    const current = this.state.style ?? importStyle(this.state.activeCss);
    const next = replaceStyleModule(current, moduleId, css, fonts);
    const compiled = compileStyle(next);
    await this.commitCssVersion(id, compiled, "model", next);
    return compiled;
  }

  async undo(): Promise<void> {
    await this.withHistoryLock(() => this.runUndo());
  }

  private async runUndo(): Promise<void> {
    if (this.state.versions.length <= 1) {
      new Notice(t("main.there_is_nothing_to_undo_yet"));
      return;
    }
    const latest = this.state.versions.at(-1)!;
    const previous = this.state.versions.at(-2)!;
    const current = await readFileStyle(styleDirectory(this));
    const previousStyle = previous.style ?? importStyle(previous.css);
    if (previousStyle.modules.length !== current.modules.length || previousStyle.modules.some((m, i) => m.id !== current.modules[i].id || m.component !== current.modules[i].component)) {
      new Notice(t("main.beginning_of_history_for_the_current_css"));
      return;
    }
    if (compileStyle(current) !== latest.css) throw new Error(t("main.css_was_edited_manually_undo_does_not"));
    const restored = previous.style ?? importStyle(previous.css);
    await writeFileStyle(styleDirectory(this), current, restored);
    this.state.versions.pop();
    await this.reloadFileStyle();
    await refreshNativeSnippets(this.app);
    await this.savePluginData();
    await this.refreshView();
    new Notice(t("main.the_previous_visual_version_has_been_restored"));
  }

  async openNextColoring(): Promise<void> {
    const files = this.getColoringFiles();
    if (files.length === 0) {
      new Notice(t("main.there_are_no_markdown_samples_in", { p0: `${this.settings.coloringsFolder}/${this.contentLanguage}` }));
      return;
    }
    const currentPath = this.findMarkdownView()?.file?.path;
    const index = files.findIndex((file) => file.path === currentPath);
    await this.openColoring(files[(index + 1 + files.length) % files.length].path);
  }

  async openColoring(path: string): Promise<void> {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof TFile) || file.extension !== "md") throw new Error(t("main.sample_not_found", { p0: path }));
    let leaf = this.lastMarkdownLeaf;
    if (!leaf || !(leaf.view instanceof MarkdownView)) {
      leaf = this.app.workspace.getLeaf("tab");
    }
    await leaf.openFile(file, { active: true });
    const state = leaf.getViewState();
    await leaf.setViewState({
      ...state,
      type: "markdown",
      active: true,
      state: { ...(state.state ?? {}), file: file.path, mode: "preview", source: false },
    });
    this.lastMarkdownLeaf = leaf;
    await this.app.workspace.revealLeaf(leaf);
    await this.refreshView();
  }

  totalUsage(): UsageRecord {
    return summarizeAttempts(this.apiAttempts).usage;
  }

  spendingSummary() { return summarizeAttempts(this.apiAttempts); }

  async refreshPricing(force = false): Promise<void> {
    const { provider, model } = this.settings;
    const quote = await loadPricing(provider, model, this.settings.pricing, force);
    if (this.settings.autoPricing && pricingKey(this.settings.provider, this.settings.model) === quote.key) {
      this.settings.pricing = quote;
      await this.savePluginData();
    }
  }

  getCompatibleFonts(force = false, onScan?: () => void): Promise<FontDiscoveryResult> {
    const key = [...this.settings.supportedLocales].sort().join(",");
    if (force || !this.fontDiscoveryPromise || this.fontDiscoveryKey !== key) {
      onScan?.();
      this.fontDiscoveryKey = key;
      this.fontDiscoveryPromise = discoverCompatibleFonts(this.settings.supportedLocales);
    }
    return this.fontDiscoveryPromise;
  }

  private findMarkdownView(): MarkdownView | null {
    const active = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (active) return active;
    if (this.lastMarkdownLeaf?.view instanceof MarkdownView) return this.lastMarkdownLeaf.view;
    const leaf = this.app.workspace.getLeavesOfType("markdown").find((candidate) => candidate.view instanceof MarkdownView);
    return leaf?.view instanceof MarkdownView ? leaf.view : null;
  }

  private getColoringFiles(): TFile[] {
    const files = this.app.vault.getMarkdownFiles();
    const paths = new Set(selectColoringPaths(files.map(file => file.path), this.settings.coloringsFolder, this.contentLanguage));
    return files.filter(file => paths.has(file.path))
      .sort((left, right) => left.path.localeCompare(right.path, this.contentLanguage));
  }

  private async commitCssVersion(id: string, css: string, source: "model" | "undo" | "recovery" | "hack", style = importStyle(css)): Promise<void> {
    if (compileStyle(style) !== css) throw new Error(t("main.the_compiled_modules_do_not_match_the"));
    const expected = this.state.style ?? importStyle(this.state.activeCss);
    await writeFileStyle(styleDirectory(this), expected, style);
    if (this.state.versions.at(-1)?.css !== compileStyle(expected)) {
      this.state.versions.push({ id: `manual-${Date.now()}`, css: compileStyle(expected), style: structuredClone(expected), createdAt: new Date().toISOString(), source: "recovery" });
    }
    this.state.style = style;
    this.state.activeCss = css;
    this.state.versions.push({ id, css, style: structuredClone(style), createdAt: new Date().toISOString(), source });
    await refreshNativeSnippets(this.app);
    await this.savePluginData();
  }

  private async refreshView(): Promise<void> {
    const leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_CALLMERED)[0];
    if (leaf?.view instanceof ConversationView) await leaf.view.refresh();
  }

}
