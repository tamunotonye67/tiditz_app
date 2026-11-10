'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import TicketCard from '@/components/TicketCard';
import ShareModal from '@/components/ShareModal';
import PhoneMockupWrapper from '@/components/PhoneMockupWrapper';
import { TiditzStore } from '@/lib/store';
import { Ticket } from '@/types';
import { ChevronLeft, QrCode, CheckCircle2, Ticket as TicketIcon } from 'lucide-react';

interface TicketPageProps {
  params: Promise<{ ticketCode: string }>;
}

function TicketContent({ params }: TicketPageProps) {
  const resolvedParams = use(params);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isPhoneMockup, setIsPhoneMockup] = useState(false);

  useEffect(() => {
    const found = TiditzStore.getTicketByCode(resolvedParams.ticketCode);
    if (found) {
      setTicket(found);
    }
  }, [resolvedParams.ticketCode]);

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
            <TicketIcon className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Ticket Not Found</h2>
          <p className="text-xs text-gray-500 mt-1">
            No ticket exists for code: <code className="font-mono">{resolvedParams.ticketCode}</code>
          </p>
          <div className="flex gap-3 mt-4">
            <Link
              href="/events"
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
            >
              Discover Events
            </Link>
            <Link
              href="/tickets/TIDZ-7824-6619"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-xl text-xs font-bold"
            >
              View Sample Ticket
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const content = (
    <div className="min-h-screen bg-stone-100/60 pb-16">
      {/* Top Header matching Screen 7 */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <Link
          href={`/events`}
          className="p-1 rounded-full text-gray-700 hover:bg-gray-100 flex items-center gap-1 text-xs font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Events</span>
        </Link>

        <h1 className="text-sm font-black text-gray-900">My Ticket</h1>

        <Link
          href="/organizer/check-in"
          className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
          title="Open staff scanner to simulate scanning this ticket"
        >
          <QrCode className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Gate Scanner</span>
        </Link>
      </div>

      <div className="max-w-md mx-auto px-4 pt-6 space-y-4">
        {/* Ticket Card matching Screen 7 */}
        <TicketCard ticket={ticket} onShare={() => setShareModalOpen(true)} />

        {/* Helpful Info Alert */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 text-xs text-emerald-950 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Admittance Instructions</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            Please present this QR code at the venue entrance. The gate staff will scan it using the Tiditz Check-In system.
          </p>
        </div>
      </div>

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={ticket.event_title}
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

export default function TicketPage({ params }: TicketPageProps) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-xs text-gray-400">Loading ticket...</div>}>
      <TicketContent params={params} />
    </React.Suspense>
  );
}
