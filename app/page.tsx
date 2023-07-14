"use client";

import ChatBot from "@/components/ChatBot";
import ImagesGrid from "@/components/ImagesGrid";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
      <main className="flex flex-col w-full h-full mobile:flex-row">
        <ChatBot />
        <ImagesGrid />
      </main>
    </RecoilRoot>
  );
}
