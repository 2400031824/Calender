'use client';

import { useCallback, useMemo, useState } from 'react';
import { isAfter, isBefore, isSameDay, isWithinInterval, startOfMonth, startOfToday } from 'date-fns';

export default function useCalendarState() {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(startOfToday()));
  const [selectedSingleDate, setSelectedSingleDate] = useState(null);
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const clearSelection = useCallback(() => {
    setSelectedSingleDate(null);
    setRangeStart(null);
    setRangeEnd(null);
    setHoverDate(null);
  }, []);

  const setMonthWithReset = useCallback(
    (updater) => {
      setCurrentMonth(updater);
      clearSelection();
    },
    [clearSelection]
  );

  const selectRange = useCallback((start, end) => {
    setRangeStart(start);
    setRangeEnd(end);
    setSelectedSingleDate(null);
    setHoverDate(null);
  }, []);

  const selectSingle = useCallback((date) => {
    setRangeStart(null);
    setRangeEnd(null);
    setHoverDate(null);
    setSelectedSingleDate(date);
  }, []);

  const openDayWithinRange = useCallback((date) => {
    setSelectedSingleDate(date);
  }, []);

  const handleDateClick = useCallback(
    (date) => {
      if (!rangeStart) {
        setRangeStart(date);
        setRangeEnd(null);
        setSelectedSingleDate(null);
        setHoverDate(null);
        return;
      }

      if (rangeStart && !rangeEnd) {
        if (isSameDay(date, rangeStart)) {
          setRangeStart(null);
          setRangeEnd(null);
          setSelectedSingleDate(date);
          return;
        }

        const start = isBefore(date, rangeStart) ? date : rangeStart;
        const end = isAfter(date, rangeStart) ? date : rangeStart;
        selectRange(start, end);
        return;
      }

      if (rangeStart && rangeEnd) {
        if (isWithinInterval(date, { start: rangeStart, end: rangeEnd })) {
          openDayWithinRange(date);
          return;
        }

        // Third tap outside active range: start fresh selection
        setRangeStart(date);
        setRangeEnd(null);
        setSelectedSingleDate(null);
        setHoverDate(null);
      }
    },
    [openDayWithinRange, rangeEnd, rangeStart, selectRange]
  );

  const previewRange = useMemo(() => {
    if (!rangeStart || rangeEnd || !hoverDate || isSameDay(hoverDate, rangeStart)) return null;

    return isBefore(hoverDate, rangeStart)
      ? { start: hoverDate, end: rangeStart }
      : { start: rangeStart, end: hoverDate };
  }, [hoverDate, rangeEnd, rangeStart]);

  return {
    currentMonth,
    setCurrentMonth: setMonthWithReset,
    selectedSingleDate,
    setSelectedSingleDate,
    rangeStart,
    rangeEnd,
    hoverDate,
    setHoverDate,
    previewRange,
    handleDateClick,
    clearSelection,
    selectRange,
    selectSingle
  };
}
