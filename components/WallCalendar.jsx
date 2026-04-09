"use client";
import React, { useState } from 'react';
import { format } from 'date-fns';

import SpiralBinding from './SpiralBinding';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import MonthlyNotes from './MonthlyNotes';
import PageCurlCorner from './PageCurlCorner';
import DailyNotesDrawer from './DailyNotesDrawer';

import { useCalendarState } from '../hooks/useCalendarState';
import { usePageFlip } from '../hooks/usePageFlip';
import { monthData } from '../data/monthImages';
import { playPageTurnSound } from '../utils/audioSynth';

export default function WallCalendar() {
  const { currDate, nextMonth, prevMonth, selection, setSelection, handleDateInteraction } = useCalendarState();
  const { flipState, triggerFlip } = usePageFlip();

  const mIndex = currDate.getMonth();
  const data = monthData[mIndex] || monthData[0];
  const monthKey = format(currDate, 'yyyy_MM');

  const handleNextClick = () => {
    if (flipState.isFlipping) return;
    setSelection({ start: null, end: null });
    playPageTurnSound();
    triggerFlip('forward', () => nextMonth());
  };

  const handlePrevClick = () => {
    if (flipState.isFlipping) return;
    setSelection({ start: null, end: null });
    playPageTurnSound();
    triggerFlip('backward', () => prevMonth());
  };

  const clearSelection = () => setSelection({ start: null, end: null });

  let animationClass = 'none';
  if (flipState.isFlipping) {
    animationClass = flipState.direction === 'forward'
      ? 'flipPageForward 650ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
      : 'flipPageBackward 650ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
  }

  return (
    <div className="relative w-full max-w-[900px] h-full md:h-[650px] calendar-enter" style={{ perspective: '2000px' }}>

      {/* Container Frame stripped of float animations for strict controlled motion */}
      <div className="w-full h-full relative rounded-lg drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]">

        {/* Visual rendering of the Page */}
        <div
          className="absolute inset-0 bg-white/50 backdrop-blur-3xl rounded-lg border border-white/50 flex flex-col md:flex-row overflow-hidden"
          style={{
            transformOrigin: 'center center',
            animation: animationClass,
            backfaceVisibility: 'hidden'
          }}
        >
          {/* Left Notes Section */}
          <div className="hidden md:block w-[30%] shrink-0 z-10">
            <MonthlyNotes monthKey={monthKey} />
          </div>

          {/* Right Calendar Container */}
          <div className="flex-1 flex flex-col relative z-0 bg-white/10">
            <HeroImage data={data} year={currDate.getFullYear()} />
            <CalendarGrid
              currentMonth={currDate}
              selection={selection}
              onDateInteraction={handleDateInteraction}
              accentColor={data.accent}
            />
            <DailyNotesDrawer
              selection={selection}
              accentColor={data.accent}
              onClose={clearSelection}
            />
          </div>
        </div>

        {/* Physical Decor remains steady overlay */}
        <SpiralBinding />

        {/* Interaction zones */}
        {!flipState.isFlipping && (
          <>
            <PageCurlCorner position="top" onCurlClick={handlePrevClick} />
            <PageCurlCorner position="bottom" onCurlClick={handleNextClick} />
          </>
        )}
      </div>
    </div>
  );
}
