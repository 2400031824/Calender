'use client';

import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const toBulletLines = (text) =>
  text
    .split('\n')
    .map((line) => line.replace(/^\s*•\s*/, '').trim())
    .filter(Boolean);

export default function DailyNotesDrawer({
  open,
  onClose,
  mode,
  date,
  rangeStart,
  rangeEnd,
  dayNote,
  rangeNote,
  onDayChange,
  onRangeChange,
  dayPinned,
  rangePinned,
  onTogglePinned,
  onClear,
  onSave,
  accent
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const menuRef = useRef(null);

  const isRangeMode = mode === 'range';
  const isDayWithinRange = mode === 'dayWithinRange';
  const editableType = isRangeMode ? 'range' : 'day';
  const editableValue = isRangeMode ? rangeNote : dayNote;
  const isPinned = isRangeMode ? rangePinned : dayPinned;

  const title = useMemo(() => {
    if (isRangeMode && rangeStart && rangeEnd) {
      return `${format(rangeStart, 'MMM d')} → ${format(rangeEnd, 'MMM d')} — Group Note`;
    }
    if (isDayWithinRange && date && rangeStart && rangeEnd) {
      return `${format(date, 'MMM d')} — Day Note (within ${format(rangeStart, 'MMM d')}–${format(rangeEnd, 'MMM d')} group)`;
    }
    if (date) {
      return `${format(date, 'MMMM d')} — Daily Note`;
    }
    return '';
  }, [date, isDayWithinRange, isRangeMode, rangeEnd, rangeStart]);

  const groupLabel = rangeStart && rangeEnd ? `📌 Group: ${format(rangeStart, 'MMM d')}–${format(rangeEnd, 'MMM d')}` : null;

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', onOutsideClick);
    }

    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, [menuOpen]);

  const updateValue = (value) => {
    if (isRangeMode) {
      onRangeChange(value);
      return;
    }
    onDayChange(value);
  };

  const handleFocus = () => {
    if (editableValue.trim()) return;
    updateValue('• ');
  };

  const handleKeyDown = (event) => {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();

    const { selectionStart, selectionEnd } = event.currentTarget;
    const prefix = editableValue.slice(0, selectionStart);
    const suffix = editableValue.slice(selectionEnd);
    const nextValue = `${prefix}\n• ${suffix}`;
    updateValue(nextValue);

    requestAnimationFrame(() => {
      const cursor = selectionStart + 3;
      event.currentTarget.selectionStart = cursor;
      event.currentTarget.selectionEnd = cursor;
    });
  };

  const handleSave = () => {
    onSave(editableType);
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 900);
  };

  const handleCopy = async () => {
    if (!editableValue.trim()) return;
    try {
      await navigator.clipboard.writeText(editableValue);
    } catch {
      // ignored: clipboard may be blocked in some browsers
    }
    setMenuOpen(false);
  };

  const bulletLines = toBulletLines(editableValue);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            className="absolute inset-0 z-30 bg-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-label="Close notes drawer"
          />
          <motion.div
            className="absolute bottom-0 left-0 z-40 w-full rounded-t-2xl border-t border-slate-200 bg-white p-4 shadow-2xl md:left-[30%] md:w-[70%] md:rounded-tl-xl"
            data-keep-selection="true"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <h4 className="text-sm font-semibold" style={{ color: accent }}>
                {title}
              </h4>
              <div className="flex items-center gap-2" ref={menuRef}>
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600"
                >
                  Save as Task ✓
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((openState) => !openState)}
                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600"
                  >
                    ▾
                  </button>
                  <AnimatePresence>
                    {menuOpen ? (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute right-0 top-8 z-10 w-[180px] rounded-md border border-slate-200 bg-white p-1 text-xs shadow-lg"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onTogglePinned(editableType, !isPinned);
                            setMenuOpen(false);
                          }}
                          className="block w-full rounded px-2 py-1 text-left hover:bg-slate-50"
                        >
                          📌 {isPinned ? 'Unpin this note' : 'Pin this note'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onClear(editableType);
                            setMenuOpen(false);
                          }}
                          className="block w-full rounded px-2 py-1 text-left hover:bg-slate-50"
                        >
                          🗑️ Clear note
                        </button>
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="block w-full rounded px-2 py-1 text-left hover:bg-slate-50"
                        >
                          📋 Copy to clipboard
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            onClose();
                          }}
                          className="block w-full rounded px-2 py-1 text-left hover:bg-slate-50"
                        >
                          ⬇️ Close notes
                        </button>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {isDayWithinRange && groupLabel ? (
              <div className="mb-2 rounded-md border border-slate-200 bg-slate-50 p-2 text-xs text-slate-500">
                <p className="mb-1 font-semibold">{groupLabel}</p>
                <ul className="list-disc space-y-1 pl-4">
                  {toBulletLines(rangeNote).slice(0, 3).map((line, idx) => (
                    <li key={`group-line-${idx}`}>{line}</li>
                  ))}
                  {toBulletLines(rangeNote).length === 0 ? <li>No group note yet</li> : null}
                </ul>
              </div>
            ) : null}

            <textarea
              value={editableValue}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              onChange={(event) => updateValue(event.target.value)}
              className="lined-paper min-h-[170px] w-full resize-none rounded-md border border-slate-200 px-3 py-2 text-base leading-7 text-slate-800 outline-none"
              style={{ caretColor: accent }}
              placeholder="Write your notes..."
            />

            <div className="mt-2 rounded-md bg-slate-50 px-2 py-1">
              <p className="text-[11px] font-semibold text-slate-500">Preview</p>
              <ul className="list-disc pl-4 text-xs text-slate-600">
                {bulletLines.slice(0, 4).map((line, idx) => (
                  <li key={`preview-${idx}`}>{line}</li>
                ))}
                {bulletLines.length === 0 ? <li>No bullet points yet</li> : null}
              </ul>
            </div>

            {savedFlash ? <p className="mt-1 text-right text-[11px] text-slate-400">Saved</p> : null}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
