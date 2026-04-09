"use client";
import React from 'react';

export default function HeroImage({ data, year }) {
    if (!data) return null;
    const { image, name, accent, quote } = data;

    return (
        <div className="relative w-full h-[35%] md:h-[42%] rounded-t-lg overflow-hidden shrink-0">
            <style>{`
                @keyframes flutter1 {
                    0% { transform: translate(0, 0) rotate(0deg) scale(0.9); opacity: 0; }
                    10% { opacity: 1; }
                    50% { transform: translate(150px, -30px) rotate(15deg) scale(1.1); }
                    90% { opacity: 1; }
                    100% { transform: translate(300px, -100px) rotate(-10deg) scale(0.9); opacity: 0; }
                }
                @keyframes flutter2 {
                    0% { transform: translate(0, 0) rotate(-20deg); opacity: 0; }
                    10% { opacity: 1; }
                    50% { transform: translate(-100px, -80px) rotate(5deg); }
                    90% { opacity: 1; }
                    100% { transform: translate(-200px, -150px) rotate(-15deg); opacity: 0; }
                }
                @keyframes flutter3 {
                    0% { transform: translate(0, 0) rotate(10deg) scale(0.8); opacity: 0; }
                    10% { opacity: 1; }
                    50% { transform: translate(80px, -120px) rotate(25deg) scale(1.2); }
                    90% { opacity: 1; }
                    100% { transform: translate(150px, -250px) rotate(-5deg) scale(0.8); opacity: 0; }
                }
                .fly-1 { animation: flutter1 14s infinite ease-in-out; left: -20px; top: 120px; }
                .fly-2 { animation: flutter2 18s infinite ease-in-out 5s; right: 20px; top: 200px; }
                .fly-3 { animation: flutter3 16s infinite ease-in-out 2s; left: 100px; bottom: -20px; }
            `}</style>

            {/* Background image */}
            <img
                src={image}
                alt={`${name} ${year}`}
                className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay Gradient for Quote Legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Quote */}
            {quote && (
                <div className="absolute top-4 left-4 right-16 text-white text-sm md:text-md font-serif italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-20">
                    "{quote}"
                </div>
            )}

            {/* Butterflies */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                <div className="fly-1 text-2xl absolute drop-shadow-md">🦋</div>
                <div className="fly-2 text-xl absolute drop-shadow-md">🦋</div>
                <div className="fly-3 text-3xl absolute drop-shadow-md">🦋</div>
            </div>

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
