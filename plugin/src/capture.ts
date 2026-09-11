import { t } from "../i18n";
import { toBlob } from "html-to-image";
import type { MarkdownView } from "obsidian";

/** Capture the current view for the model without persisting image history. */
export async function captureReadingView(view: MarkdownView): Promise<string> {
  if (view.getMode() !== "preview") throw new Error(t("capture.switch_the_document_to_reading_view_before"));

  const preview = view.containerEl.querySelector<HTMLElement>(".markdown-preview-view");
  if (!preview) throw new Error(t("capture.the_visible_markdown_reading_view_could_not"));

  const rect = preview.getBoundingClientRect();
  const width = Math.floor(rect.width);
  const height = Math.floor(rect.height);
  if (width < 10 || height < 10) throw new Error(t("capture.reading_view_is_not_currently_visible"));

  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  const png = await toBlob(preview, {
    backgroundColor: getComputedStyle(document.body).backgroundColor || "#ffffff",
    cacheBust: true,
    canvasHeight: Math.round(height * pixelRatio),
    canvasWidth: Math.round(width * pixelRatio),
    height,
    pixelRatio,
    width,
  });
  if (!png) throw new Error(t("capture.chromium_could_not_encode_the_reading_view"));
  const buffer = Buffer.from(await png.arrayBuffer());
  if (buffer.byteLength === 0) throw new Error(t("capture.the_png_file_is_empty"));
  return buffer.toString("base64");
}
