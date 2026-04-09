'use client';

import { AnimatePresence, motion } from 'framer-motion';

export default function HolidaysModal({ open, onClose, holidays, accent, title }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-h-[80vh] w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <h3 className="text-sm font-semibold" style={{ color: accent }}>
                {title}
              </h3>
              <button type="button" className="text-slate-500" onClick={onClose} aria-label="Close holidays">
                ?
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto px-4 py-3">
              {holidays.length === 0 ? (
                <p className="text-sm text-slate-500">No holidays available.</p>
              ) : (
                <div className="space-y-2">
                  {holidays.map((holiday) => (
                    <p key={`${holiday.date}-${holiday.name}`} className="text-sm text-slate-700">
                      <span className="font-semibold">{holiday.label}</span> - {holiday.name}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

