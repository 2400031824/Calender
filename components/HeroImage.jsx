"use client";
import React from 'react';
import MotionBackground from './MotionBackground';

export default function HeroImage({ data, year }) {
    if (!data) return null;
    const { name, accent, quote, month } = data;

    return (
        <div className="relative w-full h-[35%] md:h-[42%] rounded-t-lg overflow-hidden shrink-0">
            {/* Animated Motion Wallpaper Instead of Image */}
            <MotionBackground monthIndex={month} />

            {/* Overlay Gradient for Quote Legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent pointer-events-none" />

            {/* Quote (Moved down, bigger, nicer font) */}
            {quote && (
                <div className="absolute top-[30%] left-6 right-20 text-gray-800 text-lg md:text-xl font-serif italic drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] z-20">
                    "{quote}"
                </div>
            )}

            {/* Chevron Banner */}
            <div
                className="absolute bottom-0 right-0 px-6 py-2 md:px-8 md:py-3 text-white flex flex-col items-end z-10"
                style={{
                    backgroundColor: accent || '#1DA9E2',
                    clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%)'
                }}
            >
                <span className="text-sm md:text-md font-light leading-tight">{year}</span>
                <span className="text-xl md:text-3xl font-bold tracking-widest">{name}</span>
            </div>
        </div>
    );
}
