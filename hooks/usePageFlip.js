import { useState, useCallback } from 'react';
import { playPageTurnSound } from '../utils/audioSynth';

export function usePageFlip(onFlipComplete) {
    const [isFlipping, setIsFlipping] = useState(false);

    const triggerFlip = useCallback(() => {
        if (isFlipping) return;
        setIsFlipping(true);
        playPageTurnSound();

        setTimeout(() => {
            setIsFlipping(false);
            if (onFlipComplete) onFlipComplete();
        }, 520); // 520ms animation duration
    }, [isFlipping, onFlipComplete]);

    return { isFlipping, triggerFlip };
}
