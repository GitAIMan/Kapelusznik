import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const blogPostSchema = z.object({
  title: z.string().min(3, "Tytuł musi mieć co najmniej 3 znaki"),
  excerpt: z.string().min(10, "Zajawka musi mieć co najmniej 10 znaków"),
  content: z.string().min(10, "Treść musi mieć co najmniej 10 znaków"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data w formacie YYYY-MM-DD"),
  image: z.string().optional().default(""),
  slug: z.string().min(3, "Slug musi mieć co najmniej 3 znaki").regex(/^[a-z0-9-]+$/, "Slug może zawierać tylko małe litery, cyfry i myślniki"),
});

export function validateBlogPost(req: Request, res: Response, next: NextFunction) {
  const result = blogPostSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  next();
}
