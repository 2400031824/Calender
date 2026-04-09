'use client';

import { motion } from 'framer-motion';

export default function HolidaysBlock({ holidays, onOpen, accent, className = '' }) {
  const preview = holidays.slice(0, 3);
  const hasMore = holidays.length > 3;
  const visibleList = hasMore ? holidays : preview;

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-left"
      >
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">Holidays</p>
        {preview.length === 0 ? (
          <p className="text-xs text-slate-500">No holidays this month</p>
        ) : (
          <div className={`space-y-1 ${hasMore ? 'max-h-[72px] overflow-y-auto pr-1' : ''}`}>
            {visibleList.map((holiday) => (
              <p key={holiday.date} className="text-xs text-slate-600">
                <span className="font-semibold" style={{ color: accent }}>
                  {holiday.label}
                </span>{' '}
                {holiday.name}
              </p>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={onOpen}
          className="mt-2 text-xs font-semibold"
          style={{ color: accent }}
        >
          View All
        </button>
      </motion.div>
    </div>
  );
}
