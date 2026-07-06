import { z } from "zod";

export const Registration = z.object({
  name: z.string().trim().min(1, { message: "Full name is required." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address format." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
  role: z
    .string({ message: "Please select a role." })
    .trim()
    .min(1, { message: "Please select a role." }),
});

export const CategorySchema = z.object({
  name: z.string().trim().min(1, { message: "Category name required" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Provide a category description" })
    .max(1000, { message: "Category description too long" }),
  imageURL: z.url({ message: "Provide a valid image location" }).nullable(),
});

export const ProductSchema = z.object({
  name: z.string().trim().min(1, { message: "Product name required." }),
  price: z.coerce
    .number({ message: "Price must be a number" })
    .positive({ message: "Price must be greater than 0" }),
  description: z
    .string()
    .trim()
    .min(1, { message: "Product description required." })
    .optional()
});

export type RegistrationInput = z.infer<typeof Registration>;
export type CategoryInput = z.infer<typeof CategorySchema>;
