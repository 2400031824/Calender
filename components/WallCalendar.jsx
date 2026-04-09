"use client";
import React, { useState } from 'react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

import SpiralBinding from './SpiralBinding';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import MonthlyNotes from './MonthlyNotes';
import PageCurlCorner from './PageCurlCorner';
import DailyNotesDrawer from './DailyNotesDrawer';

import { useCalendarState } from '../hooks/useCalendarState';
import { usePageFlip } from '../hooks/usePageFlip';
import { monthData } from '../data/monthImages';

export default function WallCalendar() {
  const { currDate, nextMonth, prevMonth } = useCalendarState();
  const { isFlipping, triggerFlip } = usePageFlip();
  const [selection, setSelection] = useState({ start: null, end: null });

  const mIndex = currDate.getMonth();
  const data = monthData[mIndex] || monthData[0];
  const monthKey = format(currDate, 'yyyy_MM');

  // Bottom Right -> Next Month
  const handleNextClick = () => {
    if (isFlipping) return;
    setSelection({ start: null, end: null });
    triggerFlip(() => nextMonth());
  };

  // Top Right -> Prev Month
  const handlePrevClick = () => {
    if (isFlipping) return;
    setSelection({ start: null, end: null });
    triggerFlip(() => prevMonth());
  };

  const clearSelection = () => setSelection({ start: null, end: null });

  return (
    <div className="relative w-full max-w-[900px] h-full md:h-[650px] calendar-enter" style={{ perspective: '2000px' }}>

      {/* The Master Glassmorphism & Framer Motion Wrap */}
      <motion.div
        animate={{
          y: [0, -8, 0],
          boxShadow: [
            "0px 15px 30px rgba(0,0,0,0.1)",
            "0px 25px 50px rgba(0,0,0,0.15)",
            "0px 15px 30px rgba(0,0,0,0.1)"
          ]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-full h-full relative"
      >
        {/* Visual rendering of the Page */}
        <div
          className="absolute inset-0 bg-white/20 backdrop-blur-2xl rounded-lg border border-white/50 flex flex-col md:flex-row overflow-hidden shadow-2xl"
          style={{
            transformOrigin: 'top center',
            animation: isFlipping ? 'flipPage 550ms ease-in-out forwards' : 'none'
          }}
        >
          {/* Left Notes Section */}
          <div className="hidden md:block w-[30%] shrink-0 z-10">
            <MonthlyNotes monthKey={monthKey} />
          </div>

          {/* Right Calendar Container */}
          <div className="flex-1 flex flex-col relative z-0">
            <HeroImage data={data} year={currDate.getFullYear()} />
            <CalendarGrid
              currDate={currDate}
              selection={selection}
              setSelection={setSelection}
              accentColor={data.accent}
            />
            <DailyNotesDrawer
              selection={selection}
              accentColor={data.accent}
              onClose={clearSelection}
            />
          </div>
        </div>

        {/* Physical Decor */}
        <SpiralBinding />
        <PageCurlCorner position="top" onCurlClick={handlePrevClick} />
        <PageCurlCorner position="bottom" onCurlClick={handleNextClick} />

      </motion.div>
    </div>
  );
}
