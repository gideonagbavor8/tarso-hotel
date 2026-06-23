"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Chop Bar", href: "#restaurant" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-[1.2rem] transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(44,26,14,0.96)"
            : "rgba(44,26,14,0.75)",
          backdropFilter: "blur(10px)",
          borderBottom: scrolled
            ? "1px solid rgba(232,168,76,0.2)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <div style={{ marginLeft: "1rem" }}>
          <span
            style={{
              fontFamily: "var(--font-cormorant)",
              color: "var(--gold)",
              fontSize: "1.5rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            Tarso Hotel
          </span>
          <span
            style={{
              display: "block",
              color: "var(--sand)",
              fontSize: "0.75rem",
              fontStyle: "italic",
              opacity: 0.7,
              lineHeight: 1.2,
            }}
          >
            Ho, Volta Region · Ghana
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-[2.8rem] list-none">
          {links.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium tracking-widest uppercase transition-colors duration-200 cursor-pointer bg-transparent border-none"
                style={{ color: "var(--sand)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--gold)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--sand)")
                }
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo("#booking")}
          className="hidden md:block cursor-pointer transition-all duration-200"
          style={{
            background: "transparent",
            color: "#E8A84C",
            border: "1px solid #E8A84C",
            padding: "0.6rem 1.8rem",
            borderRadius: "2px",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginRight: "1rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#E8A84C";
            e.currentTarget.style.color = "#2C1A0E";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "#E8A84C";
          }}
        >
          Reserve a Room
        </motion.button>

        {/* Hamburger */}
        <button
          className="md:hidden bg-transparent border-none cursor-pointer"
          style={{ color: "var(--sand)" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-[72px] left-0 right-0 z-40 flex flex-col gap-0 px-[8%] py-6"
            style={{ background: "rgba(44,26,14,0.98)" }}
          >
            {links.map((link, index) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.07 }}
                onClick={() => scrollTo(link.href)}
                className="w-full text-left font-medium tracking-widest uppercase bg-transparent border-none cursor-pointer"
                style={{
                  color: "var(--sand)",
                  padding: "1rem 1rem",
                  fontSize: "1rem",
                  borderBottom: "1px solid rgba(242,221,180,0.1)",
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              onClick={() => scrollTo("#booking")}
              className="cursor-pointer transition-all duration-200"
              style={{
                background: "var(--clay)",
                color: "#ffffff",
                border: "none",
                padding: "1rem",
                borderRadius: "2px",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                width: "100%",
                marginTop: "0.5rem",
                marginLeft: 0,
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--terracotta)";
                e.currentTarget.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--clay)";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              Reserve a Room
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
