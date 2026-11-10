'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { TiditzStore } from '@/lib/store';
import { TiditzEvent, Registration, CreativeProject } from '@/types';
import {
  CalendarPlus,
  QrCode,
  Users,
  Ticket,
  Palette,
  TrendingUp,
  Download,
  ExternalLink,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function OrganizerDashboardPage() {
  const [events, setEvents] = useState<TiditzEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [creativeProjects, setCreativeProjects] = useState<CreativeProject[]>([]);

  useEffect(() => {
    setEvents(TiditzStore.getEvents());
    setRegistrations(TiditzStore.getRegistrations());
    setCreativeProjects(TiditzStore.getCreativeProjects());
  }, []);

  const totalRegistrations = registrations.length + 2480; // seeded aggregate
  const totalAdmissions = TiditzStore.getCheckInHistory().length;

  const exportAttendeesCsv = () => {
    const headers = ['ID', 'Event ID', 'Attendee Name', 'Email', 'Phone', 'Organisation', 'Job Title', 'Date'];
    const rows = registrations.map((r) => [
      r.id,
      r.event_id,
      `"${r.attendee_name}"`,
      r.attendee_email,
      r.attendee_phone || '',
      `"${r.organisation || ''}"`,
      `"${r.job_title || ''}"`,
      r.created_at,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `tiditz_attendees_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Header & Quick Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Organizer Operations Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-950 mt-1">Organizer Dashboard</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Manage your African event registrations, check-in gate counters, and creative assets.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/organizer/check-in"
              className="px-4 py-2.5 rounded-xl border border-emerald-600 text-emerald-800 hover:bg-emerald-50 text-xs font-bold transition-all flex items-center gap-2"
            >
              <QrCode className="w-4 h-4 text-emerald-700" />
              <span>Gate Scanner</span>
            </Link>

            <Link
              href="/organizer/events/new"
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
            >
              <CalendarPlus className="w-4 h-4" />
              <span>Create Event</span>
            </Link>
          </div>
        </div>

        {/* High-level KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Ticket className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Total Events
              </span>
              <div className="text-2xl font-black text-gray-900 mt-0.5">{events.length}</div>
              <span className="text-[10px] text-emerald-600 font-semibold">Published active</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Registrations
              </span>
              <div className="text-2xl font-black text-gray-900 mt-0.5">{totalRegistrations}</div>
              <span className="text-[10px] text-emerald-600 font-semibold">Across all events</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Gate Admitted
              </span>
              <div className="text-2xl font-black text-gray-900 mt-0.5">{totalAdmissions}</div>
              <span className="text-[10px] text-emerald-600 font-semibold">Verified admissions</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-gray-100 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Creative Projects
              </span>
              <div className="text-2xl font-black text-gray-900 mt-0.5">{creativeProjects.length}</div>
              <span className="text-[10px] text-emerald-600 font-semibold">Brand studio jobs</span>
            </div>
          </div>
        </div>

        {/* Managed Events Section */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-gray-900">Your Events</h2>
              <p className="text-xs text-gray-500">Events created and managed under this account.</p>
            </div>
            <Link
              href="/organizer/events/new"
              className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Event</span>
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {events.map((ev) => (
              <div key={ev.id} className="py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ev.cover_image_url} alt={ev.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link href={`/events/${ev.slug}`} className="font-extrabold text-gray-900 text-sm hover:underline">
                        {ev.title}
                      </Link>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {ev.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {ev.city ? `${ev.city}, ${ev.country_code}` : 'Online'} •{' '}
                      {new Date(ev.starts_at).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <div className="text-right mr-2">
                    <span className="text-xs font-black text-emerald-800 block">
                      {ev.registered_count} Registered
                    </span>
                    <span className="text-[10px] text-gray-400 block">
                      Capacity: {ev.capacity || 'Unlimited'}
                    </span>
                  </div>

                  <Link
                    href={`/events/${ev.slug}`}
                    className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors"
                    title="View public page"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/organizer/check-in`}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Check-in</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Registrations & CSV Export Section */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-gray-900">Recent Registrations</h2>
              <p className="text-xs text-gray-500">Attendee submissions from published forms.</p>
            </div>
            <button
              type="button"
              onClick={exportAttendeesCsv}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-2.5 px-4 rounded-l-xl">Attendee</th>
                  <th className="py-2.5 px-4">Contact</th>
                  <th className="py-2.5 px-4">Organisation / Role</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 rounded-r-xl">Registered At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {registrations.slice(0, 10).map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-bold text-gray-900">{r.attendee_name}</td>
                    <td className="py-3 px-4 text-gray-600">{r.attendee_email}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {r.job_title ? `${r.job_title}${r.organisation ? ` • ${r.organisation}` : ''}` : r.organisation || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {r.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-400 font-mono">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
