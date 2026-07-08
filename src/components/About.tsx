"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Carousel from "@/components/Carousel";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

const pillars = [
  {
    icon: "🏠",
    title: "Central Location",
    desc: "Minutes from Ho's commercial centre, market, and key routes.",
  },
  {
    icon: "🍲",
    title: "Local Cuisine",
    desc: "Authentic Volta Region dishes at the Tarso Chop Bar daily.",
  },
  {
    icon: "🔒",
    title: "Safe & Quiet",
    desc: "Secure premises in a calm neighbourhood — restful nights guaranteed.",
  },
  {
    icon: "🤝",
    title: "Ewe Hospitality",
    desc: "Personal, warm service rooted in Volta Region culture.",
  },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const imageX = useTransform(scrollYProgress, [0, 0.4], ["-80px", "0px"]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: "#ffffff", padding: "6rem 5%" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
        className="about-grid"
      >
        {/* Image Block */}
        <motion.div
          style={{ position: "relative", x: imageX, opacity: imageOpacity }}
        >
          <div
            style={{
              width: "100%",
              aspectRatio: "4/5",
              borderRadius: "3px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Carousel
              images={[
                "/images/exterior/hotel-exterior.png",
                "/images/exterior/IMG-20260706-WA0011.jpg",
                "/images/exterior/IMG-20260706-WA0017.jpg",
                "/images/exterior/IMG-20260706-WA0040.jpg",
                "/images/exterior/IMG-20260706-WA0048.jpg"
              ]}
              alt="Tarso Hotel exterior — Ho, Volta Region, Ghana"
              height="100%"
            />
          </div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.6 }}
            style={{
              position: "absolute",
              bottom: "-1.5rem",
              right: "-1.5rem",
              background: "var(--earth)",
              color: "var(--gold)",
              padding: "1.2rem 1.5rem",
              borderRadius: "3px",
              fontFamily: "var(--font-cormorant)",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(44,26,14,0.3)",
              zIndex: 20,
            }}
          >
            <strong style={{ display: "block", fontSize: "2.2rem", fontWeight: 600 }}>
              Ho
            </strong>
            <span
              style={{
                fontSize: "0.78rem",
                color: "var(--sand)",
                fontFamily: "var(--font-inter)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Volta Region
            </span>
          </motion.div>
        </motion.div>

        {/* Text Block */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--clay)",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.9rem",
            }}
          >
            <span
              style={{
                display: "block",
                width: "2rem",
                height: "1px",
                background: "var(--clay)",
              }}
            />
            Our Story
          </motion.div>

          <h2 style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {"A Ghanaian landmark in the heart of Ho".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 600,
                  color: "var(--earth)",
                  lineHeight: 1.15,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <div>
            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              style={{
                marginTop: "1.2rem",
                color: "var(--text-mid)",
                lineHeight: 1.8,
                marginBottom: "1.2rem",
              }}
            >
              Tarso Hotel is one of Ho&apos;s pioneering accommodations — built
              with a genuine Ghanaian motel spirit and run by a well-known figure
              in the Volta Region who has watched this city grow and flourish for
              decades.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.45 }}
              style={{ color: "var(--text-mid)", lineHeight: 1.8, marginBottom: "1.2rem" }}
            >
              We sit at the centre of Ho on the Amedzofe Road, close to the
              action yet refreshingly quiet. Every room is kept clean and
              comfortable. Every meal at the Tarso Chop Bar is made with local
              ingredients and real care.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              style={{ color: "var(--text-mid)", lineHeight: 1.8 }}
            >
              We are not a chain. We are a people&apos;s hotel — and that is
              exactly what makes us worth returning to.
            </motion.p>
          </div>

          {/* Pillars */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            {pillars.map((p, index) => (
              <motion.div
                key={p.title}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 + index * 0.12 }}
                whileHover={{ scale: 1.04, y: -4, boxShadow: "0 6px 20px rgba(44,26,14,0.1)" }}
                style={{
                  padding: "1.2rem",
                  border: "1px solid var(--sand)",
                  borderRadius: "3px",
                  background: "var(--cream)",
                  cursor: "default",
                  transition: "box-shadow 0.2s",
                }}
              >
                <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>
                  {p.icon}
                </div>
                <h4
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "var(--earth)",
                    marginBottom: "0.3rem",
                  }}
                >
                  {p.title}
                </h4>
                <p style={{ fontSize: "0.78rem", color: "var(--text-mid)", lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}