import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

const blockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("heading"), text: z.string().max(300) }),
  z.object({ type: z.literal("paragraph"), text: z.string().max(10000) }),
  z.object({
    type: z.literal("image"),
    url: z.string().max(500),
    caption: z.string().max(500).optional().default(""),
  }),
  z.object({
    type: z.literal("quote"),
    text: z.string().max(2000),
    author: z.string().max(200).optional().default(""),
  }),
]);

export const blogPostSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany").max(200),
  subtitle: z.string().max(500).optional().default(""),
  excerpt: z.string().min(1, "Zajawka jest wymagana").max(500),
  content: z.string().min(1, "Treść jest wymagana").max(50000),
  date: z.string().min(1, "Data jest wymagana"),
  image: z.string().max(500).optional().default(""),
  slug: z.string().min(1, "Slug jest wymagany").max(200),
  blocks: z.array(blockSchema).max(100).optional().default([]),
  gallery: z.array(z.string().max(500)).max(20).optional().default([]),
}).strict();

export type BlogBlock = z.infer<typeof blockSchema>;

export function validateBlogPost(req: Request, res: Response, next: NextFunction) {
  const result = blogPostSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  req.body = result.data;
  next();
}
