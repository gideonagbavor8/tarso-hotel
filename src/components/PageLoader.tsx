'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="page-loader"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'var(--earth, #2C1A0E)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* TARSO */}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 600,
                color: 'var(--gold, #E8A84C)',
                letterSpacing: '0.3em',
                lineHeight: 1,
                display: 'block',
              }}
            >
              TARSO
            </motion.span>

            {/* HOTEL */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1rem, 3vw, 1.8rem)',
                fontWeight: 600,
                color: 'var(--sand, #F2DDB4)',
                letterSpacing: '0.6em',
                display: 'block',
                marginTop: '-0.5rem',
              }}
            >
              HOTEL
            </motion.span>

            {/* Gold line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                height: '1px',
                background: 'var(--gold, #E8A84C)',
                margin: '1.2rem auto 0',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
