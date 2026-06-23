"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

const initialReviews = [
  {
    id: 1,
    stars: 5,
    text: "The staff here make you feel like family. Clean room, great food at the chop bar, and the location is unbeatable for exploring Ho.",
    name: "Kwame Afeloto",
    location: "Accra, Ghana",
    initials: "KA",
    color: "var(--clay)",
  },
  {
    id: 2,
    stars: 4,
    text: "Stayed here for three nights during a conference in Ho. Quiet, affordable, and the banku with tilapia at the chop bar was the best I've had in the Volta Region.",
    name: "James Dzikunu",
    location: "Kumasi, Ghana",
    initials: "JD",
    color: "var(--bark)",
  },
  {
    id: 3,
    stars: 4,
    text: "A genuine, no-frills hotel with real Ghanaian hospitality. The rooms are well kept and the price is fair. I'll always stop here on my way through Ho.",
    name: "Ben Ofori",
    location: "Volta, Ghana",
    initials: "BO",
    color: "var(--terracotta)",
  },
];

const avatarColors = ["var(--clay)", "var(--bark)", "var(--terracotta)"];

export default function Reviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [reviews, setReviews] = useState(initialReviews);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [status, setStatus] = useState("");

  const submitReview = () => {
    if (!name.trim() || !text.trim() || rating === 0) {
      setStatus("Please fill in your name, rating, and review.");
      return;
    }
    const initials = name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    const newReview = {
      id: Date.now(),
      stars: rating,
      text,
      name,
      location: location || "Ghana",
      initials,
      color: avatarColors[Math.floor(Math.random() * avatarColors.length)],
    };
    setReviews([newReview, ...reviews]);
    setName("");
    setLocation("");
    setText("");
    setRating(0);
    setStatus("✓ Thank you! Your review has been posted.");
  };

  const inputStyle = {
    padding: "0.75rem 1rem",
    border: "1px solid var(--sand)",
    borderRadius: "2px",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.88rem",
    background: "#fff",
    color: "var(--text-dark)",
    outline: "none",
    width: "100%",
  };

  const labelStyle = {
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "var(--text-mid)",
    marginBottom: "0.4rem",
    display: "block",
  };

  return (
    <section
      id="reviews"
      ref={ref}
      style={{ background: "var(--cream)", padding: "6rem 5%" }}
    >
      {/* Header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.1}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "3rem",
        }}
      >
        <div>
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
            Guest Reviews
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
            What our guests say
          </h2>
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "3.5rem",
              fontWeight: 600,
              color: "var(--earth)",
              lineHeight: 1,
            }}
          >
            4.5
          </div>
          <div style={{ color: "var(--gold)", fontSize: "1.1rem", letterSpacing: "0.1em" }}>
            ★★★★½
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-mid)", marginTop: "0.3rem" }}>
            Based on {reviews.length + 45} reviews
          </div>
        </div>
      </motion.div>

      {/* Reviews Grid */}
      <div
        className="reviews-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <AnimatePresence>
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i < 3 ? 0.1 * i : 0 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(44,26,14,0.12)" }}
              style={{
                background: "#fff",
                padding: "1.8rem",
                borderRadius: "3px",
                boxShadow: "0 2px 12px rgba(44,26,14,0.06)",
                transition: "box-shadow 0.25s",
              }}
            >
              <div style={{ color: "var(--gold)", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
              </div>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "var(--text-mid)",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "1.2rem",
                }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: review.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    flexShrink: 0,
                  }}
                >
                  {review.initials}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.83rem", color: "var(--earth)" }}>
                    {review.name}
                  </div>
                  <div style={{ fontSize: "0.73rem", color: "var(--text-mid)" }}>
                    {review.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Review Form */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.4}
        style={{
          background: "#fff",
          padding: "2.5rem",
          borderRadius: "4px",
          boxShadow: "0 2px 16px rgba(44,26,14,0.07)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "1.6rem",
            fontWeight: 600,
            color: "var(--earth)",
            marginBottom: "1.5rem",
          }}
        >
          Share your experience
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            <label style={labelStyle}>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Akosua Boateng"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Your Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Ho, Ghana"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Star Rating */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Rating</label>
          <div style={{ display: "flex", gap: "0.3rem" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.span
                key={star}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                style={{
                  fontSize: "1.8rem",
                  cursor: "pointer",
                  color: star <= (hovered || rating) ? "var(--gold)" : "var(--sand)",
                  transition: "color 0.15s",
                }}
              >
                ★
              </motion.span>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Your Review</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Tell others about your stay at Tarso Hotel..."
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={submitReview}
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
          Submit Review
        </motion.button>

        {status && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: "1rem",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: status.startsWith("✓") ? "#2a7a3a" : "var(--terracotta)",
            }}
          >
            {status}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}