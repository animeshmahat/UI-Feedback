import ThemeToggle from "./ThemeToggle";

// This sidebar lets users upload an image and switch between themes
export default function Sidebar({ setUploadedImage }) {
  // Handles image file selection
  function handleImageUpload(e) {
    try {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result); // Pass image to parent
        };
        reader.readAsDataURL(file); // Convert to base64
      }
    } catch (err) {
      alert(err.message || "Something went wrong with the image upload.");
    }
  }

  return (
    // Sidebar container with theme-aware text
    <div className="space-y-4 text-black dark:text-white">
      {/* Toggle between dark and light mode */}
      <ThemeToggle />

      {/* Sidebar heading */}
      <h2 className="text-2xl font-bold border-b border-black dark:border-white pb-2">
        Controls
      </h2>

      {/* File upload input */}
      <label className="block">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Upload Screenshot
        </span>
        <input
          type="file"
          accept="image/*"
          className="mt-1 block w-full border border-black dark:border-white p-2 bg-white text-black dark:bg-black dark:text-white"
          onChange={handleImageUpload}
        />
      </label>

      {/* Help text */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Images are previewed locally and never uploaded to a server.
      </p>

      <button
        onClick={() => {
          localStorage.removeItem("canvas-image");
          localStorage.removeItem("canvas-pins");
          setUploadedImage(null);
        }}
        className="text-sm px-3 py-2 border-2 border-black dark:border-white bg-red-600 text-white hover:bg-red-700 transition-colors mt-4 font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
      >
        CLEAR IMAGE & COMMENTS
      </button>
    </div>
  );
}
