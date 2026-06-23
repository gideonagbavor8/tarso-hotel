"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

export default function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1 Guest");
  const [roomType, setRoomType] = useState("Self-Contained (GH₵150)");
  const [status, setStatus] = useState<{ msg: string; ok: boolean } | null>(null);

  const today = new Date().toISOString().split("T")[0];

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      setStatus({ msg: "Please select both check-in and check-out dates.", ok: false });
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      setStatus({ msg: "Check-out must be after check-in.", ok: false });
      return;
    }
    setStatus({
      msg: "✓ Dates available! Scroll down or call us to confirm your reservation.",
      ok: true,
    });
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
      id="booking"
      ref={ref}
      style={{ background: "var(--earth)", padding: "6rem 5%" }}
    >
      {/* Header */}
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
            color: "var(--gold)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.9rem",
          }}
        >
          <span style={{ display: "block", width: "2rem", height: "1px", background: "var(--gold)" }} />
          Reservations
        </div>
        <h2
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 600,
            color: "var(--sand)",
            lineHeight: 1.15,
          }}
        >
          Book your stay
        </h2>
        <p style={{ marginTop: "0.8rem", color: "rgba(242,221,180,0.65)", fontSize: "1rem", lineHeight: 1.7, maxWidth: "540px" }}>
          Fill in your details below and we&apos;ll confirm your reservation within 24 hours.
        </p>
      </motion.div>

      {/* Booking Card */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={0.25}
        style={{
          background: "var(--cream)",
          borderRadius: "4px",
          padding: "2.5rem",
          marginTop: "2.5rem",
          boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr) auto",
            gap: "1rem",
            alignItems: "flex-end",
          }}
          className="booking-form-grid"
        >
          {/* Check-In */}
          <div>
            <label style={labelStyle}>Check-In</label>
            <input
              type="date"
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Check-Out */}
          <div>
            <label style={labelStyle}>Check-Out</label>
            <input
              type="date"
              min={today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Guests */}
          <div>
            <label style={labelStyle}>Guests</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              style={inputStyle}
            >
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4+ Guests</option>
            </select>
          </div>

          {/* Room Type */}
          <div>
            <label style={labelStyle}>Room Type</label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              style={inputStyle}
            >
              <option>Self-Contained (GH₵150)</option>
              <option>Shared Bathroom (GH₵100)</option>
              <option>Family Room (GH₵200)</option>
            </select>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleBooking}
            style={{
              background: "var(--clay)",
              color: "#fff",
              padding: "0.75rem 1.8rem",
              border: "none",
              borderRadius: "2px",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.88rem",
              fontWeight: 600,
              letterSpacing: "0.07em",
              textTransform: "uppercase" as const,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--terracotta)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--clay)")}
          >
            Check Availability
          </motion.button>
        </div>

        {/* Status */}
        {status && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: "1rem",
              fontSize: "0.85rem",
              fontWeight: 500,
              color: status.ok ? "#2a7a3a" : "var(--terracotta)",
            }}
          >
            {status.msg}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}