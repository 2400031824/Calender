'use client';

import { motion } from 'framer-motion';
import { QUOTES } from '../data/monthQuotes';

export default function QuoteDisplay({ monthIndex, accent }) {
  return (
    <motion.p
      key={monthIndex}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.6 }}
      className="text-xs italic leading-5"
      style={{ color: `${accent}cc` }}
    >
      {QUOTES[monthIndex]}
    </motion.p>
  );
}

