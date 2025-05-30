"use client";

import { assistantList, categories } from "@/app/data";
import { Button } from "@/components/global/button";
import Card from "@/components/global/card";
import Header from "@/components/global/header";
import Input from "@/components/global/input";
import clsx from "clsx";
import { Eye, PlusCircleIcon, Search, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainModule() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string>("1");
  const [list, setList] = useState(assistantList);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setList(
      assistantList.filter((model) =>
        model.name.toLowerCase().includes(e.target.value.toLowerCase()) &&
        selectedCategory === "1"
          ? model.category?.id
          : model.category?.id === selectedCategory
      )
    );
  };

  useEffect(() => {
    const category = searchParams.get("category");

    if (category) {
      setSelectedCategory(category);
      setList(
        assistantList.filter(
          (model) => model.category?.id === category || category === "1"
        )
      );
      if (category === "1") {
        router.push("/");
      }
    }
  }, [searchParams.get("category")]);

  return (
    <main className="flex flex-col gap-6 max-w-7xl mx-auto px-4 pb-5">
      {/* <div className="flex justify-end mb-6">
            <ConnectButton />
          </div> */}

      <div className="flex flex-col w-full gap-6">
        <Header />

        <form className="relative w-full max-w-2xl mx-auto">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search Small Language Models"
            className="pl-10 h-12"
            onChange={handleSearch}
          />
        </form>

        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(category.id);
                router.push(`/?category=${category.id}`);
              }}
              className={clsx("flex items-center gap-2")}
            >
              {category.icon}
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      <section className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Featured
          </h2>

          <Button className="flex flex-row gap-2" variant="outline" onClick={()=> {
            const randomId = Math.random().toString(36).substr(2, 9);
            router.push(`/chat/${randomId}`)
          }}>
            <PlusCircleIcon/>
            <span>Add new chat</span>
          </Button>
        </div>

        {list.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {list.map((model) => (
              <Card
                key={model.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => {
                  router.push(`/chat/${model.id}`);
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

                    <div className="flex w-fit items-center gap-2 text-xs text-gray-500 mb-2 bg-gray-50 rounded-md px-2 py-1 border border-gray-200">
                      {model?.category?.icon}
                      <span>{model?.category?.label}</span>
                    </div>

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
        ) : (
          <div className="flex items-center justify-center w-full">
            <p className="text-gray-500">
              No models found. Please try a different search.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
