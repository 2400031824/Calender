'use client';

import { motion } from 'framer-motion';

export default function PageCurlCorner({ position, onClick, disabled }) {
  const className =
    position === 'bottom-right'
      ? 'page-curl page-curl-bottom-right'
      : 'page-curl page-curl-top-right';

  const arrowClass = position === 'bottom-right' ? 'arrow-right' : 'arrow-left';

  return (
    <motion.button
      type="button"
      className={className}
      data-keep-selection="true"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.3, boxShadow: '0 0 18px rgba(255,255,255,0.45)' }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      aria-label={position === 'bottom-right' ? 'Next month' : 'Previous month'}
    >
      <span className="page-curl-shadow" />
      <span className={`page-curl-arrow ${arrowClass}`}>▶</span>
    </motion.button>
  );
}

