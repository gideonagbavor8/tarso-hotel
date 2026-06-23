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

const rooms = [
  {
    tag: "Most Popular",
    title: "Self-Contained Room",
    desc: "Private en-suite bathroom, ceiling fan, wardrobe, and a comfortable double bed. Perfect for the solo traveller or couple who wants full privacy.",
    amenities: ["En-suite Bathroom", "Double Bed", "Ceiling Fan", "Wardrobe", "Mosquito Net"],
    price: "GH₵150",
    image: "/images/room-selfcontained.png",
    span: true,
  },
  {
    tag: "Budget Stay",
    title: "Shared Bathroom Room",
    desc: "Clean, comfortable single room with shared bathroom facilities. Great value for the budget-conscious traveller.",
    amenities: ["Shared Bathroom", "Single Bed", "Ceiling Fan"],
    price: "GH₵100",
    image: "/images/room-shared.png",
    span: false,
  },
  {
    tag: "Extended Stay",
    title: "Family Room",
    desc: "A spacious room with two beds, suitable for families or colleagues travelling together.",
    amenities: ["Two Beds", "En-suite", "Ceiling Fan"],
    price: "GH₵200",
    image: "/images/room-family.jpeg",
    span: false,
  },
];

export default function Rooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToBooking = () => {
    const target = document.querySelector("#booking");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="rooms"
      ref={ref}
      style={{ background: "var(--cream)", padding: "6rem 5%" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
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
            Accommodation
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
            Our rooms
          </h2>
          <p style={{ marginTop: "0.8rem", color: "var(--text-mid)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "540px" }}>
            Simple, well-kept, and honestly priced. Every room is cleaned daily and managed with genuine care.
          </p>
        </motion.div>

        <motion.button
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={scrollToBooking}
          style={{
            background: "var(--clay)",
            color: "#fff",
            padding: "0.85rem 2rem",
            border: "none",
            borderRadius: "2px",
            fontSize: "0.88rem",
            fontWeight: 600,
            letterSpacing: "0.07em",
            textTransform: "uppercase" as const,
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--terracotta)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clay)")}
        >
          Check Availability
        </motion.button>
      </div>

      {/* Rooms Grid */}
      <div
        className="rooms-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
      >
        {rooms.map((room, i) => (
          <motion.div
            key={room.title}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2 + i * 0.15}
            whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(44,26,14,0.16)" }}
            style={{
              background: "#fff",
              borderRadius: "3px",
              overflow: "hidden",
              boxShadow: "0 2px 16px rgba(44,26,14,0.07)",
              gridColumn: room.span ? "span 2" : "span 1",
              transition: "box-shadow 0.25s",
            }}
          >
            {/* Room Image */}
            <div
              style={{
                width: "100%",
                height: room.span ? "280px" : "200px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={room.image}
                alt={room.title}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              {/* Tag badge */}
              <span
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  background: "var(--earth)",
                  color: "var(--gold)",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  padding: "0.3rem 0.7rem",
                  borderRadius: "2px",
                  zIndex: 1,
                }}
              >
                {room.tag}
              </span>
            </div>

            {/* Room Body */}
            <div style={{ padding: "1.4rem" }}>
              <h3
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "var(--earth)",
                  marginBottom: "0.4rem",
                }}
              >
                {room.title}
              </h3>
              <p style={{ fontSize: "0.83rem", color: "var(--text-mid)", lineHeight: 1.6, marginBottom: "1rem" }}>
                {room.desc}
              </p>

              {/* Amenities */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.2rem" }}>
                {room.amenities.map((a) => (
                  <span
                    key={a}
                    style={{
                      fontSize: "0.72rem",
                      color: "var(--text-mid)",
                      background: "var(--cream)",
                      padding: "0.25rem 0.6rem",
                      borderRadius: "20px",
                      border: "1px solid var(--sand)",
                    }}
                  >
                    {a}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "1rem",
                  borderTop: "1px solid var(--sand)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.5rem",
                    color: "var(--earth)",
                    fontWeight: 600,
                  }}
                >
                  {room.price}{" "}
                  <small style={{ fontSize: "0.75rem", color: "var(--text-mid)", fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                    / night
                  </small>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToBooking}
                  style={{
                    background: "var(--clay)",
                    color: "#fff",
                    padding: "0.5rem 1.1rem",
                    border: "none",
                    borderRadius: "2px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--terracotta)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clay)")}
                >
                  Book Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}