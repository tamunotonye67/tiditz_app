'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Share2, Send, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
}

export default function ShareModal({ isOpen, onClose, title, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://tiditz.com');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(`Check out "${title}" on Tiditz!`);

  const shareLinks = [
    {
      name: 'WhatsApp',
      color: 'text-green-600 bg-green-50',
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.087-.179.182-.077.357.101.174.45 1.066 1.157 1.704.896.808 1.488 1.057 1.704 1.159.217.101.346.087.476-.058.13-.145.553-.645.701-.866.148-.221.294-.184.492-.111.198.073 1.255.592 1.472.701.217.109.362.163.415.253.054.09.054.524-.09 0.929z" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      color: 'text-blue-600 bg-blue-50',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      color: 'text-sky-700 bg-sky-50',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: 'X (Twitter)',
      color: 'text-black bg-gray-100',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Telegram',
      color: 'text-sky-500 bg-sky-50',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
      icon: <Send className="w-4 h-4" />,
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        role="dialog"
      >
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">Share Event</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Share this event with your friends and network.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="divide-y divide-gray-100 my-2">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between py-3.5 px-2 hover:bg-gray-50 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>
                <span className="font-semibold text-gray-800 text-sm">{item.name}</span>
              </div>
              <span className="text-gray-300 group-hover:text-emerald-700 text-sm">›</span>
            </a>
          ))}

          {/* Copy Link Option */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full flex items-center justify-between py-3.5 px-2 hover:bg-gray-50 rounded-xl transition-colors group text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center">
                {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
              </div>
              <div>
                <span className="font-semibold text-gray-800 text-sm block">Copy Link</span>
                <span className="text-[11px] text-gray-400 truncate max-w-[220px] block">
                  {shareUrl}
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700">
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </button>
        </div>

        <div className="mt-4 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-2xl text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
