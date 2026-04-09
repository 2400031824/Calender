"use client";
import React from 'react';
import { isSameMonth, isSameDay, isToday, startOfDay, isWeekend } from 'date-fns';
import { getHolidayForDate } from '../data/indianHolidays';

export default function DateCell({
    dateObj,
    currentMonth,
    selection,
    onClick,
    accentColor = "#1DA9E2"
}) {
    const isCurrentMonth = isSameMonth(dateObj, currentMonth);
    const isDayToday = isToday(dateObj);
    const weekend = isWeekend(dateObj);
    const holiday = getHolidayForDate(dateObj);

    // Range logic
    const { start, end } = selection;
    const tDate = startOfDay(dateObj).getTime();
    const tStart = start ? startOfDay(start).getTime() : null;
    const tEnd = end ? startOfDay(end).getTime() : null;

    let isSelected = false;
    let isStart = false;
    let isEnd = false;
    let isMid = false;

    if (tStart && !tEnd && tStart === tDate) {
        isSelected = true;
        isStart = true;
        isEnd = true;
    } else if (tStart && tEnd) {
        if (tDate === tStart) { isSelected = true; isStart = true; }
        if (tDate === tEnd) { isSelected = true; isEnd = true; }
        if (tDate > tStart && tDate < tEnd) { isSelected = true; isMid = true; }
    }

    // Styles
    let textColor = isCurrentMonth ? (weekend ? '#1DA9E2' : '#333333') : '#cccccc';
    let bgColor = 'transparent';
    let borderRadius = '0';

    if (isSelected) {
        textColor = (isStart || isEnd) ? '#ffffff' : '#333333';
        if (isStart && isEnd) {
            bgColor = accentColor;
            borderRadius = '50%';
        } else if (isStart) {
            bgColor = accentColor;
            borderRadius = '50% 0 0 50%';
        } else if (isEnd) {
            bgColor = accentColor;
            borderRadius = '0 50% 50% 0';
        } else if (isMid) {
            // Lighten the accent color for the middle using color-mix
            bgColor = `color-mix(in srgb, ${accentColor} 30%, transparent)`;
            borderRadius = '0';
        }
    }

    return (
        <div
            className={`relative flex items-center justify-center cursor-pointer transition-colors duration-200 aspect-square ${!isCurrentMonth ? 'opacity-70' : ''}`}
            onClick={(e) => { e.stopPropagation(); onClick(dateObj); }}
        >
            {/* Background shape to handle range styling while keeping it edge-to-edge if needed */}
            <div
                className="absolute inset-y-1 inset-x-0 transition-all duration-200"
                style={{
                    backgroundColor: isSelected ? bgColor : 'transparent',
                    borderRadius: borderRadius,
                    left: (isStart && !isEnd) ? '10%' : (isMid ? '-1px' : (isEnd && !isStart && isSelected ? '-1px' : '0')),
                    right: (isEnd && !isStart) ? '10%' : (isMid ? '-1px' : (isStart && !isEnd && isSelected ? '-1px' : '0')),
                    width: isStart && isEnd ? '80%' : 'auto',
                    margin: isStart && isEnd ? '0 auto' : '0'
                }}
            />

            {/* Text element */}
            <div
                className={`relative z-10 flex flex-col items-center justify-center w-full h-full font-medium ${isDayToday && !isSelected ? 'font-bold' : ''}`}
                style={{ color: textColor }}
            >
                <span className={isDayToday && !isSelected ? 'border-b-2 border-gray-400 leading-none pb-0.5' : 'leading-none'}>
                    {dateObj.getDate()}
                </span>

                {/* Holiday dot */}
                {holiday && (
                    <div
                        className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: accentColor }}
                        title={holiday.name}
                    />
                )}
            </div>
        </div>
    );
}
