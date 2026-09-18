import React from 'react';
import FestivalAtmosphere from './FestivalAtmosphere.jsx';

export default function FestiveBackground({ children }) {
  return (
    <div className="min-h-screen w-full relative bg-gradient-to-b from-[#1c0b05] via-[#2a1107] to-[#140602] text-amber-50 overflow-x-hidden flex flex-col">
      {/* Lightweight Ambient Festival Atmosphere (Petals & Sparkles) */}
      <FestivalAtmosphere />

      {/* Subtle Rangoli / Mandala Watermark Pattern in background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] bg-repeat bg-center"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, #f59e0b 2px, transparent 2px), radial-gradient(circle at 0% 0%, #f59e0b 2px, transparent 2px)`,
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Atmospheric Warm Glowing Lights */}
      <div
        className="fixed -top-32 left-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed top-1/3 -right-32 w-96 h-96 rounded-full bg-orange-600/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="fixed -bottom-32 left-1/3 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col w-full">
        {children}
      </div>
    </div>
  );
}
