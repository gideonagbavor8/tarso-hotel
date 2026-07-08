'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselProps {
  images: string[];
  alt: string;
  height?: string;
  showArrows?: boolean;
  showDots?: boolean;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// Helper function to handle wrapping index
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function Carousel({
  images,
  alt,
  height = '400px',
  showArrows = true,
  showDots = true,
}: CarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const imageIndex = wrap(0, images.length, page);

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, paginate, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden group"
      style={{ height, borderRadius: '3px' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'tween', duration: 0.6, ease: 'easeInOut' },
            opacity: { duration: 0.6 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={images[imageIndex]}
            alt={`${alt} - Slide ${imageIndex + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={imageIndex === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          />
        </motion.div>
      </AnimatePresence>

      {showArrows && images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'rgba(44,26,14,0.5)',
              color: 'var(--gold, #E8A84C)',
              border: '1px solid rgba(232,168,76,0.3)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
            }}
            onClick={(e) => {
              e.preventDefault();
              paginate(-1);
            }}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'rgba(44,26,14,0.5)',
              color: 'var(--gold, #E8A84C)',
              border: '1px solid rgba(232,168,76,0.3)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
            }}
            onClick={(e) => {
              e.preventDefault();
              paginate(1);
            }}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {showDots && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex z-10" style={{ gap: '6px' }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                const newDirection = idx > imageIndex ? 1 : -1;
                if (idx !== imageIndex) {
                  setPage([page + (idx - imageIndex), newDirection]);
                }
              }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: idx === imageIndex ? 'var(--gold, #E8A84C)' : 'rgba(242,221,180,0.4)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
