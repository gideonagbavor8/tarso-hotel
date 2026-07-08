"use client";

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import Image from "next/image";
import { Fragment, useRef, useState, useEffect } from "react";
import Carousel from "@/components/Carousel";

function CountUp({ from, to, duration, suffix = "", decimals = 0, prefix = "" }: { from: number, to: number, duration: number, suffix?: string, decimals?: number, prefix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: duration,
        ease: "easeOut",
        onUpdate(v) {
          setValue(v);
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView]);

  return <span ref={ref}>{prefix}{value.toFixed(decimals)}{suffix}</span>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative overflow-hidden flex flex-col items-center justify-center max-[640px]:!pt-[120px]"
      style={{ minHeight: "105vh", paddingTop: "100px", paddingLeft: "5%", paddingRight: "5%", paddingBottom: "5rem" }}
    >
      {/* Background Image Carousel */}
      <motion.div className="absolute inset-0 w-full" style={{ zIndex: 0, height: "110%", y }}>
        <Carousel
          images={[
            "/images/hero/hero-bg.png",
            "/images/hero/IMG-20260706-WA0018.webp",
            "/images/hero/IMG-20260706-WA0027.webp",
            "/images/hero/IMG-20260706-WA0031.webp",
            "/images/hero/IMG-20260706-WA0046.webp"
          ]}
          alt="Tarso Hotel — Ho, Volta Region, Ghana"
          height="100%"
        />
      </motion.div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(20,10,4,0.72) 0%, rgba(20,10,4,0.58) 50%, rgba(20,10,4,0.75) 100%)",
          zIndex: 1,
        }}
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
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            textShadow: "0 1px 6px rgba(0,0,0,0.8)",
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
          className="max-[640px]:!text-[clamp(2.8rem,10vw,3.8rem)]"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(3.8rem, 8vw, 6.5rem)",
            fontWeight: 600,
            lineHeight: 1.05,
            color: "#FFFFFF",
            textShadow: "0 2px 4px rgba(0,0,0,0.9), 0 4px 24px rgba(0,0,0,0.7)",
          }}
        >
          Where the Volta
          <br />
          <em style={{ color: "var(--gold)", textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>welcomes you</em>
          <br />
          home.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="font-light leading-relaxed max-[640px]:!text-[0.95rem]"
          style={{
            color: "#FFFFFF",
            fontSize: "1.1rem",
            maxWidth: "580px",
            margin: "1.5rem auto 0",
            textShadow: "0 1px 3px rgba(0,0,0,0.95), 0 2px 12px rgba(0,0,0,0.8)",
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
          className="flex flex-wrap justify-center gap-4 mt-9 max-[640px]:w-full max-[640px]:flex-col"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo("#booking")}
            className="cursor-pointer transition-all duration-200 max-[640px]:w-full"
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
            className="cursor-pointer transition-all duration-200 max-[640px]:w-full"
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
          className="flex justify-center gap-12 mt-14 pt-8 w-full max-[640px]:!gap-6"
          style={{ borderTop: "1px solid rgba(242,221,180,0.12)" }}
        >
          {[
            { num: <CountUp from={0} to={20} duration={2} suffix="+" />, label: "Years of Service" },
            { num: <CountUp from={0} to={150} duration={2} prefix="GH₵" />, label: "Starting Rate" },
            { num: <CountUp from={0} to={4.5} duration={2} suffix="★" decimals={1} />, label: "Guest Rating" },
          ].map((badge, i, arr) => (
            <Fragment key={badge.label}>
              <div className="text-center">
                <div
                  className="max-[640px]:!text-[1.85rem]"
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
                  className="mt-1 max-[640px]:!text-[0.62rem]"
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
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
