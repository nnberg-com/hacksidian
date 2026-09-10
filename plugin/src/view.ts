import { ItemView, Notice, WorkspaceLeaf, setIcon } from "obsidian";
import { formatCost } from "./cost";
import { VIEW_TYPE_CALLMERED } from "./constants";
import type CallMeRedPlugin from "./main";

export class ConversationView extends ItemView {
  private hackEl!: HTMLElement;
  private hackPath: string | null = null;
  private refreshId = 0;
  private busy = false;
  private conversationEl!: HTMLElement;
  private statusEl!: HTMLElement;
  private usageEl!: HTMLElement;
  private coverageEl!: HTMLElement;
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

    const toolbar = this.contentEl.createDiv({ cls: "callmered-toolbar" });
    this.toolbarButtons = [
      this.iconButton("file-symlink", "Следующая раскраска", () => void this.plugin.openNextColoring()),
      this.iconButton("undo-2", "Undo", () => void this.plugin.undo()),
    ];
    for (const button of this.toolbarButtons) toolbar.appendChild(button);

    this.hackEl = this.contentEl.createDiv({ cls: "hacksidian-hack" });
    this.hackEl.style.display = "none";

    this.statusEl = this.contentEl.createDiv({ cls: "callmered-status", text: "Готово к работе." });
    this.statusEl.setAttribute("role", "status");
    this.statusEl.setAttribute("aria-live", "polite");
    this.coverageEl = this.contentEl.createDiv({ cls: "callmered-coverage" });
    this.conversationEl = this.contentEl.createDiv({ cls: "callmered-conversation" });
    this.usageEl = this.contentEl.createDiv({ cls: "callmered-usage" });

    const composer = this.contentEl.createDiv({ cls: "callmered-composer" });
    this.inputEl = composer.createEl("textarea", {
      cls: "callmered-input",
      attr: { placeholder: "Что вы видите и чувствуете?", rows: "5" },
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
      cls: "mod-cta",
      text: "Показать следующий вариант",
      attr: { "aria-keyshortcuts": "Meta+Enter", title: "Отправить — ⌘ Enter" },
    });
    this.submitButton.addEventListener("click", () => void this.submit());

    await this.refresh();
  }

  async refresh(): Promise<void> {
    if (!this.hackEl) return;
    const refreshId = ++this.refreshId;
    let hack;
    try { hack = await this.plugin.getCurrentHack(); }
    catch { hack = null; }
    if (refreshId !== this.refreshId) return;
    this.hackEl.empty();
    this.hackPath = hack?.path ?? null;
    this.hackEl.style.display = hack ? "" : "none";
    if (hack) {
      this.hackEl.createDiv({ text: hack.title });
      this.hackEl.createDiv({ cls: "setting-item-description", text: `Сниппет: ${hack.spec.target.replace(/^m-/, "")} · Без LLM` });
      const button = this.hackEl.createEl("button", { text: "Применить hack", cls: "mod-cta" });
      button.dataset.noCss = String(!hack.spec.hasCss);
      button.disabled = this.busy || !hack.spec.hasCss;
      for (const requirement of hack.spec.requirements ?? []) this.hackEl.createDiv({ cls: "setting-item-description", text: requirement });
      if (!hack.spec.hasCss) this.hackEl.createDiv({ text: "У этого приёма нет собственного CSS." });
      button.addEventListener("click", () => void this.applyHack());
    }
    const context = await this.plugin.getCurrentColoringContext();
    if (refreshId !== this.refreshId) return;
    this.coverageEl.removeClass("is-warning");
    if (!context) {
      this.coverageEl.setText("Откройте Markdown-раскраску в Reading view.");
    } else if (context.coverage.missing.length === 0) {
      this.coverageEl.setText(`Раскраска сохраняет все ${context.coverage.total} контрольных возможностей.`);
    } else {
      this.coverageEl.setText(`После правок не представлены: ${context.coverage.missing.join(", ")}.`);
      this.coverageEl.addClass("is-warning");
    }

    this.conversationEl.empty();
    for (const turn of this.plugin.state.turns) {
      const user = this.conversationEl.createDiv({ cls: "callmered-turn callmered-turn-user" });
      user.createDiv({ cls: "callmered-turn-label", text: "Вы" });
      user.createDiv({ text: turn.userText });
      user.createDiv({
        cls: "callmered-turn-usage",
        text: `${turn.usage.totalTokens.toLocaleString("ru-RU")} токенов · ${formatCost(turn.usage.estimatedCostUsd)}`,
      });
      if (turn.systemMessage) {
        const system = this.conversationEl.createDiv({ cls: "callmered-turn callmered-turn-system" });
        system.createDiv({ text: turn.systemMessage });
      }
    }

    const usage = this.plugin.totalUsage();
    this.usageEl.setText(
      `API: ${usage.totalTokens.toLocaleString("ru-RU")} токенов · ${formatCost(usage.estimatedCostUsd)}`,
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
    this.submitButton.setText(busy ? "Подождите…" : "Показать следующий вариант");
    this.inputEl.disabled = busy;
    for (const button of this.toolbarButtons) button.disabled = busy;
  }

  private async applyHack(): Promise<void> {
    if (!this.hackPath || this.busy) return;
    const path = this.hackPath;
    try {
      this.setStatus("Подключаю CSS приёма…", true);
      const changed = await this.plugin.applyCurrentHack(path);
      this.setStatus(changed ? "Hack применён. Изменение можно отменить через Undo." : "Hack уже подключён.");
    } catch (error) {
      this.setStatus(error instanceof Error ? error.message : String(error));
    }
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

  private async submit(): Promise<void> {
    const text = this.inputEl.value.trim();
    if (!text) return;
    this.inputEl.value = "";
    this.appendPendingTurn(text);
    try {
      this.setStatus("Подготавливаю контекст…", true);
      await this.plugin.processFeedback(text, (message) => this.setStatus(message, true));
      this.setStatus("Новый вариант применён.");
      await this.refresh();
    } catch (error) {
      await this.refresh();
      this.inputEl.value = text;
      this.setStatus(error instanceof Error ? error.message : String(error));
      new Notice(this.statusEl.textContent ?? "Итерация не выполнена.");
    }
  }

  private appendPendingTurn(text: string): void {
    const user = this.conversationEl.createDiv({ cls: "callmered-turn callmered-turn-user is-pending" });
    user.createDiv({ cls: "callmered-turn-label", text: "Вы" });
    user.createDiv({ text });
    user.createDiv({ cls: "callmered-turn-usage", text: "Отправлено · жду ответ" });
    this.conversationEl.scrollTop = this.conversationEl.scrollHeight;
  }
}
