import { useEffect, useState } from "react";

export default function IntroLoader({ onDone }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 1000);
    const finish = setTimeout(() => onDone(), 1500);
    return () => {
      clearTimeout(timer);
      clearTimeout(finish);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-black text-white flex items-center justify-center font-mono text-2xl transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-white text-4xl font-bold tracking-widest animate-fadeInOnce">
        UI.FEEDBACK
      </div>
    </div>
  );
}
