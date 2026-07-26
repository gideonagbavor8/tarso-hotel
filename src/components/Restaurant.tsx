"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

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
  },
  {
    name: "English Breakfast",
    desc: "Tom Brown, Toasted Bread, Omelet, Sausage, Milk",
    price: "GH₵45",
  },
  {
    name: "Breakfast Platter",
    desc: "Jollof Rice, Sausage, Omelet, Milk",
    price: "GH₵35",
  },
  {
    name: "Milo Delight",
    desc: "Milo, Toasted Bread, Omelet, Sausage",
    price: "GH₵35",
  },
];

export default function Restaurant() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <section
      id="restaurant"
      ref={ref}
      style={{ background: "#ffffff", padding: "6rem 5%" }}
    >
      <div
        className="restaurant-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
      >
        {/* Left — Text & Menu */}
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
              <span
                style={{
                  display: "block",
                  width: "2rem",
                  height: "1px",
                  background: "var(--clay)",
                }}
              />
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
                marginBottom: "1.5rem",
                color: "var(--text-mid)",
                lineHeight: 1.8,
              }}
            >
              Start your day with a delicious breakfast at Anita's Morning Treats.
              Freshly prepared meals, hot beverages, and wholesome breakfast options
              served daily at Tarso Hotel Restaurants, Ho.
            </p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.15}
              style={{
                marginBottom: "2rem",
                padding: "1rem 1.25rem",
                background: "rgba(196,122,58,0.06)",
                borderLeft: "3px solid var(--clay)",
                borderRadius: "4px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "var(--text-mid)",
                  lineHeight: 1.7,
                  fontSize: "0.9rem",
                }}
              >
                Delivery available at a fee. Order via <strong>0594085689</strong>.
              </p>
            </motion.div>



          </motion.div>

          {/* Menu Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
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
                  transition={{ duration: 0.2 }}
                  onHoverStart={() => setActiveMenuItem(item.name)}
                  onHoverEnd={() => setActiveMenuItem(null)}
                  onTapStart={() => setActiveMenuItem(item.name)}
                  onTap={() => setActiveMenuItem(null)}
                  onTapCancel={() => setActiveMenuItem(null)}
                  style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    padding: "0.8rem 1rem",
                    margin: "0 -1rem",
                    borderBottom: "1px solid var(--sand)",
                    borderRadius: "6px",
                    cursor: "default",
                    overflow: "hidden",
                  }}
                >
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
                        color: "var(--earth)",
                      }}
                    >
                      {item.name}
                    </motion.h4>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--text-mid)",
                        marginTop: "0.2rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                  <motion.span
                    animate={{
                      scale: isActive ? 1.05 : 1,
                      backgroundColor: isActive
                        ? "rgba(196,122,58,0.18)"
                        : "rgba(196,122,58,0.08)",
                      borderColor: isActive
                        ? "rgba(196,122,58,0.5)"
                        : "rgba(196,122,58,0.25)",
                    }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(196,122,58,0.18)",
                      borderColor: "rgba(196,122,58,0.5)",
                    }}
                    transition={{ duration: 0.2 }}
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
                      color: "var(--clay, #C47A3A)",
                      textShadow: "0 1px 4px rgba(196,122,58,0.3)",
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

        {/* Right — Image Block */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          style={{
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gap: "1rem",
            height: "480px",
          }}
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setActiveImage(0)}
            onHoverEnd={() => setActiveImage(null)}
            onTapStart={() => setActiveImage(0)}
            onTap={() => setActiveImage(null)}
            onTapCancel={() => setActiveImage(null)}
            style={{
              borderRadius: "3px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/food-banku.png"
              alt="Food Banku"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeImage === 0 ? 0.15 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "#ffffff",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            {/* Bottom scrim for contrast */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                zIndex: 1,
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                right: "1rem",
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                color: "#F2DDB4",
                fontSize: "0.95rem",
                zIndex: 3,
              }}
            >
              Anita's Morning Treats
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setActiveImage(1)}
            onHoverEnd={() => setActiveImage(null)}
            onTapStart={() => setActiveImage(1)}
            onTap={() => setActiveImage(null)}
            onTapCancel={() => setActiveImage(null)}
            style={{
              borderRadius: "3px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src="/images/food-fufu.png"
              alt="Fufu with light soup at Tarso Chop Bar"
              fill
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: activeImage === 1 ? 0.15 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "#ffffff",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            {/* Bottom scrim for contrast */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                zIndex: 1,
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                right: "1rem",
                fontFamily: "var(--font-cormorant)",
                fontStyle: "italic",
                color: "#F2DDB4",
                fontSize: "0.95rem",
                zIndex: 3,
              }}
            >
              Breakfast served daily at Tarso Hotel
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
