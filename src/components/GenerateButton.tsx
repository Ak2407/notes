"use client";

import { useEditorContext } from "@/contexts/EditorContext";
import { exportToBlob } from "tldraw";

const GenerateButton = () => {
  const { editor } = useEditorContext();

  const handleClick = async () => {
    if (!editor) {
      alert("Editor not ready");
      return;
    }

    const shapeIds = editor.getCurrentPageShapeIds();
    if (shapeIds.size === 0) {
      alert("No shapes on the canvas");
      return;
    }

    try {
      const blob = await exportToBlob({
        editor,
        ids: [...shapeIds],
        format: "jpeg",
        opts: { background: false },
      });

      // Here you would typically send this blob to your AI service
      // For now, we'll just create a download link as a placeholder
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "canvas-export.jpeg";
      link.click();

      alert("Image exported successfully");
    } catch (error) {
      console.error("Error exporting image:", error);
      alert("Failed to export image");
    }
  };

  return (
    <button
      className="bg-violet-600 text-white p-2 rounded-md hover:opacity-80 transition-all duration-200 ease-in-out"
      onClick={handleClick}
    >
      Generate
    </button>
  );
};

export default GenerateButton;
