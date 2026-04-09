'use client';

import {
  addDays,
  endOfMonth,
  format,
  isWithinInterval,
  parse,
  startOfMonth
} from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

const DAY_KEY_REGEX = /^note_day_(\d{8})$/;
const RANGE_KEY_REGEX = /^note_range_(\d{8})_(\d{8})$/;

const safeGet = (key) => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(key) || '';
};

const safeSet = (key, value) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, value);
};

const safeRemove = (key) => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(key);
};

const toCompact = (date) => format(date, 'yyyyMMdd');
const fromCompact = (text) => parse(text, 'yyyyMMdd', new Date());
const toIso = (date) => format(date, 'yyyy-MM-dd');

const normalizeLine = (line) => line.replace(/^\s*•\s*/, '').trim();
const meaningfulLines = (text) => text.split('\n').map(normalizeLine).filter(Boolean);
const hasMeaningfulContent = (text) => meaningfulLines(text).length > 0;
const truncate = (value, limit = 40) => (value.length > limit ? `${value.slice(0, limit - 3)}...` : value);
const firstBulletLine = (note) => truncate(meaningfulLines(note)[0] || '');

export const monthlyKeyFor = (date) => `note_month_${format(date, 'yyyy_MM')}`;
export const dailyKeyFor = (date) => `note_day_${toCompact(date)}`;
export const rangeKeyFor = (start, end) => `note_range_${toCompact(start)}_${toCompact(end)}`;
const pinKeyFor = (key) => `${key}_pinned`;

export default function useNotes({ currentMonth, selectedSingleDate, rangeStart, rangeEnd }) {
  const [monthlyNote, setMonthlyNote] = useState('');
  const [activeDayNote, setActiveDayNote] = useState('');
  const [activeRangeNote, setActiveRangeNote] = useState('');
  const [storageVersion, setStorageVersion] = useState(0);
  const [isClientReady, setIsClientReady] = useState(false);

  const monthStart = useMemo(() => startOfMonth(currentMonth), [currentMonth]);
  const monthEnd = useMemo(() => endOfMonth(currentMonth), [currentMonth]);

  const monthlyKey = useMemo(() => monthlyKeyFor(currentMonth), [currentMonth]);
  const activeDayKey = useMemo(() => (selectedSingleDate ? dailyKeyFor(selectedSingleDate) : null), [selectedSingleDate]);
  const activeRangeKey = useMemo(() => {
    if (!rangeStart || !rangeEnd) return null;
    return rangeKeyFor(rangeStart, rangeEnd);
  }, [rangeEnd, rangeStart]);

  const bumpVersion = useCallback(() => {
    setStorageVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    setMonthlyNote(safeGet(monthlyKey));
  }, [monthlyKey]);

  useEffect(() => {
    setActiveDayNote(activeDayKey ? safeGet(activeDayKey) : '');
  }, [activeDayKey, storageVersion]);

  useEffect(() => {
    setActiveRangeNote(activeRangeKey ? safeGet(activeRangeKey) : '');
  }, [activeRangeKey, storageVersion]);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  useEffect(() => {
    const handleStorage = () => bumpVersion();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [bumpVersion]);

  const updateMonthlyNote = useCallback(
    (value) => {
      setMonthlyNote(value);
      safeSet(monthlyKey, value);
      bumpVersion();
    },
    [bumpVersion, monthlyKey]
  );

  const updateActiveDayNote = useCallback(
    (value) => {
      setActiveDayNote(value);
      if (activeDayKey) {
        safeSet(activeDayKey, value);
        bumpVersion();
      }
    },
    [activeDayKey, bumpVersion]
  );

  const updateActiveRangeNote = useCallback(
    (value) => {
      setActiveRangeNote(value);
      if (activeRangeKey) {
        safeSet(activeRangeKey, value);
        bumpVersion();
      }
    },
    [activeRangeKey, bumpVersion]
  );

  const setPinned = useCallback(
    (key, pinned) => {
      if (!key) return;
      safeSet(pinKeyFor(key), pinned ? 'true' : 'false');
      bumpVersion();
    },
    [bumpVersion]
  );

  const clearNote = useCallback(
    (key) => {
      if (!key) return;
      safeRemove(key);
      safeRemove(pinKeyFor(key));
      bumpVersion();
    },
    [bumpVersion]
  );

  const allNotes = useMemo(() => {
    if (typeof window === 'undefined' || !isClientReady) {
      return { dayEntries: [], rangeEntries: [], dayNoteDateSet: new Set(), rangeNoteDateSet: new Set() };
    }

    const dayEntries = [];
    const rangeEntries = [];
    const dayNoteDateSet = new Set();
    const rangeNoteDateSet = new Set();

    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (!key || key.endsWith('_pinned') || key.startsWith('note_month_')) continue;

      const value = safeGet(key);
      if (!hasMeaningfulContent(value)) continue;

      const dayMatch = key.match(DAY_KEY_REGEX);
      if (dayMatch) {
        const date = fromCompact(dayMatch[1]);
        if (date < monthStart || date > monthEnd) continue;

        const iso = toIso(date);
        dayNoteDateSet.add(iso);

        dayEntries.push({
          id: key,
          key,
          type: 'day',
          date,
          label: format(date, 'MMM d'),
          preview: firstBulletLine(value),
          text: value,
          pinned: safeGet(pinKeyFor(key)) === 'true'
        });
        continue;
      }

      const rangeMatch = key.match(RANGE_KEY_REGEX);
      if (rangeMatch) {
        const start = fromCompact(rangeMatch[1]);
        const end = fromCompact(rangeMatch[2]);

        if (end < monthStart || start > monthEnd) continue;

        let cursor = start;
        while (cursor <= end) {
          if (cursor >= monthStart && cursor <= monthEnd) {
            rangeNoteDateSet.add(toIso(cursor));
          }
          cursor = addDays(cursor, 1);
        }

        rangeEntries.push({
          id: key,
          key,
          type: 'range',
          start,
          end,
          label: `${format(start, 'MMM d')} → ${format(end, 'MMM d')}`,
          preview: firstBulletLine(value),
          text: value,
          pinned: safeGet(pinKeyFor(key)) === 'true'
        });
      }
    }

    dayEntries.sort((a, b) => a.date - b.date);
    rangeEntries.sort((a, b) => a.start - b.start);

    return { dayEntries, rangeEntries, dayNoteDateSet, rangeNoteDateSet };
  }, [isClientReady, monthEnd, monthStart, storageVersion]);

  const feedRows = useMemo(() => {
    const usedRangeKeys = new Set();
    const rows = [];

    allNotes.dayEntries.forEach((dayEntry) => {
      const linkedRanges = allNotes.rangeEntries.filter((rangeEntry) =>
        isWithinInterval(dayEntry.date, { start: rangeEntry.start, end: rangeEntry.end })
      );

      if (linkedRanges.length === 0) {
        rows.push({
          id: dayEntry.id,
          type: 'single',
          entry: dayEntry,
          sortDate: dayEntry.date
        });
        return;
      }

      linkedRanges.forEach((rangeEntry) => usedRangeKeys.add(rangeEntry.key));
      rows.push({
        id: `bundle-${dayEntry.key}`,
        type: 'bundle',
        label: dayEntry.label,
        items: [
          ...linkedRanges.map((rangeEntry) => ({ ...rangeEntry, subLabel: `Group ${rangeEntry.label}` })),
          { ...dayEntry, subLabel: 'Day note' }
        ],
        sortDate: dayEntry.date
      });
    });

    allNotes.rangeEntries
      .filter((rangeEntry) => !usedRangeKeys.has(rangeEntry.key))
      .forEach((rangeEntry) => {
        rows.push({
          id: rangeEntry.id,
          type: 'single',
          entry: rangeEntry,
          sortDate: rangeEntry.start
        });
      });

    rows.sort((a, b) => a.sortDate - b.sortDate);

    return rows;
  }, [allNotes.dayEntries, allNotes.rangeEntries]);

  const glanceItems = useMemo(() => {
    const merged = [...allNotes.rangeEntries, ...allNotes.dayEntries];
    merged.sort((a, b) => {
      const aDate = a.type === 'range' ? a.start : a.date;
      const bDate = b.type === 'range' ? b.start : b.date;
      return aDate - bDate;
    });
    return merged.map((entry) => ({
      id: `glance-${entry.key}`,
      label: entry.type === 'range' ? `${format(entry.start, 'MMM d')}-${format(entry.end, 'MMM d')}` : format(entry.date, 'MMM d'),
      preview: entry.preview
    }));
  }, [allNotes.dayEntries, allNotes.rangeEntries]);

  const commitmentRows = useMemo(() => {
    const rows = [
      ...allNotes.dayEntries.map((entry) => ({
        id: `commit-day-${entry.key}`,
        type: 'day',
        label: `${format(entry.date, 'MMM do')} commitments`,
        preview: entry.preview,
        target: entry,
        sortDate: entry.date
      })),
      ...allNotes.rangeEntries.map((entry) => ({
        id: `commit-range-${entry.key}`,
        type: 'range',
        label: `${format(entry.start, 'MMM do')} to ${format(entry.end, 'MMM do')} commitments`,
        preview: entry.preview,
        target: entry,
        sortDate: entry.start
      }))
    ];

    rows.sort((a, b) => a.sortDate - b.sortDate);
    return rows;
  }, [allNotes.dayEntries, allNotes.rangeEntries]);

  const activeDayPinned = activeDayKey ? safeGet(pinKeyFor(activeDayKey)) === 'true' : false;
  const activeRangePinned = activeRangeKey ? safeGet(pinKeyFor(activeRangeKey)) === 'true' : false;

  return {
    monthlyNote,
    updateMonthlyNote,
    activeDayNote,
    updateActiveDayNote,
    activeRangeNote,
    updateActiveRangeNote,
    activeDayKey,
    activeRangeKey,
    activeDayPinned,
    activeRangePinned,
    setPinned,
    clearNote,
    feedRows,
    glanceItems,
    commitmentRows,
    dayNoteDateSet: allNotes.dayNoteDateSet,
    rangeNoteDateSet: allNotes.rangeNoteDateSet,
    bumpVersion
  };
}
