import { t, numberLocale } from "../i18n";
import { App, Notice, PluginSettingTab, Setting, type TextComponent } from "obsidian";
import { PROVIDERS, switchProvider } from "./llm-catalog";
import { formatCost } from "./cost";
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

    new Setting(containerEl).setName(t("settings.interface_language"))
      .setDesc(t("settings.interface_language_description"))
      .addDropdown(dropdown => dropdown.addOptions({ auto: t("settings.language_auto"), ru: "Русский", en: "English" })
        .setValue(this.plugin.settings.interfaceLanguage).onChange(async value => {
          this.plugin.settings.interfaceLanguage = value as "auto" | "ru" | "en";
          await this.plugin.updateLanguage();
          this.display();
        }));
    new Setting(containerEl).setName(t("settings.content_language"))
      .setDesc(t("settings.content_description"))
      .addDropdown(dropdown => dropdown.addOptions({ auto: t("settings.content_auto"), ru: "Русский", en: "English" })
        .setValue(this.plugin.settings.contentLanguage).onChange(async value => {
          this.plugin.settings.contentLanguage = value as "auto" | "ru" | "en";
          await this.plugin.savePluginData();
        }));

    new Setting(containerEl)
      .setName(t("settings.send_a_page_screenshot_to_the_llm"))
      .setDesc(t("settings.turn_off_to_save_tokens_the_model"))
      .addToggle((toggle) => toggle.setValue(this.plugin.settings.sendScreenshot).onChange(async (enabled) => {
        this.plugin.settings.sendScreenshot = enabled;
        await this.plugin.savePluginData();
      }));

    containerEl.createEl("h3", { text: "LLM" });
    new Setting(containerEl).setName(t("settings.provider"))
      .addDropdown(dropdown => dropdown.addOptions(Object.fromEntries(Object.entries(PROVIDERS).map(([id, p]) => [id, p.name])))
        .setValue(this.plugin.settings.provider).onChange(async value => {
          switchProvider(this.plugin.settings, value as ProviderId);
          await this.plugin.savePluginData();
          this.display();
        }));
    new Setting(containerEl)
      .setName(t("settings.api_key"))
      .setDesc(t("settings.key_for_provider_keys_are_stored_separately", { p0: PROVIDERS[this.plugin.settings.provider].name }))
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
    const modelSetting = new Setting(containerEl).setName(t("settings.model"))
      .setDesc(t("settings.model_availability_depends_on_your_account_with"));
    const customSetting = new Setting(containerEl).setName(t("settings.custom_model_id"))
      .setDesc(t("settings.available_only_when_custom_model_is_selected"));
    customSetting.settingEl.style.display = this.plugin.settings.customModel ? "" : "none";
    let customInput: TextComponent;
    customSetting.addText(text => {
      customInput = text;
      text.setPlaceholder(t("settings.model_id")).setValue(this.plugin.settings.model)
        .setDisabled(!this.plugin.settings.customModel).onChange(async value => {
          if (!this.plugin.settings.customModel) return;
          this.plugin.settings.model = value.trim();
          this.plugin.settings.pricing = undefined;
          await this.plugin.savePluginData();
          if (this.priceTimer) clearTimeout(this.priceTimer);
          this.priceTimer = setTimeout(() => void updatePrices(), 600);
        });
    });
    modelSetting.addDropdown(dropdown => dropdown.addOptions(models).addOption(custom, t("settings.custom_model"))
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

    containerEl.createEl("h3", { text: t("settings.cost_estimate") });
    new Setting(containerEl).setName(t("ledger.limit")).setDesc(t("ledger.limit_description"))
      .addText(input => input.setValue(String(this.plugin.settings.spendLimitUsd)).onChange(async value => {
        const amount = Number(value);
        if (value.trim() && Number.isFinite(amount) && amount >= 0) { this.plugin.settings.spendLimitUsd = amount; await this.plugin.savePluginData(); }
      }));
    containerEl.createDiv({ text: t("ledger.history_note"), cls: "setting-item-description" });
    const ledger = containerEl.createEl("details");
    ledger.createEl("summary", { text: t("ledger.recent") });
    for (const attempt of this.plugin.apiAttempts.slice(-30).reverse()) {
      ledger.createDiv({ text: `${new Date(attempt.createdAt).toLocaleString(numberLocale())} · ${attempt.provider}/${attempt.model} · ${t(`ledger.${attempt.status}`)} · ${formatCost(attempt.usage.estimatedCostUsd)}` });
      ledger.createDiv({ cls: "setting-item-description", text: t("ledger.tokens", {
        p0: attempt.usage.inputTokens, p1: attempt.usage.cachedInputTokens, p2: attempt.usage.outputTokens,
      }) });
    }
    new Setting(containerEl).setName(t("settings.calculate_costs_automatically"))
      .setDesc(t("settings.load_standard_paid_pricing_from_the_official"))
      .addToggle(toggle => toggle.setValue(this.plugin.settings.autoPricing).onChange(async enabled => {
        this.plugin.settings.autoPricing = enabled;
        await this.plugin.savePluginData();
        void updatePrices();
      }));
    const priceInputs: Array<{ field: "input" | "cached" | "output"; input: TextComponent; key: "inputPricePerMillion" | "cachedInputPricePerMillion" | "outputPricePerMillion" }> = [];
    for (const [name, field, key] of [
      [t("settings.input_per_1m_tokens"), "input", "inputPricePerMillion"],
      [t("settings.cached_input_per_1m_tokens"), "cached", "cachedInputPricePerMillion"],
      [t("settings.output_per_1m_tokens"), "output", "outputPricePerMillion"],
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
    const refreshSetting = new Setting(containerEl).setName(t("settings.official_pricing"))
      .addButton(button => button.setButtonText(t("settings.refresh")).onClick(() => void updatePrices(true)));
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
      if (!automatic) { priceStatus.setText(t("settings.estimate_based_on_your_prices_past_costs")); return; }
      priceStatus.setText(t("settings.loading_official_pricing"));
      try {
        await this.plugin.refreshPricing(force);
        if (renderId !== this.renderId || !settings.autoPricing || key !== pricingKey(settings.provider, settings.model)) return;
        showValues();
        priceStatus.empty();
        const quote = settings.pricing;
        if (!quote || quote.key !== key) return;
        priceStatus.createEl("a", {text: t("settings.official_source"), href: quote.source});
        priceStatus.createSpan({text: t("settings.checked_prices_are_cached_for_24_hours", { p0: new Date(quote.fetchedAt).toLocaleString(numberLocale()) })});
        if (quote.highContext) priceStatus.createDiv({text: t("settings.a_higher_rate_applies_to_inputs_of", { p0: quote.highContext.threshold.toLocaleString(numberLocale()) })});
      } catch (error) {
        if (renderId !== this.renderId || !settings.autoPricing || key !== pricingKey(settings.provider, settings.model)) return;
        settings.pricing = undefined;
        showValues();
        priceStatus.setText(t("settings.pricing_unavailable_cost_will_be_shown_as", { p0: error instanceof Error ? error.message : String(error) }));
      }
    };
    void updatePrices();

    new Setting(containerEl)
      .setName(t("settings.samples_folder"))
      .setDesc(t("settings.folder_description"))
      .addText((text) =>
        text.setValue(this.plugin.settings.coloringsFolder).onChange(async (value) => {
          this.plugin.settings.coloringsFolder = value.trim() || "! P R O/hacksidian/playground";
          await this.plugin.savePluginData();
        }),
      );

    new Setting(containerEl).setName(t("settings.clear_history"))
      .setDesc(t("settings.deletes_the_entire_chat_and_all_undo"))
      .addButton(button => button.setButtonText(t("settings.clear_history")).setWarning().onClick(async () => {
        button.setDisabled(true);
        try {
          await this.plugin.clearHistory();
          new Notice(t("settings.hacksidian_history_cleared"));
        } catch (error) {
          new Notice(error instanceof Error ? error.message : String(error));
        } finally { button.setDisabled(false); }
      }));

    containerEl.createEl("h3", { text: t("settings.font_coverage_languages") });
    containerEl.createEl("p", {
      text: t("settings.the_llm_can_select_only_installed_fonts"),
    });
    for (const locale of LOCALE_OPTIONS) {
      new Setting(containerEl).setName(locale.label).addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.supportedLocales.includes(locale.id)).onChange(async (enabled) => {
          const selected = new Set(this.plugin.settings.supportedLocales);
          enabled ? selected.add(locale.id) : selected.delete(locale.id);
          if (selected.size === 0) {
            toggle.setValue(true);
            new Notice(t("settings.select_at_least_one_locale"));
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
    element.setText(t("settings.looking_for_compatible_installed_fonts"));
    try {
      const result = await this.plugin.getCompatibleFonts(force);
      element.setText(
        t("settings.compatible_families_found_files_checked", { p0: result.families.length, p1: result.scannedFiles }),
      );
    } catch (error) {
      element.setText(error instanceof Error ? error.message : String(error));
    }
  }

}
