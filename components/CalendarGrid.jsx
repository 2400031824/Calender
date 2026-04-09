'use client';

import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfToday,
  startOfWeek
} from 'date-fns';
import { useMemo } from 'react';
import DateCell from './DateCell';

const WEEK_HEADERS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function CalendarGrid({
  month,
  selectedSingleDate,
  rangeStart,
  rangeEnd,
  previewRange,
  accent,
  holidayMap,
  dayNoteDateSet,
  rangeNoteDateSet,
  onDateClick,
  onHoverDate,
  onHolidayOpen,
  gridRef
}) {
  const today = startOfToday();

  const days = useMemo(() => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const result = [];
    let cursor = gridStart;
    while (cursor <= gridEnd) {
      result.push(cursor);
      cursor = addDays(cursor, 1);
    }

    while (result.length < 42) {
      result.push(addDays(result[result.length - 1], 1));
    }

    return result;
  }, [month]);

  return (
    <div ref={gridRef} className="space-y-2" data-grid-surface="true">
      <div className="grid grid-cols-7 gap-1">
        {WEEK_HEADERS.map((label, idx) => (
          <div
            key={label}
            className="text-center text-[10px] font-semibold tracking-[0.08em]"
            style={{ color: idx >= 5 ? accent : '#64748b' }}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const inCurrentMonth = isSameMonth(day, month);
          const holidayName = holidayMap[dateKey];
          const isSelected = !!selectedSingleDate && isSameDay(day, selectedSingleDate);
          const isStart = !!rangeStart && isSameDay(day, rangeStart);
          const isEnd = !!rangeEnd && isSameDay(day, rangeEnd);
          const inRange =
            !!rangeStart &&
            !!rangeEnd &&
            isWithinInterval(day, {
              start: rangeStart,
              end: rangeEnd
            });
          const inPreview =
            !!previewRange &&
            isWithinInterval(day, {
              start: previewRange.start,
              end: previewRange.end
            });

          return (
            <DateCell
              key={dateKey}
              label={format(day, 'd')}
              disabled={!inCurrentMonth}
              muted={!inCurrentMonth}
              isToday={isSameDay(day, today)}
              isWeekend={day.getDay() === 0 || day.getDay() === 6}
              isSelected={isSelected}
              isRangeStart={isStart}
              isRangeEnd={isEnd}
              isInRange={inRange}
              isPreviewRange={inPreview && !inRange}
              accent={accent}
              holidayName={holidayName}
              hasDayNote={dayNoteDateSet.has(dateKey)}
              hasRangeNote={rangeNoteDateSet.has(dateKey)}
              onClick={() => onDateClick(day)}
              onMouseEnter={() => onHoverDate(day)}
              onMouseLeave={() => onHoverDate(null)}
              onHolidayOpen={() => onHolidayOpen(dateKey, holidayName)}
            />
          );
        })}
      </div>
    </div>
  );
}
