"use client";
import React from 'react';
import { useNotes } from '../hooks/useNotes';

export default function MonthlyNotes({ monthKey }) {
    const [note, updateNote] = useNotes(`note_month_${monthKey}`);

    const [dailyNotes, setDailyNotes] = React.useState([]);

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
            {dailyNotes.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        Daily Highlights
                    </div>
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1 max-h-[100px] overflow-y-auto">
                        {dailyNotes.map((dn, idx) => (
                            <li key={idx} className="truncate" title={dn}>{dn}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
