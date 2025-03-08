import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Download from "./components/Download";
import JsonViewer from "./components/JsonViewer";
import FileUpload from "./components/FileUpload";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FileUpload" element={<FileUpload />} />
        <Route path="/download" element={<Download />} />
        <Route path="/json-viewer" element={<JsonViewer />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;