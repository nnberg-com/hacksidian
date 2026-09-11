import { t } from "../i18n";
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
  return body.id ? t("response.response", { p0: body.id }) : "";
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
    const detail = body.error.message || body.error.code || t("response.unknown_error");
    throw new Error(t("response.the_model_api_did_not_finish_generating", { p0: detail, p1: suffix }));
  }

  if (body.status === "incomplete") {
    const reason = body.incomplete_details?.reason;
    if (reason === "max_output_tokens") {
      throw new Error(t("response.the_llm_response_reached_the_output_token", { p0: suffix }));
    }
    throw new Error(t("response.the_llm_response_is_incomplete", { p0: reason ? `: ${reason}` : "", p1: suffix }));
  }

  if (body.status && body.status !== "completed") {
    throw new Error(t("response.the_model_api_returned_an_incomplete_status", { p0: body.status, p1: suffix }));
  }

  const content = body.output?.flatMap((item) => item.content ?? []) ?? [];
  const refusal = content.find((item) => item.type === "refusal" && item.refusal)?.refusal;
  if (refusal) throw new Error(t("response.the_llm_refused_to_respond", { p0: refusal, p1: suffix }));

  const outputText = content
    .filter((item) => item.type === "output_text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("");
  if (!outputText) throw new Error(t("response.the_model_api_returned_no_structured_text", { p0: suffix }));

  let parsed: unknown;
  try {
    parsed = JSON.parse(outputText);
  } catch {
    throw new Error(
      t("response.the_model_api_marked_the_response_as", { p0: outputText.length, p1: suffix }),
    );
  }

  if (!isModelDecision(parsed)) {
    throw new Error(t("response.the_structured_api_response_does_not_match", { p0: suffix }));
  }
  return parsed;
}
