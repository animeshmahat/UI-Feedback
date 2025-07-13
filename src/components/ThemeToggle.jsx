import { useEffect, useState } from "react";

// Simple toggle button that saves theme to localStorage and switches mode
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") !== "light"; // Default to dark
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <button
      className={`text-sm px-3 py-2 border-2 ${
        isDark
          ? "border-white bg-black text-white hover:bg-gray-700"
          : "border-black bg-white text-black hover:bg-gray-200"
      } transition-colors mt-4 font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] active:shadow-none active:translate-x-1 active:translate-y-transition-all duration-500 ease-in-out`}
      onClick={() => setIsDark((prev) => !prev)}
    >
      {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}
