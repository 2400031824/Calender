"use client";
import React from 'react';
import { format } from 'date-fns';
import { useNotes } from '../hooks/useNotes';

export default function DailyNotesDrawer({ selection, accentColor, onClose }) {
    const { start, end } = selection;

    let noteKey = null;
    let title = "";

    if (start && end) {
        // order the dates correctly just in case
        const s = start < end ? start : end;
        const e = start < end ? end : start;
        noteKey = `note_range_${format(s, 'yyyy_MM_dd')}_to_${format(e, 'yyyy_MM_dd')}`;
        title = `${format(s, 'MMMM d')} — ${format(e, 'MMMM d')} Notes`;
    } else if (start && !end) {
        noteKey = `note_day_${format(start, 'yyyy_MM_dd')}`;
        title = `${format(start, 'MMMM d')} — Notes`;
    }

    const [note, updateNote] = useNotes(noteKey);
    const isOpen = !!noteKey;

    return (
        <div
            className={`absolute bottom-0 left-0 w-full bg-white transition-transform duration-300 ease-in-out border-t shadow-[0_-4px_16px_rgba(0,0,0,0.06)] rounded-b-lg flex flex-col z-30
                  md:rounded-tr-lg sm:rounded-tl-none rounded-t-2xl`}
            style={{
                height: '40%', // approx proper size
                transform: isOpen ? 'translateY(0)' : 'translateY(110%)', // move down a bit extra to hide fully
                borderColor: accentColor,
                borderTopWidth: isOpen ? '4px' : '0'
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex-1 flex flex-col p-4 md:p-6 pb-6">
                <div className="flex flex-row justify-between items-center mb-3">
                    <div className="text-sm font-bold text-gray-800 tracking-wide flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }}></div>
                        {title}
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); if (onClose) onClose(); }}
                        className="text-gray-400 hover:text-gray-700 transition"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <textarea
                    className="flex-1 w-full bg-transparent resize-none outline-none text-sm text-gray-700 leading-7 font-sans"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #f3f4f6 27px, #f3f4f6 28px)',
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
