import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const contactSchema = z.object({
  name: z.string().min(2, "Imię musi mieć co najmniej 2 znaki").max(100),
  email: z.string().email("Nieprawidłowy adres email").max(255),
  message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków").max(5000),
}).strict();

export function validateContact(req: Request, res: Response, next: NextFunction) {
  const result = contactSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    });
    return;
  }

  req.body = result.data;
  next();
}
