export default function Playground() {
  return (
    <div className="min-h-screen grid grid-cols-[1fr_300px] gap-4 p-4">
      {/* Canvas Viewer */}
      <div className="border-2 border-white p-4">[ Image / iFrame Area ]</div>

      {/* Sidebar Panel */}
      <aside className="border-2 border-white p-4 bg-neutral-900">
        [ Comments, Threads, Tags ]
      </aside>
    </div>
  );
}
