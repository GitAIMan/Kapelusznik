"use client";

import { motion } from "framer-motion";

const embers = [
  { x: -6, duration: 2.5, delay: 0, color: "bg-accent-gold" },
  { x: 4, duration: 3, delay: 0.7, color: "bg-accent-orange" },
  { x: -3, duration: 2.8, delay: 1.4, color: "bg-accent-gold" },
  { x: 7, duration: 3.2, delay: 2.1, color: "bg-accent-orange" },
];

export default function FloatingEmbers() {
  return (
    <>
      {embers.map((ember, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${ember.color}`}
          style={{
            left: `calc(50% + ${ember.x}px)`,
            top: "50%",
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -50],
            opacity: [0.7, 0],
          }}
          transition={{
            duration: ember.duration,
            repeat: Infinity,
            ease: "easeOut",
            delay: ember.delay,
          }}
        />
      ))}
    </>
  );
}
