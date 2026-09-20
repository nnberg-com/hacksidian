import { searchableCatalog } from './catalog';
import { shouldApplyTechnique } from './technique-command';
import { collectRecommendationParameters, recommendationParameterPatch } from './recommendation-parameters';
import { pendingParameters, processParameterSource } from './parameter-storage';
import { PARAMETER_PROMPT_VERSION, PARAMETER_INSTRUCTIONS, parameterChatPrompt, applyParameterDecision, parameterInputs } from './parameter-chat';
import { enabledTechniquePaths } from './enabled-techniques';
import { Favourites } from './favourites';
import { registerSourceBlocks } from './source-blocks';
import { t, setLanguageResolver, resolveInterfaceLanguage, resolveContentLanguage, type Language } from "../i18n";
import type { CatalogState } from "./catalog";
import { relatedThemes } from "./catalog";
import { collectCatalog } from "./catalog-source";
import { CatalogApi, CatalogSyncStopped, syncCatalog } from "./catalog-api";
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
  favourites?: string[];
  catalog?: CatalogState;
  apiAttempts?: ApiAttempt[];
  snippetsInstalled?: boolean;
  settings?: Partial<CallMeRedSettings>;
  state?: Partial<PersistedState>;
}

export default class CallMeRedPlugin extends Plugin {
  favourites = new Favourites({
    list: () => this.app.vault.getMarkdownFiles().filter(file => this.isFavouriteCard(file.path)).map(file => file.path).sort(),
    has: path => this.isFavouriteCard(path),
    toggle: async path => {
      const file = this.app.vault.getAbstractFileByPath(path);
      if (!(file instanceof TFile)) throw new Error('Карточка не найдена: ' + path);
      await this.app.fileManager.processFrontMatter(file, metadata => { metadata.favourite = metadata.favourite !== true; });
    },
  });
  private isFavouriteCard(path: string): boolean {
    const root = this.settings.atlasFolder.replace(/\/+$/, '') + '/! hacks/';
    if (!path.startsWith(root)) return false;
    const parts = path.split('/'), name = parts.pop()!;
    return name === parts[parts.length - 1] + '.md' && this.app.metadataCache.getCache(path)?.frontmatter?.favourite === true;
  }
  async openFavourites(): Promise<void> { await this.openTechniqueList('Избранное', 'hacksidian-favourites'); }
  async openEnabled(): Promise<void> { await this.openTechniqueList('Включённые', 'hacksidian-enabled'); }
  private async openTechniqueList(title: string, block: string): Promise<void> {
    const page = `${this.settings.atlasFolder.replace(/\/+$/, '')}/${title}.md`;
    let file = this.app.vault.getAbstractFileByPath(page);
    if (!file) file = await this.app.vault.create(page, `# ${title}\n\n\`\`\`${block}\n\`\`\`\n`);
    if (!(file instanceof TFile)) throw new Error('Не удалось открыть страницу: ' + page);
    const existing = this.app.workspace.getLeavesOfType('markdown').find(leaf => leaf.view instanceof MarkdownView && leaf.view.file?.path === page);
    if (existing) { await this.app.workspace.revealLeaf(existing); return; }
    await this.app.workspace.getLeaf('tab').openFile(file, { state: { mode: 'preview' } });
  }
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
    await this.loadPluginData();
    this.registerEvent(this.app.metadataCache.on('changed', () => this.favourites.refresh()));
    this.registerEvent(this.app.metadataCache.on('resolved', () => this.favourites.refresh()));
    this.registerEvent(this.app.vault.on('delete', () => this.favourites.refresh()));
    this.registerEvent(this.app.vault.on('rename', () => this.favourites.refresh()));
    const openFavourites = () => { void this.openFavourites().catch(error => new Notice(String(error))); };
    this.registerMarkdownCodeBlockProcessor('hacksidian-favourites', async (_source, el, ctx) => {
      const { FavouritesBlock } = await import('./favourites-view');
      ctx.addChild(new FavouritesBlock(el, this.app, this.favourites, this.interfaceLanguage === 'en'));
    });
    this.registerMarkdownCodeBlockProcessor('hacksidian-enabled', async (_source, el, ctx) => {
      await this.reloadFileStyle();
      const { EnabledBlock } = await import('./enabled-view');
      ctx.addChild(new EnabledBlock(el, this.app,
        () => enabledTechniquePaths(this.app.vault.getMarkdownFiles(), this.settings.atlasFolder, this.state.style),
        listener => { this.techniqueListeners.add(listener); return () => this.techniqueListeners.delete(listener); }));
    });
    registerSourceBlocks(this, this.techniqueControls());
    this.addCommand({ id: 'open-favourites', name: this.interfaceLanguage === 'en' ? 'Open favourites' : 'Открыть избранное', callback: openFavourites });
    this.addRibbonIcon('star', this.interfaceLanguage === 'en' ? 'Favourite techniques' : 'Избранные приёмы', openFavourites);
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
    // One-time migration of marks from the short-lived private-list implementation.
    for (const path of data?.favourites ?? []) {
      const file = this.app.vault.getAbstractFileByPath(path);
      if (!(file instanceof TFile)) throw new Error('Не удалось перенести избранное: ' + path);
      await this.app.fileManager.processFrontMatter(file, metadata => { metadata.favourite = true; });
    }
    this.catalog = data?.catalog ?? { garbage: [] };
    this.catalog.garbage ??= [];
    this.settings = { ...structuredClone(DEFAULT_SETTINGS), ...(data?.settings ?? {}) };
    // Discard the retired local limit; billing restrictions belong to the API administrator.
    delete (this.settings as unknown as Record<string, unknown>).spendLimitUsd;
    if (!this.settings.globalVariablesFile) this.settings.globalVariablesFile = `${this.app.vault.configDir}/snippets/hacksidian-00-palette.css`;
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
    if (changed) { for (const listener of this.techniqueListeners) listener(); await refreshNativeSnippets(this.app); await this.refreshView(); }
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
    return file ? this.getHackAt(file.path) : null;
  }
  techniqueControls(): import("./favourites").FavouriteControls {
    return { openEnabled: () => { void this.openEnabled().catch(error => new Notice(String(error))); }, technique: {
      get: async path => { const hack = await this.getHackAt(path); return hack ? { installed: !!hack.installed, hasCss: hack.spec.hasCss } : null; },
      set: (path, enabled) => this.applyCurrentHack(path, enabled, true),
      update: path => this.applyCurrentHack(path, true, true, true),
      subscribe: listener => { this.techniqueListeners.add(listener); return () => this.techniqueListeners.delete(listener); },
    }, store: this.favourites, open: () => { void this.openFavourites(); }, english: () => this.interfaceLanguage === 'en' };
  }

  private techniqueListeners = new Set<() => void>();
  async getHackAt(filePath: string): Promise<HackContext | null> {
    const file = { path: filePath };
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

  async applyCurrentHack(expectedPath: string, enabled = true, fromCard = false, update = false): Promise<boolean> {
    let changed = false;
    await this.withHistoryLock(async () => {
      if (enabled) await pendingParameters(this.app.vault, `${expectedPath.slice(0, expectedPath.lastIndexOf('/'))}/recipe.css`);
      const hack = fromCard ? await this.getHackAt(expectedPath) : await this.getCurrentHack();
      if (!hack || hack.path !== expectedPath) throw new Error(t("main.the_open_card_has_changed_select_the"));
      changed = await this.applyResolvedHack(hack, enabled, update);
    });
    return changed;
  }

  /** Called under the existing history lock by both buttons and chat. */
  private async applyResolvedHack(hack: HackContext, enabled: boolean, update: boolean): Promise<boolean> {
    await this.reloadFileStyle();
    if (update && !hasHack(this.state.style, hack.id)) throw new Error("Приём уже выключен / Technique is disabled");
    const result = enabled
      ? (!update && hasHack(this.state.style, hack.id) ? { style: this.state.style!, changed: false } : addHack(this.state.style!, hack))
      : removeHack(this.state.style!, hack.id);
    if (result.changed) {
      await this.saveAppliedStyle(result.style);
    }
    const manifest = JSON.parse(await this.app.vault.adapter.read(`${this.app.vault.configDir}/snippets/hacksidian-manifest.json`));
    const entry = manifest.modules.find((m: {id: string}) => m.id === hack.spec.target);
    if (enabled && entry) await refreshNativeSnippets(this.app, [entry.file.replace(/\.css$/, "")]);
    for (const listener of this.techniqueListeners) listener();
    await this.refreshView();
    return result.changed;
  }

  private async applyChatTechnique(cardPath: string, expectedCss?: string, requireCurrentPage = false): Promise<void> {
    await pendingParameters(this.app.vault, `${cardPath.slice(0, cardPath.lastIndexOf('/'))}/recipe.css`);
    const hack = await this.getHackAt(cardPath);
    if (!hack || hack.path !== cardPath || !hack.spec.hasCss) throw new Error('Приём недоступен для применения / Technique cannot be applied');
    if (requireCurrentPage && this.findMarkdownView()?.file?.path !== cardPath) throw new Error('Открытый приём изменился / The open technique changed');
    if (expectedCss !== undefined && hack.css !== expectedCss) throw new Error('CSS приёма изменился; применение отменено / Recipe changed; application cancelled');
    // Refresh installed state before deciding whether this is an enable or update.
    await this.reloadFileStyle();
    await this.applyResolvedHack(hack, true, hasHack(this.state.style, hack.id));
  }

  private async openUniqueTechnique(cardPath: string): Promise<void> {
    const file = this.app.vault.getAbstractFileByPath(cardPath);
    if (!(file instanceof TFile) || file.extension !== 'md') throw new Error('Карточка не найдена / Card not found');
    const leaf = this.app.workspace.getLeaf('tab');
    await leaf.openFile(file, { active: true, state: { mode: 'preview' } });
    this.lastMarkdownLeaf = leaf;
    await this.app.workspace.revealLeaf(leaf);
    this.app.workspace.setActiveLeaf(leaf, { focus: true });
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
    if (this.catalog.sync) return t('catalog.incomplete');
    const active = this.catalog.active;
    return active ? t('catalog.ready', { p0: active.entries.length, p1: active.revision.slice(0,8), p2: new Date(active.createdAt).toLocaleString() }) : t('catalog.missing');
  }

  private catalogAbort?: AbortController;

  stopCatalogUpdate(): void { this.catalogAbort?.abort(); }

  async updateCatalog(onStatus: (message: string) => void): Promise<void> {
    await this.withHistoryLock(async () => {
      const controller = new AbortController();
      this.catalogAbort = controller;
      try {
        onStatus(t('catalog.collecting'));
        const catalog = await this.collectCatalog();
        const api = new CatalogApi(this.settings.apiKey);
        await syncCatalog(api, this.catalog, catalog, () => this.savePluginData(), (done, total) => onStatus(t('catalog.uploading', { p0: done, p1: total })), {
          signal: controller.signal,
          status: onStatus,
          chooseStore: async stores => {
            const { SuggestModal } = await import('obsidian');
            return new Promise<string>((resolve, reject) => {
              let selected = false;
              class StorePicker extends SuggestModal<{ id: string; name: string }> {
                getSuggestions(query: string) { return stores.filter(s => `${s.name} ${s.id}`.toLowerCase().includes(query.toLowerCase())); }
                renderSuggestion(store: { id: string; name: string }, el: HTMLElement) { el.setText(`${store.name} — ${store.id}`); }
                onChooseSuggestion(store: { id: string }) { selected = true; resolve(store.id); }
                onClose() { setTimeout(() => { if (!selected) reject(new Error(t('catalog.selection_cancelled'))); }, 0); }
              }
              const picker = new StorePicker(this.app);
              picker.setPlaceholder(t('catalog.choose_store'));
              picker.open();
            });
          },
        });
        onStatus(this.catalogStatus());
      } catch (error) {
        if (!(error instanceof CatalogSyncStopped)) throw error;
        onStatus(t('catalog.stopped'));
      } finally { this.catalogAbort = undefined; }
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

  private async runParameterFeedback(initial: HackContext, userText: string, onStatus: (message: string) => void): Promise<boolean> {
    const en = this.interfaceLanguage === 'en';
    const cssPath = `${initial.path.slice(0, initial.path.lastIndexOf('/'))}/recipe.css`;
    await pendingParameters(this.app.vault, cssPath);
    const hack = await this.getCurrentHack();
    if (!hack || hack.path !== initial.path) throw new Error(en ? 'The open technique changed. Send the request again.' : 'Открытый приём изменился. Отправьте запрос заново.');
    const settings = structuredClone(this.settings);
    if (settings.autoPricing) {
      try { settings.pricing = await loadPricing('openai', settings.model, settings.pricing); }
      catch { settings.pricing = undefined; }
    }
    const prompt = parameterChatPrompt(hack, userText, this.interfaceLanguage,
      this.state.turns.filter(turn => turn.promptVersion === PARAMETER_PROMPT_VERSION && turn.techniquePath === hack.path));
    const id = crypto.randomUUID();
    const attempt: ApiAttempt = { id, createdAt: new Date().toISOString(), provider: 'openai', model: settings.model,
      promptVersion: PARAMETER_PROMPT_VERSION, status: 'pending', usage: unknownUsage(), responseId: '' };
    this.apiAttempts.push(attempt);
    await this.savePluginData();
    onStatus(en ? 'Choosing parameter values…' : 'Подбираю значения параметров…');
    let sourceSaved = false;
    let applied = false;
    try {
      const result = await createProvider(settings).createParameterIteration({ instructions: PARAMETER_INSTRUCTIONS, prompt,
        onUsage: async (usage, responseId) => { attempt.usage = usage; attempt.responseId = responseId; attempt.status = 'received'; await this.savePluginData(); },
      });
      attempt.usage = result.usage; attempt.responseId = result.responseId;
      await this.savePluginData();
      if (result.decision.action === 'search_catalog') { attempt.status = 'completed'; return false; }
      const patch = applyParameterDecision(hack.css, result.decision);
      if (result.decision.action === 'update_parameters') {
        await processParameterSource(this.app.vault, cssPath, current => {
          if (this.findMarkdownView()?.file?.path !== hack.path) throw new Error(en ? 'The open technique changed. Nothing was saved.' : 'Открытый приём изменился. Значения не сохранены.');
          if (current !== hack.css) throw new Error(en ? 'The recipe changed while waiting. Nothing was overwritten; send the request again.' : 'Пока выполнялся запрос, CSS приёма изменился. Ничего не перезаписано; отправьте запрос заново.');
          return patch.css;
        });
        sourceSaved = true;
      }
      if (shouldApplyTechnique(result.decision, userText)) {
        await this.applyChatTechnique(hack.path, patch.css, true);
        applied = true;
      }
      const summary = patch.changes.map(change => `${(en ? change.labelEn : undefined) || change.label}: ${change.before} → ${change.after}`).join('\n');
      let message = result.decision.action === 'update_parameters'
        ? patch.changes.length
          ? `${en ? 'Saved parameter values:' : 'Сохранены значения параметров:'}\n${summary}\n\n${result.decision.message}\n\n${en ? 'The preview updates automatically. To update the installed style, use “Update existing style” on the card.' : 'Пример обновляется автоматически. Для применённого оформления нажмите «Обновить уже существующий стиль» на карточке.'}`
          : (en ? 'The parameters already have these values. Nothing changed.' : 'У параметров уже такие значения. Ничего не изменено.')
        : result.decision.message;
      if (applied) message = `${en ? 'Technique applied.' : 'Приём применён.'}${summary ? '\n' + summary : ''}`;
      this.state.turns.push({ id, createdAt: attempt.createdAt, coloringPath: '', userText,
        action: result.decision.action, systemMessage: message,
        techniqueId: hack.id, techniqueTitle: hack.title, techniquePath: hack.path, parameterChanges: patch.changes, techniqueApplied: applied,
        provider: 'openai', model: settings.model, promptVersion: PARAMETER_PROMPT_VERSION, usage: result.usage, rawResponseId: result.responseId });
      attempt.status = 'completed';
      return true;
    } catch (error) {
      attempt.status = 'failed';
      if (sourceSaved || applied) throw new Error(`${applied ? (en ? 'Technique was applied; subsequent operation failed' : 'Приём применён; последующая операция завершилась ошибкой') : (en ? 'Parameter CSS was saved, but the remaining operation failed' : 'CSS параметров сохранён, но дальнейшая операция завершилась ошибкой')}: ${String(error)}`);
      throw error;
    } finally {
      try { await this.savePluginData(); await this.refreshView(); }
      catch (error) {
        if (sourceSaved || applied) throw new Error(`${applied ? (en ? 'Technique was applied; subsequent operation failed' : 'Приём применён; последующая операция завершилась ошибкой') : (en ? 'Parameter CSS was saved, but the remaining operation failed' : 'CSS параметров сохранён, но дальнейшая операция завершилась ошибкой')}: ${String(error)}`);
        throw error;
      }
    }
  }

  private async runFeedback(userText: string, onStatus: (message: string) => void): Promise<void> {
    const currentHack = await this.getCurrentHack();
    const namedId = /\b[a-z][a-z0-9]*-[a-z0-9_-]+\b/i.test(userText);
    if (currentHack && !namedId && parameterInputs(currentHack.css).length && await this.runParameterFeedback(currentHack, userText, onStatus)) return;
    const legacyEntries = this.catalog.sync && !this.catalog.sync.entries
      ? (await this.collectCatalog()).entries : [];
    const catalog = searchableCatalog(this.catalog, legacyEntries);
    if (!catalog) throw new Error(t('catalog.missing'));
    const requestSettings = structuredClone(this.settings);
    if (requestSettings.autoPricing) {
      try {
        requestSettings.pricing = await loadPricing('openai', requestSettings.model, requestSettings.pricing);
        if (this.settings.autoPricing && pricingKey('openai', this.settings.model) === requestSettings.pricing.key) this.settings.pricing = requestSettings.pricing;
      } catch { requestSettings.pricing = undefined; }
    }
    const parameterSnapshots = await collectRecommendationParameters(catalog.entries, path => this.app.vault.adapter.read(path));
    const turnId = crypto.randomUUID();
    const prompt = buildTurnPrompt({ userText, interfaceLanguage: this.interfaceLanguage, revision: catalog.revision,
      parameterContext: parameterSnapshots.map(({id,title,parameters}) => ({id,title,parameters})),
      conversation: this.state.turns.filter(turn => turn.promptVersion === PROMPT_VERSION && turn.catalogRevision === catalog.revision).map(turn => ({
        userText: turn.userText, systemMessage: [turn.systemMessage, ...(turn.recommendations ?? []).map(item => `${item.id}: ${item.reason} ${item.instructions}`)].join('\n'),
      })),
    });
    let preconfigured = false;
    let applied = false;
    onStatus(t('catalog.searching'));
    const attempt: ApiAttempt = { id: turnId, createdAt: new Date().toISOString(), provider: 'openai', model: requestSettings.model,
      promptVersion: PROMPT_VERSION, status: 'pending', usage: unknownUsage(), responseId: '' };
    this.apiAttempts.push(attempt);
    await this.savePluginData();
    try {
      const result = await createProvider(requestSettings).createIteration({ instructions: SYSTEM_PROMPT, prompt, catalog, userText,
        searchContext: this.state.turns.slice(-2).map(turn => `${turn.userText}\n${(turn.recommendations ?? []).map(r => `${r.id}: ${r.reason}`).join("\n")}`).join("\n").slice(-4000),
        onUsage: async (usage, responseId) => { attempt.usage = usage; attempt.responseId = responseId; attempt.status = 'received'; await this.savePluginData(); },
      });
      attempt.usage = result.usage; attempt.responseId = result.responseId;
      await this.savePluginData();
      // Only one verified recommendation can preconfigure declared local parameter values.
      if (!['recommend', 'ask_question', 'no_match'].includes(result.decision.action)) throw new Error(t('catalog.invalid_recommendation'));
      const recommendations = result.decision.recommendations.map(item => {
        const entry = catalog.entries.find(entry => entry.id === item.id);
        if (!entry || !result.retrievedIds.includes(item.id)) throw new Error(t('catalog.invalid_recommendation'));
        const instructions = entry.kind === 'setting'
          ? t('catalog.setting_instruction', { p0: entry.menuPath ?? 'Settings' })
          : entry.kind === 'theme' ? t('catalog.theme_instruction')
          : entry.kind === 'technique' ? '' : item.instructions;
        const themes = relatedThemes(entry, catalog.entries).map(theme => ({ id: theme.id, title: theme.title, path: theme.path, helpUrl: theme.helpUrl, kind: 'theme' as const }));
        return { ...item, partialMatch: false, ...(result.decision.recommendations.length > 1 ? {parameterChanges: [], command: 'show' as const, commandEvidence: ''} : {}), applied: false, preparedParameters: [] as Array<{variable: string; before: string; after: string}>, instructions, title: entry.title, path: entry.path, kind: entry.kind, helpUrl: entry.helpUrl, relatedThemes: themes };
      });
      const preparation = recommendationParameterPatch(result.decision.recommendations, parameterSnapshots, catalog.entries, result.retrievedIds);
      if (preparation) {
        const cssPath = `${preparation.snapshot.path.slice(0, preparation.snapshot.path.lastIndexOf('/'))}/recipe.css`;
        await processParameterSource(this.app.vault, cssPath, current => {
          if (current !== preparation.snapshot.css) throw new Error(this.interfaceLanguage === 'en'
            ? 'The recommended recipe changed while waiting. No values were overwritten; retry the request.'
            : 'Пока выполнялся запрос, CSS предлагаемого приёма изменился. Значения не перезаписаны; повторите запрос.');
          return preparation.css;
        });
        preconfigured = true;
        const en = this.interfaceLanguage === 'en';
        const recommendation = recommendations[0];
        recommendation.preparedParameters = preparation.changes;
        const summary = preparation.changes.map(change => `${(en ? change.labelEn : undefined) || change.label}: ${change.before} → ${change.after}`).join('\n');
        recommendation.instructions = `${preparation.changes.length ? (en ? 'Parameters preconfigured:' : 'Параметры преднастроены:') + '\n' + summary : (en ? 'The parameters already match the request.' : 'Параметры уже соответствуют запросу.')}\n${en ? 'Open the card to inspect the example. Enable the technique, or use “Update existing style” if it is already enabled.' : 'Откройте карточку и посмотрите пример. Включите приём или нажмите «Обновить уже существующий стиль», если он уже включён.'}`;
      }
      if (recommendations.length === 1 && recommendations[0].kind === 'technique') {
        const recommendation = recommendations[0];
        if (shouldApplyTechnique(recommendation, userText)) {
          const entry = catalog.entries.find(entry => entry.id === recommendation.id)!;
          if (!entry.applyAvailable || !result.retrievedIds.includes(entry.id)) throw new Error(t('catalog.invalid_recommendation'));
          await this.applyChatTechnique(recommendation.path, preparation?.css);
          recommendation.applied = true;
          applied = true;
          const summary = preparation?.changes.map(change => `${change.label}: ${change.before} → ${change.after}`).join('\n');
          recommendation.instructions = `${this.interfaceLanguage === 'en' ? 'Technique applied.' : 'Приём применён.'}${summary ? '\n' + summary : ''}`;
        }
      }
      // Near matches are display-only; they never enter the preparation/apply path.
      for (const alternative of result.decision.alternatives ?? []) {
        const entry = catalog.entries.find(entry => entry.id === alternative.id && entry.kind === 'technique');
        if (!entry || !result.retrievedIds.includes(entry.id)) throw new Error(t('catalog.invalid_recommendation'));
        recommendations.push({id: entry.id, reason: alternative.reason, instructions: '', command: 'show', commandEvidence: '',
          parameterChanges: [], partialMatch: true, applied: false, preparedParameters: [], title: entry.title, path: entry.path,
          kind: entry.kind, helpUrl: entry.helpUrl, relatedThemes: relatedThemes(entry,catalog.entries).map(theme=>({id:theme.id,title:theme.title,path:theme.path,kind:'theme' as const,helpUrl:theme.helpUrl}))});
      }
      const clarification = result.decision.action === 'ask_question' && result.decision.clarificationId
        ? catalog.entries.find(entry => entry.id === result.decision.clarificationId && entry.kind === 'technique' && result.retrievedIds.includes(entry.id)) : undefined;
      if (clarification) await this.openUniqueTechnique(clarification.path);

      this.state.turns.push({ id: turnId, createdAt: new Date().toISOString(), coloringPath: '', userText,
        ...(clarification ? {techniqueId: clarification.id, techniqueTitle: clarification.title, techniquePath: clarification.path} : {}),
        action: result.decision.action, systemMessage: result.decision.action === 'recommend' ? t('catalog.found') : result.decision.message, recommendations,
        catalogRevision: catalog.revision, searchQueries: result.searchQueries, retrievedIds: result.retrievedIds,
        provider: 'openai', model: requestSettings.model, promptVersion: PROMPT_VERSION, usage: result.usage, rawResponseId: result.responseId });
      attempt.status = 'completed';
    } catch (error) {
      attempt.status = 'failed';
      if (applied) throw new Error(`${this.interfaceLanguage === 'en' ? 'Technique applied; the remaining operation failed' : 'Приём применён; дальнейшая операция завершилась ошибкой'}: ${String(error)}`);
      if (preconfigured) throw new Error(`${this.interfaceLanguage === 'en' ? 'Parameters were saved; the remaining operation failed' : 'Параметры сохранены; дальнейшая операция завершилась ошибкой'}: ${String(error)}`);
      throw error;
    }
    finally {
      try { await this.savePluginData(); await this.refreshView(); }
      catch (error) {
        if (applied) throw new Error(`${this.interfaceLanguage === 'en' ? 'Technique applied, but chat recording failed' : 'Приём применён, но запись ответа в чат завершилась ошибкой'}: ${String(error)}`);
        if (preconfigured) throw new Error(`${this.interfaceLanguage === 'en' ? 'Recipe parameters were saved, but chat recording failed' : 'Параметры приёма сохранены, но запись ответа в чат завершилась ошибкой'}: ${String(error)}`);
        throw error;
      }
    }
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
