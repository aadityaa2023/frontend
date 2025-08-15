import axios, { type AxiosInstance, AxiosError } from "axios";


import type { Post } from "../types/post";

// Base URL (from .env or fallback to localhost)
const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Create Axios instance
const client: AxiosInstance = axios.create({
  baseURL: `${base}/posts`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// API service
export const postsApi = {
  list: async (page = 0, size = 10) => {
    try {
      const res = await client.get("", { params: { page, size } });
      return res.data as {
        content: Post[];
        number: number;
        totalPages: number;
      };
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  get: async (id: number) => {
    try {
      const res = await client.get(`/${id}`);
      return res.data as Post;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  create: async (payload: Post) => {
    try {
      const res = await client.post("", payload);
      return res.data as Post;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  update: async (id: number, payload: Post) => {
    try {
      const res = await client.put(`/${id}`, payload);
      return res.data as Post;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  remove: async (id: number) => {
    try {
      await client.delete(`/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

// Error handler
function handleError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError;
    console.error("Axios error:", err.message, err.response?.data);
  } else {
    console.error("Unexpected error:", error);
  }
}
