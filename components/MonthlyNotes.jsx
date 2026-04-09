"use client";
import React from 'react';
import { useNotes } from '../hooks/useNotes';
import { indianHolidays } from '../data/indianHolidays';

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

    // get holidays for this month
    const monthNumStr = monthKey.split("_")[1]; // from "yyyy_MM"
    const monthHolidays = indianHolidays.filter(h => h.date.startsWith(monthNumStr));

    return (
        <div className="flex flex-col h-full bg-[#fcfcfc] border-r border-[#ececec] p-4 relative">
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
            {/* Daily Notes Bullet Points reflection */}
            {dailyNotes.length > 0 && (
                <div className="mt-2 pt-2">
                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-1 max-h-[80px] overflow-y-auto">
                        {dailyNotes.map((dn, idx) => (
                            <li key={idx} className="truncate" title={dn}>{dn}</li>
                        ))}
                    </ul>
                </div>
            )}
            {/* Holiday Rectangular Box */}
            <div className="mt-auto pt-3 border-t-2 border-gray-100 flex flex-col max-h-[30%]">
                <div className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1.5 flex justify-between">
                    <span>Holidays ({monthHolidays.length})</span>
                </div>
                <div className="bg-red-50 rounded-md p-2 overflow-y-auto shadow-inner border border-red-100">
                    {monthHolidays.length === 0 ? (
                        <p className="text-xs text-red-400 italic">No holidays to skip work!</p>
                    ) : (
                        <ul className="space-y-1 text-xs text-red-700">
                            {monthHolidays.map((h, i) => (
                                <li key={i} className="flex justify-between border-b border-red-200/50 pb-1 last:border-0 last:pb-0">
                                    <span className="font-semibold">{h.date}</span>
                                    <span className="truncate ml-2 text-right">{h.name}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
