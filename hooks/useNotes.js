import { useState, useEffect } from 'react';

export function useNotes(key) {
    const [note, setNote] = useState('');

    useEffect(() => {
        if (!key) return;
        const saved = localStorage.getItem(key);
        if (saved) {
            setNote(saved);
        } else {
            setNote('');
        }
    }, [key]);

    const updateNote = (newVal) => {
        setNote(newVal);
        if (key) {
            localStorage.setItem(key, newVal);
        }
    };

    return [note, updateNote];
}
