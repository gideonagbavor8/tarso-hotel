"use client";

import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const message = "Hello, I'd like to book a room at Tarso Hotel.";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/233245132299?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-2xl cursor-pointer"
      style={{
        background: "#25D366",
        boxShadow: "0 10px 30px rgba(37, 211, 102, 0.4)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Outer pulsing ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          border: "2px solid #25D366",
          pointerEvents: "none",
        }}
        animate={{
          scale: [1, 1.4, 1.8],
          opacity: [0.6, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Inner WhatsApp SVG Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ width: "28px", height: "28px" }}
      >
        <path d="M12.012 2C6.48 2 2 6.48 2 12.012c0 1.737.447 3.427 1.294 4.93L2 22l5.176-1.361c1.455.793 3.09 1.21 4.773 1.21 5.532 0 10.012-4.48 10.012-10.012S17.544 2 12.012 2zm0 16.65c-1.52 0-3.013-.408-4.32-1.183l-.31-.184-3.21.843.858-3.13-.203-.324A8.3 8.3 0 0 1 3.65 12.01c0-4.606 3.75-8.357 8.36-8.357 4.607 0 8.357 3.75 8.357 8.36 0 4.606-3.75 8.357-8.357 8.357zm4.586-6.275c-.25-.124-1.477-.727-1.707-.81-.23-.083-.396-.124-.563.125-.166.248-.646.81-.79 1-.146.19-.293.215-.543.09-.25-.124-1.055-.388-2.01-1.242-.742-.662-1.244-1.48-1.39-1.728-.147-.247-.015-.38.11-.504.112-.112.25-.29.375-.434.124-.145.166-.248.25-.413.083-.165.04-.31-.02-.434-.06-.124-.563-1.355-.77-1.85-.2-.49-.403-.424-.563-.432-.146-.008-.313-.008-.48-.008-.166 0-.437.062-.666.31-.228.248-.874.854-.874 2.083 0 1.23.895 2.417.994 2.562.1.145 1.76 2.688 4.267 3.77.596.256 1.062.41 1.425.525.6.19 1.144.163 1.575.1.48-.072 1.477-.603 1.685-1.183.21-.58.21-1.075.146-1.183-.06-.107-.22-.19-.47-.315z" />
      </svg>
    </motion.a>
  );
}
