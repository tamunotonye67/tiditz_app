'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Ticket, Bookmark, MoreHorizontal } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/events', icon: Compass },
    { label: 'Tickets', href: '/tickets/TIDZ-7824-6619', icon: Ticket },
    { label: 'Saved', href: '/events?saved=true', icon: Bookmark },
    { label: 'More', href: '/organizer', icon: MoreHorizontal },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            pathname === tab.href ||
            (tab.href !== '/' && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-800 font-semibold scale-105'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700 stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
