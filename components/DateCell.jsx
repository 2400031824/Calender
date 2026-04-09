'use client';

import { motion } from 'framer-motion';
import React from 'react';

function DateCellComponent({
  label,
  disabled,
  muted,
  isToday,
  isWeekend,
  isSelected,
  isRangeStart,
  isRangeEnd,
  isInRange,
  isPreviewRange,
  accent,
  holidayName,
  hasDayNote,
  hasRangeNote,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onHolidayOpen
}) {
  let bg = 'transparent';
  let radius = '999px';

  if (isInRange || isPreviewRange) {
    bg = `${accent}${isInRange ? '33' : '1f'}`;
    radius = '0';
  }

  if (isRangeStart && isRangeEnd) {
    bg = accent;
    radius = '999px';
  } else if (isRangeStart) {
    bg = accent;
    radius = '999px 0 0 999px';
  } else if (isRangeEnd) {
    bg = accent;
    radius = '0 999px 999px 0';
  }

  if (isSelected) {
    bg = accent;
    radius = '999px';
  }

  const textColor = muted ? '#cccccc' : isWeekend ? accent : '#334155';
  const selectedTextColor = '#ffffff';
  const rangeEdge = isRangeStart || isRangeEnd;

  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onClick}
      onMouseEnter={disabled ? undefined : onMouseEnter}
      onMouseLeave={disabled ? undefined : onMouseLeave}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2, scale: 1.03, boxShadow: '0 6px 12px rgba(0,0,0,0.08)' }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      className="relative flex min-h-[40px] w-full items-center justify-center rounded-md py-1 text-sm"
      style={{
        backgroundColor: bg,
        borderRadius: radius,
        border: rangeEdge ? `2px solid ${accent}` : '2px solid transparent',
        color: isSelected || isRangeStart || isRangeEnd ? selectedTextColor : textColor,
        fontWeight: isToday ? 700 : 500,
        opacity: disabled ? 0.8 : 1
      }}
      aria-label={`Select ${label}`}
    >
      <span
        className="relative z-10"
        style={
          isToday && !isSelected && !isRangeStart && !isRangeEnd
            ? {
                background: `${accent}26`,
                borderRadius: 999,
                padding: '2px 7px',
                textDecoration: 'underline',
                textUnderlineOffset: '3px'
              }
            : undefined
        }
      >
        {label}
      </span>

      {(holidayName || hasDayNote || hasRangeNote) ? (
        <div className="absolute bottom-[2px] flex items-center gap-1">
          {hasRangeNote ? <span className="h-[2px] w-[10px] rounded-full" style={{ backgroundColor: `${accent}88` }} /> : null}
          {holidayName ? (
            <motion.span
              className="h-[6px] w-[6px] rounded-full"
              style={{ backgroundColor: accent }}
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
              onClick={(event) => {
                event.stopPropagation();
                onHolidayOpen();
              }}
              title={holidayName}
            />
          ) : null}
          {hasDayNote ? <span className="h-[6px] w-[6px] rounded-full bg-amber-500" title="Saved note" /> : null}
        </div>
      ) : null}
    </motion.button>
  );
}

const DateCell = React.memo(DateCellComponent);

export default DateCell;
