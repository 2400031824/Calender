'use client';

import { format, isSameMonth, parseISO } from 'date-fns';
import { useMemo } from 'react';
import { HOLIDAYS } from '../data/indianHolidays';

export default function useHolidays(currentMonth) {
  const monthHolidays = useMemo(() => {
    return Object.entries(HOLIDAYS)
      .map(([date, name]) => ({ date, name, parsed: parseISO(date) }))
      .filter((entry) => isSameMonth(entry.parsed, currentMonth))
      .sort((a, b) => a.parsed - b.parsed)
      .map((entry) => ({
        date: entry.date,
        name: entry.name,
        label: format(entry.parsed, 'MMM d')
      }));
  }, [currentMonth]);

  const holidayMap = useMemo(() => {
    return monthHolidays.reduce((acc, holiday) => {
      acc[holiday.date] = holiday.name;
      return acc;
    }, {});
  }, [monthHolidays]);

  return { monthHolidays, holidayMap };
}

