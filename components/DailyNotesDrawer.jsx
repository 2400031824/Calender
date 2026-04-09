"use client";
import React from 'react';
import { format } from 'date-fns';
import { useNotes } from '../hooks/useNotes';
import { getHolidayForDate } from '../data/indianHolidays';

export default function DailyNotesDrawer({ selection, accentColor, onClose }) {
    const { start, end } = selection;

    let noteKey = null;
    let title = "";
    let holidayName = "";

    if (start && end) {
        const s = start < end ? start : end;
        const e = start < end ? end : start;
        noteKey = `note_range_${format(s, 'yyyy_MM_dd')}_to_${format(e, 'yyyy_MM_dd')}`;
        title = `${format(s, 'MMMM d')} — ${format(e, 'MMMM d')} Notes`;
    } else if (start && !end) {
        noteKey = `note_day_${format(start, 'yyyy_MM_dd')}`;
        const holiday = getHolidayForDate(start);
        if (holiday) {
            title = `${format(start, 'MMMM d')} — ${holiday.name}`;
        } else {
            title = `${format(start, 'MMMM d')} — Notes`;
        }
    }

    const [note, updateNote] = useNotes(noteKey);
    const isOpen = !!noteKey;

    return (
        <div
            className={`absolute bottom-0 left-0 w-full bg-white/40 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] border-t border-white/50 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] rounded-b-lg flex flex-col z-30
                  md:rounded-tr-[2rem] sm:rounded-tl-none rounded-t-3xl backdrop-blur-2xl`}
            style={{
                height: '40%',
                transform: isOpen ? 'translateY(0)' : 'translateY(110%)',
                borderTopColor: accentColor,
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Color Accent Indicator Strip */}
            {isOpen && <div className="absolute top-0 left-0 w-full h-1.5 opacity-80 rounded-t-full" style={{ backgroundColor: accentColor }} />}

            <div className="flex-1 flex flex-col p-4 md:p-6 pb-6">
                <div className="flex flex-row justify-between items-center mb-3">
                    <div className="text-sm font-extrabold tracking-wide flex items-center gap-2 drop-shadow-sm" style={{ color: accentColor }}>
                        <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: accentColor }}></div>
                        {title}
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); if (onClose) onClose(); }}
                        className="text-gray-600 hover:text-black transition transform hover:rotate-90 hover:scale-110 active:scale-95 bg-white/30 rounded-full p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <textarea
                    className="flex-1 w-full bg-transparent resize-none outline-none text-sm text-gray-900 leading-7 font-sans font-medium mix-blend-color-burn"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.1) 27px, rgba(0,0,0,0.1) 28px)',
                        lineHeight: '28px',
                        backgroundAttachment: 'local'
                    }}
                    value={note}
                    onChange={(e) => updateNote(e.target.value)}
                    placeholder="Jot down something for this date..."
                />
            </div>
        </div>
    );
}
