import type { UUID } from "node:crypto";

export interface Role {
  id?: UUID;
  name: string;
  slug?: string;
  description: string;
}

export interface User {
  id?: UUID;
  name: string;
  email: string;
  password: string;
  role?: UUID;
}

export interface Category {
  id?: UUID;
  name: string;
  slug?: string;
  image?: string;
  description: string;
  created_by: UUID;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Product {
  id?: UUID;
  name: string;
  price: number;
  slug?: string;
  image?: string;
  description?: string;
  category_id: UUID;
  created_by: UUID;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse {
  success: boolean;
  message: string;
}

export interface PayloadResponse {
  success: boolean;
  message: string;
  payload: any;
}

export type Props = {
  params: Promise<{ slug: string }>;
};

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}