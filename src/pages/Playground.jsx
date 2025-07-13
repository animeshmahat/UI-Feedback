import CanvasViewer from "../components/CanvasViewer";
import Sidebar from "../components/Sidebar";
import IntroLoader from "../components/IntroLoader";
import { useState, useEffect } from "react";

export default function Playground() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  // ✅ Load saved image on mount
  useEffect(() => {
    const saved = localStorage.getItem("canvas-image");
    if (saved) setUploadedImage(saved);
  }, []);

  // ✅ Save image whenever it changes
  useEffect(() => {
    if (uploadedImage) {
      localStorage.setItem("canvas-image", uploadedImage);
    }
  }, [uploadedImage]);

  return (
    <>
      {showIntro && <IntroLoader onDone={() => setShowIntro(false)} />}

      {!showIntro && (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4 p-4 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 ease-in-out">
          <div className="w-full border-2 border-black dark:border-white p-4">
            <CanvasViewer image={uploadedImage} />
          </div>
          <aside className="w-full border-2 border-black dark:border-white p-4 bg-white dark:bg-black">
            <Sidebar setUploadedImage={setUploadedImage} />
          </aside>
        </div>
      )}
    </>
  );
}
