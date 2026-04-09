'use client';

import { useCallback, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { playPaperFlipSound } from '../utils/audioSynth';

export default function usePageFlip(onMonthChange) {
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState('next');

  const runFlip = useCallback(
    (dir) => {
      if (isFlipping) return;
      setIsFlipping(true);
      setDirection(dir);
      playPaperFlipSound();
      onMonthChange((current) => (dir === 'next' ? addMonths(current, 1) : subMonths(current, 1)));
      window.setTimeout(() => {
        setIsFlipping(false);
      }, 600);
    },
    [isFlipping, onMonthChange]
  );

  const flipNext = useCallback(() => runFlip('next'), [runFlip]);
  const flipPrev = useCallback(() => runFlip('prev'), [runFlip]);

  return { isFlipping, direction, flipNext, flipPrev };
}
