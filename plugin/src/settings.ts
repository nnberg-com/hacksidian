import { App, Notice, PluginSettingTab, Setting, type TextComponent } from "obsidian";
import { PROVIDERS, switchProvider } from "./llm-catalog";
import { pricingKey } from "./pricing";
import type { ProviderId } from "./types";
import { LOCALE_OPTIONS } from "./fonts";
import type CallMeRedPlugin from "./main";

export class CallMeRedSettingTab extends PluginSettingTab {
  private renderId = 0;
  private priceTimer: ReturnType<typeof setTimeout> | undefined;
  constructor(app: App, private readonly plugin: CallMeRedPlugin) {
    super(app, plugin);
  }

  display(): void {
    const renderId = ++this.renderId;
    if (this.priceTimer) clearTimeout(this.priceTimer);
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Hacksidian" });

    new Setting(containerEl)
      .setName("Отправлять в LLM скриншот страницы")
      .setDesc("Выключите для экономии токенов. Модель продолжит получать текст страницы, CSS и вашу реакцию.")
      .addToggle((toggle) => toggle.setValue(this.plugin.settings.sendScreenshot).onChange(async (enabled) => {
        this.plugin.settings.sendScreenshot = enabled;
        await this.plugin.savePluginData();
      }));

    containerEl.createEl("h3", { text: "LLM" });
    new Setting(containerEl).setName("Провайдер")
      .addDropdown(dropdown => dropdown.addOptions(Object.fromEntries(Object.entries(PROVIDERS).map(([id, p]) => [id, p.name])))
        .setValue(this.plugin.settings.provider).onChange(async value => {
          switchProvider(this.plugin.settings, value as ProviderId);
          await this.plugin.savePluginData();
          this.display();
        }));
    new Setting(containerEl)
      .setName("API-ключ")
      .setDesc(`Ключ для ${PROVIDERS[this.plugin.settings.provider].name}. Ключи провайдеров хранятся отдельно в данных плагина.`)
      .addText((text) => {
        text.inputEl.type = "password";
        text.inputEl.autocomplete = "off";
        text.inputEl.spellcheck = false;
        text.setValue(this.plugin.settings.apiKey).onChange(async (value) => {
          this.plugin.settings.apiKey = value.trim();
          await this.plugin.savePluginData();
        });
      });

    const models = PROVIDERS[this.plugin.settings.provider].models;
    const custom = "__custom__";
    const modelSetting = new Setting(containerEl).setName("Модель")
      .setDesc("Доступность модели зависит от вашего аккаунта у выбранного провайдера.");
    const customSetting = new Setting(containerEl).setName("ID другой модели")
      .setDesc("Доступен только при выборе «Другая модель». Нужны структурированные ответы и, для скриншотов, изображения.");
    customSetting.settingEl.style.display = this.plugin.settings.customModel ? "" : "none";
    let customInput: TextComponent;
    customSetting.addText(text => {
      customInput = text;
      text.setPlaceholder("ID модели").setValue(this.plugin.settings.model)
        .setDisabled(!this.plugin.settings.customModel).onChange(async value => {
          if (!this.plugin.settings.customModel) return;
          this.plugin.settings.model = value.trim();
          this.plugin.settings.pricing = undefined;
          await this.plugin.savePluginData();
          if (this.priceTimer) clearTimeout(this.priceTimer);
          this.priceTimer = setTimeout(() => void updatePrices(), 600);
        });
    });
    modelSetting.addDropdown(dropdown => dropdown.addOptions(models).addOption(custom, "Другая модель")
      .setValue(this.plugin.settings.customModel ? custom : this.plugin.settings.model)
      .onChange(async value => {
        this.plugin.settings.customModel = value === custom;
        customInput.setDisabled(value !== custom);
        customSetting.settingEl.style.display = value === custom ? "" : "none";
        if (value !== custom) { this.plugin.settings.model = value; customInput.setValue(value); }
        this.plugin.settings.pricing = undefined;
        await this.plugin.savePluginData();
        void updatePrices();
      }));

    containerEl.createEl("h3", { text: "Оценка стоимости" });
    new Setting(containerEl).setName("Автоматически рассчитывать стоимость")
      .setDesc("Загружать стандартные платные тарифы с официального сайта. Для ручного ввода выключите эту опцию.")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.autoPricing).onChange(async enabled => {
        this.plugin.settings.autoPricing = enabled;
        await this.plugin.savePluginData();
        void updatePrices();
      }));
    const priceInputs: Array<{ field: "input" | "cached" | "output"; input: TextComponent; key: "inputPricePerMillion" | "cachedInputPricePerMillion" | "outputPricePerMillion" }> = [];
    for (const [name, field, key] of [
      ["Вход, $ за 1 млн токенов", "input", "inputPricePerMillion"],
      ["Кэшированный вход, $ за 1 млн токенов", "cached", "cachedInputPricePerMillion"],
      ["Выход, $ за 1 млн токенов", "output", "outputPricePerMillion"],
    ] as const) {
      new Setting(containerEl).setName(name).addText(input => {
        priceInputs.push({field, input, key});
        input.inputEl.type = "number"; input.inputEl.min = "0"; input.inputEl.step = "any";
        input.onChange(async value => {
          if (this.plugin.settings.autoPricing || !value.trim()) return;
          const price = Number(value);
          if (Number.isFinite(price) && price >= 0) { this.plugin.settings[key] = price; await this.plugin.savePluginData(); }
        });
      });
    }
    const priceStatus = containerEl.createDiv({cls: "setting-item-description"});
    const refreshSetting = new Setting(containerEl).setName("Официальные тарифы")
      .addButton(button => button.setButtonText("Обновить").onClick(() => void updatePrices(true)));
    const updatePrices = async (force = false): Promise<void> => {
      const settings = this.plugin.settings;
      const key = pricingKey(settings.provider, settings.model);
      const automatic = settings.autoPricing;
      refreshSetting.settingEl.style.display = automatic ? "" : "none";
      const showValues = () => {
        for (const entry of priceInputs) {
          entry.input.setDisabled(automatic).setValue(automatic
            ? (settings.pricing?.key === key ? String(settings.pricing[entry.field]) : "")
            : String(settings[entry.key]));
        }
      };
      showValues();
      priceStatus.empty();
      if (!automatic) { priceStatus.setText("Оценка по вашим тарифам. История прошлых расходов не пересчитывается."); return; }
      priceStatus.setText("Загружаю официальный тариф…");
      try {
        await this.plugin.refreshPricing(force);
        if (renderId !== this.renderId || !settings.autoPricing || key !== pricingKey(settings.provider, settings.model)) return;
        showValues();
        priceStatus.empty();
        const quote = settings.pricing;
        if (!quote || quote.key !== key) return;
        priceStatus.createEl("a", {text: "Официальный источник", href: quote.source});
        priceStatus.createSpan({text: ` · Проверено: ${new Date(quote.fetchedAt).toLocaleString("ru-RU")}. Кэш тарифа — 24 часа.`});
        if (quote.highContext) priceStatus.createDiv({text: `Для входа от ${quote.highContext.threshold.toLocaleString("ru-RU")} токенов применяется повышенный тариф.`});
      } catch (error) {
        if (renderId !== this.renderId || !settings.autoPricing || key !== pricingKey(settings.provider, settings.model)) return;
        settings.pricing = undefined;
        showValues();
        priceStatus.setText(`Тариф недоступен: ${error instanceof Error ? error.message : String(error)} Стоимость будет показана как неизвестная. Можно выключить автоматический расчёт и ввести тариф вручную.`);
      }
    };
    void updatePrices();

    new Setting(containerEl)
      .setName("Папка раскрасок")
      .addText((text) =>
        text.setValue(this.plugin.settings.coloringsFolder).onChange(async (value) => {
          this.plugin.settings.coloringsFolder = value.trim() || "! P R O/hacksidian/playground";
          await this.plugin.savePluginData();
        }),
      );

    new Setting(containerEl).setName("Очистить историю")
      .setDesc("Удаляет весь чат и все шаги Undo. Текущий стиль и настройки сохраняются.")
      .addButton(button => button.setButtonText("Очистить историю").setWarning().onClick(async () => {
        button.setDisabled(true);
        try {
          await this.plugin.clearHistory();
          new Notice("История Hacksidian очищена.");
        } catch (error) {
          new Notice(error instanceof Error ? error.message : String(error));
        } finally { button.setDisabled(false); }
      }));

    containerEl.createEl("h3", { text: "Языки текста" });
    containerEl.createEl("p", {
      text: "LLM сможет выбирать только установленные шрифты, в которых есть все знаки выбранных локалей.",
    });
    for (const locale of LOCALE_OPTIONS) {
      new Setting(containerEl).setName(locale.label).addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.supportedLocales.includes(locale.id)).onChange(async (enabled) => {
          const selected = new Set(this.plugin.settings.supportedLocales);
          enabled ? selected.add(locale.id) : selected.delete(locale.id);
          if (selected.size === 0) {
            toggle.setValue(true);
            new Notice("Нужна хотя бы одна локаль.");
            return;
          }
          this.plugin.settings.supportedLocales = [...selected];
          await this.plugin.savePluginData();
          void this.updateFontStatus(fontStatus, true);
        }),
      );
    }

    const fontStatus = containerEl.createDiv({ cls: "setting-item-description" });
    void this.updateFontStatus(fontStatus);
  }

  private async updateFontStatus(element: HTMLElement, force = false): Promise<void> {
    element.setText("Ищу совместимые установленные шрифты…");
    try {
      const result = await this.plugin.getCompatibleFonts(force);
      element.setText(
        `Найдено совместимых семейств: ${result.families.length}. Проверено файлов: ${result.scannedFiles}.`,
      );
    } catch (error) {
      element.setText(error instanceof Error ? error.message : String(error));
    }
  }

}
