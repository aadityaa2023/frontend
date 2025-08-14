import React, { useEffect, useState } from "react";
import { postsApi } from "../api/postsApi";
import PostCard from "../components/PostCard";
import type  { Post } from "../types/post";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetch = async (p = 0) => {
    setLoading(true);
    try {
      const data = await postsApi.list(p, 10);
      setPosts(data.content);
      setPage(data.number);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetch(0); }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Latest Posts</h1>
      </div>

      {loading ? (
        <div className="grid gap-4">
          {[1,2,3].map(i => <div key={i} className="h-28 bg-white animate-pulse rounded" />)}
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">Page {page + 1} of {totalPages}</div>
        <div className="flex gap-2">
          <button onClick={() => fetch(Math.max(0, page - 1))}
                  disabled={page <= 0}
                  className="px-3 py-1 bg-white border rounded disabled:opacity-60">Previous</button>
          <button onClick={() => fetch(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="px-3 py-1 bg-white border rounded disabled:opacity-60">Next</button>
        </div>
      </div>
    </section>
  );
};

export default Home;
