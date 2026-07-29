"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
    text: "A relaxing Guest House in the Volta Region precisely Ho opposite E.P University College. Highly recommended.",
    name: "CHRIS-BRIGHT DAVID",
    location: "Ho, Volta Region",
    initials: "CD",
    color: "var(--clay)",
    badge: "Local Guide",
  },
  {
    id: 2,
    stars: 5,
    text: "A home away from home. The environment is peaceful and the staff are very welcoming. Perfect for a vacation stay in Ho.",
    name: "Saviour Kwaku Dugah",
    location: "Ghana",
    initials: "SD",
    color: "var(--bark)",
    badge: "Local Guide",
  },
  {
    id: 3,
    stars: 4,
    text: "I had a good stay in Tarso Hotel. It's quite big and spacious. It's in an ideal location, quiet and serene. Very affordable as well. The members of staff are good and friendly.",
    name: "Captain TRAC",
    location: "Ghana",
    initials: "CT",
    color: "var(--terracotta)",
    badge: "Local Guide · 896 reviews",
  },
  {
    id: 4,
    stars: 5,
    text: "The place is so romantic, family and friends are welcome for weekend relaxation, wedding parties and many more.",
    name: "Gadegbeku Robert",
    location: "Ho, Ghana",
    initials: "GR",
    color: "var(--clay)",
    badge: "Local Guide",
  },
  {
    id: 5,
    stars: 4,
    text: "The restaurant is neat and affordable. Try to visit when you are in Ho. You will not regret it.",
    name: "Victor Narh",
    location: "Ho, Ghana",
    initials: "VN",
    color: "var(--bark)",
    badge: "Local Guide",
  },
  {
    id: 6,
    stars: 5,
    text: "Homely. Where you experience Ghanaian culture at its finest. I love the environment there.",
    name: "Prosper Kpodo-Tay",
    location: "Volta Region, Ghana",
    initials: "PK",
    color: "var(--terracotta)",
    badge: "Verified Guest",
  },
];

const avatarColors = ["var(--clay)", "var(--bark)", "var(--terracotta)"];


function ReviewCarousel({ reviews }: { reviews: typeof initialReviews }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
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

  const review = reviews[current];

  return (
    <div
      style={{ marginBottom: "3rem" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Card */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "8px",
          minHeight: "320px",
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={review.id}
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
              background: "#fff",
              padding: "2.5rem",
              borderRadius: "8px",
              boxShadow: "0 2px 12px rgba(44,26,14,0.06)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {/* Stars */}
            <div>
              <div style={{ color: "var(--gold)", fontSize: "1.1rem", marginBottom: "1rem" }}>
                {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
              </div>
              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--text-mid)",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  marginBottom: "1.5rem",
                  fontFamily: "var(--font-cormorant)",
                }}
              >
                &ldquo;{review.text}&rdquo;
              </p>
            </div>

            {/* Author */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: review.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  flexShrink: 0,
                }}
              >
                {review.initials}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--earth)" }}>
                  {review.name}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-mid)" }}>
                  {review.location}
                </div>
                {review.badge && (
                  <div
                    style={{
                      display: "inline-block",
                      marginTop: "0.25rem",
                      fontSize: "0.62rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      color: "var(--clay)",
                      background: "rgba(196,122,58,0.08)",
                      border: "1px solid rgba(196,122,58,0.2)",
                      borderRadius: "20px",
                      padding: "0.15rem 0.5rem",
                    }}
                  >
                    {review.badge}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <button
          onClick={prev}
          style={{
            background: "rgba(44,26,14,0.08)",
            border: "1px solid rgba(196,122,58,0.3)",
            borderRadius: "50%",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--clay)",
          }}
          aria-label="Previous review"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Dots */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > current ? 1 : -1);
                setCurrent(i);
              }}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "20px",
                background: i === current ? "var(--clay)" : "rgba(196,122,58,0.3)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          style={{
            background: "rgba(44,26,14,0.08)",
            border: "1px solid rgba(196,122,58,0.3)",
            borderRadius: "50%",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--clay)",
          }}
          aria-label="Next review"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Counter */}
      <div style={{ textAlign: "center", marginTop: "0.8rem", fontSize: "0.75rem", color: "var(--text-mid)" }}>
        {current + 1} of {reviews.length} reviews
      </div>
    </div>
  );
}


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
      badge: "Verified Guest",
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
          <p style={{ marginTop: "0.6rem", color: "var(--text-mid)", fontSize: "0.9rem" }}>
            Real reviews from Google Maps
          </p>
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
            3.9
          </div>
          <div style={{ color: "var(--gold)", fontSize: "1.1rem", letterSpacing: "0.1em" }}>
            ★★★★
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--text-mid)", marginTop: "0.3rem" }}>
            Based on 50+ Google reviews
          </div>
          
            <a href="https://www.google.com/maps/place/Tarso+Hotel/@6.610329,0.4697666,17z/data=!4m11!3m10!1s0x10272519df2ccbd7:0x4f06cdc7d622810e!5m2!4m1!1i2!8m2!3d6.610329!4d0.4723415!9m1!1b1!16s%2Fg%2F11c54924bp?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "0.5rem",
              fontSize: "0.72rem",
              color: "var(--clay)",
              textDecoration: "none",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            View on Google Maps
          </a>
        </div>
      </motion.div>

      {/* Reviews Carousel */}
      <ReviewCarousel reviews={reviews} />

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
            marginBottom: "0.4rem",
          }}
        >
          Share your experience
        </h3>
        <p style={{ fontSize: "0.82rem", color: "var(--text-mid)", marginBottom: "1.5rem" }}>
          Stayed at Tarso Hotel? We would love to hear from you.
        </p>

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

        {/* Two action buttons */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
              flex: 1,
              minWidth: "160px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--terracotta)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clay)")}
          >
            Post on Website
          </motion.button>

          <motion.a
            href="https://www.google.com/maps/place/Tarso+Hotel/@6.610329,0.4697666,17z/data=!4m11!3m10!1s0x10272519df2ccbd7:0x4f06cdc7d622810e!5m2!4m1!1i2!8m2!3d6.610329!4d0.4723415!9m1!1b1!16s%2Fg%2F11c54924bp?entry=ttu&g_ep=EgoyMDI2MDcyMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              background: "#fff",
              color: "var(--earth)",
              padding: "0.85rem 2rem",
              border: "1px solid var(--sand)",
              borderRadius: "2px",
              fontSize: "0.88rem",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
              textDecoration: "none",
              flex: 1,
              minWidth: "160px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--clay)";
              e.currentTarget.style.color = "var(--clay)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--sand)";
              e.currentTarget.style.color = "var(--earth)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4285F4"/>
            </svg>
            Review on Google
          </motion.a>
        </div>

        {/* Helper text */}
        <p style={{ marginTop: "0.8rem", fontSize: "0.75rem", color: "var(--text-mid)", fontStyle: "italic" }}>
          Post on Website to share here, or Review on Google to help others find Tarso Hotel on Google Maps.
        </p>

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