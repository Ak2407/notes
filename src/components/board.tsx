"use client";

import "tldraw/tldraw.css";
import { useEditorContext } from "@/contexts/EditorContext";
import { Tldraw } from "tldraw";

export default function Board() {
  const { setEditor } = useEditorContext();

  return (
    <div className="h-full w-full">
      <Tldraw persistenceKey="tldraw" onMount={(editor) => setEditor(editor)} />
    </div>
  );
}
