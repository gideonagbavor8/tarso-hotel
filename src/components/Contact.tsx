"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin, Clock, Navigation } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay },
  }),
};

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    emailPhone: "",
    subject: "Room Booking Enquiry",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus({ type: "error", message: "Full Name is required." });
      return;
    }
    if (!formData.emailPhone.trim()) {
      setStatus({ type: "error", message: "Email or Phone is required." });
      return;
    }
    if (!formData.message.trim()) {
      setStatus({ type: "error", message: "Message is required." });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      // Simulate API submit
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully. We will get back to you shortly.",
      });
      setFormData({
        name: "",
        emailPhone: "",
        subject: "Room Booking Enquiry",
        message: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styled contact items data
  const contactItems = [
    {
      icon: MapPin,
      title: "Address",
      content: "Amedzofe Road, Ho, Volta Region, Ghana",
      link: "https://maps.google.com/?q=Tarso+Hotel+Ho+Ghana",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+233 24 123 4567 / +233 20 987 6543",
      link: "tel:+233241234567",
    },
    {
      icon: Clock,
      title: "Opening Hours",
      content: "Reception: 24/7 · Chop Bar: 11 AM - 10 PM",
    },
    {
      icon: Navigation,
      title: "Getting Here",
      content: "Centrally located on Amedzofe Road, near Evangelical Presbyterian University College (EPUC).",
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "var(--earth)",
        padding: "6rem 5%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements for premium aesthetic */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(232, 168, 76, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(196, 122, 58, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          style={{ marginBottom: "4rem" }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--gold)",
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
                background: "var(--gold)",
              }}
            />
            Find Us
          </div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "var(--sand)",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Get in touch
          </h2>
          <p
            style={{
              color: "rgba(242, 221, 180, 0.7)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: "600px",
              fontFamily: "var(--font-inter)",
            }}
          >
            Have a question about our rooms, bookings, or the Tarso Chop Bar? 
            Reach out through the form below, or call our 24/7 front desk directly.
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="contact-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Contact Details & Map */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.25}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            {/* Contact Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactItems.map((item, idx) => {
                const Icon = item.icon;
                const contentNode = item.link ? (
                  <a
                    href={item.link}
                    className="hover:underline transition-all duration-200"
                    style={{ color: "rgba(242, 221, 180, 0.75)", textDecorationColor: "var(--gold)" }}
                  >
                    {item.content}
                  </a>
                ) : (
                  <span style={{ color: "rgba(242, 221, 180, 0.75)" }}>{item.content}</span>
                );

                return (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255, 255, 255, 0.02)",
                      border: "1px solid rgba(242, 221, 180, 0.08)",
                      borderRadius: "4px",
                      padding: "1.25rem",
                    }}
                    className="flex flex-col gap-2 hover:border-[rgba(232,168,76,0.2)] transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} style={{ color: "var(--gold)" }} />
                      <h4
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: "var(--sand)",
                        }}
                      >
                        {item.title}
                      </h4>
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontSize: "0.88rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {contentNode}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Map Image Block */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "220px",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/ho-landscape.png"
                alt="Ho, Volta Region, Ghana landscape"
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
              {/* Dark overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(44,26,14,0.70)",
                }}
              />
              {/* Centered content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "1.5rem",
                  textAlign: "center",
                  zIndex: 1,
                }}
              >
                <span style={{ fontSize: "2.5rem" }} className="inline-block animate-bounce mb-1">
                  📍
                </span>
                <h4
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    color: "var(--sand)",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  Find Us on Amedzofe Road
                </h4>
                <p
                  style={{
                    color: "rgba(242, 221, 180, 0.85)",
                    fontSize: "0.8rem",
                    maxWidth: "300px",
                    lineHeight: "1.6",
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  Tarso Hotel, Amedzofe Road, Ho, Volta Region, Ghana.
                </p>
                <a
                  href="https://maps.google.com/?q=Tarso+Hotel+Ho+Ghana"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--gold)",
                    paddingBottom: "2px",
                  }}
                  className="hover:text-[var(--sand)] hover:border-[var(--sand)] transition-all duration-200"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.4}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              style={{
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.05)",
                borderRadius: "8px",
                padding: "2.5rem",
              }}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label
                    htmlFor="name"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--sand)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid var(--gold)",
                      borderRadius: "2px",
                      padding: "0.75rem 1rem",
                      color: "var(--sand)",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.88rem",
                      outline: "none",
                    }}
                    className="focus:border-[var(--terracotta)] focus:bg-[rgba(255,255,255,0.08)] transition-all duration-300"
                  />
                </div>

                {/* Email or Phone */}
                <div className="flex flex-col">
                  <label
                    htmlFor="emailPhone"
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--sand)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Email or Phone *
                  </label>
                  <input
                    type="text"
                    id="emailPhone"
                    name="emailPhone"
                    required
                    value={formData.emailPhone}
                    onChange={handleInputChange}
                    placeholder="email@example.com or +233..."
                    style={{
                      background: "rgba(255, 255, 255, 0.06)",
                      border: "1px solid var(--gold)",
                      borderRadius: "2px",
                      padding: "0.75rem 1rem",
                      color: "var(--sand)",
                      fontFamily: "var(--font-inter)",
                      fontSize: "0.88rem",
                      outline: "none",
                    }}
                    className="focus:border-[var(--terracotta)] focus:bg-[rgba(255,255,255,0.08)] transition-all duration-300"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col">
                <label
                  htmlFor="subject"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--sand)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid var(--gold)",
                    borderRadius: "2px",
                    padding: "0.75rem 1rem",
                    color: "var(--sand)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.88rem",
                    outline: "none",
                  }}
                  className="focus:border-[var(--terracotta)] focus:bg-[rgba(255,255,255,0.08)] transition-all duration-300 cursor-pointer"
                >
                  <option
                    value="Room Booking Enquiry"
                    style={{ background: "var(--earth)", color: "var(--sand)" }}
                  >
                    Room Booking Enquiry
                  </option>
                  <option
                    value="Chop Bar Reservation"
                    style={{ background: "var(--earth)", color: "var(--sand)" }}
                  >
                    Chop Bar Reservation
                  </option>
                  <option
                    value="Event or Group Stay"
                    style={{ background: "var(--earth)", color: "var(--sand)" }}
                  >
                    Event or Group Stay
                  </option>
                  <option
                    value="General Question"
                    style={{ background: "var(--earth)", color: "var(--sand)" }}
                  >
                    General Question
                  </option>
                </select>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--sand)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help you? Share details about your query..."
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid var(--gold)",
                    borderRadius: "2px",
                    padding: "0.75rem 1rem",
                    color: "var(--sand)",
                    fontFamily: "var(--font-inter)",
                    fontSize: "0.88rem",
                    outline: "none",
                    resize: "vertical",
                  }}
                  className="focus:border-[var(--terracotta)] focus:bg-[rgba(255,255,255,0.08)] transition-all duration-300"
                />
              </div>

              {/* Status Message */}
              {status && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 500,
                    padding: "0.85rem 1rem",
                    borderRadius: "2px",
                    background:
                      status.type === "success"
                        ? "rgba(40, 167, 69, 0.15)"
                        : "rgba(220, 53, 69, 0.15)",
                    border:
                      status.type === "success"
                        ? "1px solid rgba(40, 167, 69, 0.3)"
                        : "1px solid rgba(220, 53, 69, 0.3)",
                    color: status.type === "success" ? "#81c784" : "#e57373",
                  }}
                >
                  {status.message}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: "var(--clay)",
                  color: "#fff",
                  padding: "0.85rem 2rem",
                  border: "none",
                  borderRadius: "2px",
                  fontFamily: "var(--font-inter)",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  width: "100%",
                }}
                className="hover:bg-[var(--terracotta)] transition-colors duration-300"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
