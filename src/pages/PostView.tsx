import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { postsApi } from "../api/postsApi";
import type { Post } from "../types/post";
import { formatDate } from "../utils/date";

const PostView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    postsApi
      .get(Number(id))
      .then((data: Post) => setPost(data))
      .catch((err) => console.error("Failed to load post:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await postsApi.remove(Number(id));
      navigate("/");
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  if (loading) {
    return <div className="h-48 bg-white animate-pulse rounded" />;
  }

  if (!post) {
    return <div className="text-gray-600">Post not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-4">
        By {post.author} • {post.updatedAt && formatDate(post.updatedAt)}
      </div>
      <div className="prose max-w-none">{post.content}</div>

      <div className="mt-6 flex gap-2">
        <Link
          to={`/?edit=${post.id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default PostView;
