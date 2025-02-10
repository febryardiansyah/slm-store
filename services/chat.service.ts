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

const chatService = {
  completions: (messages: MessagePayload[]) => {
    return http.post("https://api.fireworks.ai/inference/v1/chat/completions", {
      model:
        "accounts/sentientfoundation/models/dobby-mini-leashed-llama-3-1-8b",
      max_tokens: 16384,
      top_p: 1,
      top_k: 40,
      presence_penalty: 0,
      frequency_penalty: 0,
      temperature: 0.6,
      messages: messages,
    });
  },
};

export default chatService;
