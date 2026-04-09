"use client";
import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { indianHolidays } from '../data/indianHolidays';
import { motion, AnimatePresence } from 'framer-motion';

export default function MonthlyNotes({ monthKey, isFlipping }) {
    const [note, updateNote] = useNotes(`note_month_${monthKey}`);
    const [dailyNotes, setDailyNotes] = React.useState([]);
    const [isHolidaysModalOpen, setIsHolidaysModalOpen] = useState(false);

    React.useEffect(() => {
        const fetchDaily = () => {
            const found = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && (k.startsWith(`note_day_${monthKey}`) || k.startsWith(`note_range_${monthKey}`))) {
                    const val = localStorage.getItem(k);
                    if (val && val.trim().length > 0) {
                        found.push(val);
                    }
                }
            }
            setDailyNotes(found);
        };
        fetchDaily();
        const iv = setInterval(fetchDaily, 1500);
        return () => clearInterval(iv);
    }, [monthKey]);

    const monthNumStr = monthKey.split("_")[1];
    const monthHolidays = indianHolidays.filter(h => h.date.startsWith(monthNumStr));

    return (
        <>
            <div className={`flex flex-col w-full h-full bg-white/70 backdrop-blur-3xl border border-white/60 p-5 md:p-6 lg:p-8 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.06)] relative transition-opacity duration-300 ${isFlipping ? 'opacity-80' : 'opacity-100'}`}>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                    Focus Notes
                </div>

                {dailyNotes.length > 0 && (
                    <div className="mb-4 border-b border-gray-400/20 pb-3">
                        <ul className="list-none pl-1 text-xs text-gray-800 space-y-2 max-h-[140px] overflow-y-auto w-full">
                            {dailyNotes.map((dn, idx) => (
                                <li key={idx} className="flex items-start">
                                    <span className="mr-2 text-blue-500 font-extrabold">•</span>
                                    <span className="break-words line-clamp-2 leading-relaxed text-gray-700 font-medium">{dn}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <textarea
                    className="flex-1 w-full bg-transparent resize-none outline-none text-sm text-gray-800 leading-7 font-sans font-medium mix-blend-color-burn transition-opacity"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(150,150,150,0.15) 27px, rgba(150,150,150,0.15) 28px)',
                        lineHeight: '28px',
                        backgroundAttachment: 'local'
                    }}
                    value={note}
                    onChange={(e) => updateNote(e.target.value)}
                    placeholder="Capture your thoughts..."
                />

                {/* Holiday Block Below Notes */}
                <div className="mt-5 pt-5 border-t border-gray-300/30 flex flex-col items-start w-full">
                    <h3 className="text-xs font-extrabold text-red-500 uppercase tracking-widest mb-3">
                        Holidays ({monthHolidays.length})
                    </h3>

                    <div className="flex flex-col gap-2 mb-3 w-full">
                        {monthHolidays.slice(0, 3).map((h, i) => (
                            <div key={i} className="flex flex-col items-start bg-white/40 p-2.5 rounded-lg border border-red-100/50 shadow-sm w-full">
                                <span className="text-[10px] font-bold text-gray-400">{h.date}-2026</span>
                                <span className="text-xs font-bold text-red-800 leading-tight truncate w-full">{h.name}</span>
                            </div>
                        ))}
                        {monthHolidays.length === 0 && (
                            <span className="text-xs text-gray-400 italic">No public holidays detected.</span>
                        )}
                    </div>

                    {monthHolidays.length > 0 && (
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsHolidaysModalOpen(true); }}
                            className="w-full text-[10px] text-red-600 bg-red-50 hover:bg-red-100 border border-red-200/50 py-2.5 rounded-lg transition font-bold tracking-wider active:scale-95"
                        >
                            {monthHolidays.length > 3 ? `VIEW ALL ${monthHolidays.length} HOLIDAYS` : `OPEN HOLIDAY DETAILS`}
                        </button>
                    )}
                </div>
            </div>

            {/* Framer Motion Overlay Modal */}
            <AnimatePresence>
                {isHolidaysModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Background Blur Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gray-900/40 backdrop-blur-md"
                            onClick={() => setIsHolidaysModalOpen(false)}
                        />

                        {/* Scale + Fade Modal Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full max-w-sm bg-white/95 backdrop-blur-3xl rounded-2xl shadow-2xl border border-white/60 p-6 flex flex-col max-h-[80vh]"
                        >
                            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
                                <h2 className="text-sm font-extrabold text-red-600 tracking-widest uppercase">
                                    {format(new Date(2026, parseInt(monthNumStr) - 1, 1), 'MMMM')} Holidays
                                </h2>
                                <button onClick={() => setIsHolidaysModalOpen(false)} className="text-gray-400 hover:text-black transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                                {monthHolidays.map((h, i) => (
                                    <div key={i} className="flex flex-col bg-red-50/50 p-3 rounded-lg border border-red-50">
                                        <span className="font-extrabold text-gray-900 text-sm">{h.date}-2026</span>
                                        <span className="text-xs text-red-700 mt-1 font-bold">{h.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
