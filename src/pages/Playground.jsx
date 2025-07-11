import CanvasViewer from "../components/CanvasViewer"; // Component to display uploaded images
import Sidebar from "../components/Sidebar"; // Component for file upload controls
import { useState } from "react"; // React hook for managing component state

// Main component that creates the overall layout of the application
export default function Playground() {
  // useState hook creates a state variable to store the uploaded image
  // - uploadedImage: current value (starts as null, meaning no image uploaded)
  // - setUploadedImage: function to update the uploadedImage value
  const [uploadedImage, setUploadedImage] = useState(null);

  // Return JSX (JavaScript XML) that defines what gets rendered on screen
  return (
    // Main container div with styling classes
    // - min-h-screen: minimum height of full screen
    // - dark: applies dark theme
    // - grid: uses CSS Grid layout
    // - grid-cols-1 lg:grid-cols-[1fr_350px]: 1 column on small screens, 2 columns on large screens
    // - gap-4: space between grid items
    // - p-4: padding on all sides
    <div className="min-h-screen dark grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-4 p-4">
      {/* Left side: Canvas Viewer Section */}
      {/* This div takes up the main area and displays the uploaded image */}
      <div className="w-full border-2 border-white p-4">
        {/* Pass the uploaded image to CanvasViewer component as a prop */}
        <CanvasViewer image={uploadedImage} />
      </div>

      {/* Right side: Sidebar Panel */}
      {/* This aside element contains the upload controls */}
      <aside className="w-full border-2 border-white p-4 bg-neutral-900">
        {/* Pass the setUploadedImage function to Sidebar so it can update the image */}
        <Sidebar setUploadedImage={setUploadedImage} />
      </aside>
    </div>
  );
}
