export default function CanvasViewer({ image }) {
  // Check if no image has been uploaded yet
  // In JavaScript, null, undefined, empty string, etc. are "falsy" values
  if (!image) {
    // Return a placeholder message when no image is present
    return (
      // Container with styling for the empty state
      // - w-full h-96: full width, fixed height
      // - flex items-center justify-center: center content both horizontally and vertically
      // - border-dashed: dashed border style to indicate it's a drop zone
      <div className="w-full h-96 flex items-center justify-center text-center border border-dashed border-white">
        <p className="text-white">
          Upload a UI screenshot to begin commenting.
        </p>
      </div>
    );
  }

  // If an image exists, display it
  return (
    // Container div for the image
    // - relative: allows absolute positioning of child elements
    // - overflow-auto: adds scrollbars if content is too large
    // - max-h-[80vh]: maximum height of 80% of viewport height
    <div className="relative overflow-auto max-h-[80vh] border border-white">
      {/* Display the uploaded image */}
      <img
        src={image} // The image data (base64 string from FileReader)
        alt="Uploaded UI" // Alternative text for accessibility
        className="w-full object-contain" // Full width, maintain aspect ratio
      />

      {/* Comment indicates future functionality will be added here */}
      {/* Pins will be added here absolutely later */}
    </div>
  );
}
