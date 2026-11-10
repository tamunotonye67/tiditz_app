'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  CalendarPlus,
  LayoutDashboard,
  QrCode,
  Palette,
  Ticket,
  Smartphone,
  Monitor,
  Menu,
  X,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import { TiditzStore } from '@/lib/store';
import { UserSession } from '@/types';

interface NavbarProps {
  isPhoneMockup?: boolean;
  onTogglePhoneMockup?: () => void;
}

export default function Navbar({ isPhoneMockup, onTogglePhoneMockup }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    setUser(TiditzStore.getCurrentUser());
  }, []);

  const toggleRole = () => {
    if (!user) return;
    const newRole = user.role === 'organizer' ? 'attendee' : 'organizer';
    const updatedUser: UserSession = {
      ...user,
      role: newRole,
      name: newRole === 'organizer' ? 'Tunde Adeleke (Organizer)' : 'Chioma Okafor (Attendee)',
    };
    TiditzStore.setCurrentUser(updatedUser);
    setUser(updatedUser);
  };

  const navLinks = [
    { label: 'Explore Events', href: '/events', icon: Compass },
    { label: 'Organizer Hub', href: '/organizer', icon: LayoutDashboard },
    { label: 'QR Scanner', href: '/organizer/check-in', icon: QrCode },
    { label: 'Creative Studio', href: '/creative', icon: Palette },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
                T
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-emerald-950 font-sans flex items-center gap-1">
                  Tiditz
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold -mt-1 hidden sm:block">
                  African Event Tech
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                      : 'text-gray-600 hover:text-emerald-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-gray-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Phone Mockup Mode Switcher */}
            {onTogglePhoneMockup && (
              <button
                type="button"
                onClick={onTogglePhoneMockup}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isPhoneMockup
                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                    : 'bg-emerald-50/70 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                }`}
                title="Toggle between full responsive and smartphone mockup frame"
              >
                {isPhoneMockup ? (
                  <>
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop View</span>
                  </>
                ) : (
                  <>
                    <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mockup Frame</span>
                  </>
                )}
              </button>
            )}

            {/* Quick Create Event CTA */}
            <Link
              href="/organizer/events/new"
              className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <CalendarPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Event</span>
              <span className="sm:hidden">Create</span>
            </Link>

            {/* Role Switcher Pill */}
            {user && (
              <button
                onClick={toggleRole}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all"
                title={`Currently acting as ${user.role}. Click to switch role.`}
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="capitalize hidden lg:inline">{user.role}</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-gray-500'}`} />
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <Link
              href="/tickets/TIDZ-7824-6619"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-emerald-800 bg-emerald-50/60 rounded-xl font-medium"
            >
              <Ticket className="w-4 h-4 text-emerald-600" />
              <span>Sample Ticket (#TIDZ-7824-6619)</span>
            </Link>
            <button
              onClick={() => {
                toggleRole();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full px-3 py-2 text-xs text-gray-600 bg-gray-50 rounded-xl font-medium"
            >
              <span>Current Role: <strong className="capitalize text-emerald-800">{user?.role}</strong></span>
              <span className="text-emerald-600 underline">Switch</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
