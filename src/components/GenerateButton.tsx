"use client";

import { useEditorContext } from "@/contexts/EditorContext";
import { exportToBlob } from "tldraw";
import axios from "axios";

import SolutionDialog from "./dialogs/SolutionDialog";
import { useSolutionDialogStore } from "@/hooks/use-sol";
import { useState } from "react";
import { Button } from "./ui/button";

const GenerateButton = () => {
  const onOpen = useSolutionDialogStore((state) => state.onOpen);
  const onClose = useSolutionDialogStore((state) => state.onClose);
  const isOpen = useSolutionDialogStore((state) => state.isOpen);

  const [solution, setSolution] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { editor } = useEditorContext();

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob); // Convert to Base64
    });
  };

  const handleClick = async () => {
    setLoading(true);
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

      const img = await blobToBase64(blob);

      if (img) {
        const response = await axios.post("/api/solve", {
          image: img,
        });

        if (response) {
          setSolution(response.data);
          onOpen();
          setLoading(false);
        } else {
          alert("Failed to send image.");

          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate image at the moment. Try again");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <SolutionDialog open={isOpen} onClose={onClose} text={solution} />
      <Button
        disabled={loading}
        onClick={handleClick}
        variant="outline"
        className="bg-green-500 hover:bg-green-600 w-full "
      >
        {loading ? "Generating..." : "Generate"}
      </Button>
    </div>
  );
};

export default GenerateButton;
