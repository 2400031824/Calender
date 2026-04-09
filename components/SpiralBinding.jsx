import React from 'react';

export default function SpiralBinding() {
  const coils = Array.from({ length: 24 }, (_, idx) => idx);

  return (
    <svg
      className="absolute left-0 -top-[14px] z-30 h-[28px] w-full"
      viewBox="0 0 580 28"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="coilShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="rgba(0,0,0,0.3)" />
        </filter>
      </defs>
      {coils.map((coil) => {
        const cx = 12 + coil * ((580 - 24) / 23);
        return (
          <ellipse
            key={coil}
            cx={cx}
            cy="14"
            rx="8"
            ry="12"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="2"
            filter="url(#coilShadow)"
          />
        );
      })}
    </svg>
  );
}

