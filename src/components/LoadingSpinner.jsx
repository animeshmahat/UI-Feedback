// A bold, brutalist-style loading spinner made from ASCII-like boxes
export default function LoadingSpinner() {
  return (
    <div className="w-full h-48 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-1 animate-pulse">
        <div className="w-6 h-6 bg-black dark:bg-white"></div>
        <div className="w-6 h-6 bg-black dark:bg-white"></div>
        <div className="w-6 h-6 bg-black dark:bg-white"></div>
        <div className="w-6 h-6 bg-black dark:bg-white"></div>
        <div className="w-6 h-6 bg-black dark:bg-white"></div>
        <div className="w-6 h-6 bg-black dark:bg-white"></div>
        <div className="w-6 h-6 bg-black dark:bg-white"></div>
        <div className="w-6 h-6 bg-black dark:bg-white"></div>
        <div className="w-6 h-6 bg-black dark:bg-white"></div>
      </div>
    </div>
  );
}
