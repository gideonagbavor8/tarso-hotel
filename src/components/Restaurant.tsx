"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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
    name: "Fufu with Light Soup",
    desc: "Pounded cassava and plantain served with a rich light soup and your choice of meat.",
    price: "GH₵25",
  },
  {
    name: "Banku with Tilapia",
    desc: "Fermented corn and cassava dough served with grilled fresh tilapia and pepper sauce.",
    price: "GH₵35",
  },
  {
    name: "Jollof Rice with Chicken",
    desc: "Seasoned Ghanaian jollof rice served with grilled or fried chicken and salad.",
    price: "GH₵30",
  },
  {
    name: "Omo Tuo with Groundnut Soup",
    desc: "Rice balls in a rich, aromatic groundnut soup with assorted meat.",
    price: "GH₵28",
  },
  {
    name: "Kenkey with Fried Fish",
    desc: "Fermented corn dumplings served with crispy fried fish and fresh pepper.",
    price: "GH₵20",
  },
];

export default function Restaurant() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              Tarso Chop Bar
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
              Food from the Volta,
              <br />
              <em style={{ color: "var(--clay)" }}>cooked with love</em>
            </h2>

            <p
              style={{
                marginTop: "1rem",
                marginBottom: "1.5rem",
                color: "var(--text-mid)",
                lineHeight: 1.8,
              }}
            >
              Our Chop Bar serves Ghanaian home cooking every day. Fufu, banku,
              rice dishes, and fresh soups — made the way your mother would make
              them.
            </p>
          </motion.div>

          {/* Menu Items */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {menuItems.map((item, i) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={0.2 + i * 0.1}
                whileHover={{ x: 4 }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  paddingTop: "1.2rem",
                  paddingBottom: "1.2rem",
                  borderBottom: "1px solid var(--sand)",
                  transition: "all 0.2s",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--earth)",
                    }}
                  >
                    {item.name}
                  </h4>
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
                <span
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    color: "var(--clay)",
                    whiteSpace: "nowrap",
                    marginLeft: "1rem",
                  }}
                >
                  {item.price}
                </span>
              </motion.div>
            ))}
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
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
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
                zIndex: 2,
              }}
            >
              Fresh, local ingredients every morning
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
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
                zIndex: 2,
              }}
            >
              The Tarso Chop Bar — open daily
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}