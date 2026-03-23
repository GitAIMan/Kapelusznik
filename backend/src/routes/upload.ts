import { Router } from "express";
import type { Request, Response } from "express";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import path from "path";
import { requireAuth } from "../middleware/auth";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".webp", ".gif"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Dozwolone formaty: JPG, PNG, WebP, GIF"));
    }
  },
});

function getS3Client() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
    },
  });
}

router.post("/", requireAuth, upload.single("image"), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "Brak pliku" });
    return;
  }

  const ext = path.extname(req.file.originalname).toLowerCase();
  const filename = `blog/${crypto.randomUUID()}${ext}`;

  try {
    const s3 = getS3Client();
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || "kapelusznik-assets",
        Key: filename,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      })
    );

    const publicUrl = `${process.env.R2_PUBLIC_URL || "https://pub-c80345f06600456890a96b515fec6e54.r2.dev"}/${filename}`;
    res.json({ url: publicUrl });
  } catch (err) {
    console.error("Error uploading to R2:", err);
    res.status(500).json({ error: "Błąd uploadu" });
  }
});

export default router;
