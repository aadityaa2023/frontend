import React from "react";
import type  { Post } from "../types/post";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/date";

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  const preview = post.content.length > 220 ? post.content.slice(0, 220) + "…" : post.content;
  return (
    <article className="bg-white rounded-lg shadow-sm p-5">
      <Link to={`/posts/${post.id}`}>
        <h3 className="text-lg font-semibold text-slate-800">{post.title}</h3>
      </Link>
      <p className="text-sm text-gray-500 mt-1">By {post.author} • {formatDate(post.createdAt)}</p>
      <p className="mt-3 text-slate-700">{preview}</p>
      <div className="mt-4 flex items-center justify-between">
        <Link to={`/posts/${post.id}`} className="text-indigo-600 hover:underline">Read more</Link>
      </div>
    </article>
  );
};

export default PostCard;
