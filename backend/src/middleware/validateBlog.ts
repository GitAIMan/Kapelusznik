import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const blogPostSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany"),
  excerpt: z.string().min(1, "Zajawka jest wymagana"),
  content: z.string().min(1, "Treść jest wymagana"),
  date: z.string().min(1, "Data jest wymagana"),
  image: z.string().optional().default(""),
  slug: z.string().min(1, "Slug jest wymagany"),
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
