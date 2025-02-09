"use client";

import {
  Search,
  Sparkles,
  Globe,
  Heart,
  Monitor,
  GraduationCap,
  Wallet,
  Bitcoin,
  Film,
  Gamepad,
  Eye,
} from "lucide-react";
// import ConnectButton from "@/components/connect-button";
import { Button } from "@/components/button";
import Input from "@/components/input";
import Card from "@/components/card";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import Image from "next/image";

const categories = [
  { icon: <Sparkles className="w-4 h-4" />, label: "Featured" },
  { icon: <Globe className="w-4 h-4" />, label: "Web3" },
  { icon: <Heart className="w-4 h-4" />, label: "Healthcare" },
  { icon: <Monitor className="w-4 h-4" />, label: "Software" },
  { icon: <GraduationCap className="w-4 h-4" />, label: "Education" },
  { icon: <Wallet className="w-4 h-4" />, label: "Finance" },
  { icon: <Bitcoin className="w-4 h-4" />, label: "Crypto" },
  { icon: <Film className="w-4 h-4" />, label: "Media" },
  { icon: <Gamepad className="w-4 h-4" />, label: "Fun" },
];

const featuredModels = [
  {
    id: 1,
    name: "Jupiter Assistant",
    description:
      "Jupiter Assistant is a SLM that helps users develop their solutions using Jupiter, one of the largest decentralized trading platform.",
    avatar:
      "https://images.unsplash.com/photo-1628126235206-5260b9ea6441?w=800&auto=format&fit=crop&q=60",
    author: "FearlessHawk29834",
    views: "111.6k",
  },
  {
    id: 2,
    name: "Particle Network Assistant",
    description:
      "Particle Network Assistant is an advanced SLM that offers expert guidance for developing solutions using the Particle Network platform.",
    avatar:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
    author: "FierceBear41225",
    views: "69.8k",
  },
  {
    id: 3,
    name: "GameMaker",
    description: "SLM oriented on code assistance for GameMaker",
    avatar:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=60",
    author: "CrawfishFrigid54919",
    views: "60k",
  },
  {
    id: 4,
    name: "OG Assistant",
    description:
      "OG Assistant is SLM that provides guidance for developing solutions using The First Decentralized AI Operating System.",
    avatar:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60",
    author: "SharkBold64290",
    views: "56.8k",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex flex-col gap-6 max-w-7xl mx-auto px-4 ">
      {/* <div className="flex justify-end mb-6">
          <ConnectButton />
        </div> */}

      <div className="flex flex-col w-full gap-6">
        <Header />

        <div className="relative w-full max-w-2xl mx-auto">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search Small Language Models"
            className="pl-10 h-12"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className="flex items-center gap-2"
            >
              {category.icon}
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Featured
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredModels.map((model) => (
            <Card
              key={model.id}
              className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                router.push("/chat/1");
              }}
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={model.avatar}
                    alt={model.name}
                    className="w-full h-full object-cover"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{model.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {model.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      By {model.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" /> {model.views}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
