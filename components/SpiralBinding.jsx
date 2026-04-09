"use client";
import React from 'react';

export default function SpiralBinding() {
    const rings = Array.from({ length: 24 });
    return (
        <div className="absolute top-0 left-0 w-full h-8 -mt-4 flex justify-between px-6 z-50 pointer-events-none">
            {rings.map((_, i) => (
                <div key={i} className="relative w-2">
                    {/* Inner hole */}
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full top-[14px] left-1/2 -translate-x-1/2 shadow-inner" />
                    {/* Metal coil */}
                    <svg className="absolute w-[18px] h-10 -ml-[5px] drop-shadow-md" viewBox="0 0 18 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 6C14 2.68629 11.3137 0 8 0C4.68629 0 2 2.68629 2 6L2 34C2 37.3137 4.68629 40 8 40C11.3137 40 14 37.3137 14 34L14 6Z" fill="#2a2a2a" />
                        <path d="M12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8L4 32C4 34.2091 5.79086 36 8 36C10.2091 36 12 34.2091 12 32L12 8Z" fill="url(#metalGrad)" />
                        <defs>
                            <linearGradient id="metalGrad" x1="4" y1="20" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4A4A4A" />
                                <stop offset="0.5" stopColor="#B0B0B0" />
                                <stop offset="1" stopColor="#303030" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            ))}
        </div>
    );
}
