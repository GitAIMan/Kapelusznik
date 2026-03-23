import crypto from "crypto";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const ADMIN_PASSWORD_HASH = crypto
  .createHash("sha256")
  .update("adminkapelusznik")
  .digest("hex");

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-kapelusznik";

export function login(password: string): string | null {
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  if (hash !== ADMIN_PASSWORD_HASH) return null;
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Brak autoryzacji" });
    return;
  }

  const token = header.slice(7);
  if (!verifyToken(token)) {
    res.status(401).json({ error: "Nieprawidłowy token" });
    return;
  }

  next();
}
