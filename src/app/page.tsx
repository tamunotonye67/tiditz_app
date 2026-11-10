'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import PhoneMockupWrapper from '@/components/PhoneMockupWrapper';
import { TiditzStore } from '@/lib/store';
import { TiditzEvent } from '@/types';
import {
  Sparkles,
  Compass,
  CalendarPlus,
  QrCode,
  ShieldCheck,
  Globe2,
  Palette,
  ArrowRight,
  CheckCircle2,
  Ticket,
  Smartphone,
} from 'lucide-react';

export default function HomePage() {
  const [events, setEvents] = useState<TiditzEvent[]>([]);
  const [isPhoneMockup, setIsPhoneMockup] = useState(false);

  useEffect(() => {
    setEvents(TiditzStore.getEvents());
  }, []);

  const featured = events.slice(0, 3);

  const content = (
    <div className="flex flex-col min-h-screen bg-[#FDFDFC]">
      {/* Hero Section matching Screen 1 in mockup */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#092B1B] via-[#0D3823] to-[#041D12] text-white pt-8 pb-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle patterned overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        
        {/* Glow circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Top Logo and Tagline matching Screen 1 */}
          <div className="flex flex-col items-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold backdrop-blur-md mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multi-Country African Event & Ticketing Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white flex items-center gap-2">
              Tiditz
            </h1>
            <p className="text-sm sm:text-base text-emerald-200/90 font-medium mt-1">
              Every event. Every ticket. One platform.
            </p>
          </div>

          {/* Hero Concert / Crowd Image Banner with rounded card frame */}
          <div className="relative w-full max-w-lg aspect-[16/9] sm:aspect-[2/1] rounded-3xl overflow-hidden shadow-2xl border-2 border-emerald-500/30 my-4 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
              alt="Concert and event crowd"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest block">
                Next-Gen Event Experience
              </span>
              <p className="text-sm sm:text-base font-bold text-white">
                Live in Lagos, Nairobi, Accra, Kigali, and beyond.
              </p>
            </div>
          </div>

          {/* Headline matching Screen 1 mockup */}
          <div className="mt-4 max-w-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Discover amazing events <span className="text-emerald-400">across Africa.</span>
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-2 font-medium">
              Conferences. Concerts. Workshops. Ministries. And more.
            </p>
          </div>

          {/* Action CTAs matching Screen 1 mockup */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <Link
              href="/events"
              className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 group"
            >
              <Compass className="w-4 h-4" />
              <span>Discover Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/organizer/events/new"
              className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-100 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <CalendarPlus className="w-4 h-4 text-emerald-400" />
              <span>Create an Event</span>
            </Link>
          </div>

          {/* Interactive Screen Navigation Guide / Quick Jump for testing */}
          <div className="mt-10 p-3 sm:p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 backdrop-blur-md max-w-xl text-left w-full">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>PRD Mockup Screens Jump</span>
              <span className="text-emerald-300 font-normal">Phase 1 & 2 Ready</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <Link href="/events" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 font-medium">
                1. Explore Events
              </Link>
              <Link href="/events/africa-tech-summit-2025" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 font-medium">
                2. Event Detail
              </Link>
              <Link href="/events/africa-tech-summit-2025/register" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 font-medium">
                3. Registration
              </Link>
              <Link href="/tickets/TIDZ-7824-6619" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 font-medium">
                4. QR Ticket
              </Link>
              <Link href="/organizer/check-in" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 font-medium">
                5. Check-In Scanner
              </Link>
              <Link href="/organizer/events/new" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 font-medium">
                6. Form Builder
              </Link>
              <Link href="/organizer" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 font-medium">
                7. Organizer Hub
              </Link>
              <Link href="/creative" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 font-medium">
                8. Creative Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section matching mockup Screen 2 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
              Featured Events
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              Hand-picked upcoming conferences, workshops, and gatherings across the continent
            </p>
          </div>
          <Link
            href="/events"
            className="text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            <span>See all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Value Pillars from PRD */}
      <section className="bg-emerald-50/50 border-y border-emerald-950/10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Why Tiditz?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">
              Everything you need to bring an event to life
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2">
              From the first registration form submission to the final QR code check-in at the gate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <CalendarPlus className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-gray-900 text-lg">Custom Form & Page Builder</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Add, reorder, and validate custom registration fields (dropdowns, phone numbers, tracks, consent) with mobile-optimized responsive templates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-gray-900 text-lg">Digital QR Tickets & Gate Check-In</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Cryptographically unpredictable ticket tokens with camera scanner support, single-use atomic admission, and duplicate check-in blocking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xs hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-gray-900 text-lg">Tiditz Creative Studio</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                Need professional event branding, 3D motion graphics teasers, promotional video cuts, or custom page design? Commission our in-house creative division.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-emerald-200/80 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-emerald-900 pb-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-emerald-950 font-black flex items-center justify-center text-sm">
                T
              </div>
              <span className="font-extrabold text-xl text-white">Tiditz</span>
            </div>
            <p className="text-xs text-emerald-300/70 mt-1">
              Create. Register. Get in. Multi-country African Event Platform.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-medium">
            <Link href="/events" className="hover:text-white transition-colors">Explore</Link>
            <Link href="/organizer" className="hover:text-white transition-colors">Organizer Hub</Link>
            <Link href="/organizer/check-in" className="hover:text-white transition-colors">QR Scanner</Link>
            <Link href="/creative" className="hover:text-white transition-colors">Creative Services</Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-400/60">
          <span>&copy; {new Date().getFullYear()} Tiditz Technologies Ltd. All rights reserved.</span>
          <span>Built for Nigeria, Kenya, Ghana, Rwanda, South Africa, and all across Africa.</span>
        </div>
      </footer>
    </div>
  );

  return (
    <>
      <Navbar
        isPhoneMockup={isPhoneMockup}
        onTogglePhoneMockup={() => setIsPhoneMockup(!isPhoneMockup)}
      />
      <PhoneMockupWrapper active={isPhoneMockup}>{content}</PhoneMockupWrapper>
    </>
  );
}
