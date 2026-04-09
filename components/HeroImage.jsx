"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function HeroImage({ data, year, isFlipping }) {
    if (!data) return null;
    const { name, accent, quote, image } = data;

    return (
        <div className="relative w-full h-[35%] overflow-hidden shrink-0">
            {/* Cinematic Slow Zoom Background Image Layer */}
            {!isFlipping && (
                <motion.img
                    src={image}
                    className="absolute inset-0 w-full h-full object-cover transform-gpu"
                    animate={{ scale: [1, 1.05] }}
                    transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                />
            )}
            {isFlipping && (
                <img
                    src={image}
                    className="absolute inset-0 w-full h-full object-cover transform-gpu"
                />
            )}

            {/* Overlay Gradient for Quote Legibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* AI Generated Quote Layout controlled strictly */}
            {quote && !isFlipping && (
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                    className="absolute top-[25%] left-6 right-20 text-white text-lg font-serif italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-20"
                >
                    "{quote}"
                </motion.div>
            )}
            {quote && isFlipping && (
                <div className="absolute top-[25%] left-6 right-20 text-white text-lg font-serif italic drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-20">
                    "{quote}"
                </div>
            )}

            {/* Chevron Banner */}
            <div
                className="absolute bottom-0 right-0 px-6 py-2 text-white flex flex-col items-end z-10 drop-shadow-md"
                style={{
                    backgroundColor: accent || '#1DA9E2',
                    clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%)'
                }}
            >
                <span className="text-sm font-light leading-tight tracking-[0.2em] opacity-90">{year}</span>
                <span className="text-2xl font-black tracking-widest">{name}</span>
            </div>
        </div>
    );
}
