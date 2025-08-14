import React, { useState } from "react";
import type  { Post } from "../types/post";

interface Props {
  initial?: Post;
  onSubmit: (payload: Post) => Promise<void> | void;
  submitting?: boolean;
}

const PostForm: React.FC<Props> = ({ initial, onSubmit, submitting = false }) => {
  const [title, setTitle] = useState(initial?.title || "");
  const [author, setAuthor] = useState(initial?.author || "");
  const [content, setContent] = useState(initial?.content || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ ...initial, title, author, content });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700">Title</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)}
               className="mt-1 block w-full border rounded p-2" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700">Author</label>
        <input required value={author} onChange={(e) => setAuthor(e.target.value)}
               className="mt-1 block w-full border rounded p-2" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700">Content</label>
        <textarea required value={content} onChange={(e) => setContent(e.target.value)}
                  rows={10} className="mt-1 block w-full border rounded p-2" />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition disabled:opacity-60"
                disabled={submitting}>
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default PostForm;
