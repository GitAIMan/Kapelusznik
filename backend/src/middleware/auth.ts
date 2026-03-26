import crypto from "crypto";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD && process.env.NODE_ENV === "production") {
  throw new Error("ADMIN_PASSWORD env var is required in production");
}

const ADMIN_PASSWORD_HASH = crypto
  .createHash("sha256")
  .update(ADMIN_PASSWORD || "adminkapelusznik")
  .digest("hex");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET env var is required in production");
}
const jwtSecret = JWT_SECRET || "dev-secret-kapelusznik";

export function login(password: string): string | null {
  if (!password || password.length > 1000) return null;
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  if (hash !== ADMIN_PASSWORD_HASH) return null;
  return jwt.sign({ role: "admin" }, jwtSecret, { expiresIn: "24h" });
}

export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, jwtSecret);
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
