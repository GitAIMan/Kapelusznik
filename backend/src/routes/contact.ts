import { Router } from "express";
import { validateContact } from "../middleware/validate";
import type { ContactFormData } from "../types";
import type { Request, Response } from "express";

const router = Router();

router.post("/", validateContact, (req: Request, res: Response) => {
  const data: ContactFormData = req.body;
  console.log("Nowa wiadomość kontaktowa:", data);

  // TODO: wysyłka emaila (nodemailer / SendGrid / itp.)

  res.json({
    success: true,
    message: "Wiadomość została wysłana. Odezwiemy się wkrótce!",
  });
});

export default router;
