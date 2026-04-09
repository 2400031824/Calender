'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function HeroImage({ src, monthLabel, year, accent, paused, quote, monthIndex }) {
  return (
    <div className="hero-section">
      <AnimatePresence mode="wait">
        <motion.img
          key={src}
          src={src}
          alt={monthLabel}
          className="h-full w-full object-cover"
          initial={{ opacity: 0 }}
          animate={paused ? { opacity: 1, scale: 1.02 } : { opacity: 1, scale: [1, 1.06, 1] }}
          exit={{ opacity: 0 }}
          transition={
            paused
              ? { opacity: { duration: 0.4 }, scale: { duration: 0.4 } }
              : {
                  opacity: { duration: 0.4 },
                  scale: { duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: 'reverse', ease: 'easeInOut' }
                }
          }
          loading="eager"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

      <motion.p
        key={`${monthLabel}-quote`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className={`month-quote quote-style-${monthIndex} absolute left-5 top-4 max-w-[82%] text-[22px] font-semibold leading-[1.18] text-white md:text-[30px]`}
      >
        {quote}
      </motion.p>

      <div
        className="absolute bottom-0 right-0 min-w-[170px] px-4 py-3 text-right text-white"
        style={{ clipPath: 'polygon(0 40%, 100% 0%, 100% 100%, 0 100%)', backgroundColor: accent }}
      >
        <p className="text-xs font-light tracking-[0.08em]">{year}</p>
        <p className="text-2xl font-extrabold uppercase tracking-[0.05em]">{monthLabel}</p>
      </div>
    </div>
  );
}
