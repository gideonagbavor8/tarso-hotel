"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageLoaderProps {
  children: React.ReactNode;
}

export default function PageLoader({ children }: PageLoaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "var(--earth)",
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {/* Logo/Name with fade-in and scale animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ textAlign: "center" }}
            >
              <h1
                style={{
                  fontFamily: "var(--font-cormorant)",
                  color: "var(--gold)",
                  fontSize: "3.5rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  marginBottom: "0.2rem",
                }}
              >
                Tarso Hotel
              </h1>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  color: "var(--sand)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.8,
                }}
              >
                Ho · Volta Region
              </span>
            </motion.div>

            {/* Custom Progress Bar Loader */}
            <motion.div
              style={{
                width: "80px",
                height: "2px",
                background: "var(--gold)",
                borderRadius: "2px",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
