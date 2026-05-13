import { HashRouter, Routes, Route } from "react-router-dom";
import { TablesList } from "./pages/TablesList";
import { TableDetail } from "./pages/TableDetail";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<TablesList />} />
        <Route path="/mesa/:id" element={<TableDetail />} />
      </Routes>
    </HashRouter>
  );
}
