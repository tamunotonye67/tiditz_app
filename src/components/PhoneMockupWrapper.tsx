'use client';

import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';
import MobileNav from './MobileNav';

interface PhoneMockupWrapperProps {
  children: React.ReactNode;
  active?: boolean;
}

export default function PhoneMockupWrapper({ children, active = false }: PhoneMockupWrapperProps) {
  if (!active) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-stone-900/90 py-6 px-2 sm:px-6 flex flex-col items-center justify-center">
      {/* Device frame container */}
      <div className="relative w-full max-w-[420px] aspect-[9/19.5] max-h-[920px] bg-black rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_2px_rgba(255,255,255,0.1)] border-4 border-neutral-800 flex flex-col overflow-hidden">
        {/* Dynamic Island / Speaker */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-end px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-neutral-700 mr-1" />
        </div>

        {/* Top Status Bar (9:41, WiFi, Signal, Battery) */}
        <div className="w-full pt-3 px-6 pb-1 text-black flex items-center justify-between text-xs font-semibold z-40 select-none bg-white/90 backdrop-blur-xs">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Inner Phone Screen */}
        <div className="flex-1 bg-white overflow-y-auto relative rounded-b-[38px] flex flex-col scrollbar-thin scrollbar-thumb-emerald-200">
          <div className="flex-1 pb-16">{children}</div>
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
