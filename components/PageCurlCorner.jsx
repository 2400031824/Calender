"use client";
import React from 'react';

export default function PageCurlCorner({ onCurlClick }) {
    return (
        <div
            onClick={onCurlClick}
            className="absolute bottom-0 right-0 w-16 h-16 cursor-pointer overflow-hidden z-20 group"
        >
            <div className="absolute bottom-0 right-0 w-8 h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:w-12 group-hover:h-12 pointer-events-none">
                {/* The folded back part of the paper */}
                <div
                    className="absolute bottom-0 right-0 w-full h-full bg-white shadow-[-4px_-4px_8px_rgba(0,0,0,0.15)] origin-bottom-right"
                    style={{
                        clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
                        backgroundImage: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.1) 80%, rgba(255,255,255,0.8) 100%)'
                    }}
                />
                {/* The shadow behind the curl */}
                <div
                    className="absolute bottom-1 right-1 w-[120%] h-[120%] shadow-2xl rounded-bl-3xl mix-blend-multiply opacity-50 block md:hidden"
                ></div>
            </div>
        </div>
    );
}
