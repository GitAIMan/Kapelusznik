import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRouter from "./routes/contact";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/contact", contactRouter);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Backend działa na porcie ${PORT}`);
});
