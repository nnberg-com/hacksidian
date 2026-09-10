import type { RawUsage } from "./cost";
import type { ModelAction, ModelDecision } from "./types";

interface OpenAIResponseContent {
  type?: string;
  text?: string;
  refusal?: string;
}

export interface OpenAIResponse {
  id?: string;
  status?: "completed" | "failed" | "in_progress" | "cancelled" | "queued" | "incomplete";
  error?: { code?: string; message?: string } | null;
  incomplete_details?: { reason?: string } | null;
  output?: Array<{
    type?: string;
    content?: OpenAIResponseContent[];
  }>;
  usage?: RawUsage;
}

const MODEL_ACTIONS = new Set<ModelAction>(["update_css", "switch_coloring", "ask_question", "no_change"]);

function responseSuffix(body: OpenAIResponse): string {
  return body.id ? ` Ответ: ${body.id}.` : "";
}

function isModelDecision(value: unknown): value is ModelDecision {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ModelDecision>;
  return (
    typeof candidate.action === "string" &&
    MODEL_ACTIONS.has(candidate.action as ModelAction) &&
    typeof candidate.message === "string" &&
    typeof candidate.css === "string" &&
    typeof candidate.moduleId === "string" &&
    typeof candidate.targetColoring === "string"
  );
}

export function parseModelDecision(body: OpenAIResponse): ModelDecision {
  const suffix = responseSuffix(body);

  if (body.error) {
    const detail = body.error.message || body.error.code || "неизвестная ошибка";
    throw new Error(`API модели не завершил генерацию: ${detail}.${suffix}`);
  }

  if (body.status === "incomplete") {
    const reason = body.incomplete_details?.reason;
    if (reason === "max_output_tokens") {
      throw new Error(`Ответ LLM оборвался по лимиту выходных токенов.${suffix}`);
    }
    throw new Error(`Ответ LLM не завершён${reason ? `: ${reason}` : ""}.${suffix}`);
  }

  if (body.status && body.status !== "completed") {
    throw new Error(`API модели вернул незавершённый статус: ${body.status}.${suffix}`);
  }

  const content = body.output?.flatMap((item) => item.content ?? []) ?? [];
  const refusal = content.find((item) => item.type === "refusal" && item.refusal)?.refusal;
  if (refusal) throw new Error(`LLM отказалась формировать ответ: ${refusal}${suffix}`);

  const outputText = content
    .filter((item) => item.type === "output_text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("");
  if (!outputText) throw new Error(`API модели не вернул структурированный текстовый результат.${suffix}`);

  let parsed: unknown;
  try {
    parsed = JSON.parse(outputText);
  } catch {
    throw new Error(
      `API модели пометил ответ как завершённый, но вернул невалидный JSON (${outputText.length} символов).${suffix}`,
    );
  }

  if (!isModelDecision(parsed)) {
    throw new Error(`Структурированный ответ API модели не соответствует схеме Hacksidian.${suffix}`);
  }
  return parsed;
}
