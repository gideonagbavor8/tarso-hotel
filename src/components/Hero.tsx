"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

export default function Hero() {
  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ paddingTop: "100px", paddingLeft: "5%", paddingRight: "5%", paddingBottom: "4rem" }}
    >
      {/* Background Image */}
      <Image
        src="/images/hero-bg.png"
        alt="Tarso Hotel — Ho, Volta Region, Ghana"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
      />

      {/* Dark overlay — 0.72 opacity ensures AA contrast on all text */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(44,26,14,0.72)" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="flex items-center justify-center gap-3 mb-6"
          style={{
            color: "var(--gold)",
            fontSize: "0.78rem",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <span className="block h-px w-10" style={{ background: "var(--gold)" }} />
          Ho, Volta Region, Ghana
          <span className="block h-px w-10" style={{ background: "var(--gold)" }} />
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3.2rem, 7vw, 5.5rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            color: "var(--sand)",
          }}
        >
          Where the Volta
          <br />
          <em style={{ color: "var(--gold)" }}>welcomes you</em>
          <br />
          home.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-5 font-light leading-relaxed"
          style={{
            color: "rgba(242,221,180,0.7)",
            fontSize: "1.05rem",
            maxWidth: "600px",
            margin: "1.25rem auto 0",
          }}
        >
          Tarso Hotel has been Ho&apos;s trusted address for decades — centrally
          located, warmly run, and rooted in the spirit of Ewe hospitality.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.55}
          className="flex flex-wrap justify-center gap-4 mt-9"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#booking")}
            className="px-8 py-3 text-white text-sm font-semibold tracking-widest uppercase rounded-sm border-none cursor-pointer transition-colors duration-200"
            style={{ background: "var(--clay)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--terracotta)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--clay)")
            }
          >
            Book Your Stay
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#rooms")}
            className="px-8 py-3 text-sm font-medium tracking-widest uppercase rounded-sm cursor-pointer transition-all duration-200"
            style={{
              background: "transparent",
              color: "var(--sand)",
              border: "1px solid rgba(242,221,180,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--gold)";
              e.currentTarget.style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(242,221,180,0.4)";
              e.currentTarget.style.color = "var(--sand)";
            }}
          >
            View Rooms
          </motion.button>
        </motion.div>

        {/* Badges */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.7}
          className="flex justify-center gap-12 mt-14 pt-8 w-full"
          style={{ borderTop: "1px solid rgba(242,221,180,0.12)" }}
        >
          {[
            { num: "20+", label: "Years of Service" },
            { num: "GH₵150", label: "Starting Rate" },
            { num: "4.5★", label: "Guest Rating" },
          ].map((badge) => (
            <div key={badge.label} className="text-center">
              <div
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "var(--gold)",
                  lineHeight: 1,
                }}
              >
                {badge.num}
              </div>
              <div
                className="mt-1"
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(242,221,180,0.55)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {badge.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}