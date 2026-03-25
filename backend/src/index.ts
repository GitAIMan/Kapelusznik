import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "./routes/contact";
import authRouter from "./routes/auth";
import blogRouter from "./routes/blog";
import uploadRouter from "./routes/upload";
import { migrate } from "./db/migrate";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

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
