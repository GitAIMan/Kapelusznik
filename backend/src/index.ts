import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import contactRouter from "./routes/contact";
import authRouter from "./routes/auth";
import blogRouter from "./routes/blog";
import uploadRouter from "./routes/upload";
import { migrate } from "./db/migrate";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security headers
app.use(helmet());

// Trust proxy (Railway runs behind reverse proxy)
app.set("trust proxy", 1);

// CORS
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "1mb" }));

// Global rate limiter: 100 req / 15 min per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Zbyt wiele zapytań. Spróbuj ponownie za chwilę." },
});
app.use("/api/", globalLimiter);

// Strict rate limiter for login: 5 attempts / 15 min per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut." },
});
app.use("/api/auth/login", loginLimiter);

// Contact form limiter: 5 req / hour per IP
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Zbyt wiele wiadomości. Spróbuj ponownie za godzinę." },
});
app.use("/api/contact", contactLimiter);

app.use("/api/contact", contactRouter);
app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

migrate()
  .then(() => {
    console.log("Migration completed successfully");
  })
  .catch((err) => {
    console.warn("Migration skipped (no DATABASE_URL?):", err.message);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Backend działa na porcie ${PORT}`);
    });
  });
