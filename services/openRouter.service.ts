import http from "./http";

export type MessagePayload = {
  role: string;
  content: string;
};
// type TContent = {
//   type: string;
//   text: string;
// };

export type TCompletionResponse = {
  id: string;
  choices: ChoiceResult[];
  created: number;
  model: string;
  object: "chat.completion" | "chat.completion.chunk";
  system_fingerprint?: string;
};

type ChoiceResult = {
  finish_reason: string | null;
  native_finish_reason: string | null;
  message: {
    content: string | null;
    role: string;
  };
  error?: ErrorResponse;
};

type ErrorResponse = {
  code: number;
  message: string;
  metadata?: Record<string, unknown>;
};

const openRouterService = {
  completions: (messages: MessagePayload[]) => {
    return http.post("https://openrouter.ai/api/v1/chat/completions", {
      model: "google/gemini-2.0-flash-001",
      messages: messages.map((message) => {
        return { role: message.role, content: message.content };
      }),
    });
  },
};

export default openRouterService;
