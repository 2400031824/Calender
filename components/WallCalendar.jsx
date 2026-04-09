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
      ? 'flipPageUp 700ms cubic-bezier(0.3, 0.8, 0.4, 1) forwards'
      : 'flipPageDown 700ms cubic-bezier(0.3, 0.8, 0.4, 1) forwards';
  }

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen items-center justify-center p-4 md:p-8 lg:p-12 xl:p-16 gap-6 lg:gap-10 calendar-enter">

      {/* LEFT COMPONENT (25%): Notes + Holidays Block */}
      <div className="w-full lg:w-[25%] max-w-[450px] lg:max-w-none h-auto min-h-[400px] lg:h-[700px] flex shrink-0 drop-shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
        <MonthlyNotes monthKey={monthKey} isFlipping={flipState.isFlipping} />
      </div>

      {/* RIGHT COMPONENT (75%): Master Calendar Area */}
      <div className="w-full lg:w-[75%] max-w-[1000px] h-[600px] lg:h-[700px] flex justify-center relative perspective-[2500px]">
        {/* Flipping Calendar Page Container */}
        <div
          className="w-full h-full relative bg-white/95 backdrop-blur-2xl rounded-xl border border-white/60 flex flex-col overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.1)]"
          style={{
            transformOrigin: 'top center',
            animation: animationClass
          }}
        >
          <HeroImage data={data} year={currDate.getFullYear()} isFlipping={flipState.isFlipping} />
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
          {/* The physical spirals lock onto the top of the calendar board permanently */}
          <SpiralBinding />
        </div>

        {/* Paper Click Target Corners (Rendered outside the flip animation to avoid disappearing bounds) */}
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
