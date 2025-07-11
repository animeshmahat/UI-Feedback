// Sidebar component receives setUploadedImage function as a prop from parent
// Props are like parameters passed to a function - they let parent components
// communicate with child components
export default function Sidebar({ setUploadedImage }) {
  // Function that handles when user selects a file
  // 'e' is the event object that contains information about the file selection
  function handleImageUpload(e) {
    // Get the first file from the file input (e.target.files is an array)
    const file = e.target.files[0];

    // Check if file exists AND if it's an image file
    // file.type.startsWith("image/") checks if the file type begins with "image/"
    // (like "image/jpeg", "image/png", etc.)
    if (file && file.type.startsWith("image/")) {
      // FileReader is a built-in browser API that can read file contents
      const reader = new FileReader();

      // Set up what happens when the file is successfully read
      // This is called a "callback function" - it runs when reading is complete
      reader.onload = () => {
        // reader.result contains the file data as a base64 string
        // Call the function from parent component to update the uploaded image
        setUploadedImage(reader.result);
      };

      // Start reading the file as a data URL (base64 encoded string)
      // This converts the image file into a format that can be displayed in <img> tags
      reader.readAsDataURL(file);
    }
  }

  // Return the JSX that creates the sidebar interface
  return (
    // Container div with vertical spacing between elements
    <div className="space-y-4">
      {/* Header for the sidebar */}
      <h2 className="text-2xl font-bold border-b border-white pb-2">
        Controls
      </h2>

      {/* File input section wrapped in a label for better accessibility */}
      <label className="block">
        {/* Label text explaining what the input does */}
        <span className="text-sm text-gray-300">Upload Screenshot</span>

        {/* File input element */}
        <input
          type="file" // Makes this an file upload input
          accept="image/*" // Only allow image files to be selected
          className="mt-1 block w-full bg-black border border-white text-white p-2"
          onChange={handleImageUpload} // Call handleImageUpload when file is selected
        />
      </label>

      {/* Information text for users */}
      <p className="text-xs text-gray-400">
        Images are not uploaded to a server. They are previewed locally.
      </p>
    </div>
  );
}
