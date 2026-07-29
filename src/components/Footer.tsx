"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MapPin, Mail, Clock } from "lucide-react";

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
        borderTop: "1px solid rgba(232, 168, 76, 0.12)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "280px",
          height: "280px",
          background: "radial-gradient(circle, rgba(232, 168, 76, 0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 pb-14">
          
          {/* Column 3 – Contact (Compact) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.3}
            className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1"
          >
            <h4
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--gold)",
              }}
            >
              Contact Us
            </h4>
            
            <div className="flex flex-col gap-3.5 text-[0.9rem]">
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} />
                <p style={{ color: "rgba(242, 221, 180, 0.75)", lineHeight: 1.5 }}>
                  Amedzofe Road, opposite E.P. University College, Ho
                </p>
              </div>
            
              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0" style={{ color: "var(--gold)" }} />
                <a
                  href="tel:+233245132299"
                  className="hover:text-[var(--gold)] transition-colors"
                  style={{ color: "rgba(242, 221, 180, 0.75)", textDecoration: "none" }}
                >
                  +233 24 513 2299
                </a>
              </div>
            
              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0" style={{ color: "var(--gold)" }} />
                <a
                  href="mailto:tarsohotel100@gmail.com"
                  className="hover:text-[var(--gold)] transition-colors"
                  style={{ color: "rgba(242, 221, 180, 0.75)", textDecoration: "none" }}
                >
                  tarsohotel100@gmail.com
                </a>
              </div>
            
              {/* Hours */}
              <div className="flex items-start gap-2.5">
                <Clock size={16} className="mt-0.5 shrink-0" style={{ color: "var(--gold)" }} />
                <p style={{ color: "rgba(242, 221, 180, 0.75)", lineHeight: 1.45 }}>
                  Reception 24/7 · Chop Bar 11AM–10PM
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.45}
          className="border-t border-[rgba(242,221,180,0.08)] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
        >
          <p style={{ fontSize: "0.8rem", color: "rgba(242, 221, 180, 0.45)" }}>
            © {currentYear} Tarso Hotel. All rights reserved.
          </p>

          <p style={{ fontSize: "0.8rem", color: "rgba(242, 221, 180, 0.45)" }}>
            Designed by{" "}
            <a
              href="https://kordex-technologies-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "var(--gold)", fontWeight: 500, textDecoration: "none" }}
            >
              Kordex Technologies
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}