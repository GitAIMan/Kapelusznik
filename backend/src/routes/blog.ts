import { Router } from "express";
import type { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import { pool } from "../db";
import { requireAuth } from "../middleware/auth";
import { validateBlogPost, type BlogBlock } from "../middleware/validateBlog";

const router = Router();

function sanitizeText(text: string): string {
  return sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} });
}

function sanitizeBlock(block: BlogBlock): BlogBlock {
  switch (block.type) {
    case "heading":
    case "paragraph":
      return { ...block, text: sanitizeText(block.text) };
    case "image":
      return { ...block, caption: sanitizeText(block.caption || "") };
    case "quote":
      return {
        ...block,
        text: sanitizeText(block.text),
        author: sanitizeText(block.author || ""),
      };
  }
}

function isValidId(id: string): boolean {
  return /^\d+$/.test(id);
}

// Public: get all posts
router.get("/", async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, title, subtitle, excerpt, date, image, slug, gallery, created_at, updated_at FROM blog_posts ORDER BY date DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Public: get single post by slug
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM blog_posts WHERE slug = $1",
      [req.params.slug]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Post nie znaleziony" });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Protected: create post
router.post("/", requireAuth, validateBlogPost, async (req: Request, res: Response) => {
  const { title, subtitle, excerpt, content, date, image, slug, blocks, gallery } = req.body;
  const sanitizedBlocks = (blocks as BlogBlock[]).map(sanitizeBlock);
  try {
    const { rows } = await pool.query(
      `INSERT INTO blog_posts (title, subtitle, excerpt, content, date, image, slug, blocks, gallery)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb)
       RETURNING *`,
      [
        sanitizeText(title),
        sanitizeText(subtitle || ""),
        sanitizeText(excerpt),
        sanitizeText(content),
        date,
        image,
        slug,
        JSON.stringify(sanitizedBlocks),
        JSON.stringify(gallery),
      ]
    );
    res.status(201).json(rows[0]);
  } catch (err: any) {
    if (err.code === "23505") {
      res.status(409).json({ error: "Post z takim slug już istnieje" });
      return;
    }
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Protected: update post
router.put("/:id", requireAuth, validateBlogPost, async (req: Request, res: Response) => {
  const id = String(req.params.id);
  if (!isValidId(id)) {
    res.status(400).json({ error: "Nieprawidłowe ID" });
    return;
  }
  const { title, subtitle, excerpt, content, date, image, slug, blocks, gallery } = req.body;
  const sanitizedBlocks = (blocks as BlogBlock[]).map(sanitizeBlock);
  try {
    const { rows } = await pool.query(
      `UPDATE blog_posts
       SET title=$1, subtitle=$2, excerpt=$3, content=$4, date=$5, image=$6, slug=$7,
           blocks=$8::jsonb, gallery=$9::jsonb, updated_at=NOW()
       WHERE id=$10
       RETURNING *`,
      [
        sanitizeText(title),
        sanitizeText(subtitle || ""),
        sanitizeText(excerpt),
        sanitizeText(content),
        date,
        image,
        slug,
        JSON.stringify(sanitizedBlocks),
        JSON.stringify(gallery),
        id,
      ]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: "Post nie znaleziony" });
      return;
    }
    res.json(rows[0]);
  } catch (err: any) {
    if (err.code === "23505") {
      res.status(409).json({ error: "Post z takim slug już istnieje" });
      return;
    }
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// Protected: delete post
router.delete("/:id", requireAuth, async (req: Request, res: Response) => {
  const id = String(req.params.id);
  if (!isValidId(id)) {
    res.status(400).json({ error: "Nieprawidłowe ID" });
    return;
  }
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM blog_posts WHERE id = $1",
      [id]
    );
    if (rowCount === 0) {
      res.status(404).json({ error: "Post nie znaleziony" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

export default router;
