import { registerSourceBlocks } from './source-blocks';
import { registerLiveExamples } from "./live-example";
import { t, setLanguageResolver, resolveInterfaceLanguage, resolveContentLanguage, type Language } from "../i18n";
import type { CatalogState } from "./catalog";
import { relatedThemes } from "./catalog";
import { collectCatalog } from "./catalog-source";
import { CatalogApi, syncCatalog } from "./catalog-api";
import { switchProvider } from "./llm-catalog";
import { basePath } from "./storage";
import path from "node:path";
import { migrateAttempts, summarizeAttempts, unknownUsage } from "./api-ledger";
import type { ApiAttempt } from "./types";
import { selectColoringPaths } from "./content-language";
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
import { DEFAULT_SETTINGS, DEFAULT_STATE, PROMPT_VERSION, VIEW_TYPE_CALLMERED } from "./constants";
import { compileStyle, importStyle } from "./style-modules";
import { discoverCompatibleFonts, type FontDiscoveryResult } from "./fonts";
import { buildTurnPrompt, SYSTEM_PROMPT } from "./prompt";
import { createProvider } from "./provider";
import { CallMeRedSettingTab } from "./settings";
import type { CallMeRedSettings, PersistedState, TurnRecord, UsageRecord } from "./types";
import { loadPricing, pricingKey } from "./pricing";
import { PROVIDERS } from "./llm-catalog";
import { addHack, removeHack, hasHack, hackId, type HackContext, type HackSpec } from "./hacks";
import { ConversationView } from "./view";

interface PluginData {
  catalog?: CatalogState;
  apiAttempts?: ApiAttempt[];
  snippetsInstalled?: boolean;
  settings?: Partial<CallMeRedSettings>;
  state?: Partial<PersistedState>;
}

export default class CallMeRedPlugin extends Plugin {
  catalog: CatalogState = { garbage: [] };
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
      ["update-catalog", "catalog.update"],
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
    registerSourceBlocks(this);
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

    { const command = { id: "update-catalog", name: t("catalog.update"), callback: () => {
      const notice = new Notice(t('catalog.collecting'), 0);
      void this.updateCatalog(message => notice.setMessage(message)).catch(error => notice.setMessage(String(error)))
        .finally(() => window.setTimeout(() => notice.hide(), 5000));
    } }; this.languageCommands.set(command.id, this.addCommand(command)); }

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
    this.catalog = data?.catalog ?? { garbage: [] };
    this.catalog.garbage ??= [];
    this.settings = { ...structuredClone(DEFAULT_SETTINGS), ...(data?.settings ?? {}) };
    if (!["auto", "ru", "en"].includes(this.settings.interfaceLanguage)) this.settings.interfaceLanguage = "auto";
    if (!["auto", "ru", "en"].includes(this.settings.contentLanguage)) this.settings.contentLanguage = "auto";
    if (!(this.settings.provider in PROVIDERS)) this.settings.provider = "openai";
    if (this.settings.provider !== "openai") switchProvider(this.settings, "openai");
    this.settings.sendScreenshot = false;
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
    const style = await readFileStyle(styleDirectory(this));
    this.state = {
      activeCss: compileStyle(style), style,
      turns: savedState.turns ?? [],
    };

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
    this.state.turns = this.state.turns.map((turn) => {
      const { cssBefore, cssAfter, ...record } = turn as TurnRecord & { cssBefore?: string; cssAfter?: string };
      return record;
    });
    // Active CSS is read from files only; no historical CSS snapshots are persisted.
    const data = structuredClone({ catalog: this.catalog, apiAttempts: this.apiAttempts, snippetsInstalled: true, settings: this.settings, localization: { interfaceLanguage: this.interfaceLanguage, contentLanguage: this.contentLanguage }, state: { turns: this.state.turns } });
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
    const title = typeof metadata.title === "string" ? metadata.title : id;
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
        await this.saveAppliedStyle(result.style);
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
      const previousTurns = this.state.turns;
      const previousAttempts = this.apiAttempts;
      this.state.turns = [];
      this.apiAttempts = [];
      try { await this.savePluginData(); }
      catch (error) { this.state.turns = previousTurns; this.apiAttempts = previousAttempts; throw error; }
      await this.refreshView(true);
    });
  }

  async collectCatalog() {
    return collectCatalog(this.app.vault.adapter, this.app.vault.getMarkdownFiles(), this.settings.atlasFolder, this.settings.globalVariablesFile);
  }

  catalogStatus(): string {
    const active = this.catalog.active;
    return active ? t('catalog.ready', { p0: active.entries.length, p1: active.revision.slice(0,8), p2: new Date(active.createdAt).toLocaleString() }) : t('catalog.missing');
  }

  async updateCatalog(onStatus: (message: string) => void): Promise<void> {
    await this.withHistoryLock(async () => {
      onStatus(t('catalog.collecting'));
      const catalog = await this.collectCatalog();
      const api = new CatalogApi(this.settings.apiKey);
      await syncCatalog(api, this.catalog, catalog, () => this.savePluginData(), (done, total) => onStatus(t('catalog.uploading', { p0: done, p1: total })));
      onStatus(this.catalogStatus());
      await this.refreshView();
    });
  }

  async openCatalog(): Promise<void> {
    const folder = this.settings.atlasFolder.replace(/\/+$/, '');
    await this.app.workspace.openLinkText(`${folder}/atlas.md`, '', true);
  }

  async openRecommendation(entry: { path: string; kind: string }): Promise<void> {
    if (entry.kind === 'variable') {
      if (entry.path.startsWith('/') || entry.path.split('/').includes('..')) throw new Error(t('catalog.invalid_variables'));
      require('electron').shell.showItemInFolder(path.join(basePath(this), entry.path));
    } else await this.app.workspace.openLinkText(entry.path, '', true);
  }

  private async runFeedback(userText: string, onStatus: (message: string) => void): Promise<void> {
    const catalog = this.catalog.active;
    if (!catalog) throw new Error(t('catalog.missing'));
    const requestSettings = structuredClone(this.settings);
    const spending = summarizeAttempts(this.apiAttempts);
    if (requestSettings.spendLimitUsd > 0 && (spending.unknownCount > 0 || spending.knownCostUsd >= requestSettings.spendLimitUsd)) throw new Error(t('ledger.limit_reached'));
    if (requestSettings.autoPricing) {
      try {
        requestSettings.pricing = await loadPricing('openai', requestSettings.model, requestSettings.pricing);
        if (this.settings.autoPricing && pricingKey('openai', this.settings.model) === requestSettings.pricing.key) this.settings.pricing = requestSettings.pricing;
      } catch { requestSettings.pricing = undefined; }
    }
    const turnId = crypto.randomUUID();
    const prompt = buildTurnPrompt({ userText, interfaceLanguage: this.interfaceLanguage, revision: catalog.revision,
      conversation: this.state.turns.filter(turn => turn.promptVersion === PROMPT_VERSION && turn.catalogRevision === catalog.revision).map(turn => ({
        userText: turn.userText, systemMessage: [turn.systemMessage, ...(turn.recommendations ?? []).map(item => `${item.id}: ${item.reason} ${item.instructions}`)].join('\n'),
      })),
    });
    onStatus(t('catalog.searching'));
    const attempt: ApiAttempt = { id: turnId, createdAt: new Date().toISOString(), provider: 'openai', model: requestSettings.model,
      promptVersion: PROMPT_VERSION, status: 'pending', usage: unknownUsage(), responseId: '' };
    this.apiAttempts.push(attempt);
    await this.savePluginData();
    try {
      const result = await createProvider(requestSettings).createIteration({ instructions: SYSTEM_PROMPT, prompt, catalog,
        onUsage: async (usage, responseId) => { attempt.usage = usage; attempt.responseId = responseId; attempt.status = 'received'; await this.savePluginData(); },
      });
      attempt.usage = result.usage; attempt.responseId = result.responseId;
      await this.savePluginData();
      // No model response has any route to CSS mutation, including legacy actions.
      if (!['recommend', 'ask_question', 'no_match'].includes(result.decision.action)) throw new Error(t('catalog.invalid_recommendation'));
      const recommendations = result.decision.recommendations.map(item => {
        const entry = catalog.entries.find(entry => entry.id === item.id);
        if (!entry || !result.retrievedIds.includes(item.id)) throw new Error(t('catalog.invalid_recommendation'));
        const instructions = entry.kind === 'setting'
          ? t('catalog.setting_instruction', { p0: entry.menuPath ?? 'Settings' })
          : entry.kind === 'theme' ? t('catalog.theme_instruction')
          : entry.kind === 'technique' ? t(entry.applyAvailable ? 'catalog.apply_instruction' : 'catalog.card_instruction') : item.instructions;
        const themes = relatedThemes(entry, catalog.entries).map(theme => ({ id: theme.id, title: theme.title, path: theme.path, helpUrl: theme.helpUrl, kind: 'theme' as const }));
        return { ...item, instructions, title: entry.title, path: entry.path, kind: entry.kind, helpUrl: entry.helpUrl, relatedThemes: themes };
      });
      this.state.turns.push({ id: turnId, createdAt: new Date().toISOString(), coloringPath: '', userText,
        action: result.decision.action, systemMessage: result.decision.action === 'recommend' ? t('catalog.found') : result.decision.message, recommendations,
        catalogRevision: catalog.revision, searchQueries: result.searchQueries, retrievedIds: result.retrievedIds,
        provider: 'openai', model: requestSettings.model, promptVersion: PROMPT_VERSION, usage: result.usage, rawResponseId: result.responseId });
      attempt.status = 'completed';
    } catch (error) { attempt.status = 'failed'; throw error; }
    finally { await this.savePluginData(); await this.refreshView(); }
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

  private async saveAppliedStyle(style: NonNullable<PersistedState["style"]>): Promise<void> {
    const expected = this.state.style ?? importStyle(this.state.activeCss);
    await writeFileStyle(styleDirectory(this), expected, style);
    this.state.style = style;
    this.state.activeCss = compileStyle(style);
    await refreshNativeSnippets(this.app);
    await this.savePluginData();
  }

  private async refreshView(resetStatus = false): Promise<void> {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_CALLMERED)) {
      if (!(leaf.view instanceof ConversationView)) continue;
      if (resetStatus) leaf.view.resetHistoryStatus();
      await leaf.view.refresh();
    }
  }

}
