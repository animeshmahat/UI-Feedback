import { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function CanvasViewer({ image }) {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [addingPin, setAddingPin] = useState(null);
  const [editingPin, setEditingPin] = useState(null);
  const [editComment, setEditComment] = useState("");

  const imgRef = useRef();
  const containerRef = useRef();

  /**
   * On mount or when image changes:
   * 1. Try to load saved pins from localStorage (if image matches)
   * 2. Else, clear previous pins
   * 3. Also start loading spinner for image
   */
  useEffect(() => {
    if (!image) return;

    const pinKey = `canvas-pins-${image}`;
    const savedPins = localStorage.getItem(pinKey);

    if (savedPins) {
      try {
        setPins(JSON.parse(savedPins));
      } catch (err) {
        console.error("Failed to parse saved pins:", err);
        setPins([]);
      }
    } else {
      setPins([]);
    }

    const img = new Image();
    img.src = image;
    img.onload = () => setLoading(false);
  }, [image]);

  /**
   * Whenever pins change, persist them to localStorage
   */
  useEffect(() => {
    if (image) {
      const pinKey = `canvas-pins-${image}`;
      localStorage.setItem(pinKey, JSON.stringify(pins));
      localStorage.setItem("canvas-image", image);
    }
  }, [pins, image]);

  /**
   * When image is clicked, calculate % position of click relative to the image
   * and show comment input modal
   */
  function handleImageClick(e) {
    if (!imgRef.current || addingPin || editingPin) return;

    const imgRect = imgRef.current.getBoundingClientRect();

    const clickX = e.clientX - imgRect.left;
    const clickY = e.clientY - imgRect.top;

    const percentX = (clickX / imgRect.width) * 100;
    const percentY = (clickY / imgRect.height) * 100;

    setAddingPin({ x: percentX, y: percentY });
  }

  function handleSubmitComment() {
    if (!newComment.trim()) return;

    setPins((prev) => [
      ...prev,
      { ...addingPin, text: newComment.trim(), id: Date.now() },
    ]);

    setNewComment("");
    setAddingPin(null);
  }

  function handleCancel() {
    setNewComment("");
    setAddingPin(null);
  }

  function handleEditPin(pin) {
    setEditingPin(pin.id);
    setEditComment(pin.text);
  }

  function handleUpdateComment(pinId) {
    if (!editComment.trim()) return;

    setPins((prev) =>
      prev.map((pin) =>
        pin.id === pinId ? { ...pin, text: editComment.trim() } : pin
      )
    );

    setEditComment("");
    setEditingPin(null);
  }

  function handleDeletePin(pinId) {
    setPins((prev) => prev.filter((pin) => pin.id !== pinId));
  }

  function handleCancelEdit() {
    setEditComment("");
    setEditingPin(null);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && e.ctrlKey) handleSubmitComment();
    if (e.key === "Escape") handleCancel();
  }

  function handleEditKeyDown(e, pinId) {
    if (e.key === "Enter" && e.ctrlKey) handleUpdateComment(pinId);
    if (e.key === "Escape") handleCancelEdit();
  }

  if (!image) {
    return (
      <div className="w-full h-96 flex items-center justify-center border-4 border-dashed border-black dark:border-white bg-white dark:bg-black">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">📸</div>
          <p className="text-black dark:text-white text-lg font-bold">
            UPLOAD A UI SCREENSHOT
          </p>
          <p className="text-black dark:text-white text-sm mt-2">
            TO BEGIN COMMENTING
          </p>
        </div>
      </div>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div
      ref={containerRef}
      className="relative w-full border-4 border-black dark:border-white bg-white dark:bg-black overflow-hidden"
      style={{ maxHeight: "80vh", minHeight: "400px" }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          ref={imgRef}
          src={image}
          alt="Uploaded UI"
          className="max-w-full max-h-full object-contain cursor-crosshair block"
          onClick={handleImageClick}
        />

        {/* Render saved pins */}
        {pins.map((pin, index) => (
          <div
            key={pin.id}
            className="absolute group z-10"
            style={{
              left: `${pin.x}%`,
              top: `${pin.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-4 h-4 bg-red-600 border-2 border-black dark:border-white rounded-full shadow-lg" />

            {/* Tooltip */}
            {editingPin !== pin.id && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                <div className="bg-white dark:bg-black text-black dark:text-white text-sm p-3 border-2 border-black dark:border-white shadow-lg max-w-xs">
                  <div className="font-bold text-xs uppercase tracking-wide mb-1">
                    COMMENT #{index + 1}
                  </div>
                  <div className="whitespace-pre-wrap mb-2">{pin.text}</div>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditPin(pin);
                      }}
                      className="text-xs px-2 py-1 bg-blue-600 text-white border border-black dark:border-white hover:bg-blue-700"
                    >
                      EDIT
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePin(pin.id);
                      }}
                      className="text-xs px-2 py-1 bg-red-600 text-white border border-black dark:border-white hover:bg-red-700"
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Mode */}
            {editingPin === pin.id && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
                <div className="bg-white dark:bg-black border-4 border-black dark:border-white shadow-xl min-w-64">
                  <div className="bg-black dark:bg-white text-white dark:text-black p-2 border-b-2 border-black dark:border-white">
                    <div className="font-bold text-xs uppercase tracking-wide">
                      EDIT COMMENT #{index + 1}
                    </div>
                  </div>
                  <div className="p-3">
                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      onKeyDown={(e) => handleEditKeyDown(e, pin.id)}
                      className="w-full text-sm text-black dark:text-white bg-transparent outline-none resize-none border-2 border-black dark:border-white p-2"
                      rows={3}
                      autoFocus
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3">
                      Press Ctrl+Enter to save, Escape to cancel
                    </div>
                    <div className="flex justify-end gap-2">
                      <button onClick={handleCancelEdit}>CANCEL</button>
                      <button
                        onClick={() => handleUpdateComment(pin.id)}
                        disabled={!editComment.trim()}
                      >
                        UPDATE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* New pin modal */}
        {addingPin && (
          <div
            className="absolute z-30"
            style={{
              left: `${addingPin.x}%`,
              top: `${addingPin.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="w-4 h-4 bg-blue-600 border-2 border-black dark:border-white rounded-full mb-2 animate-pulse" />
            <div className="bg-white dark:bg-black border-4 border-black dark:border-white shadow-xl min-w-64 p-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your comment..."
                className="w-full text-sm bg-transparent text-black dark:text-white border-2 border-black dark:border-white p-2"
                rows={3}
                autoFocus
              />
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3">
                Press Ctrl+Enter to save, Escape to cancel
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={handleCancel}>CANCEL</button>
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pin Counter */}
      {pins.length > 0 && (
        <div className="absolute top-2 right-2 bg-black dark:bg-white text-white dark:text-black px-2 py-1 text-xs font-bold border-2 border-black dark:border-white">
          {pins.length} COMMENT{pins.length !== 1 ? "S" : ""}
        </div>
      )}
    </div>
  );
}
