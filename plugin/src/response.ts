import { validCommand } from './technique-command';
import { parseParameterDecision } from './parameter-chat';
import { t } from "../i18n";
import type { RawUsage } from "./cost";
import type { ModelDecision } from "./types";

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
    status?: string;
    queries?: string[];
    results?: Array<{ file_id: string; text: string; score?: number }>;
    content?: OpenAIResponseContent[];
  }>;
  usage?: RawUsage;
}

function responseSuffix(body: OpenAIResponse): string {
  return body.id ? t("response.response", { p0: body.id }) : "";
}

function isModelDecision(value: unknown): value is ModelDecision {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<ModelDecision>;
  if (!['recommend', 'ask_question', 'no_match'].includes(candidate.action ?? '') || typeof candidate.message !== 'string' || !Array.isArray(candidate.recommendations)) return false;
  if (Object.keys(candidate).some(key => !['action', 'message', 'recommendations'].includes(key))) return false;
  if (candidate.recommendations.length > 6 || candidate.message.length > 6000) return false;
  if ((candidate.action === 'recommend') !== (candidate.recommendations.length > 0)) return false;
  const ids = new Set<string>();
  return candidate.recommendations.every(item => {
    if (!item || typeof item.id !== 'string' || !/^[a-z0-9_-]+$/.test(item.id) || ids.has(item.id) || typeof item.reason !== 'string' || typeof item.instructions !== 'string' || item.reason.length > 3000 || item.instructions.length > 3000) return false;
    if (!validCommand(item) || Object.keys(item).some(key => !['id', 'reason', 'instructions', 'parameterChanges', 'command', 'commandEvidence'].includes(key))) return false;
    if (item.parameterChanges !== undefined) {
      if (!Array.isArray(item.parameterChanges)) return false;
      try { parseParameterDecision({action: item.parameterChanges.length ? 'update_parameters' : 'no_change', message: '', changes: item.parameterChanges}); } catch { return false; }
    }
    ids.add(item.id); return true;
  });
}

export function parseResponseData(body: OpenAIResponse): unknown {
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

  return parsed;
}

export function parseModelDecision(body: OpenAIResponse): ModelDecision {
  const parsed = parseResponseData(body);
  const suffix = responseSuffix(body);
  if (!isModelDecision(parsed)) {
    throw new Error(t("response.the_structured_api_response_does_not_match", { p0: suffix }));
  }
  return parsed;
}
