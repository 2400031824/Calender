"use client";
import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { indianHolidays } from '../data/indianHolidays';

export default function MonthlyNotes({ monthKey }) {
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
        <div className="flex flex-col h-full bg-[#fcfcfc] border-r border-[#ececec] p-4 relative">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex justify-between items-center">
                <span>Notes</span>
                <button
                    className="text-[10px] text-blue-500 hover:text-blue-700 underline px-2 py-0.5 rounded transition"
                    onClick={() => setIsHolidaysModalOpen(true)}
                >
                    View Holidays
                </button>
            </div>

            {/* Daily Notes Bullet Points reflection AT TOP */}
            {dailyNotes.length > 0 && (
                <div className="mb-4 border-b border-gray-100/60 pb-2">
                    <ul className="list-none pl-1 text-xs text-gray-700 space-y-2 max-h-[140px] overflow-y-auto w-full">
                        {dailyNotes.map((dn, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="mr-2 text-blue-400 font-extrabold">•</span>
                                <span className="break-words line-clamp-3 leading-relaxed">{dn}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <textarea
                className="flex-1 w-full bg-transparent resize-none outline-none text-sm text-gray-700 leading-7 font-sans"
                style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)',
                    lineHeight: '28px',
                    backgroundAttachment: 'local'
                }}
                value={note}
                onChange={(e) => updateNote(e.target.value)}
                placeholder="Write more here..."
            />

            {/* Holiday Modal Pop-up */}
            {isHolidaysModalOpen && (
                <div className="absolute inset-x-0 inset-y-0 bg-white/95 z-50 flex flex-col p-5 shadow-[0_-5px_15px_rgba(0,0,0,0.1)] border-t border-gray-200" style={{ backdropFilter: 'blur(2px)' }}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-red-500 tracking-widest uppercase">Month Holidays ({monthHolidays.length})</span>
                        <button onClick={() => setIsHolidaysModalOpen(false)} className="text-gray-400 hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-1">
                        {monthHolidays.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center mt-10 italic">No holidays this month!</p>
                        ) : (
                            <ul className="space-y-4">
                                {monthHolidays.map((h, i) => (
                                    <li key={i} className="flex flex-col border-b border-red-50 pb-2 last:border-0">
                                        <span className="font-bold text-gray-800 text-sm">{h.date}-2026</span>
                                        <span className="text-xs text-red-600 mt-1 font-medium">{h.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
