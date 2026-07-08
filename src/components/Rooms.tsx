"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

import Carousel from "@/components/Carousel";

function TiltCard({ children, style, className }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    setIsDesktop(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotateX(((y - centerY) / centerY) * -8);
    setRotateY(((x - centerX) / centerX) * 8);
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    if (isDesktop) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!isDesktop) return;
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovering ? "transform 0.15s ease" : "transform 0.4s ease",
        position: "relative",
      }}
    >
      {isDesktop && isHovering && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            pointerEvents: "none",
            zIndex: 10,
          }}
        />
      )}
      {children}
    </div>
  );
}

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
    images: [
      "/images/room-self-contained/room-selfcontained.png",
      "/images/room-self-contained/IMG-20260706-WA0012.jpg",
      "/images/room-self-contained/IMG-20260706-WA0013.jpg",
      "/images/room-self-contained/IMG-20260706-WA0035.jpg",
      "/images/room-self-contained/IMG-20260706-WA0064.jpg",
      "/images/room-self-contained/IMG-20260706-WA0071.jpg"
    ],
    span: true,
  },
  {
    tag: "Budget Stay",
    title: "Shared Bathroom Room",
    desc: "Clean, comfortable single room with shared bathroom facilities. Great value for the budget-conscious traveller.",
    amenities: ["Shared Bathroom", "Single Bed", "Ceiling Fan"],
    price: "GH₵100",
    images: [
      "/images/room-shared/room-shared.png",
      "/images/room-shared/IMG-20260706-WA0014.jpg",
      "/images/room-shared/IMG-20260706-WA0028.jpg",
      "/images/room-shared/IMG-20260706-WA0029.jpg",
      "/images/room-shared/IMG-20260706-WA0032.jpg",

    ],
    span: false,
  },
  {
    tag: "Extended Stay",
    title: "Family Room",
    desc: "A spacious room with two beds, suitable for families or colleagues travelling together.",
    amenities: ["Two Beds", "En-suite", "Ceiling Fan"],
    price: "GH₵200",
    images: [
      "/images/room-family/room-family.jpeg",
      "/images/room-family/IMG-20260706-WA0039.jpg",
      "/images/room-family/IMG-20260706-WA0042.jpg",
      "/images/room-family/IMG-20260706-WA0045.jpg",
      "/images/room-family/IMG-20260706-WA0054.jpg",
      "/images/room-family/IMG-20260706-WA0055.jpg",
      "/images/room-family/IMG-20260706-WA0058.jpg",
      "/images/room-family/IMG-20260706-WA0061.jpg",
      "/images/room-family/IMG-20260706-WA0062.jpg"
    ],
    span: false,
  },
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
    // Hide swipe hint after 3.5s
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
      style={{ background: "var(--cream)", padding: "6rem 0", position: "relative" }}
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
          padding: "0 5%",
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

      {/* Rooms — desktop grid / mobile scroll carousel */}
      {isMobile ? (
        <>
          {/* Mobile: horizontal scroll snap carousel */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              gap: "1rem",
              padding: "0 5% 1.5rem",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
            // hide webkit scrollbar via className
            className="rooms-mobile-scroll"
          >
            {rooms.map((room, i) => (
              <div
                key={room.title}
                style={{
                  minWidth: "85vw",
                  scrollSnapAlign: "start",
                  background: "#fff",
                  borderRadius: "3px",
                  boxShadow: "0 2px 16px rgba(44,26,14,0.07)",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
            <TiltCard style={{ width: "100%", height: "100%", borderRadius: "3px", overflow: "hidden" }}>
            {/* Room Image */}
            <div
              style={{
                width: "100%",
                height: room.span ? "280px" : "200px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Carousel 
                images={room.images} 
                alt={room.title} 
                height="100%" 
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
                  zIndex: 20,
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
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
              </TiltCard>
            </div>
            ))}
          </div>

          {/* Swipe hint */}
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
        /* Desktop: 3-column grid with TiltCard */
        <div
          className="rooms-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
            padding: "0 5%",
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
                boxShadow: "0 2px 16px rgba(44,26,14,0.07)",
                gridColumn: room.span ? "span 2" : "span 1",
                transition: "box-shadow 0.25s",
              }}
            >
              <TiltCard style={{ width: "100%", height: "100%", borderRadius: "3px", overflow: "hidden" }}>
              {/* Room Image */}
              <div
                style={{
                  width: "100%",
                  height: room.span ? "280px" : "200px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Carousel
                  images={room.images}
                  alt={room.title}
                  height="100%"
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
                    zIndex: 20,
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
              </TiltCard>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}