export default function ContactMap() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/[0.06] h-56 md:h-72">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41046.66!2d19.0!3d49.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716a2ce952b10d7%3A0x3d0d2289b0e26b6d!2sBielsko-Bia%C5%82a!5e0!3m2!1spl!2spl!4v1"
        width="100%"
        height="100%"
        style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.3) brightness(0.8)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Lokalizacja Kapelusznik — Bielsko-Biała"
      />
    </div>
  );
}
