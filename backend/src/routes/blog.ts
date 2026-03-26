import { Router } from "express";
import type { Request, Response } from "express";
import sanitizeHtml from "sanitize-html";
import { pool } from "../db";
import { requireAuth } from "../middleware/auth";
import { validateBlogPost } from "../middleware/validateBlog";

const router = Router();

function sanitizeText(text: string): string {
  return sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} });
}

function isValidId(id: string): boolean {
  return /^\d+$/.test(id);
}

// Public: get all posts
router.get("/", async (_req: Request, res: Response) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, title, excerpt, date, image, slug, created_at, updated_at FROM blog_posts ORDER BY date DESC"
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
  const { title, excerpt, content, date, image, slug } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO blog_posts (title, excerpt, content, date, image, slug)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [sanitizeText(title), sanitizeText(excerpt), sanitizeText(content), date, image, slug]
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
  const { title, excerpt, content, date, image, slug } = req.body;
  try {
    const { rows } = await pool.query(
      `UPDATE blog_posts
       SET title=$1, excerpt=$2, content=$3, date=$4, image=$5, slug=$6, updated_at=NOW()
       WHERE id=$7
       RETURNING *`,
      [sanitizeText(title), sanitizeText(excerpt), sanitizeText(content), date, image, slug, id]
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
