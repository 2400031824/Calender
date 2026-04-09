"use client";
import React from 'react';
import { useNotes } from '../hooks/useNotes';

export default function MonthlyNotes({ monthKey }) {
    const [note, updateNote] = useNotes(`note_month_${monthKey}`);

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-100 p-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Notes
            </div>
            <textarea
                className="flex-1 w-full bg-transparent resize-none outline-none text-sm text-gray-700 leading-7 font-sans"
                style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #e5e7eb 27px, #e5e7eb 28px)',
                    lineHeight: '28px',
                    backgroundAttachment: 'local'
                }}
                value={note}
                onChange={(e) => updateNote(e.target.value)}
                placeholder="Write here..."
            />
        </div>
    );
}
