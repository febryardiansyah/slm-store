"use client";

import MainModule from "@/components/modules/main/MainModule";
import { Suspense } from "react";

export default function Home() {
  return (
    <Suspense>
      <MainModule />
    </Suspense>
  );
}
