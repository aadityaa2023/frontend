import axios from "axios";

import type { Post } from '../types/post';

const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

const client = axios.create({
  baseURL: `${base}/posts`, // no replace() — keep the protocol slashes
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postsApi = {
  list: (page = 0, size = 10) =>
    client.get("", { params: { page, size } }).then((res) => res.data),
  get: (id: number) => client.get(`/${id}`).then((res) => res.data),
  create: (payload: Post) => client.post("", payload).then((res) => res.data),
  update: (id: number, payload: Post) =>
    client.put(`/${id}`, payload).then((res) => res.data),
  remove: (id: number) => client.delete(`/${id}`).then((res) => res.data),
};
