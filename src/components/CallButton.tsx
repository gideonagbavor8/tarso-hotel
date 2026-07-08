'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function CallButton() {
  return (
    <motion.a
      href="tel:+233245132299"
      initial={{ opacity: 0, x: -30 }}
      animate={{
        opacity: 1,
        x: 0,
        boxShadow: [
          '0 4px 20px rgba(232,168,76,0.1)',
          '0 4px 24px rgba(232,168,76,0.35)',
          '0 4px 20px rgba(232,168,76,0.1)',
        ],
      }}
      transition={{
        opacity: { delay: 2.5, duration: 0.5 },
        x: { delay: 2.5, duration: 0.5 },
        boxShadow: {
          delay: 3,
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
      whileTap={{ scale: 0.93 }}
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1rem',
        zIndex: 998,
        display: 'flex',
        alignItems: 'center',
        gap: '0.45rem',
        background: 'var(--earth, #2C1A0E)',
        border: '1px solid rgba(232,168,76,0.4)',
        borderRadius: '50px',
        padding: '0.55rem 1.1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      className="call-button-mobile"
    >
      <Phone size={15} color="var(--gold, #E8A84C)" strokeWidth={2} />
      <span
        style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--sand, #F2DDB4)',
          letterSpacing: '0.05em',
        }}
      >
        Call Us
      </span>
    </motion.a>
  );
}
