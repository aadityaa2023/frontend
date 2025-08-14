import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostView from "./pages/PostView";
import CreateEdit from "./pages/CreateEdit";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostView />} />
          <Route path="/create" element={<CreateEdit />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
