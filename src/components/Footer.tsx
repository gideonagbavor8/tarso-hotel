"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  }),
};

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      style={{
        background: "#160B04",
        color: "var(--sand)",
        fontFamily: "var(--font-inter)",
        padding: "5rem 5% 2.5rem 5%",
        borderTop: "1px solid rgba(232, 168, 76, 0.1)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative glow element */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(232, 168, 76, 0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-3 gap-12 pb-16">
          {/* Column 1: Brand & Tagline */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
            className="flex flex-col gap-4"
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  color: "var(--gold)",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                Tarso Hotel
              </span>
              <span
                style={{
                  display: "block",
                  color: "rgba(242, 221, 180, 0.6)",
                  fontSize: "0.8rem",
                  fontStyle: "italic",
                  lineHeight: 1.2,
                  marginTop: "0.2rem",
                }}
              >
                Ho, Volta Region · Ghana
              </span>
            </div>
            <p
              style={{
                color: "rgba(242, 221, 180, 0.75)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: "320px",
              }}
            >
              One of Ho's pioneering accommodations. Experience authentic Volta Region hospitality, clean, comfortable rooms, and the famous Tarso Chop Bar.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.25}
            className="flex flex-col gap-4"
          >
            <h4
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", padding: 0, margin: 0 }}>
              {[
                { label: "About Tarso", id: "#about" },
                { label: "Our Rooms", id: "#rooms" },
                { label: "Tarso Chop Bar", id: "#restaurant" },
                { label: "Guest Reviews", id: "#reviews" },
                { label: "Book a Room", id: "#booking" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(242, 221, 180, 0.75)",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left",
                      transition: "all 0.2s ease",
                    }}
                    className="hover:text-[var(--gold)] hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.4}
            className="flex flex-col gap-4"
          >
            <h4
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Contact Us
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.9rem", color: "rgba(242, 221, 180, 0.75)" }}>
              <div>
                <strong style={{ color: "var(--sand)", display: "block", marginBottom: "0.2rem" }}>Address</strong>
                Amedzofe Road, Ho, Volta Region, Ghana
              </div>
              <div>
                <strong style={{ color: "var(--sand)", display: "block", marginBottom: "0.2rem" }}>Phone</strong>
                <a href="tel:+233241234567" style={{ color: "inherit", textDecoration: "none" }} className="hover:text-[var(--gold)]">
                  +233 24 123 4567
                </a>
                {" / "}
                <a href="tel:+233209876543" style={{ color: "inherit", textDecoration: "none" }} className="hover:text-[var(--gold)]">
                  +233 20 987 6543
                </a>
              </div>
              <div>
                <strong style={{ color: "var(--sand)", display: "block", marginBottom: "0.2rem" }}>Hours</strong>
                Front Desk: 24/7 · Chop Bar: 11 AM - 10 PM
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.55}
          className="border-t border-[rgba(242,221,180,0.08)] pt-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4 text-xs text-[rgba(242,221,180,0.5)] font-sans"
        >
          <div>
            &copy; {currentYear} Tarso Hotel. All rights reserved.
          </div>
          <div>
            Designed by{" "}
            <a
              href="https://kordex.tech"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--gold)",
                textDecoration: "none",
                fontWeight: 500,
              }}
              className="hover:underline"
            >
              Kordex Technologies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}