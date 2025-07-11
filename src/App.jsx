import { Routes, Route } from "react-router-dom";
import Playground from "./pages/Playground";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Playground />} />
    </Routes>
  );
}
