'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { TiditzStore } from '@/lib/store';
import { TiditzEvent, Ticket, CheckInRecord } from '@/types';
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Camera,
  RefreshCw,
  Search,
  Users,
  ShieldCheck,
  Smartphone,
  ChevronRight,
} from 'lucide-react';

export default function CheckInScannerPage() {
  const [events, setEvents] = useState<TiditzEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('evt-ats-2025');
  const [ticketInput, setTicketInput] = useState<string>('');
  const [checkInResult, setCheckInResult] = useState<{
    status: 'IDLE' | 'VALID' | 'ALREADY_CHECKED_IN' | 'INVALID' | 'WRONG_EVENT' | 'REVOKED';
    message: string;
    ticket?: Ticket;
  }>({ status: 'IDLE', message: '' });

  const [recentScans, setRecentScans] = useState<CheckInRecord[]>([]);

  useEffect(() => {
    const list = TiditzStore.getEvents();
    setEvents(list);
    setRecentScans(TiditzStore.getCheckInHistory(selectedEventId));
  }, [selectedEventId]);

  const activeEvent = events.find((e) => e.id === selectedEventId);

  const handleProcessScan = (codeToScan: string) => {
    if (!codeToScan.trim()) return;

    const res = TiditzStore.checkInTicket({
      scannedTokenOrCode: codeToScan,
      targetEventId: selectedEventId,
      staffName: 'Staff Gate Scanner',
    });

    setCheckInResult({
      status: res.status,
      message: res.message,
      ticket: res.ticket,
    });

    // Refresh history
    setRecentScans(TiditzStore.getCheckInHistory(selectedEventId));
    setTicketInput('');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleProcessScan(ticketInput);
  };

  const totalRegistered = activeEvent?.registered_count || 0;
  const totalCheckedIn = recentScans.filter((s) => s.result === 'accepted').length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 w-full space-y-6">
        {/* Header & Event selector */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Gate Admission Scanner</span>
            </div>
            <h1 className="text-2xl font-black text-gray-950 mt-1">Check-In Terminal</h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Scan attendee QR codes or enter ticket identifiers to validate admission.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Active Event Gate
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => {
                setSelectedEventId(e.target.value);
                setCheckInResult({ status: 'IDLE', message: '' });
              }}
              className="w-full sm:w-64 bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            >
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Attendance Counter */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Admitted Guests</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">{totalCheckedIn}</div>
            <span className="text-[10px] text-gray-400">Validated check-ins</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Total Registrations</span>
            <div className="text-2xl font-black text-gray-900 mt-1">{totalRegistered}</div>
            <span className="text-[10px] text-gray-400">Confirmed orders</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold text-gray-400 uppercase">Admission Rate</span>
            <div className="text-2xl font-black text-emerald-950 mt-1">
              {totalRegistered > 0 ? `${Math.round((totalCheckedIn / totalRegistered) * 100)}%` : '0%'}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">Single-use enforced</span>
          </div>
        </div>

        {/* Scanner & Result Interface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Scanner Viewport / Simulation */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-gray-900 text-sm">QR Code Camera Feed</h3>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Ready to Scan
              </span>
            </div>

            {/* Camera Viewport Frame with crosshairs */}
            <div className="relative aspect-square w-full max-w-[280px] mx-auto rounded-3xl bg-neutral-900 overflow-hidden flex flex-col items-center justify-center p-4 border-4 border-emerald-900/30">
              {/* Scanline animation */}
              <div className="absolute inset-x-4 top-1/4 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34D399] animate-pulse" />
              
              <div className="w-44 h-44 border-2 border-dashed border-emerald-400/60 rounded-2xl flex flex-col items-center justify-center text-center p-3">
                <QrCode className="w-12 h-12 text-emerald-400/80 mb-2 animate-bounce" />
                <span className="text-[10px] font-semibold text-emerald-200">
                  Align Ticket QR Code Inside Frame
                </span>
              </div>
            </div>

            {/* Quick Demo Scan Simulators */}
            <div>
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Simulate QR Code Scans (PRD Scenarios)
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleProcessScan('TIDZ-7824-6619')}
                  className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 text-left transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span>Scan Valid Ticket</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[10px] text-emerald-600 font-mono mt-0.5">#TIDZ-7824-6619</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleProcessScan('TIDZ-1049-3321')}
                  className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold border border-amber-200 text-left transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span>Test Duplicate Scan</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="text-[10px] text-amber-700 font-mono mt-0.5">#TIDZ-1049-3321</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleProcessScan('FAKE-TIDZ-9999')}
                  className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 font-bold border border-rose-200 text-left transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span>Test Invalid Token</span>
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <div className="text-[10px] text-rose-700 font-mono mt-0.5">#FAKE-TIDZ-9999</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleProcessScan('QR-TIDZ-KE-DEV-001')}
                  className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold border border-purple-200 text-left transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span>Test Wrong Event</span>
                    <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <div className="text-[10px] text-purple-700 font-mono mt-0.5">Nairobi Ticket</div>
                </button>
              </div>
            </div>
          </div>

          {/* Validation Result Box & Manual Lookup */}
          <div className="space-y-4">
            {/* Live Outcome Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Verification Result
              </span>

              <div className="my-4">
                {checkInResult.status === 'IDLE' && (
                  <div className="p-8 rounded-2xl bg-gray-50 border border-dashed border-gray-200 text-center">
                    <QrCode className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <h4 className="font-bold text-gray-700 text-sm">Scanner Ready</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Waiting for incoming QR scan or manual ticket entry.
                    </p>
                  </div>
                )}

                {checkInResult.status === 'VALID' && (
                  <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-500 text-emerald-950 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2 font-black text-lg text-emerald-900">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                      <span>ENTRY APPROVED — ADMIT ONE</span>
                    </div>
                    <p className="text-xs text-emerald-800 font-medium mt-1">
                      {checkInResult.message}
                    </p>
                    {checkInResult.ticket && (
                      <div className="mt-4 pt-3 border-t border-emerald-200 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500 text-[10px] block uppercase font-bold">Attendee</span>
                          <span className="font-extrabold text-gray-900">{checkInResult.ticket.attendee_name}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] block uppercase font-bold">Category</span>
                          <span className="font-extrabold text-emerald-800">{checkInResult.ticket.ticket_type_name}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500 text-[10px] block uppercase font-bold">Ticket Code</span>
                          <span className="font-mono font-bold text-gray-800">{checkInResult.ticket.ticket_code}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {checkInResult.status === 'ALREADY_CHECKED_IN' && (
                  <div className="p-6 rounded-2xl bg-amber-50 border-2 border-amber-500 text-amber-950 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2 font-black text-lg text-amber-900">
                      <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                      <span>ALREADY CHECKED IN</span>
                    </div>
                    <p className="text-xs text-amber-800 font-medium mt-1">
                      {checkInResult.message}
                    </p>
                    {checkInResult.ticket && (
                      <div className="mt-4 pt-3 border-t border-amber-200 text-xs">
                        <span className="text-gray-500 text-[10px] block uppercase font-bold">Registered to</span>
                        <span className="font-extrabold text-gray-900">{checkInResult.ticket.attendee_name}</span>
                      </div>
                    )}
                  </div>
                )}

                {checkInResult.status === 'INVALID' && (
                  <div className="p-6 rounded-2xl bg-rose-50 border-2 border-rose-500 text-rose-950 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2 font-black text-lg text-rose-900">
                      <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                      <span>INVALID TICKET</span>
                    </div>
                    <p className="text-xs text-rose-800 font-medium mt-1">
                      {checkInResult.message}
                    </p>
                  </div>
                )}

                {checkInResult.status === 'WRONG_EVENT' && (
                  <div className="p-6 rounded-2xl bg-purple-50 border-2 border-purple-500 text-purple-950 animate-in zoom-in-95 duration-200">
                    <div className="flex items-center gap-2 font-black text-lg text-purple-900">
                      <HelpCircle className="w-6 h-6 text-purple-600 shrink-0" />
                      <span>WRONG EVENT TICKET</span>
                    </div>
                    <p className="text-xs text-purple-800 font-medium mt-1">
                      {checkInResult.message}
                    </p>
                  </div>
                )}
              </div>

              {/* Manual Ticket Identifier Input */}
              <form onSubmit={handleManualSubmit} className="pt-2">
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Manual Code Lookup
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={ticketInput}
                      onChange={(e) => setTicketInput(e.target.value)}
                      placeholder="e.g. TIDZ-7824-6619"
                      className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold uppercase focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Check-In Audit Log Table */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-extrabold text-gray-900">Live Admission Log</h3>
            <span className="text-xs text-gray-400 font-medium">Auto-recorded</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="py-2.5 px-4 rounded-l-xl">Time</th>
                  <th className="py-2.5 px-4">Attendee Name</th>
                  <th className="py-2.5 px-4">Ticket Code</th>
                  <th className="py-2.5 px-4">Result</th>
                  <th className="py-2.5 px-4 rounded-r-xl">Scanned By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {recentScans.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">
                      No tickets scanned yet for this event.
                    </td>
                  </tr>
                ) : (
                  recentScans.map((scan) => (
                    <tr key={scan.id} className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-mono text-gray-500">
                        {new Date(scan.scanned_at).toLocaleTimeString()}
                      </td>
                      <td className="py-3 px-4 font-bold text-gray-900">{scan.attendee_name}</td>
                      <td className="py-3 px-4 font-mono text-emerald-800">{scan.ticket_code}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            scan.result === 'accepted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {scan.result.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{scan.scanned_by}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
