import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold text-slate-800">Fullstack Blog</Link>
        <div className="flex items-center gap-3">
          <Link to="/create" className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Create Post</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
