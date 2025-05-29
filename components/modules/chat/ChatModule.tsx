import { assistantList, modelList, TAssistant } from "@/app/data";
import { Button } from "@/components/global/button";
import chatService, {
  MessagePayload,
  TCompletionResponse,
} from "@/services/chat.service";
import clsx from "clsx";
import {
  ArrowLeftCircle,
  Copy,
  MessageCircleQuestion,
  SendHorizonal,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { HashLoader } from "react-spinners";

export default function ChatModule() {
  const router = useRouter();
  const { slug } = useParams();

  const [assistant, setAssistant] = useState<TAssistant>();
  const endref = useRef<HTMLDivElement | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>(modelList[0].name);

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
        <div className="flex flex-col gap-2 w-fit max-w-8/10">
          <Markdown className="p-6 rounded-tr-md rounded-bl-md rounded-br-md bg-white border border-gray-200 items-center overflow-auto">
            {message}
          </Markdown>
          {!isUser ? (
            <Copy
              className="w-4 h-4 text-black cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(message);
              }}
            />
          ) : null}
        </div>
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
          <div className="w-10 h-10 rounded-full bg-gray-300">
            <Image
              src={
                isUser ? "https://i.pravatar.cc/40" : assistant?.avatar || ""
              }
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          {isUser ? null : chatComp()}
        </div>
      </div>
    );
  };

  const scrollToBottom = () => {
    endref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");

    try {
      const completions = await chatService.completions(
        payload,
        modelList.find((e) => e.name === selectedModel) || modelList[0]
      );

      const response = completions.data as TCompletionResponse;

      if (response && response.choices) {
        const data: MessagePayload = {
          role: response.choices[0].message.role,
          content: response.choices[0].message.content || "",
        };

        setMessages((prev) => [...prev, data]);
        setPayload((prev) => [...prev, data]);
      }
      scrollToBottom();
    } catch (error: any) {
      console.log("error", error);

      const AiErrorResponse = error.response.data.error.message;

      if (AiErrorResponse) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: AiErrorResponse },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    scrollToBottom();
    if (input) {
      payload.push({ role: "user", content: input });
      sendMessage();
    }
  };

  useEffect(() => {
    initPayload();
  }, [slug]);

  const initPayload = () => {
    if (slug) {
      const model = assistantList.find((model) => model.id === slug);
      if (model) {
        setAssistant(model);
        setPayload([{ role: "user", content: model.instruction }]);
      } else {
        const randomAssistant: TAssistant = {
          id: `${slug}`,
          name: `${slug}`,
          author: "",
          description: "",
          instruction: "",
          views: 0,
          greeting: "",
          avatar:
            "https://png.pngtree.com/png-vector/20220707/ourmid/pngtree-chatbot-robot-concept-chat-bot-png-image_5632381.png",
        };
        setAssistant(randomAssistant);
        setPayload([{ role: "user", content: randomAssistant.instruction }]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 relative">
      {/* header */}
      <div className="w-full bg-white shadow-sm sticky top-0 z-10">
        <div className="flex flex-row p-6 items-center gap-10 justify-between max-w-7xl relative mx-auto">
          <ArrowLeftCircle
            className="cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          />

          <div className="flex flex-row gap-2 items-center">
            <div className="w-10 h-10 rounded-full bg-gray-50">
              <Image
                src={assistant?.avatar || ""}
                alt={assistant?.name || ""}
                width={40}
                height={40}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="font-medium">{assistant?.name}</div>
          </div>

          <div className="flex flex-col-reverse md:flex-row gap-2 items-center">
            <Button
              onClick={() => {
                setMessages([]);
                initPayload();
              }}
              variant="outline"
            >
              Clear chat
            </Button>
            <select
              className="focus:outline-none text-gray-500 cursor-pointer w-[150px] h-10 rounded-md border border-gray-200"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {modelList.map((model, index) => (
                <option
                  key={index}
                  value={model.name}
                  disabled={!model.enabled}
                >
                  {model.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* chat */}
      <div className="max-w-7xl mx-auto w-full px-4 mb-28">
        {messages.length > 0 ? (
          <>
            <div className="flex flex-col gap-3 w-full">
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
              <div className="flex justify-center mt-4">
                <HashLoader />
              </div>
            )}

            <div ref={endref} />
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-96 text-gray-500">
            <span>Start a conversation with {assistant?.name}</span>
            <span className="font-bold">{assistant?.greeting}</span>
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
            <textarea
              rows={1}
              placeholder="Type a message"
              className="flex w-full rounded-md border border-input bg-background py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 px-10 resize-none"
              onChange={(e) => {
                e.preventDefault();
                setInput(e.target.value);
              }}
              value={input}
              onKeyDown={(event) => {
                if (event.key === "Enter" && event.shiftKey) {
                  // Shift + Enter: Add a new line
                  setInput((prevMessage) => prevMessage + "\n");
                  event.preventDefault(); // Prevent form submission if applicable
                } else if (event.key === "Enter" && !event.shiftKey) {
                  // Just Enter: Send the message (common for chat apps)
                  event.preventDefault();
                  if (input.trim()) {
                    // Only send if message is not empty
                    console.log("Sending message:", input);
                    setInput(""); // Clear the input after sending
                    handleSubmit()
                  }
                }
              }}
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
