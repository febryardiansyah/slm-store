"use client";

import React, { useState } from "react";
import {
  ArrowLeftCircle,
  SendHorizonal,
  MessageCircleQuestion,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import clsx from "clsx";
import openRouterService, {
  MessagePayload,
  TCompletionResponse,
} from "@/services/openRouter.service";
import Markdown from "react-markdown";

export default function ChatPage() {
  const router = useRouter();

  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [payload, setPayload] = useState<MessagePayload[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const ChatCard = ({
    isUser = true,
    message,
  }: {
    isUser?: boolean;
    message: string;
  }) => {
    const chatComp = () => {
      return (
        <Markdown className="w-fit max-w-8/10 p-6 rounded-tr-md rounded-bl-md rounded-br-md bg-white border border-gray-200 items-center overflow-auto">
          {message}
        </Markdown>
      );
    };
    return (
      <div className={clsx("w-full text-left")}>
        <div
          className={clsx(
            "flex flex-row gap-2 items-start",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          {isUser ? chatComp() : null}
          <div className="min-w-10 min-h-10 rounded-full bg-gray-300" />
          {isUser ? null : chatComp()}
        </div>
      </div>
    );
  };

  const sendMessage = async () => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    try {
      const completions = await openRouterService.completions(payload);

      const response = completions.data as TCompletionResponse;

      if (response && response.choices) {
        const data: MessagePayload = {
          role: response.choices[0].message.role,
          content: response.choices[0].message.content || "",
        };

        setMessages((prev) => [...prev, data]);
        setPayload((prev) => [...prev, data]);
      }
    } catch (error: any) {
      console.log("error", error);

      const AiErrorResponse = error.response.data.error.message;

      if (AiErrorResponse) {
        setMessages([
          ...messages,
          { role: "assistant", content: AiErrorResponse },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (input) {
      payload.push({ role: "user", content: input });
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col gap-6 relative">
      {/* header */}
      <div className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="flex flex-row p-6 items-center gap-10 justify-center max-w-7xl relative mx-auto">
          <ArrowLeftCircle
            className="absolute left-4 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          />

          <div className="flex flex-row gap-2 items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div>Jupiter Assistance</div>
          </div>
        </div>
      </div>

      {/* chat */}
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="flex flex-col gap-3 w-full mb-16">
          {messages.map((message, key) => {
            return (
              <ChatCard
                key={key}
                isUser={message.role === "user"}
                message={message.content}
              />
            );
          })}
        </div>
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        )}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="fixed bottom-0 bg-white w-full rounded-md shadow-md"
      >
        <div className="max-w-7xl p-5 mx-auto px-4">
          <div className="relative w-full">
            <MessageCircleQuestion className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Type a message"
              className="h-12 px-10"
              onChange={(e) => {
                e.preventDefault();
                setInput(e.target.value);
              }}
              value={input}
            />
            <SendHorizonal
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
