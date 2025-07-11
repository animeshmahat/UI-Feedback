import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

// UI canvas where user can drop comment pins on an uploaded image
export default function CanvasViewer({ image }) {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState([]); // list of { x, y, text }
  const [newComment, setNewComment] = useState("");
  const [addingPin, setAddingPin] = useState(null); // { x, y }
  const imgRef = useRef();

  // Wait for image to fully load before rendering
  useEffect(() => {
    if (!image) return;
    setLoading(true);
    const img = new Image();
    img.src = image;
    img.onload = () => setLoading(false);
  }, [image]);

  // Click handler on image to set pin location
  function handleImageClick(e) {
    if (!imgRef.current) return;
    if (addingPin) return;

    const img = imgRef.current;

    // Calculate click position relative to image only (not container)
    const bounds = img.getBoundingClientRect();

    const clickX = e.clientX - bounds.left;
    const clickY = e.clientY - bounds.top;

    const percentX = (clickX / img.width) * 100;
    const percentY = (clickY / img.height) * 100;

    setAddingPin({ x: percentX, y: percentY });
  }

  // Add pin and comment to list
  function handleSubmitComment() {
    if (!newComment.trim()) return;

    setPins((prev) => [...prev, { ...addingPin, text: newComment }]);
    setNewComment("");
    setAddingPin(null);
  }

  // Cancel current pin
  function handleCancel() {
    setNewComment("");
    setAddingPin(null);
  }

  if (!image) {
    return (
      <div className="w-full h-96 flex items-center justify-center border border-dashed border-black dark:border-white">
        <p className="text-black dark:text-white text-center">
          Upload a UI screenshot to begin commenting.
        </p>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div
      className="relative overflow-auto max-h-[80vh] border border-black dark:border-white bg-white dark:bg-black"
      onClick={handleImageClick}
    >
      {/* Image element */}
      <img
        ref={imgRef}
        src={image}
        alt="Uploaded UI"
        className="w-full object-contain"
      />

      {/* Existing Pins */}
      {pins.map((pin, index) => (
        <div
          key={index}
          className="absolute group"
          style={{
            left: `${pin.x}%`,
            top: `${pin.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-3 h-3 bg-red-600 rounded-full" />

          {/* Tooltip-like comment box */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-white dark:bg-black text-black dark:text-white text-xs p-2 border border-black dark:border-white w-48 shadow-lg">
            {pin.text}
          </div>
        </div>
      ))}

      {/* Pin being added */}
      {addingPin && (
        <div
          className="absolute z-20"
          style={{
            left: `${addingPin.x}%`,
            top: `${addingPin.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Blue pin */}
          <div className="w-3 h-3 bg-blue-600 rounded-full mb-1 mx-auto" />

          {/* Comment input box */}
          <div className="flex flex-col gap-1 p-2 bg-white dark:bg-black border border-black dark:border-white shadow-lg">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
              className="text-sm text-black dark:text-white bg-transparent outline-none resize-none"
              rows={2}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCancel}
                className="text-xs px-2 py-1 border border-black dark:border-white text-black dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitComment}
                className="text-xs px-2 py-1 border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
