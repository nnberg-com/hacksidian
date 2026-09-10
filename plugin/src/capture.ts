import { toBlob } from "html-to-image";
import type { MarkdownView } from "obsidian";

/** Capture the current view for the model without persisting image history. */
export async function captureReadingView(view: MarkdownView): Promise<string> {
  if (view.getMode() !== "preview") throw new Error("Переключите документ в Reading view перед снимком.");

  const preview = view.containerEl.querySelector<HTMLElement>(".markdown-preview-view");
  if (!preview) throw new Error("Не найдена видимая область Markdown Reading view.");

  const rect = preview.getBoundingClientRect();
  const width = Math.floor(rect.width);
  const height = Math.floor(rect.height);
  if (width < 10 || height < 10) throw new Error("Область Reading view сейчас не видна.");

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
  if (!png) throw new Error("Chromium не смог закодировать снимок Reading view в PNG.");
  const buffer = Buffer.from(await png.arrayBuffer());
  if (buffer.byteLength === 0) throw new Error("Получился пустой PNG-файл.");
  return buffer.toString("base64");
}
