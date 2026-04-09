"use client";
import React from 'react';
import { format, addMonths } from 'date-fns';
import { useCalendarState } from '../hooks/useCalendarState';
import { usePageFlip } from '../hooks/usePageFlip';
import { monthData } from '../data/monthImages';
import SpiralBinding from './SpiralBinding';
import HeroImage from './HeroImage';
import CalendarGrid from './CalendarGrid';
import MonthlyNotes from './MonthlyNotes';
import DailyNotesDrawer from './DailyNotesDrawer';
import PageCurlCorner from './PageCurlCorner';

export default function WallCalendar() {
  const { currentMonth, nextMonth, selection, handleDateInteraction, clearSelection } = useCalendarState();
  const { isFlipping, triggerFlip } = usePageFlip(nextMonth);

  const mIndex = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  const nextMonthDate = addMonths(currentMonth, 1);
  const nextMIndex = nextMonthDate.getMonth();
  const nextYear = nextMonthDate.getFullYear();

  const currentData = monthData[mIndex];
  const nextData = monthData[nextMIndex];

  const CalendarContent = ({ monthDate, data, yr }) => (
    <div className="w-full h-full bg-white rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col relative" onClick={clearSelection}>
      <HeroImage data={data} year={yr} />
      <div className="flex flex-row flex-1">
        <div className="w-[30%]">
          <MonthlyNotes monthKey={format(monthDate, 'yyyy_MM')} />
        </div>
        <div className="w-[70%]">
          <CalendarGrid
            currentMonth={monthDate}
            selection={selection}
            onDateInteraction={handleDateInteraction}
            accentColor={data.accent}
          />
        </div>
      </div>
      <DailyNotesDrawer selection={selection} accentColor={data.accent} onClose={clearSelection} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#EFEFEF] flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
      <div className="relative w-full max-w-[520px] aspect-[1/1.4] md:h-[750px] md:w-[520px] calendar-enter" style={{ perspective: '1200px' }}>

        <SpiralBinding />

        {/* Static Background page (shows next month during flip) */}
        {isFlipping && (
          <div className="absolute inset-0">
            <CalendarContent monthDate={nextMonthDate} data={nextData} yr={nextYear} />
          </div>
        )}

        {/* Flipping Page */}
        <div
          className="w-full h-full absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'top center',
            animation: isFlipping ? 'flipPage 520ms cubic-bezier(0.45, 0, 0.55, 1) forwards' : 'none'
          }}
        >
          {/* Front Face */}
          <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', backgroundColor: 'transparent' }}>
            <CalendarContent monthDate={currentMonth} data={currentData} yr={year} />
            {!isFlipping && (
              <PageCurlCorner onCurlClick={(e) => { e.stopPropagation(); triggerFlip(); clearSelection(); }} />
            )}
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)'
            }}
          >
            <CalendarContent monthDate={nextMonthDate} data={nextData} yr={nextYear} />
          </div>

          {/* Shadow during flip */}
          {isFlipping && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-50"
              style={{
                background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 0%, transparent 80%)'
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
