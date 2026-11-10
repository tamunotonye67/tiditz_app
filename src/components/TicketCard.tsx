'use client';

import React, { useState, useEffect } from 'react';
import {
  Download,
  Share2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  Printer,
  Sparkles,
} from 'lucide-react';
import { Ticket } from '@/types';
import { generateQrDataUrl } from '@/lib/qr';
import { downloadIcsFile, generateGoogleCalendarUrl } from '@/lib/calendar';

interface TicketCardProps {
  ticket: Ticket;
  onShare?: () => void;
}

export default function TicketCard({ ticket, onShare }: TicketCardProps) {
  const [qrSrc, setQrSrc] = useState<string>('');

  useEffect(() => {
    // Generate QR code for ticket token/code
    generateQrDataUrl(ticket.qr_token || ticket.ticket_code).then(setQrSrc);
  }, [ticket]);

  const isValid = ticket.status === 'issued';
  const isCheckedIn = ticket.status === 'checked-in';

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDownloadCalendar = () => {
    downloadIcsFile(
      {
        title: ticket.event_title,
        starts_at: ticket.event_starts_at,
        ends_at: ticket.event_ends_at,
        address: ticket.address,
        venue_name: ticket.venue_name,
        slug: ticket.ticket_code,
      },
      ticket
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Boarding Pass Ticket Container */}
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10">
        {/* Top Header - Deep Forest Emerald */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white p-6 pb-8 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 text-emerald-950 font-black flex items-center justify-center text-sm">
                T
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Tiditz
              </span>
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase bg-emerald-800/80 text-emerald-200 border border-emerald-500/30 px-3 py-1 rounded-full">
              {ticket.ticket_type_name || 'TICKET'}
            </span>
          </div>

          <h2 className="text-2xl font-black text-white leading-tight">
            {ticket.event_title}
          </h2>

          <div className="mt-3 space-y-1.5 text-xs text-emerald-100/90 font-medium">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                {new Date(ticket.event_starts_at).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}{' '}
                • 9:00 AM - 6:00 PM ({ticket.event_timezone || 'WAT'})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{ticket.venue_name || 'Eko Convention Centre, Lagos'}</span>
            </div>
          </div>
        </div>

        {/* Perforation Cutouts with Left and Right Circular Notches */}
        <div className="relative bg-white py-1">
          <div className="absolute -left-4 -top-3 w-8 h-8 rounded-full bg-gray-100 border-r border-gray-200" />
          <div className="absolute -right-4 -top-3 w-8 h-8 rounded-full bg-gray-100 border-l border-gray-200" />
          <div className="border-b-2 border-dashed border-gray-200 mx-6 my-2" />
        </div>

        {/* Middle Section: QR Code & Validation Badge */}
        <div className="px-6 py-4 flex flex-col items-center text-center bg-white">
          <div className="p-3 bg-white rounded-2xl border-2 border-emerald-900/10 shadow-inner inline-block my-2">
            {qrSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrSrc}
                alt={`QR code for ticket ${ticket.ticket_code}`}
                className="w-48 h-48 rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-50 flex items-center justify-center text-xs text-gray-400">
                Generating QR...
              </div>
            )}
          </div>

          <div className="mt-2 font-mono font-bold text-gray-800 text-sm tracking-wider">
            Ticket #{ticket.ticket_code}
          </div>

          {/* Status Badge */}
          <div className="mt-2.5">
            {isValid ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Valid for Admission
              </span>
            ) : isCheckedIn ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                Checked In
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                {ticket.status.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Attendee Details Row */}
        <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-white font-bold flex items-center justify-center text-sm shadow-xs">
              {ticket.attendee_name
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div className="text-left">
              <div className="font-bold text-gray-900 text-sm">
                {ticket.attendee_name}
              </div>
              <div className="text-xs text-gray-500 truncate max-w-[180px]">
                {ticket.attendee_email}
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">Category</span>
            <span className="text-xs font-bold text-emerald-800">{ticket.ticket_type_name || 'General Admission'}</span>
          </div>
        </div>

        {/* Action Buttons Bar */}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-around text-xs font-semibold text-gray-700">
          <button
            type="button"
            onClick={handlePrint}
            className="flex flex-col items-center gap-1 hover:text-emerald-800 transition-colors p-2 rounded-xl hover:bg-emerald-50"
          >
            <Printer className="w-4 h-4 text-emerald-700" />
            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={onShare}
            className="flex flex-col items-center gap-1 hover:text-emerald-800 transition-colors p-2 rounded-xl hover:bg-emerald-50"
          >
            <Share2 className="w-4 h-4 text-emerald-700" />
            <span>Share</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadCalendar}
            className="flex flex-col items-center gap-1 hover:text-emerald-800 transition-colors p-2 rounded-xl hover:bg-emerald-50"
            title="Download .ics calendar event"
          >
            <Calendar className="w-4 h-4 text-emerald-700" />
            <span>Add to Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
