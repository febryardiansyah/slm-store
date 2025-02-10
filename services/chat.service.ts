import { TModel } from "@/app/data";
import http, { apiToken } from "./http";

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
  completions: (messages: MessagePayload[], model: TModel) => {
    return http.post(
      model.apiUrl,
      {
        model: model.model,
        messages: messages,
      },
      {
        headers: {
          Authorization: `Bearer ${apiToken(model.type)}`,
        },
      }
    );
  },
};

export default chatService;
