import { useState } from 'react';

export function usePageFlip() {
    const [flipState, setFlipState] = useState({ isFlipping: false, direction: null });

    const triggerFlip = (direction, callback) => {
        if (flipState.isFlipping) return;

        setFlipState({ isFlipping: true, direction });

        // Switch state precisely at halfway mark when the card is rotated at 90 deg and invisible
        setTimeout(() => {
            if (callback) callback();
        }, 300);

        // Release animation lock fully afterwards using smooth safe timeout
        setTimeout(() => {
            setFlipState({ isFlipping: false, direction: null });
        }, 650);
    };

    return { flipState, triggerFlip };
}
