// src/types/post.ts
export interface Post {
  id?: number;         // optional so new posts don't require it
  title: string;
  author: string;
  content: string;
  createdAt?: string;  // optional because new posts may not have it yet
  updatedAt?: string;  // optional because not all posts are edited
}
