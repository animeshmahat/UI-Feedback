import CanvasViewer from "../components/CanvasViewer"; // Display uploaded image
import Sidebar from "../components/Sidebar"; // Upload and toggle theme
import IntroLoader from "../components/IntroLoader";
import { useState } from "react";

// Main layout component for the app
export default function Playground() {
  const [uploadedImage, setUploadedImage] = useState(null); // Image preview state
  const [showIntro, setShowIntro] = useState(true); // show intro loading initially

  return (
    <>
      {showIntro && <IntroLoader onDone={() => setShowIntro(false)} />}

      {!showIntro && (
        // Grid layout: 1 column on mobile, 2 on large screens
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4 p-4 bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 ease-in-out">
          {/* Left canvas area */}
          <div className="w-full border-2 border-black dark:border-white p-4">
            <CanvasViewer image={uploadedImage} />
          </div>

          {/* Sidebar with file input + theme toggle */}
          <aside className="w-full border-2 border-black dark:border-white p-4 bg-white dark:bg-black">
            <Sidebar setUploadedImage={setUploadedImage} />
          </aside>
        </div>
      )}
    </>
  );
}
