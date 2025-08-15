import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";
import { postsApi } from "../api/postsApi";
import type { Post } from "../types/post";
import { formatDate } from "../utils/date";

const CreateEdit: React.FC = () => {
  const [search] = useSearchParams();
  const editId = search.get("edit");
  const navigate = useNavigate();

  const [initial, setInitial] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!editId) return;
    setLoading(true);
    postsApi
      .get(Number(editId))
      .then((data: Post) => setInitial(data))
      .catch((err) => console.error("Failed to load post:", err))
      .finally(() => setLoading(false));
  }, [editId]);

  const submit = async (payload: Post) => {
    setSubmitting(true);
    try {
      if (editId) {
        await postsApi.update(Number(editId), payload);
        navigate(`/posts/${editId}`);
      } else {
        const created: Post = await postsApi.create(payload);
        if (created.id) {
          navigate(`/posts/${created.id}`);
        } else {
          throw new Error("Post creation returned no ID");
        }
      }
    } catch (err) {
      console.error("Failed to submit post:", err);
      alert("Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {editId ? "Edit Post" : "Create Post"}
        </h1>
        {initial?.updatedAt && (
          <div className="text-sm text-gray-500">
            Last edited: {formatDate(initial.updatedAt)}
          </div>
        )}
      </div>

      {loading ? (
        <div className="h-48 bg-white rounded animate-pulse" />
      ) : (
        <PostForm initial={initial} onSubmit={submit} submitting={submitting} />
      )}
    </section>
  );
};

export default CreateEdit;
