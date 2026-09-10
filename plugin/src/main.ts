import {
  MarkdownView,
  Notice,
  Plugin,
  TFile,
  WorkspaceLeaf,
} from "obsidian";
import { readFileStyle, writeFileStyle } from "./file-style";
import { installSnippetTemplates, refreshNativeSnippets } from "./snippets";
import { styleDirectory } from "./storage";
import { captureReadingView } from "./capture";
import { collectComputedStyleContext } from "./context";
import { CSS_UNDO_LIMIT, DEFAULT_SETTINGS, DEFAULT_STATE, PROMPT_VERSION, VIEW_TYPE_CALLMERED } from "./constants";
import { inspectMarkdownCoverage, type CoverageResult } from "./coverage";
import { compileStyle, importStyle, replaceStyleModule } from "./style-modules";
import { discoverCompatibleFonts, LOCALE_OPTIONS, type FontDiscoveryResult } from "./fonts";
import { buildTurnPrompt, SYSTEM_PROMPT } from "./prompt";
import { createProvider } from "./provider";
import { CallMeRedSettingTab } from "./settings";
import type { CallMeRedSettings, PersistedState, TurnRecord, UsageRecord } from "./types";
import { loadPricing, pricingKey } from "./pricing";
import { PROVIDERS } from "./llm-catalog";
import { addHack, hackId, type HackContext, type HackSpec } from "./hacks";
import { ConversationView } from "./view";

interface PluginData {
  snippetsInstalled?: boolean;
  settings?: Partial<CallMeRedSettings>;
  state?: Partial<PersistedState>;
}

export default class CallMeRedPlugin extends Plugin {
  settings: CallMeRedSettings = { ...DEFAULT_SETTINGS };
  state: PersistedState = structuredClone(DEFAULT_STATE);
  private lastMarkdownLeaf: WorkspaceLeaf | null = null;
  private fileSyncBusy = false;
  private historyBusy = false;
  private pendingSave: Promise<void> = Promise.resolve();
  private fileSyncError = "";
  private fontDiscoveryKey = "";
  private fontDiscoveryPromise: Promise<FontDiscoveryResult> | null = null;

  async onload(): Promise<void> {
    await this.loadPluginData();
    await this.savePluginData();
    await refreshNativeSnippets(this.app);
    this.registerInterval(window.setInterval(() => {
      if (this.fileSyncBusy) return;
      this.fileSyncBusy = true;
      void this.reloadFileStyle().then(() => { this.fileSyncError = ""; }).catch((error) => {
        const message = String(error);
        if (message !== this.fileSyncError) new Notice(`CSS не обновлён: ${message}`);
        this.fileSyncError = message;
      }).finally(() => { this.fileSyncBusy = false; });
    }, 1000));

    this.registerView(VIEW_TYPE_CALLMERED, (leaf) => new ConversationView(leaf, this));
    this.addSettingTab(new CallMeRedSettingTab(this.app, this));

    this.addRibbonIcon("palette", "Открыть Hacksidian", () => void this.activateView());
    this.addCommand({ id: "open-panel", name: "Открыть панель разговора", callback: () => void this.activateView() });
    this.addCommand({ id: "next-coloring", name: "Открыть следующую раскраску", callback: () => void this.openNextColoring() });
    this.addCommand({ id: "undo-style", name: "Undo визуальной итерации", callback: () => void this.undo() });

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
      if (!leaf) throw new Error("Не удалось создать правую панель Hacksidian.");
      await leaf.setViewState({ type: VIEW_TYPE_CALLMERED, active: true });
    }
    await this.app.workspace.revealLeaf(leaf);
  }

  async loadPluginData(): Promise<void> {
    const data = (await this.loadData()) as PluginData | null;
    this.settings = { ...structuredClone(DEFAULT_SETTINGS), ...(data?.settings ?? {}) };
    if (!(this.settings.provider in PROVIDERS)) this.settings.provider = "openai";
    if (data?.settings?.customModel === undefined) this.settings.customModel = !(this.settings.model in PROVIDERS[this.settings.provider].models);
    if (!data?.snippetsInstalled) {
      const names = await installSnippetTemplates(styleDirectory(this));
      await refreshNativeSnippets(this.app, names);
      await this.saveData({ ...data, snippetsInstalled: true });
    }
    const savedState = data?.state ?? {};
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
    if (changed) await refreshNativeSnippets(this.app);
  }

  async savePluginData(): Promise<void> {
    this.state.versions = this.state.versions.slice(-(CSS_UNDO_LIMIT + 1));
    this.state.turns = this.state.turns.map((turn) => {
      const { cssBefore, cssAfter, ...record } = turn as TurnRecord & { cssBefore?: string; cssAfter?: string };
      return record;
    });
    // Active CSS is read from files only. Snapshots below are historical Undo data.
    const data = structuredClone({ snippetsInstalled: true, settings: this.settings, state: { versions: this.state.versions, turns: this.state.turns } });
    const write = this.pendingSave.then(() => this.saveData(data));
    this.pendingSave = write.catch(() => {});
    await write;
  }

  async getCurrentColoringContext(): Promise<{
    file: TFile;
    view: MarkdownView;
    markdown: string;
    coverage: CoverageResult;
  } | null> {
    const view = this.findMarkdownView();
    const file = view?.file;
    if (!view || !file) return null;
    const markdown = await this.app.vault.read(file);
    return { file, view, markdown, coverage: inspectMarkdownCoverage(markdown) };
  }

  async getCurrentHack(): Promise<HackContext | null> {
    const file = this.findMarkdownView()?.file;
    if (!file) return null;
    const metadata = this.app.metadataCache.getFileCache(file)?.frontmatter;
    const id = hackId(file.path, metadata?.tags);
    if (!id) return null;
    const directory = file.path.slice(0, file.path.lastIndexOf("/"));
    const adapter = this.app.vault.adapter;
    if (!await adapter.exists(`${directory}/hack.json`)) return null;
    const [raw, template, dependencies] = await Promise.all([
      adapter.read(`${directory}/hack.json`), adapter.read(`${directory}/recipe.template.css`), adapter.read(`${directory}/dependencies.template.css`),
    ]);
    return { id, path: file.path, title: typeof metadata?.title === "string" ? metadata.title : id,
      spec: JSON.parse(raw) as HackSpec, template, dependencies };
  }

  async applyCurrentHack(expectedPath: string): Promise<boolean> {
    let changed = false;
    await this.withHistoryLock(async () => {
      const hack = await this.getCurrentHack();
      if (!hack || hack.path !== expectedPath) throw new Error("Открытая карточка изменилась. Выберите приём заново.");
      await this.reloadFileStyle();
      const result = addHack(this.state.style!, hack);
      if (result.changed) {
        await this.commitCssVersion(`hack-${hack.id}-${crypto.randomUUID()}`, compileStyle(result.style), "hack", result.style);
        changed = true;
      }
      const manifest = JSON.parse(await this.app.vault.adapter.read(`${this.app.vault.configDir}/snippets/hacksidian-manifest.json`));
      const entry = manifest.modules.find((m: {id: string}) => m.id === hack.spec.target);
      if (entry) await refreshNativeSnippets(this.app, [entry.file.replace(/\.css$/, "")]);
      await this.refreshView();
    });
    return changed;
  }

  async processFeedback(userText: string, onStatus: (message: string) => void): Promise<void> {
    await this.withHistoryLock(() => this.runFeedback(userText, onStatus));
  }

  private async withHistoryLock(operation: () => Promise<void>): Promise<void> {
    if (this.historyBusy) throw new Error("Дождитесь завершения текущей операции Hacksidian.");
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
    if (!context) throw new Error("Откройте раскраску в Reading view.");
    if (context.view.getMode() !== "preview") throw new Error("PoC сейчас работает только в Reading view.");

    const requestSettings = structuredClone(this.settings);
    if (requestSettings.autoPricing) {
      onStatus("Загружаю официальный тариф модели…");
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
      onStatus("Снимаю текущую раскраску для LLM…");
      screenshotBase64 = await captureReadingView(context.view);
    }

    const availableColorings = this.getColoringFiles().map((file) => file.path);
    onStatus("Проверяю установленные шрифты для выбранных языков…");
    const fontDiscovery = await this.getCompatibleFonts();
    const prompt = buildTurnPrompt({
      userText,
      coloringPath: context.file.path,
      markdown: context.markdown,
      modulesJson: JSON.stringify(styleAtStart.modules, null, 2),
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
      missingCoverage: context.coverage.missing,
    });

    onStatus("Жду ответ LLM… Новая раскраска появится здесь автоматически.");
    const provider = createProvider(requestSettings);
    const result = await provider.createIteration({
      instructions: SYSTEM_PROMPT,
      prompt,
      screenshotBase64,
    });

    await this.reloadFileStyle();
    if (JSON.stringify(this.state.style) !== JSON.stringify(styleAtStart) || this.state.activeCss !== cssAtStart) throw new Error("Стиль изменился во время запроса. Ответ не применён.");

    if (result.decision.action === "ask_question" && this.state.turns.some((turn) => turn.action === "ask_question")) {
      throw new Error("Модель попыталась задать второй уточняющий вопрос; в PoC разрешён только один.");
    }

    if (result.decision.action === "update_css") {
      await this.commitModuleUpdate(turnId, result.decision.moduleId, result.decision.css, fontDiscovery.families);
    } else if (result.decision.action === "switch_coloring") {
      await this.openColoring(result.decision.targetColoring);
    } else if (result.decision.action === "ask_question" && result.decision.message.length > 160) {
      throw new Error("Модель попыталась задать слишком длинный уточняющий вопрос.");
    }

    const record: TurnRecord = {
      id: turnId,
      createdAt: new Date().toISOString(),
      coloringPath: context.file.path,
      userText,
      changedModuleId: result.decision.action === "update_css" ? result.decision.moduleId : undefined,
      action: result.decision.action,
      systemMessage: result.decision.message,
      provider: requestSettings.provider,
      model: requestSettings.model,
      promptVersion: PROMPT_VERSION,
      usage: result.usage,
      rawResponseId: result.responseId,
    };

    this.state.turns.push(record);
    await this.savePluginData();
    await this.refreshView();
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
      new Notice("Возвращаться пока некуда.");
      return;
    }
    const latest = this.state.versions.at(-1)!;
    const previous = this.state.versions.at(-2)!;
    const current = await readFileStyle(styleDirectory(this));
    const previousStyle = previous.style ?? importStyle(previous.css);
    if (previousStyle.modules.length !== current.modules.length || previousStyle.modules.some((m, i) => m.id !== current.modules[i].id || m.component !== current.modules[i].component)) {
      new Notice("Начало истории текущей структуры CSS.");
      return;
    }
    if (compileStyle(current) !== latest.css) throw new Error("CSS изменён вручную. Undo не перезаписывает ручные изменения.");
    const restored = previous.style ?? importStyle(previous.css);
    await writeFileStyle(styleDirectory(this), current, restored);
    this.state.versions.pop();
    await this.reloadFileStyle();
    await this.savePluginData();
    await this.refreshView();
    new Notice("Предыдущая визуальная версия возвращена.");
  }

  async openNextColoring(): Promise<void> {
    const files = this.getColoringFiles();
    if (files.length === 0) {
      new Notice(`В папке ${this.settings.coloringsFolder} нет Markdown-раскрасок.`);
      return;
    }
    const currentPath = this.findMarkdownView()?.file?.path;
    const index = files.findIndex((file) => file.path === currentPath);
    await this.openColoring(files[(index + 1 + files.length) % files.length].path);
  }

  async openColoring(path: string): Promise<void> {
    const file = this.app.vault.getAbstractFileByPath(path);
    if (!(file instanceof TFile) || file.extension !== "md") throw new Error(`Раскраска не найдена: ${path}`);
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
    return this.state.turns.reduce<UsageRecord>(
      (total, turn) => ({
        inputTokens: total.inputTokens + turn.usage.inputTokens,
        cachedInputTokens: total.cachedInputTokens + turn.usage.cachedInputTokens,
        outputTokens: total.outputTokens + turn.usage.outputTokens,
        totalTokens: total.totalTokens + turn.usage.totalTokens,
        estimatedCostUsd: total.estimatedCostUsd == null || turn.usage.estimatedCostUsd == null ? null : total.estimatedCostUsd + turn.usage.estimatedCostUsd,
      }),
      { inputTokens: 0, cachedInputTokens: 0, outputTokens: 0, totalTokens: 0, estimatedCostUsd: 0 },
    );
  }

  async refreshPricing(force = false): Promise<void> {
    const { provider, model } = this.settings;
    const quote = await loadPricing(provider, model, this.settings.pricing, force);
    if (this.settings.autoPricing && pricingKey(this.settings.provider, this.settings.model) === quote.key) {
      this.settings.pricing = quote;
      await this.savePluginData();
    }
  }

  getCompatibleFonts(force = false): Promise<FontDiscoveryResult> {
    const key = [...this.settings.supportedLocales].sort().join(",");
    if (force || !this.fontDiscoveryPromise || this.fontDiscoveryKey !== key) {
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
    const prefix = `${this.settings.coloringsFolder.replace(/\/$/, "")}/`;
    return this.app.vault
      .getMarkdownFiles()
      .filter((file) => file.path.startsWith(prefix))
      .sort((left, right) => left.path.localeCompare(right.path, "ru"));
  }

  private async commitCssVersion(id: string, css: string, source: "model" | "undo" | "recovery" | "hack", style = importStyle(css)): Promise<void> {
    if (compileStyle(style) !== css) throw new Error("Сборка модулей не совпала с CSS.");
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
