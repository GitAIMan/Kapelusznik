"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactCard from "@/components/ui/ContactCard";
import Button from "@/components/ui/Button";
import { CONTACT_INFO } from "@/lib/constants";
import type { ContactFormData } from "@/types";

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: połączenie z backendem
    console.log("Form submitted:", form);
  };

  return (
    <section className="relative py-16 px-6 md:px-12">
      {/* Section divider */}
      <div className="section-divider absolute top-0 left-[10%] right-[10%]" />

      {/* Decorative bg */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-accent-gold/6 blur-[150px]" />
      </div>

      <div className="section-reveal relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                id="contact-name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full rounded-xl border border-white/10 bg-bg-surface/60 backdrop-blur-sm px-4 pt-6 pb-2 text-text outline-none transition-colors hover:border-white/15 focus:border-accent-gold focus:shadow-[0_0_0_1px_rgba(255,183,3,0.3)]"
              />
              <label
                htmlFor="contact-name"
                className="absolute left-4 top-2 text-xs text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-gold"
              >
                Imię i nazwisko
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                id="contact-email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder=" "
                className="peer w-full rounded-xl border border-white/10 bg-bg-surface/60 backdrop-blur-sm px-4 pt-6 pb-2 text-text outline-none transition-colors hover:border-white/15 focus:border-accent-gold focus:shadow-[0_0_0_1px_rgba(255,183,3,0.3)]"
              />
              <label
                htmlFor="contact-email"
                className="absolute left-4 top-2 text-xs text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-gold"
              >
                Email
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                id="contact-message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder=" "
                className="peer w-full rounded-xl border border-white/10 bg-bg-surface/60 backdrop-blur-sm px-4 pt-6 pb-2 text-text outline-none transition-colors resize-none hover:border-white/15 focus:border-accent-gold focus:shadow-[0_0_0_1px_rgba(255,183,3,0.3)]"
              />
              <label
                htmlFor="contact-message"
                className="absolute left-4 top-2 text-xs text-text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-accent-gold"
              >
                Wiadomość
              </label>
            </div>

            <Button type="submit" className="w-full">
              <Send className="h-4 w-4" />
              Wyślij wiadomość
            </Button>
          </form>

          {/* Contact cards */}
          <div className="space-y-5">
            {CONTACT_INFO.map((info) => (
              <ContactCard key={info.label} {...info} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
