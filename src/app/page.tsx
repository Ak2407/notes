"use client";

import Board from "@/components/board";
import GenerateButton from "@/components/GenerateButton";
import { EditorProvider } from "@/contexts/EditorContext";

export default function Home() {
  return (
    <EditorProvider>
      <div className="flex flex-col h-screen">
        <nav className="bg-gray-800 p-2 flex items-center justify-end w-full">
          <GenerateButton />
        </nav>
        <div className="flex-1">
          <Board />
        </div>
      </div>
    </EditorProvider>
  );
}
