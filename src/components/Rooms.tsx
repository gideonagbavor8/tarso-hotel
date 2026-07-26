"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Carousel from "@/components/Carousel";

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
    tag: "Extended Stay",
    title: "Family Room",
    desc: "A spacious room with two beds, suitable for families or colleagues travelling together.",
    amenities: ["Two Beds", "En-suite", "Ceiling Fan"],
    images: [
      "/images/room-family/room-fam.jpeg",
      "/images/room-family/room-fam2.jpeg",
      "/images/room-family/room-fam4.jpeg",
      "/images/room-family/room-fam5.jpeg",
      "/images/room-family/room-fam3.jpeg",
    ],
  },
  {
    tag: "Most Popular",
    title: "Self-Contained Room",
    desc: "Private en-suite bathroom, ceiling fan, wardrobe, and a comfortable double bed.",
    amenities: ["En-suite Bathroom", "Double Bed", "Ceiling Fan", "Wardrobe", "Mosquito Net"],
    images: [
      "/images/room-self-contained/self-cont.jpeg",
      "/images/room-self-contained/self-cont4.jpeg",
      "/images/room-self-contained/self-cont2.jpeg",
      "/images/room-self-contained/self-cont5.jpeg",
      "/images/room-self-contained/self-cont3.jpeg",
    ],
  },
  {
    tag: "Budget Stay",
    title: "Double Room",
    desc: "Clean, comfortable double room with bathroom facilities. Great value for budget travellers.",
    amenities: ["Bathroom", "Double Bed", "Ceiling Fan"],
    images: [
      "/images/room-shared/room-share.jpeg",
      "/images/room-shared/room-share2.jpeg",
      "/images/room-shared/room-share4.jpeg",
      "/images/room-shared/room-share5.jpeg",
      "/images/room-shared/room-share3.jpeg",
    ],
  }
  
];

const rateRows = [
  { room: "5",  rate: "GH₵500.00", pkg: "Self-contain, Luxury with Kitchenette (DSTV)" },
  { room: "6",  rate: "GH₵350.00", pkg: "Self-contain, AC, Water Heater, Fridge, TV, Fan, Queen Bed" },
  { room: "7",  rate: "GH₵100.00", pkg: "Double Bed (Common Bathhouse), Fan" },
  { room: "8",  rate: "GH₵250.00", pkg: "Self-contain, AC, Fridge, Queens Bed, Water Heater, Fan" },
  { room: "9",  rate: "GH₵230.00", pkg: "Self-contain, AC, Fridge, Queens Bed, TV, Fan" },
  { room: "10", rate: "GH₵80.00",  pkg: "Double Bed (Common Bathhouse), Fan" },
  { room: "11", rate: "GH₵80.00",  pkg: "Double Bed (Common Bathhouse), Fan" },
  { room: "14", rate: "GH₵150.00", pkg: "Self-contain, Double Bed, Fan, TV" },
  { room: "15", rate: "GH₵150.00", pkg: "Self-contain, Double Bed, Fan, TV" },
  { room: "16", rate: "GH₵150.00", pkg: "Self-contain, Double Bed, Fan, TV" },
  { room: "17", rate: "GH₵250.00", pkg: "Self-contain, AC, Queens Bed, Fridge, TV, Water Heater, Fan" },
  { room: "19", rate: "GH₵400.00", pkg: "Self-contain, AC, Queens Bed, Fridge, TV, Water Heater, Fan, Wardrobe, Kitchenette" },
  { room: "20", rate: "GH₵150.00", pkg: "Self-contain, Double Bed, Fan, TV" },
];

export default function Rooms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    const timer = setTimeout(() => setShowSwipeHint(false), 3500);
    return () => {
      mq.removeEventListener("change", handler);
      clearTimeout(timer);
    };
  }, []);

  const scrollToBooking = () => {
    const target = document.querySelector("#booking");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="rooms"
      ref={ref}
      style={{ background: "var(--cream)", padding: "6rem 5%", position: "relative" }}
    >
      {/* ── Section Header ── */}
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
          <p style={{
            marginTop: "0.8rem",
            color: "var(--text-mid)",
            fontSize: "1rem",
            lineHeight: 1.7,
            maxWidth: "540px",
          }}>
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

      {/* ── PRICING CARD ── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.2}
        style={{
          background: "var(--earth)",
          border: "1px solid rgba(232,168,76,0.2)",
          borderRadius: "8px",
          padding: isMobile ? "1.5rem" : "2.5rem",
          marginBottom: "3rem",
          boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: isMobile ? "1.3rem" : "1.8rem",
              fontWeight: 600,
              color: "var(--gold)",
              letterSpacing: "0.1em",
            }}
          >
            TARSO HOPEX LTD
          </div>
          <div
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "var(--sand)",
              marginTop: "0.3rem",
              opacity: 0.8,
            }}
          >
            Trading as Tarso Hotel
          </div>
          <div style={{ marginTop: "0.8rem" }}>
            <span
              style={{
                display: "inline-block",
                background: "rgba(196,122,58,0.15)",
                border: "1px solid rgba(196,122,58,0.35)",
                color: "var(--clay)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase" as const,
                padding: "0.3rem 1rem",
                borderRadius: "20px",
              }}
            >
              VAT Inclusive
            </span>
          </div>
        </div>

        <div
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, var(--gold), transparent)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "60px 100px 1fr" : "80px 130px 1fr",
            paddingBottom: "0.7rem",
            borderBottom: "1px solid rgba(232,168,76,0.25)",
            marginBottom: "0.3rem",
          }}
        >
          {["Room", "Rate (GH₵)", "Package / Amenities"].map((h) => (
            <span
              key={h}
              style={{
                fontSize: isMobile ? "0.62rem" : "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                color: "var(--clay)",
                fontWeight: 700,
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Rate rows */}
        <div style={{ display: "block" }}>
          {rateRows.map((row) => (
            <motion.div
              key={row.room}
              whileHover={{ backgroundColor: "rgba(232,168,76,0.05)" }}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "60px 100px 1fr" : "80px 130px 1fr",
                padding: "0.6rem 0.4rem",
                borderBottom: "1px solid rgba(232,168,76,0.07)",
                borderRadius: "3px",
                cursor: "default",
                transition: "background 0.2s",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: isMobile ? "0.9rem" : "1.05rem",
                  fontWeight: 600,
                  color: "var(--gold)",
                }}
              >
                Room {row.room}
              </span>
              <span
                style={{
                  fontSize: isMobile ? "0.75rem" : "0.85rem",
                  fontWeight: 600,
                  color: "var(--sand)",
                }}
              >
                {row.rate}
              </span>
              <span
                style={{
                  fontSize: isMobile ? "0.68rem" : "0.75rem",
                  color: "rgba(242,221,180,0.6)",
                  lineHeight: 1.5,
                }}
              >
                {row.pkg}
              </span>
            </motion.div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid rgba(232,168,76,0.12)",
          }}
        >
          <p style={{ fontSize: "0.72rem", color: "rgba(242,221,180,0.4)", fontStyle: "italic" }}>
            All prices are VAT inclusive. Contact us for group and long-stay rates.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToBooking}
            style={{
              background: "var(--clay)",
              color: "#ffffff",
              padding: "0.7rem 2rem",
              borderRadius: "3px",
              border: "none",
              fontSize: "0.82rem",
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: "0.08em",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--terracotta)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clay)")}
          >
            Book Now
          </motion.button>
        </div>
      </motion.div>

      {/* ── ROOM CARDS ── */}
      {isMobile ? (
        <>
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "0.8rem",
              paddingBottom: "1rem",
              paddingLeft: "1px",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            {rooms.map((room) => (
              <div
                key={room.title}
                style={{
                  minWidth: "72vw",
                  maxWidth: "72vw",
                  scrollSnapAlign: "start",
                  background: "#fff",
                  borderRadius: "6px",
                  boxShadow: "0 2px 16px rgba(44,26,14,0.08)",
                  flexShrink: 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <div style={{ width: "100%", height: "160px", overflow: "hidden", flexShrink: 0 }}>
                  <Carousel
                    images={room.images}
                    alt={room.title}
                    height="160px"
                    objectFit="cover"
                    showArrows={false}
                    showDots={true}
                  />
                </div>

                {/* Body */}
                <div style={{ padding: "0.9rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase" as const,
                      color: "var(--clay)",
                    }}
                  >
                    {room.tag}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: "1.15rem",
                      fontWeight: 600,
                      color: "var(--earth)",
                      margin: "0.2rem 0 0.4rem",
                    }}
                  >
                    {room.title}
                  </h3>
                  <p style={{
                    fontSize: "0.75rem",
                    color: "var(--text-mid)",
                    lineHeight: 1.5,
                    marginBottom: "0.8rem",
                  }}>
                    {room.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginBottom: "0.9rem" }}>
                    {room.amenities.map((a) => (
                      <span
                        key={a}
                        style={{
                          fontSize: "0.62rem",
                          color: "var(--text-mid)",
                          background: "var(--cream)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "20px",
                          border: "1px solid var(--sand)",
                        }}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToBooking}
                    style={{
                      width: "100%",
                      background: "var(--clay)",
                      color: "#fff",
                      padding: "0.6rem",
                      border: "none",
                      borderRadius: "3px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase" as const,
                      cursor: "pointer",
                      marginTop: "auto",
                    }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            ))}
          </div>

          {showSwipeHint && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4, 1, 0.4, 1, 0] }}
              transition={{ duration: 3, times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1] }}
              style={{
                textAlign: "center",
                marginTop: "0.5rem",
                fontSize: "0.75rem",
                color: "var(--text-mid)",
                letterSpacing: "0.1em",
                userSelect: "none",
              }}
            >
              ← swipe to explore →
            </motion.div>
          )}
        </>
      ) : (
        <div
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
              custom={0.3 + i * 0.15}
              whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(44,26,14,0.14)" }}
              style={{
                background: "#fff",
                borderRadius: "6px",
                boxShadow: "0 2px 16px rgba(44,26,14,0.07)",
                overflow: "hidden",
                transition: "box-shadow 0.25s",
              }}
            >
              <div style={{ width: "100%", height: "240px", overflow: "hidden" }}>
                <Carousel
                  images={room.images}
                  alt={room.title}
                  height="240px"
                  objectFit="cover"
                />
              </div>

              <div style={{ padding: "1.5rem" }}>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                    color: "var(--clay)",
                  }}
                >
                  {room.tag}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    color: "var(--earth)",
                    margin: "0.3rem 0 0.5rem",
                  }}
                >
                  {room.title}
                </h3>
                <p style={{
                  fontSize: "0.83rem",
                  color: "var(--text-mid)",
                  lineHeight: 1.6,
                  marginBottom: "1.2rem",
                }}>
                  {room.desc}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.4rem" }}>
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

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={scrollToBooking}
                  style={{
                    width: "100%",
                    background: "var(--clay)",
                    color: "#fff",
                    padding: "0.75rem",
                    border: "none",
                    borderRadius: "3px",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--terracotta)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clay)")}
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}