import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

// This component displays the uploaded image or a message/loading spinner.
// It’s the main canvas area where pins will be placed later.
export default function CanvasViewer({ image }) {
  const [loading, setLoading] = useState(true); // Controls loading animation

  useEffect(() => {
    if (!image) return;
    setLoading(true);
    const img = new Image();
    img.src = image;
    img.onload = () => setLoading(false); // Image is loaded
  }, [image]);

  // If no image uploaded yet, show empty state
  if (!image) {
    return (
      <div className="w-full h-96 flex items-center justify-center border border-dashed border-black dark:border-white">
        <p className="text-black dark:text-white text-center">
          Upload a UI screenshot to begin commenting.
        </p>
      </div>
    );
  }

  // Show spinner until image finishes loading
  if (loading) {
    return <LoadingSpinner />;
  }

  // Show the uploaded image in a scrollable, styled container
  return (
    <div className="relative overflow-auto max-h-[80vh] border border-black dark:border-white bg-white dark:bg-black">
      <img src={image} alt="Uploaded UI" className="w-full object-contain" />
    </div>
  );
}
