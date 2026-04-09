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
        <div className="flex flex-col h-full bg-white/20 backdrop-blur-xl border-r border-white/30 p-4 relative shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex justify-between items-center drop-shadow-sm">
                <span>Notes</span>
                <button
                    className="text-[10px] text-blue-700 hover:text-blue-900 underline px-2 py-0.5 rounded transition font-bold"
                    onClick={() => setIsHolidaysModalOpen(true)}
                >
                    View Holidays
                </button>
            </div>

            {/* Daily Notes Bullet Points reflection AT TOP */}
            {dailyNotes.length > 0 && (
                <div className="mb-4 border-b border-gray-400/30 pb-2">
                    <ul className="list-none pl-1 text-xs text-gray-800 space-y-2 max-h-[140px] overflow-y-auto w-full">
                        {dailyNotes.map((dn, idx) => (
                            <li key={idx} className="flex items-start">
                                <span className="mr-2 text-blue-600 font-extrabold drop-shadow">•</span>
                                <span className="break-words line-clamp-3 leading-relaxed drop-shadow-sm font-medium">{dn}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <textarea
                className="flex-1 w-full bg-transparent resize-none outline-none text-sm text-gray-800 leading-7 font-sans font-medium"
                style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100,100,100,0.15) 27px, rgba(100,100,100,0.15) 28px)',
                    lineHeight: '28px',
                    backgroundAttachment: 'local'
                }}
                value={note}
                onChange={(e) => updateNote(e.target.value)}
                placeholder="Write more here..."
            />

            {/* Holiday Modal Pop-up with Glassmorphism */}
            {isHolidaysModalOpen && (
                <div className="absolute inset-x-0 inset-y-0 bg-white/50 z-50 flex flex-col p-5 shadow-[0_-5px_25px_rgba(0,0,0,0.15)] border border-white/60" style={{ backdropFilter: 'blur(20px)' }}>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold text-red-600 tracking-widest uppercase drop-shadow">Month Holidays ({monthHolidays.length})</span>
                        <button onClick={() => setIsHolidaysModalOpen(false)} className="text-gray-600 hover:text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-1">
                        {monthHolidays.length === 0 ? (
                            <p className="text-sm text-gray-700 text-center mt-10 italic font-bold">No holidays this month!</p>
                        ) : (
                            <ul className="space-y-4">
                                {monthHolidays.map((h, i) => (
                                    <li key={i} className="flex flex-col border-b border-white/50 pb-2 last:border-0">
                                        <span className="font-extrabold text-gray-900 text-sm drop-shadow-sm">{h.date}-2026</span>
                                        <span className="text-xs text-red-700 mt-1 font-bold">{h.name}</span>
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
