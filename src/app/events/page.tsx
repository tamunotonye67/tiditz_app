'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import EventCard from '@/components/EventCard';
import PhoneMockupWrapper from '@/components/PhoneMockupWrapper';
import { TiditzStore } from '@/lib/store';
import { TiditzEvent } from '@/types';
import {
  Search,
  MapPin,
  Calendar,
  Layers,
  Filter,
  X,
  Compass,
} from 'lucide-react';

export default function EventsDiscoveryPage() {
  const [events, setEvents] = useState<TiditzEvent[]>([]);
  const [isPhoneMockup, setIsPhoneMockup] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('All'); // All | Free | Paid | Online | In-Person
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');

  useEffect(() => {
    setEvents(TiditzStore.getEvents());
  }, []);

  const categories = useMemo(() => {
    const list = Array.from(new Set(events.map((e) => e.category)));
    return ['All', ...list];
  }, [events]);

  const countries = [
    { code: 'All', name: 'All Locations' },
    { code: 'NG', name: 'Nigeria (Lagos, Abuja)' },
    { code: 'KE', name: 'Kenya (Nairobi)' },
    { code: 'GH', name: 'Ghana (Accra)' },
    { code: 'RW', name: 'Rwanda (Kigali)' },
    { code: 'ZA', name: 'South Africa' },
  ];

  const quickFilterTabs = ['All', 'Free', 'Paid', 'Online', 'In-Person'];

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // Visibility check: only public published events
      if (e.status !== 'published' || e.visibility !== 'public') return false;

      // Search match
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchTitle = e.title.toLowerCase().includes(q);
        const matchDesc = e.description.toLowerCase().includes(q);
        const matchOrg = e.organizer?.name?.toLowerCase().includes(q);
        const matchCity = e.city?.toLowerCase().includes(q);
        const matchVenue = e.venue_name?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchOrg && !matchCity && !matchVenue) {
          return false;
        }
      }

      // Format quick filter
      if (selectedFormat === 'Free' && !e.is_free) return false;
      if (selectedFormat === 'Paid' && e.is_free) return false;
      if (selectedFormat === 'Online' && e.format !== 'virtual') return false;
      if (selectedFormat === 'In-Person' && e.format !== 'physical') return false;

      // Category filter
      if (selectedCategory !== 'All' && e.category !== selectedCategory) return false;

      // Country filter
      if (selectedCountry !== 'All' && e.country_code !== selectedCountry) return false;

      return true;
    });
  }, [events, search, selectedFormat, selectedCategory, selectedCountry]);

  const content = (
    <div className="min-h-screen bg-[#FDFDFC] pb-16">
      {/* Top Header section matching Screen 2 */}
      <div className="bg-white border-b border-gray-100 pt-6 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                Explore Events
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 font-medium">
                Find conferences, workshops, and gatherings across Africa.
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
              <Compass className="w-5 h-5" />
            </div>
          </div>

          {/* Search Bar matching mockup Screen 2 */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events, organisers, or locations..."
              className="w-full pl-11 pr-10 py-3 bg-gray-50/80 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-2xl text-xs sm:text-sm font-medium transition-all focus:outline-hidden focus:ring-2 focus:ring-emerald-700 focus:border-transparent"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns row matching mockup Screen 2 */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {/* Country/Location Filter */}
            <div className="relative shrink-0">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="appearance-none bg-white border border-gray-200 hover:border-emerald-300 text-gray-700 pl-8 pr-7 py-2 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-700 cursor-pointer"
              >
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <MapPin className="w-3.5 h-3.5 text-emerald-700 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>

            {/* Category Filter */}
            <div className="relative shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-200 hover:border-emerald-300 text-gray-700 pl-8 pr-7 py-2 rounded-xl text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-700 cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
              <Layers className="w-3.5 h-3.5 text-emerald-700 absolute left-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Quick Filter Pills matching mockup Screen 2: All, Free, Paid, Online, In-Person */}
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
            {quickFilterTabs.map((tab) => {
              const active = selectedFormat === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedFormat(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                    active
                      ? 'bg-emerald-800 text-white shadow-xs scale-105'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Events Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'}
          </div>

          {(search || selectedFormat !== 'All' || selectedCategory !== 'All' || selectedCountry !== 'All') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedFormat('All');
                setSelectedCategory('All');
                setSelectedCountry('All');
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredEvents.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs max-w-md mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No events found</h3>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your search terms or clearing your location/category filters.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedFormat('All');
                setSelectedCategory('All');
                setSelectedCountry('All');
              }}
              className="mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
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
