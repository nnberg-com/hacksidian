import { t, numberLocale, currentLanguage } from "../i18n";
import { ItemView, Notice, WorkspaceLeaf, setIcon } from "obsidian";
import { formatCost } from "./cost";
import { VIEW_TYPE_CALLMERED } from "./constants";
import type CallMeRedPlugin from "./main";

export class ConversationView extends ItemView {
  private hackEl!: HTMLElement;
  private hackPath: string | null = null;
  private hackRenderKey: string | null = null;
  private hackResultEl!: HTMLElement;
  private refreshId = 0;
  private pageObserver?: MutationObserver;
  private observedPage: HTMLElement | null = null;
  private titleRefreshTimer?: number;
  private busy = false;
  private pendingText: string | null = null;
  private copyButton!: HTMLButtonElement;
  private conversationEl!: HTMLElement;
  private statusEl!: HTMLElement;
  private usageEl!: HTMLElement;
  private inputEl!: HTMLTextAreaElement;
  private submitButton!: HTMLButtonElement;
  private toolbarButtons: HTMLButtonElement[] = [];

  constructor(
    leaf: WorkspaceLeaf,
    private readonly plugin: CallMeRedPlugin,
  ) {
    super(leaf);
  }

  getViewType(): string {
    return VIEW_TYPE_CALLMERED;
  }

  getDisplayText(): string {
    return "Hacksidian";
  }

  getIcon(): string {
    return "palette";
  }

  async onOpen(): Promise<void> {
    this.contentEl.empty();
    this.contentEl.addClass("callmered-panel");

    this.hackRenderKey = null;
    this.hackEl = this.contentEl.createDiv({ cls: "hacksidian-page-context" });

    const toolbar = this.contentEl.createDiv({ cls: "callmered-toolbar" });
    this.toolbarButtons = [
      this.iconButton("file-symlink", t("view.next_sample"), () => void this.plugin.openNextColoring()),
      this.iconButton("undo-2", t("view.undo"), () => void this.plugin.undo()),
    ];
    for (const button of this.toolbarButtons) toolbar.appendChild(button);
    this.copyButton = toolbar.createEl("button", { text: t("view.copy_conversation") });
    this.copyButton.addEventListener("click", () => void this.copyConversation());

    this.statusEl = this.contentEl.createDiv({ cls: "callmered-status", text: t("view.ready") });
    this.statusEl.setAttribute("role", "status");
    this.statusEl.setAttribute("aria-live", "polite");
    this.hackResultEl = this.contentEl.createDiv({ cls: "hacksidian-hack-result" });
    this.hackResultEl.setAttribute("role", "status");
    this.conversationEl = this.contentEl.createDiv({ cls: "callmered-conversation" });
    this.usageEl = this.contentEl.createDiv({ cls: "callmered-usage" });

    const composer = this.contentEl.createDiv({ cls: "callmered-composer" });
    this.inputEl = composer.createEl("textarea", {
      cls: "callmered-input",
      attr: { placeholder: t("view.request_placeholder"), rows: "3", "aria-label": t("view.request_placeholder") },
    });
    if (this.scope) {
      const submitFromShortcut = (event: KeyboardEvent): false | undefined => {
        if (document.activeElement !== this.inputEl) return;
        event.preventDefault();
        void this.submit();
        return false;
      };
      this.scope.register(["Meta"], "Enter", submitFromShortcut);
      this.scope.register(["Ctrl"], "Enter", submitFromShortcut);
    } else {
      this.inputEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          void this.submit();
        }
      });
    }
    this.submitButton = composer.createEl("button", {
      cls: "mod-cta callmered-submit",
      text: t("view.submit"),
      attr: { "aria-keyshortcuts": "Meta+Enter", title: t("view.send_enter") },
    });
    this.submitButton.addEventListener("click", () => void this.submit());

    await this.refresh();
  }

  async refreshLanguage(): Promise<void> {
    // Update in place: preserve the draft, pending request and keyboard handlers.
    this.toolbarButtons[0]?.setAttribute("aria-label", t("view.next_sample"));
    this.toolbarButtons[1]?.setAttribute("aria-label", t("view.undo"));
    this.copyButton.setText(t("view.copy_conversation"));
    this.inputEl.placeholder = t("view.request_placeholder");
    this.inputEl.setAttribute("aria-label", t("view.request_placeholder"));
    this.submitButton.title = t("view.send_enter");
    this.submitButton.setText(t("view.submit"));
    if (!this.busy) this.statusEl.setText(t("view.ready"));
    await this.refresh();
  }

  private observePageTitle(): void {
    const container = this.plugin.getCurrentPageContainer?.() ?? null;
    if (container === this.observedPage) return;
    this.pageObserver?.disconnect();
    this.observedPage = container;
    if (!container) return;
    this.pageObserver = new MutationObserver(records => {
      const affectsHeading = records.some(record => {
        const element = record.target.nodeType === 1 ? record.target as Element : record.target.parentElement;
        return element?.closest("h1") || [...Array.from(record.addedNodes), ...Array.from(record.removedNodes)].some(node =>
          node.nodeType === 1 && ((node as Element).matches("h1") || (node as Element).querySelector("h1")));
      });
      if (!affectsHeading) return;
      window.clearTimeout(this.titleRefreshTimer);
      this.titleRefreshTimer = window.setTimeout(() => void this.refresh(), 50);
    });
    this.pageObserver.observe(container, { subtree: true, childList: true, characterData: true });
  }

  async onClose(): Promise<void> {
    this.pageObserver?.disconnect();
    window.clearTimeout(this.titleRefreshTimer);
  }

  async refresh(): Promise<void> {
    if (!this.hackEl) return;
    const refreshId = ++this.refreshId;
    this.observePageTitle();
    const page = await this.plugin.getCurrentPage();
    let hack;
    try { hack = await this.plugin.getCurrentHack(); }
    catch { hack = null; }
    if (refreshId !== this.refreshId) return;
    // Focus changes can refresh this panel between pointerdown and click.
    // Preserve the button node when the displayed card has not changed.
    const renderKey = JSON.stringify([currentLanguage(), page, hack?.path, hack?.id, hack?.title, hack?.spec, hack?.installed]);
    if (renderKey !== this.hackRenderKey) {
      this.hackRenderKey = renderKey;
      this.hackEl.empty();
      this.hackPath = hack?.path ?? null;
      const heading = this.hackEl.createDiv({ cls: "hacksidian-page-heading" });
      heading.createDiv({ cls: "hacksidian-page-title", text: page?.title || hack?.title || t("view.no_page"),
        attr: { title: page?.path ?? "" } });
      if (hack) {
        const actions = heading.createDiv({ cls: "hacksidian-page-actions" });
        const button = actions.createEl("button", { text: t(hack.installed ? "view.disable_hack" : "view.apply_hack"), cls: "mod-cta" });
        button.dataset.noCss = String(!hack.spec.hasCss && !hack.installed);
        button.disabled = this.busy || (!hack.spec.hasCss && !hack.installed);
        for (const requirement of hack.spec.requirements ?? []) this.hackEl.createDiv({ cls: "setting-item-description", text: requirement });
        if (!hack.spec.hasCss) this.hackEl.createDiv({ text: t("view.this_technique_has_no_css_of_its") });
        const path = hack.path;
        button.addEventListener("click", () => void this.applyHack(path, !hack.installed));
      }
    }
    this.conversationEl.empty();
    for (const turn of this.plugin.state.turns) {
      const user = this.conversationEl.createDiv({ cls: "callmered-turn callmered-turn-user" });
      user.createDiv({ cls: "callmered-turn-label", text: t("view.you") });
      user.createDiv({ text: turn.userText });
      user.createDiv({
        cls: "callmered-turn-usage",
        text: t("view.tokens", { p0: turn.usage.totalTokens.toLocaleString(numberLocale()), p1: formatCost(turn.usage.estimatedCostUsd) }),
      });
      if (turn.systemMessage) {
        const system = this.conversationEl.createDiv({ cls: "callmered-turn callmered-turn-system" });
        system.createDiv({ text: turn.systemMessage });
      }
    }

    const usage = this.plugin.totalUsage();
    const spending = this.plugin.spendingSummary();
    this.usageEl.setText(
      t("view.api_tokens", { p0: usage.totalTokens.toLocaleString(numberLocale()), p1: formatCost(usage.estimatedCostUsd) }) + " · " + t("ledger.summary", { p0: spending.count, p1: spending.knownCostUsd.toFixed(6), p2: spending.unknownCount }),
    );
  }

  setStatus(message: string, busy = false): void {
    this.busy = busy;
    this.hackEl.querySelectorAll("button").forEach(button => { button.disabled = busy || button.dataset.noCss === "true"; });
    this.statusEl.setText(message);
    this.statusEl.toggleClass("is-busy", busy);
    this.contentEl.toggleClass("is-busy", busy);
    this.contentEl.setAttribute("aria-busy", String(busy));
    this.submitButton.disabled = busy;
    this.submitButton.setText(t("view.submit"));
    this.inputEl.disabled = busy;
    for (const button of this.toolbarButtons) button.disabled = busy;
  }

  private async applyHack(path = this.hackPath, enabled = true): Promise<void> {
    if (!path || this.busy) return;
    try {
      this.hackResultEl.setText(t(enabled ? "view.applying_technique_css" : "view.disabling_technique_css"));
      this.setStatus(t(enabled ? "view.applying_technique_css" : "view.disabling_technique_css"), true);
      const changed = await this.plugin.applyCurrentHack(path, enabled);
      this.setStatus(enabled ? (changed ? t("view.hack_applied_you_can_revert_it_with") : t("view.hack_is_already_applied")) : t("view.hack_disabled"));
    } catch (error) {
      this.setStatus(error instanceof Error ? error.message : String(error));
    }
    this.hackResultEl.setText(this.statusEl.textContent ?? "");
    await this.refresh();
  }

  private iconButton(icon: string, label: string, action: () => void): HTMLButtonElement {
    const button = document.createElement("button");
    button.className = "clickable-icon";
    button.setAttribute("aria-label", label);
    button.setAttribute("data-tooltip-position", "bottom");
    setIcon(button, icon);
    button.addEventListener("click", action);
    return button;
  }

  private async copyConversation(): Promise<void> {
    const messages = this.plugin.state.turns.flatMap(turn => [
      `## ${t("view.you")}

${turn.userText}`,
      ...(turn.systemMessage ? [`## Hacksidian

${turn.systemMessage}`] : []),
    ]);
    if (this.pendingText !== null) messages.push(`## ${t("view.you")}

${this.pendingText}`);
    if (!messages.length) {
      new Notice(t("view.conversation_empty"));
      return;
    }
    try {
      await navigator.clipboard.writeText(messages.join("\n\n"));
      new Notice(t("view.conversation_copied"));
    } catch {
      new Notice(t("view.copy_failed"));
    }
  }

  private async submit(): Promise<void> {
    const text = this.inputEl.value.trim();
    if (!text) return;
    this.inputEl.value = "";
    this.pendingText = text;
    this.appendPendingTurn(text);
    try {
      this.setStatus(t("view.preparing_context"), true);
      await this.plugin.processFeedback(text, (message) => this.setStatus(message, true));
      this.pendingText = null;
      this.setStatus(t("view.response_received"));
      await this.refresh();
    } catch (error) {
      this.pendingText = null;
      await this.refresh();
      this.inputEl.value = text;
      this.setStatus(error instanceof Error ? error.message : String(error));
      new Notice(this.statusEl.textContent ?? t("view.the_iteration_could_not_be_completed"));
    }
  }

  private appendPendingTurn(text: string): void {
    const user = this.conversationEl.createDiv({ cls: "callmered-turn callmered-turn-user is-pending" });
    user.createDiv({ cls: "callmered-turn-label", text: t("view.you") });
    user.createDiv({ text });
    user.createDiv({ cls: "callmered-turn-usage", text: t("view.sent_waiting_for_a_response") });
    this.conversationEl.scrollTop = this.conversationEl.scrollHeight;
  }
}
