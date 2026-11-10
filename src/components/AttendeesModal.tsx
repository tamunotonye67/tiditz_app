'use client';

import React, { useState } from 'react';
import { X, Search, Users, Check, UserPlus } from 'lucide-react';
import { Registration, EventSpeaker } from '@/types';

interface AttendeesModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: Registration[];
  speakers?: EventSpeaker[];
}

export default function AttendeesModal({
  isOpen,
  onClose,
  registrations,
  speakers = [],
}: AttendeesModalProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'contacts'>('all');
  const [search, setSearch] = useState('');
  const [connectedIds, setConnectedIds] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  // Filter out those who chose not to be shown on attendee list
  const visibleRegistrations = registrations.filter((r) => r.show_in_directory);

  // Combine speakers and attendees
  const combinedList = [
    ...speakers.map((s) => ({
      id: s.id,
      name: s.name,
      role: s.role,
      company: s.company,
      avatar_url: s.avatar_url,
      isSpeaker: true,
    })),
    ...visibleRegistrations.map((r) => ({
      id: r.id,
      name: r.attendee_name,
      role: r.job_title || 'Attendee',
      company: r.organisation || '',
      avatar_url: undefined,
      isSpeaker: false,
    })),
  ];

  const filtered = combinedList.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.role.toLowerCase().includes(q) ||
      (item.company && item.company.toLowerCase().includes(q))
    );
  });

  const toggleConnect = (id: string) => {
    setConnectedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-extrabold text-gray-900">Attendees & Networking</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs & Search */}
        <div className="p-4 px-6 space-y-3 bg-gray-50/50 border-b border-gray-100">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              All Attendees ({combinedList.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'contacts'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              My Connections ({Object.values(connectedIds).filter(Boolean).length})
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search attendees by name, role, or company..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>{combinedList.length} people registered & networking</span>
          </div>
        </div>

        {/* Attendee List */}
        <div className="overflow-y-auto divide-y divide-gray-100 p-2 px-6">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-gray-400">
              No matching attendees found.
            </div>
          ) : (
            filtered.map((attendee) => {
              const isConnected = Boolean(connectedIds[attendee.id]);
              return (
                <div
                  key={attendee.id}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-gray-50/70 rounded-xl px-2 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {attendee.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={attendee.avatar_url}
                        alt={attendee.name}
                        className="w-10 h-10 rounded-full object-cover border border-emerald-100"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-xs">
                        {attendee.name
                          .split(' ')
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900 text-sm">
                          {attendee.name}
                        </span>
                        {attendee.isSpeaker && (
                          <span className="text-[10px] bg-emerald-900 text-emerald-200 px-1.5 py-0.2 rounded font-semibold">
                            Speaker
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                        <svg className="w-3.5 h-3.5 fill-sky-600 shrink-0" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span className="truncate max-w-[200px]">
                          {attendee.role}
                          {attendee.company ? ` • ${attendee.company}` : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleConnect(attendee.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isConnected
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-white text-emerald-800 border-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
