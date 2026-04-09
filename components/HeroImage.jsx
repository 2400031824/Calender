"use client";
import React from 'react';

export default function HeroImage({ data, year }) {
    if (!data) return null;
    const { image, name, accent } = data;

    return (
        <div className="relative w-full h-[35%] md:h-[42%] rounded-t-lg overflow-hidden shrink-0">
            {/* Background image */}
            <img
                src={image}
                alt={`${name} ${year}`}
                className="absolute inset-0 w-full h-full object-cover"
            />
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
