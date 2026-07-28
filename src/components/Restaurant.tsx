"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

const menuItems = [
  {
    name: "Continental Breakfast",
    desc: "Omelet, Toasted Bread, Sausage, Milk",
    price: "GH₵45",
    image: "/images/food/food-continental.png",
    tag: "Popular",
  },
  {
    name: "English Breakfast",
    desc: "Tom Brown, Toasted Bread, Omelet, Sausage, Milk",
    price: "GH₵45",
    image: "/images/food/food-english.png",
    tag: "Hearty",
  },
  {
    name: "Breakfast Platter",
    desc: "Jollof Rice, Sausage, Omelet, Milk",
    price: "GH₵35",
    image: "/images/food/food-platter.png",
    tag: "Value",
  },
  {
    name: "Milo Delight",
    desc: "Milo, Toasted Bread, Omelet, Sausage",
    price: "GH₵35",
    image: "/images/food/food-milo.png",
    tag: "Classic",
  },
];

function FoodCardCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % menuItems.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + menuItems.length) % menuItems.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    }),
  };

  const item = menuItems[current];

  return (
    <div
      style={{ width: "100%" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main card */}
      <div
        style={{
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          height: isMobile ? "320px" : "420px",
          boxShadow: "0 20px 60px rgba(44,26,14,0.25)",
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, { offset, velocity }) => {
              const power = Math.abs(offset.x) * velocity.x;
              if (power < -8000) next();
              else if (power > 8000) prev();
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {/* Image */}
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: "cover" }}
              priority
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(44,26,14,0.92) 0%, rgba(44,26,14,0.3) 50%, transparent 100%)",
              }}
            />

            {/* Tag */}
            <div
              style={{
                position: "absolute",
                top: "1.2rem",
                left: "1.2rem",
                background: "var(--clay)",
                color: "#fff",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
              }}
            >
              {item.tag}
            </div>

            {/* Slide counter */}
            <div
              style={{
                position: "absolute",
                top: "1.2rem",
                right: "1.2rem",
                background: "rgba(44,26,14,0.6)",
                color: "var(--sand)",
                fontSize: "0.7rem",
                fontWeight: 600,
                padding: "0.3rem 0.7rem",
                borderRadius: "20px",
                backdropFilter: "blur(4px)",
              }}
            >
              {current + 1} / {menuItems.length}
            </div>

            {/* Content */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: "1.5rem",
              }}
            >
              <motion.h3
                key={`title-${current}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  color: "var(--sand)",
                  marginBottom: "0.3rem",
                  lineHeight: 1.2,
                }}
              >
                {item.name}
              </motion.h3>
              <motion.p
                key={`desc-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(242,221,180,0.75)",
                  marginBottom: "0.8rem",
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </motion.p>
              <motion.div
                key={`price-${current}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                style={{
                  display: "inline-block",
                  background: "rgba(196,122,58,0.2)",
                  border: "1px solid rgba(196,122,58,0.5)",
                  borderRadius: "6px",
                  padding: "0.35rem 1rem",
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--gold)",
                }}
              >
                {item.price}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrow buttons */}
        <button
          onClick={prev}
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(44,26,14,0.6)",
            border: "1px solid rgba(232,168,76,0.3)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--gold)",
            zIndex: 10,
            backdropFilter: "blur(4px)",
          }}
          aria-label="Previous"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={next}
          style={{
            position: "absolute",
            right: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(44,26,14,0.6)",
            border: "1px solid rgba(232,168,76,0.3)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--gold)",
            zIndex: 10,
            backdropFilter: "blur(4px)",
          }}
          aria-label="Next"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Thumbnail dots row */}
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          marginTop: "1rem",
          justifyContent: "center",
        }}
      >
        {menuItems.map((m, i) => (
          <motion.button
            key={m.name}
            onClick={() => goTo(i)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: i === current ? "28px" : "8px",
              height: "8px",
              borderRadius: "20px",
              background: i === current ? "var(--clay)" : "rgba(196,122,58,0.3)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s ease",
            }}
            aria-label={`Go to ${m.name}`}
          />
        ))}
      </div>

      {/* Delivery note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: "1.2rem",
          padding: "0.9rem 1.2rem",
          background: "rgba(196,122,58,0.06)",
          borderLeft: "3px solid var(--clay)",
          borderRadius: "4px",
        }}
      >
        <p style={{ margin: 0, color: "var(--text-mid)", lineHeight: 1.7, fontSize: "0.85rem" }}>
          Delivery available at a fee. Order via <strong>0594085689</strong>.
        </p>
      </motion.div>
    </div>
  );
}

export default function Restaurant() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

  return (
    <section
      id="restaurant"
      ref={ref}
      style={{ background: "#ffffff", padding: "6rem 5%" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
        className="restaurant-grid"
      >
        {/* Left — Text & Menu list */}
        <div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.1}
          >
            <div
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase" as const,
                color: "var(--clay)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.9rem",
              }}
            >
              <span style={{ display: "block", width: "2rem", height: "1px", background: "var(--clay)" }} />
              Anita's Morning Treats
            </div>

            <h2
              style={{
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
                color: "var(--earth)",
                lineHeight: 1.15,
              }}
            >
              Breakfast Menu,
              <br />
              <em style={{ color: "var(--clay)" }}>freshly prepared daily</em>
            </h2>

            <p
              style={{
                marginTop: "1rem",
                marginBottom: "2rem",
                color: "var(--text-mid)",
                lineHeight: 1.8,
              }}
            >
              Start your day with a delicious breakfast at Anita's Morning Treats.
              Freshly prepared meals, hot beverages, and wholesome breakfast options
              served daily at Tarso Hotel, Ho.
            </p>
          </motion.div>

          {/* Menu Items list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {menuItems.map((item, i) => {
              const isActive = activeMenuItem === item.name;
              return (
                <motion.div
                  key={item.name}
                  variants={fadeUp}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  custom={0.2 + i * 0.1}
                  whileHover={{ x: 8, backgroundColor: "rgba(196,122,58,0.06)" }}
                  whileTap={{ scale: 0.98, backgroundColor: "rgba(196,122,58,0.1)" }}
                  onHoverStart={() => setActiveMenuItem(item.name)}
                  onHoverEnd={() => setActiveMenuItem(null)}
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "0.9rem 1rem",
                    margin: "0 -1rem",
                    borderBottom: "1px solid var(--sand)",
                    borderRadius: "6px",
                    cursor: "default",
                    overflow: "hidden",
                  }}
                >
                  {/* Left accent bar */}
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: "3px",
                      height: "100%",
                      background: "var(--clay)",
                      borderRadius: "2px",
                      originY: 0,
                    }}
                  />
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <motion.h4
                      animate={{ color: isActive ? "var(--clay)" : "var(--earth)" }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.name}
                    </motion.h4>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-mid)", marginTop: "0.2rem", lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                  <motion.span
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      backgroundColor: isActive ? "rgba(196,122,58,0.18)" : "rgba(196,122,58,0.08)",
                      borderColor: isActive ? "rgba(196,122,58,0.5)" : "rgba(196,122,58,0.25)",
                    }}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      background: "rgba(196,122,58,0.08)",
                      border: "1px solid rgba(196,122,58,0.25)",
                      borderRadius: "4px",
                      padding: "0.3rem 0.7rem",
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      color: "var(--clay)",
                      whiteSpace: "nowrap",
                      marginLeft: "1rem",
                    }}
                  >
                    {item.price}
                  </motion.span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right — Food Card Carousel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.3}
        >
          <FoodCardCarousel />
        </motion.div>
      </div>
    </section>
  );
}