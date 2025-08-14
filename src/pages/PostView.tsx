import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { postsApi } from "../api/postsApi";
import type  { Post } from "../types/post";
import { formatDate } from "../utils/date";
import { Link } from "react-router-dom";

const PostView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    postsApi.get(Number(id))
      .then((data) => setPost(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!post?.id) return;
    if (!confirm("Are you sure you want to delete this post?")) return;
    setDeleting(true);
    try {
      await postsApi.remove(post.id);
      navigate("/");
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  };

  if (loading) {
    return <div className="animate-pulse h-40 bg-white rounded" />;
  }

  if (!post) return <div>Post not found</div>;

  return (
    <article className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500 mt-1">By {post.author} • {formatDate(post.createdAt)}</p>
      <div className="prose mt-6">
        <p>{post.content}</p>
      </div>

      <div className="mt-6 flex gap-3">
        <Link to={`/create?edit=${post.id}`} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</Link>
        <button onClick={handleDelete} disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-60">
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
};

export default PostView;
