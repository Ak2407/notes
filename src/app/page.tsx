import Board from "@/components/board";
import Navbar from "@/components/Navbar";
import { EditorProvider } from "@/contexts/EditorContext";

export default function Home() {
  return (
    <EditorProvider>
      <div className="flex flex-col max-h-screen h-screen pb-20 lg:pb-0">
        <Navbar />
        <div className="flex-1">
          <Board />
        </div>
      </div>
    </EditorProvider>
  );
}
