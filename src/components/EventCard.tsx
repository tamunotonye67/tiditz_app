'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Bookmark, Users, Calendar, ArrowRight } from 'lucide-react';
import { TiditzEvent } from '@/types';

interface EventCardProps {
  event: TiditzEvent;
}

export default function EventCard({ event }: EventCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Format date parts
  const startDate = new Date(event.starts_at);
  const day = startDate.getDate() || 15;
  const month = startDate.toLocaleString('en-US', { month: 'short' });

  return (
    <div className="group bg-white rounded-2xl border border-gray-100/80 shadow-xs hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col overflow-hidden">
      {/* Cover Image & Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.cover_image_url}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/75 text-emerald-200 backdrop-blur-md border border-emerald-500/20 shadow-xs">
            {event.category}
          </span>
        </div>

        {/* Bookmark CTA */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 hover:text-emerald-700 backdrop-blur-md flex items-center justify-center transition-colors shadow-xs"
          aria-label="Save event"
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-600 text-emerald-600' : ''}`} />
        </button>

        {/* Format Badge (In-person / Virtual / Hybrid) */}
        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
            {event.format === 'physical' ? '📍 In-person' : event.format === 'virtual' ? '💻 Virtual' : '⚡ Hybrid'}
          </span>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-4 flex-1 flex gap-3.5">
        {/* Date Box */}
        <div className="flex flex-col items-center justify-start pt-0.5 min-w-[42px]">
          <span className="text-xl font-extrabold text-emerald-900 leading-none">
            {day}
          </span>
          <span className="text-[11px] uppercase tracking-wide font-bold text-gray-500 mt-0.5">
            {month}
          </span>
        </div>

        {/* Title, location, price */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/events/${event.slug}`} className="hover:underline">
              <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 group-hover:text-emerald-800 transition-colors">
                {event.title}
              </h3>
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="truncate">{event.city ? `${event.city}, ${event.country_code}` : event.venue_name || 'Online'}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">
              {event.is_free ? 'Free' : event.ticket_price_display || 'From ₦15,000'}
            </span>

            <Link
              href={`/events/${event.slug}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 group-hover:translate-x-0.5 transition-transform"
            >
              <span>View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
