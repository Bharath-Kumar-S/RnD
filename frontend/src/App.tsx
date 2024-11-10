import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Price } from "@/components/price/Price";
import { History } from "./components/history/History";

function App() {
  return (
    <div className="min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Price />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
