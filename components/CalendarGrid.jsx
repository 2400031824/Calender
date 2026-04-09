"use client";
import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import DateCell from './DateCell';

export default function CalendarGrid({ currentMonth, selection, onDateInteraction, accentColor }) {
    // Use weekStartsOn: 1 to start on Monday
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const dateFormat = "eeee";
    const days = [];
    const dayLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

    const gridDays = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    return (
        <div className="flex-1 px-4 py-2 flex flex-col h-full bg-white select-none">
            {/* Header */}
            <div className="grid grid-cols-7 mb-2">
                {dayLabels.map((day, i) => (
                    <div
                        key={day}
                        className="text-center text-[10px] md:text-xs font-bold tracking-wider"
                        style={{ color: (day === 'SAT' || day === 'SUN') ? '#1DA9E2' : '#333333' }}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-7 gap-y-1 md:gap-y-2 flex-grow auto-rows-fr">
                {gridDays.map((dayObj, i) => (
                    <DateCell
                        key={dayObj.toISOString()}
                        dateObj={dayObj}
                        currentMonth={currentMonth}
                        selection={selection}
                        onClick={onDateInteraction}
                        accentColor={accentColor}
                    />
                ))}
            </div>
        </div>
    );
}
