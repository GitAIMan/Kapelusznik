import { Router } from "express";
import type { Request, Response } from "express";
import { login, requireAuth } from "../middleware/auth";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const { password } = req.body;

  if (!password || typeof password !== "string") {
    res.status(400).json({ error: "Hasło jest wymagane" });
    return;
  }

  const token = login(password);
  if (!token) {
    res.status(401).json({ error: "Nieprawidłowe hasło" });
    return;
  }

  res.json({ token });
});

router.get("/verify", requireAuth, (_req: Request, res: Response) => {
  res.json({ valid: true });
});

export default router;
