'use client';

import React from 'react';
import { X, MapPin, ExternalLink, Navigation } from 'lucide-react';
import { TiditzEvent } from '@/types';

interface VenueModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: TiditzEvent;
}

export default function VenueModal({ isOpen, onClose, event }: VenueModalProps) {
  if (!isOpen) return null;

  const mapsQuery = encodeURIComponent(
    `${event.venue_name || ''} ${event.address || ''} ${event.city || ''} ${event.country_code || ''}`.trim()
  );
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-extrabold text-gray-900">Venue & Directions</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-5">
          {/* Main Venue Photo */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={event.cover_image_url}
              alt={event.venue_name || 'Venue'}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Venue Info */}
          <div>
            <h4 className="text-xl font-black text-gray-950">
              {event.venue_name || 'Event Venue'}
            </h4>
            <p className="text-sm text-gray-500 mt-1 flex items-start gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>{event.address || `${event.city || 'Lagos'}, ${event.country_code}`}</span>
            </p>
          </div>

          {/* Interactive Simulated Map */}
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-emerald-900/10 shadow-inner bg-emerald-50/40 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[radial-gradient(#15803d_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
            
            <div className="relative flex flex-col items-center text-center p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-100 shadow-md max-w-xs">
              <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md animate-bounce">
                <MapPin className="w-5 h-5 fill-white" />
              </div>
              <span className="font-bold text-gray-900 text-sm mt-2">{event.venue_name}</span>
              <span className="text-[11px] text-gray-500 mt-0.5">{event.city}, {event.country_code}</span>
            </div>
          </div>

          {/* Directions CTA Button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl text-sm shadow-md hover:shadow-lg transition-all"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions (Opens in Google Maps)</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          {/* Venue Photos Gallery */}
          {event.gallery_images && event.gallery_images.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h5 className="font-extrabold text-sm text-gray-900">Venue Photos</h5>
                <span className="text-xs font-semibold text-emerald-700">See all ({event.gallery_images.length})</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {event.gallery_images.map((img, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-xs">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Venue photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
