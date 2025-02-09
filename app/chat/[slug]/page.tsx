"use client";

import React from "react";
import { ArrowLeftCircle, SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import Input from "@/components/input";
import clsx from "clsx";

const messages = [
  {
    id: 1,
    text: "Hello! How can I assist you today?",
    sender: "bot",
    avatar: "/path/to/bot-avatar.png",
  },
  {
    id: 2,
    text: "I need help with my order.",
    sender: "user",
    avatar: "/path/to/user-avatar.png",
  },
  {
    id: 3,
    text: "Sure, I can help with that. Can you provide your order number?",
    sender: "bot",
    avatar: "/path/to/bot-avatar.png",
  },
  {
    id: 4,
    text: "Yes, it's 123456.",
    sender: "user",
    avatar: "/path/to/user-avatar.png",
  },
  {
    id: 5,
    text: "Thank you. Let me check the details for you.",
    sender: "bot",
    avatar: "/path/to/bot-avatar.png",
  },
  {
    id: 6,
    text: "I appreciate it.",
    sender: "user",
    avatar: "/path/to/user-avatar.png",
  },
  {
    id: 7,
    text: "Your order is on the way and should arrive by tomorrow.",
    sender: "bot",
    avatar: "/path/to/bot-avatar.png",
  },
  {
    id: 8,
    text: "Great! Thank you for the update.",
    sender: "user",
    avatar: "/path/to/user-avatar.png",
  },
  {
    id: 9,
    text: "You're welcome! Is there anything else I can help with?",
    sender: "bot",
    avatar: "/path/to/bot-avatar.png",
  },
  {
    id: 10,
    text: "No, that's all for now. Thanks!",
    sender: "user",
    avatar: "/path/to/user-avatar.png",
  },
  {
    id: 11,
    text: "Have a great day!",
    sender: "bot",
    avatar: "/path/to/bot-avatar.png",
  },
  {
    id: 12,
    text: "Thank you, you too!",
    sender: "user",
    avatar: "/path/to/user-avatar.png",
  },
  {
    id: 13,
    text: "Is there anything else I can assist you with?",
    sender: "bot",
    avatar: "/path/to/bot-avatar.png",
  },
  {
    id: 14,
    text: "No, that's all for now.",
    sender: "user",
    avatar: "/path/to/user-avatar.png",
  },
  {
    id: 15,
    text: "Okay, have a great day!",
    sender: "bot",
    avatar: "/path/to/bot-avatar.png",
  },
  {
    id: 16,
    text: "Thank you!",
    sender: "user",
    avatar: "/path/to/user-avatar.png",
  },
  {
    id: 17,
    text: "You're welcome!",
    sender: "bot",
    avatar: "/path/to/bot-avatar.png",
  },
  {
    id: 18,
    text: "Goodbye!",
    sender: "user",
    avatar: "/path/to/user-avatar.png",
  },
  {
    id: 19,
    text: "Goodbye!",
    sender: "bot",
    avatar: "/path/to/bot-avatar.png",
  },
  {
    id: 20,
    text: "Have a nice day!",
    sender: "user",
    avatar: "/path/to/user-avatar.png",
  },
];

export default function ChatPage() {
  const router = useRouter();

  const ChatCard = ({
    isUser = true,
    message,
  }: {
    isUser?: boolean;
    message: string;
  }) => {
    const chatComp = () => {
      return (
        <div className="w-fit p-3 rounded-tr-md rounded-bl-md rounded-br-md bg-white border border-gray-200 items-center">
          {message}
        </div>
      );
    };
    return (
      <div className={clsx("w-full", isUser ? "text-right" : "text-left")}>
        <div
          className={clsx(
            "flex flex-row gap-2 items-start",
            isUser ? "justify-end" : "justify-start"
          )}
        >
          {isUser ? chatComp() : null}
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          {isUser ? null : chatComp()}
        </div>
      </div>
    );
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

      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="flex flex-col gap-3 w-full mb-16">
          {messages.map((message) => {
            if (message.sender === "bot") {
              return (
                <ChatCard
                  key={message.id}
                  isUser={false}
                  message={message.text}
                />
              );
            } else {
              return <ChatCard key={message.id} message={message.text} />;
            }
          })}
        </div>

        {/* input */}
        <div className="sticky bottom-4">
          <Input placeholder="Type a message" className="h-12 pr-10" />
          <SendHorizonal className="absolute right-3 top-3 h-5 w-5 text-gray-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
