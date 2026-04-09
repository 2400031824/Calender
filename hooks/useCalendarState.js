import { useState } from 'react';
import { addMonths } from 'date-fns';

export function useCalendarState() {
    const [currentMonth, setCurrentMonth] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    const [selection, setSelection] = useState({ start: null, end: null });

    const nextMonth = () => {
        setCurrentMonth(prev => addMonths(prev, 1));
    };

    const handleDateInteraction = (dateObj) => {
        if (selection.start && selection.end) {
            // If clicking inside a range, clear and start new
            if (dateObj >= selection.start && dateObj <= selection.end) {
                setSelection({ start: dateObj, end: null });
            } else {
                setSelection({ start: dateObj, end: null });
            }
        } else if (selection.start && !selection.end) {
            // Second tap
            if (dateObj.getTime() === selection.start.getTime()) {
                // Do nothing if same
            } else {
                if (dateObj < selection.start) {
                    setSelection({ start: dateObj, end: selection.start });
                } else {
                    setSelection({ start: selection.start, end: dateObj });
                }
            }
        } else {
            // First tap
            setSelection({ start: dateObj, end: null });
        }
    };

    const clearSelection = () => {
        setSelection({ start: null, end: null });
    };

    return {
        currentMonth,
        nextMonth,
        selection,
        handleDateInteraction,
        clearSelection
    };
}
