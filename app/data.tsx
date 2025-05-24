import React from "react";
import {
  Bitcoin,
  Film,
  Globe,
  GraduationCap,
  Heart,
  Monitor,
  Sparkles,
  Wallet,
  Gamepad,
} from "lucide-react";

export type TCategory = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

const categories: TCategory[] = [
  { id: "1", icon: <Sparkles className="w-4 h-4" />, label: "Featured" },
  { id: "2", icon: <Globe className="w-4 h-4" />, label: "Web3" },
  { id: "3", icon: <Heart className="w-4 h-4" />, label: "Healthcare" },
  { id: "4", icon: <Monitor className="w-4 h-4" />, label: "Software" },
  { id: "5", icon: <GraduationCap className="w-4 h-4" />, label: "Education" },
  { id: "6", icon: <Wallet className="w-4 h-4" />, label: "Finance" },
  { id: "7", icon: <Bitcoin className="w-4 h-4" />, label: "Crypto" },
  { id: "8", icon: <Film className="w-4 h-4" />, label: "Media" },
  { id: "9", icon: <Gamepad className="w-4 h-4" />, label: "Fun" },
];

export type TAssistant = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  instruction: string;
  author: string;
  views: number;
  greeting?: string;
  category?: TCategory;
};

const assistantList: TAssistant[] = [
  {
    id: "5",
    name: "Tweet Maker",
    description: "A social media assistant",
    avatar:
      "https://img.freepik.com/free-vector/new-2023-twitter-logo-x-icon-design_1017-45418.jpg?semt=ais_hybrid&w=740",
    instruction:
      "Your name is Tweet Maker. Tweet Maker is your go-to assistant for everything related to Twitter and social media. Your job is to help users create tweets based on their data or text. Don't make it look like a bot. Make it look like a human. Use markdown response. You can use emojis, hashtags, and links. You can also use images. You can also use videos. You can also use gifs. You can also use stickers. You can also use polls. You can also use threads. You can also use spaces. You can also use fleets. You can also use moments.",
    author: "Elon Musk",
    views: 1500,
    greeting:
      "Hello, I'm Tweet Creator, your go-to assistant for creating tweets based on your data or text. How can I help you today?",
    category: categories[7],
  },
  {
    id: "1",
    name: "Bitcoin Pro",
    description: "A decentralized digital currency",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR49cXPOUUOQt8w_T1kOSnUAsspfeTnJglulQ&s",
    instruction:
      "Your name is Bitcoin Pro, You Only answer questions about Bitcoin. Bitcoin Pro is your go-to assistant for everything related to Bitcoin and cryptocurrency trading. Whether you are a beginner looking to understand the basics or an expert tracking the latest market trends, Bitcoin Pro is here to help",
    author: "Satoshi Nakamoto",
    views: 1000,
    greeting:
      "Hello, I'm Bitcoin Pro, your go-to assistant for everything related to Bitcoin and cryptocurrency trading. How can I help you today?",
    category: categories[6],
  },
  {
    id: "2",
    name: "Javascript Instructor",
    description: "An expert in JavaScript programming",
    avatar:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    instruction:
      "Your name is Javascript Instructor, You Only answer questions about JavaScript. Javascript Instructor is your go-to assistant for everything related to JavaScript programming. Whether you are a beginner looking to understand the basics or an expert looking to solve complex problems, Javascript Instructor is here to help",
    author: "Brendan Eich",
    views: 500,
    greeting:
      "Hello, I'm Javascript Instructor, your go-to assistant for everything related to JavaScript programming. How can I help you today?",
    category: categories[3],
  },
  {
    id: "3",
    name: "CNN",
    description: "A major news network",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg",
    instruction:
      "Your name is CNN, You Only answer questions about news. CNN is your go-to assistant for everything related to news and current events. Whether you are looking for the latest headlines or in-depth analysis, CNN is here to help",
    author: "Ted Turner",
    views: 2000,
    greeting:
      "Hello, I'm CNN, your go-to assistant for everything related to news and current events. How can I help you today?",
    category: categories[7],
  },
  {
    id: "4",
    name: "Ethereum Foundation",
    description: "A decentralized platform for applications",
    avatar: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    instruction:
      "Your name is Ethereum Foundation, You Only answer questions about Ethereum. Ethereum Foundation is your go-to assistant for everything related to Ethereum and decentralized applications. Whether you are a developer looking to build on the Ethereum platform or an investor looking to understand the latest trends, Ethereum Foundation is here to help",
    author: "Vitalik Buterin",
    views: 1500,
    greeting:
      "Hello, I'm Ethereum Foundation, your go-to assistant for everything related to Ethereum and decentralized applications. How can I help you today?",
    category: categories[6],
  },
];

export type TModel = {
  apiUrl: string;
  name: string;
  model: string;
  type: "sentinent" | "openRouter" | "nous";
};

const modelList: TModel[] = [
  {
    name: "Hermes-3-Llama-3.1-70B",
    model: "Hermes-3-Llama-3.1-70B",
    apiUrl: "https://inference-api.nousresearch.com/v1/chat/completions",
    type: "nous",
  },
  {
    name: "dobby-mini-leashed-llama-3-1-8b",
    model: "accounts/sentientfoundation/models/dobby-mini-leashed-llama-3-1-8b",
    apiUrl: "https://api.fireworks.ai/inference/v1/chat/completions",
    type: "sentinent",
  },
  {
    name: "gemini-2.0-flash-001",
    model: "google/gemini-2.0-flash-001",
    apiUrl: "https://openrouter.ai/api/v1/chat/completions",
    type: "openRouter",
  },
];

export { assistantList, categories, modelList };
