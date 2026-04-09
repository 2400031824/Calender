"use client";
import React from 'react';

export default function PageCurlCorner({ onCurlClick, position = "bottom" }) {
    const isTop = position === "top";

    return (
        <div
            className={`absolute right-0 w-16 h-16 cursor-pointer overflow-hidden z-20 group ${isTop ? 'top-0' : 'bottom-0'}`}
            onClick={(e) => {
                e.stopPropagation();
                onCurlClick();
            }}
        >
            <div
                className={`absolute w-full h-full bg-white/40 backdrop-blur-md border border-white/40 shadow-[-4px_${isTop ? '4px' : '-4px'}_10px_rgba(0,0,0,0.1)] transition-transform duration-300 md:group-hover:scale-125
                 ${isTop ? 'top-[-8px] right-[-8px] rounded-bl-3xl' : 'bottom-[-8px] right-[-8px] rounded-tl-3xl'}`}
                style={{
                    transform: isTop ? 'rotate(45deg) translateY(-20px)' : 'rotate(-45deg) translateY(20px)'
                }}
            />
        </div>
    );
}
