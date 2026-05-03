"use client";

import { motion } from "framer-motion";

export default function Marquee() {
  const items = [
    "Atomic Habits",
    "Clean Code",
    "Deep Work",
    "The Alchemist",
    "Think and Grow Rich",
    "Rich Dad Poor Dad",
  ];

  const text = `New Arrivals: ${items.join(" • ")} • Special Discount on Memberships •`;

  return (
    <div className="bg-orange-500 text-white py-3 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap text-sm font-medium"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 15,
          repeat: Infinity,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-6">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}