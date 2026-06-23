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
      className="relative overflow-hidden flex flex-col items-center justify-center"
      style={{ minHeight: "105vh", paddingTop: "100px", paddingLeft: "5%", paddingRight: "5%", paddingBottom: "5rem" }}
    >
      {/* Background Image */}
      <Image
        src="/images/hero-bg.png"
        alt="Tarso Hotel — Ho, Volta Region, Ghana"
        fill
        priority
        style={{ objectFit: "cover", objectPosition: "center" }}
      />

      {/* Dark overlay — lightened to 0.55 so the photo reads clearly */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(44,26,14,0.55)" }}
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
            fontSize: "clamp(3.8rem, 8vw, 6.5rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            color: "var(--sand)",
            textShadow: "0 2px 20px rgba(0,0,0,0.4)",
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
          className="font-light leading-relaxed"
          style={{
            color: "#ffffff",
            fontSize: "1.1rem",
            maxWidth: "580px",
            margin: "1.5rem auto 0",
            textShadow: "0 1px 8px rgba(0,0,0,0.6)",
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
            className="cursor-pointer transition-all duration-200"
            style={{
              background: "var(--clay)",
              color: "#ffffff",
              border: "none",
              padding: "0.9rem 2.2rem",
              borderRadius: "3px",
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow: "0 4px 16px rgba(196,122,58,0.5)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--terracotta)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(196,122,58,0.65)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--clay)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(196,122,58,0.5)";
            }}
          >
            Book Your Stay
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#rooms")}
            className="cursor-pointer transition-all duration-200"
            style={{
              background: "transparent",
              color: "#E8A84C",
              border: "2px solid #E8A84C",
              padding: "0.9rem 2.2rem",
              borderRadius: "3px",
              fontSize: "0.9rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
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
          ].map((badge, i, arr) => (
            <>
              <div key={badge.label} className="text-center">
                <div
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "2.4rem",
                    fontWeight: 600,
                    color: "var(--gold)",
                    lineHeight: 1,
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  {badge.num}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontSize: "0.78rem",
                    color: "#ffffff",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {badge.label}
                </div>
              </div>
              {i < arr.length - 1 && (
                <div
                  key={`divider-${i}`}
                  style={{
                    width: "1px",
                    height: "40px",
                    background: "rgba(255,255,255,0.2)",
                    alignSelf: "center",
                  }}
                />
              )}
            </>
          ))}
        </motion.div>
      </div>
    </section>
  );
}