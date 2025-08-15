// src/api/postsApi.ts
import axios, { AxiosError, type AxiosInstance } from "axios";
import type { Post } from "../types/post";

/** Generic Spring Page<T> shape */
export interface Page<T> {
  content: T[];
  number: number;
  totalPages: number;
  totalElements: number;
  size: number;
  first: boolean;
  last: boolean;
  // (optional fields Spring may include)
  sort?: unknown;
  pageable?: unknown;
  numberOfElements?: number;
  empty?: boolean;
}

/** Payload types */
export type PostCreate = Omit<Post, "id" | "createdAt" | "updatedAt">;
export type PostUpdate = Partial<PostCreate> & PostCreate; // same fields as create, can be partial if you want

/** Resolve base URL safely without breaking the protocol slashes */
const apiBase =
  (import.meta as any)?.env?.VITE_API_BASE_URL?.toString() ||
  "http://localhost:8080/api";

/** Ensure no trailing slash, then append /posts */
const baseURL = `${apiBase.replace(/\/+$/, "")}/posts`;

const client: AxiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  // Set this to true only if you use cookies/sessions *and* your CORS allows credentials
  withCredentials: false,
});

/** Optional: surface cleaner errors */
client.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    // You can log or transform here
    return Promise.reject(err);
  }
);

export const postsApi = {
  /** GET /api/posts?page=&size= */
  async list(page = 0, size = 10): Promise<Page<Post>> {
    const res = await client.get<Page<Post>>("", { params: { page, size } });
    return res.data;
  },

  /** GET /api/posts/{id} */
  async get(id: number): Promise<Post> {
    const res = await client.get<Post>(`/${id}`);
    return res.data;
  },

  /** POST /api/posts */
  async create(payload: PostCreate): Promise<Post> {
    const res = await client.post<Post>("", payload);
    return res.data;
  },

  /** PUT /api/posts/{id} */
  async update(id: number, payload: PostUpdate): Promise<Post> {
    const res = await client.put<Post>(`/${id}`, payload);
    return res.data;
  },

  /** DELETE /api/posts/{id} */
  async remove(id: number): Promise<void> {
    await client.delete<void>(`/${id}`);
  },
};

export default postsApi;
