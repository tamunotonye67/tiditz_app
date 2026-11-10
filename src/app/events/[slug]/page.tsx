'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import PhoneMockupWrapper from '@/components/PhoneMockupWrapper';
import ShareModal from '@/components/ShareModal';
import VenueModal from '@/components/VenueModal';
import AttendeesModal from '@/components/AttendeesModal';
import { TiditzStore } from '@/lib/store';
import { TiditzEvent, Registration } from '@/types';
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  Bookmark,
  ChevronLeft,
  Users,
  Navigation,
  ArrowRight,
  ShieldCheck,
  Globe2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface EventDetailPageProps {
  params: Promise<{ slug: string }>;
}

function EventDetailContent({ params }: EventDetailPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [event, setEvent] = useState<TiditzEvent | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [isPhoneMockup, setIsPhoneMockup] = useState(false);

  // Modals
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [venueModalOpen, setVenueModalOpen] = useState(false);
  const [attendeesModalOpen, setAttendeesModalOpen] = useState(false);

  useEffect(() => {
    const found = TiditzStore.getEventBySlug(resolvedParams.slug);
    if (found) {
      setEvent(found);
      setRegistrations(TiditzStore.getRegistrationsForEvent(found.id));
    }
  }, [resolvedParams.slug]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
            <Calendar className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Event Not Found</h2>
          <p className="text-xs text-gray-500 mt-1">
            The event URL may have changed or the event is no longer listed.
          </p>
          <Link
            href="/events"
            className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
          >
            Browse all events
          </Link>
        </div>
      </div>
    );
  }

  const startDate = new Date(event.starts_at);
  const formattedDate = startDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const content = (
    <div className="min-h-screen bg-[#FDFDFC] pb-24">
      {/* Top Header Controls (Back, Share, Bookmark) matching mockup Screen 3 */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-700 flex items-center gap-1 text-xs font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShareModalOpen(true)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            aria-label="Share event"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            aria-label="Save event"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-700 text-emerald-700' : ''}`} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-6">
        {/* Cover Image Carousel matching Screen 3 mockup */}
        <div className="relative aspect-[16/10] sm:aspect-[2/1] rounded-3xl overflow-hidden shadow-md bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.cover_image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {/* Photo count pill in bottom right corner */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
            1/{(event.gallery_images?.length || 0) + 1}
          </div>
        </div>

        {/* Title & Tagline matching Screen 3 */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight">
            {event.title}
          </h1>
          {event.tagline && (
            <p className="text-sm sm:text-base text-gray-500 font-semibold mt-1">
              {event.tagline}
            </p>
          )}
        </div>

        {/* Date & Time Box */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">{formattedDate}</div>
            <div className="text-xs text-gray-500 font-medium mt-0.5">
              9:00 AM – 6:00 PM ({event.timezone})
            </div>
          </div>
        </div>

        {/* Venue & Directions Clickable Card matching Screen 3 -> Screen 5 */}
        <button
          type="button"
          onClick={() => setVenueModalOpen(true)}
          className="w-full text-left bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:border-emerald-200 transition-all flex items-start justify-between gap-3 group"
        >
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm group-hover:text-emerald-800 transition-colors">
                {event.venue_name || 'Event Venue'}
              </div>
              <div className="text-xs text-gray-500 font-medium mt-0.5">
                {event.address || `${event.city || 'Lagos'}, ${event.country_code}`}
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-0.5 shrink-0 pt-1">
            <span>Map</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </button>

        {/* Pills for Format and Category matching Screen 3 mockup */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            {event.format === 'physical' ? 'In-person' : event.format === 'virtual' ? 'Virtual Online' : 'Hybrid'}
          </span>
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            {event.category}
          </span>
        </div>

        {/* About This Event matching Screen 3 mockup */}
        <div className="space-y-2">
          <h2 className="text-lg font-extrabold text-gray-900">About this event</h2>
          <div className={`text-xs sm:text-sm text-gray-600 leading-relaxed ${readMore ? '' : 'line-clamp-3'}`}>
            {event.description}
          </div>
          <button
            type="button"
            onClick={() => setReadMore(!readMore)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer block pt-1"
          >
            {readMore ? 'Read less ^' : 'Read more ∨'}
          </button>
        </div>

        {/* Attendees & Networking Teaser matching Screen 6 link */}
        <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-xs">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm">
                {event.registered_count} people attending
              </div>
              <div className="text-xs text-gray-500">
                Network with designers, engineers, and founders
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setAttendeesModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-600 text-emerald-800 text-xs font-bold hover:bg-emerald-50 transition-colors"
          >
            View List
          </button>
        </div>

        {/* Speakers Section */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-extrabold text-gray-900">Featured Speakers</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {event.speakers.map((spk) => (
                <div
                  key={spk.id}
                  className="bg-white p-3 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center"
                >
                  {spk.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={spk.avatar_url}
                      alt={spk.name}
                      className="w-14 h-14 rounded-full object-cover mb-2 border-2 border-emerald-100"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-sm mb-2">
                      {spk.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="font-bold text-gray-900 text-xs leading-tight">{spk.name}</span>
                  <span className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{spk.role}</span>
                  {spk.company && (
                    <span className="text-[10px] text-emerald-700 font-medium">{spk.company}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agenda Section */}
        {event.agenda && event.agenda.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-extrabold text-gray-900">Event Schedule</h3>
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs divide-y divide-gray-100">
              {event.agenda.map((item) => (
                <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-start gap-4">
                  <span className="text-xs font-bold text-emerald-800 min-w-[70px] shrink-0 pt-0.5">
                    {item.time}
                  </span>
                  <div>
                    <div className="font-bold text-gray-900 text-xs sm:text-sm">{item.title}</div>
                    {item.speaker && (
                      <div className="text-xs text-gray-500 mt-0.5">Speaker: {item.speaker}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organizer Section */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {event.organizer.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={event.organizer.avatar_url}
                alt={event.organizer.name}
                className="w-12 h-12 rounded-full object-cover border border-emerald-100"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-emerald-900 text-emerald-100 font-bold flex items-center justify-center text-sm">
                {event.organizer.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div>
              <span className="text-[11px] uppercase font-bold text-gray-400 block">Organised by</span>
              <span className="font-bold text-gray-900 text-sm">{event.organizer.name}</span>
            </div>
          </div>
          <button
            type="button"
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-300 hover:bg-emerald-50"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Sticky Bottom Action CTA matching Screen 3 mockup ("Register Now") */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Admission</span>
            <span className="text-sm font-extrabold text-emerald-800">
              {event.is_free ? 'Free' : event.ticket_price_display || 'From ₦15,000'}
            </span>
          </div>

          <Link
            href={`/events/${event.slug}/register`}
            className="flex-1 max-w-xs py-3.5 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm text-center shadow-lg hover:shadow-emerald-700/25 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Register Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Modals */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={event.title}
      />
      <VenueModal
        isOpen={venueModalOpen}
        onClose={() => setVenueModalOpen(false)}
        event={event}
      />
      <AttendeesModal
        isOpen={attendeesModalOpen}
        onClose={() => setAttendeesModalOpen(false)}
        registrations={registrations}
        speakers={event.speakers}
      />
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

export default function EventDetailPage({ params }: EventDetailPageProps) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-xs text-gray-400">Loading event details...</div>}>
      <EventDetailContent params={params} />
    </React.Suspense>
  );
}
