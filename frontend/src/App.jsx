import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Consulting from "./pages/Consulting";
import Home from "./pages/Home";
import Personal from "./pages/Personal";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/consulting" element={<Consulting />} />
      </Routes>
    </>
  );
}

