'use client';

import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';

export default function BackgroundMotion({ image, paused, children }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback(
    (event) => {
      if (paused) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;
      setOffset({ x, y });
    },
    [paused]
  );

  return (
    <div className="relative min-h-screen w-full overflow-hidden" onMouseMove={onMouseMove}>
      <motion.div
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
        animate={paused ? { scale: 1.03 } : { scale: [1, 1.06, 1] }}
        transition={{ duration: 25, ease: 'easeInOut', repeat: paused ? 0 : Number.POSITIVE_INFINITY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
          style={{
            backgroundImage: `url(${image})`,
            transform: `translate(${offset.x}px, ${offset.y}px) scale(1.06)`
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

