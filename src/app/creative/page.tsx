'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { TiditzStore } from '@/lib/store';
import { CreativeProject } from '@/types';
import {
  Palette,
  Film,
  Sparkles,
  Layers,
  Send,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function CreativeStudioPage() {
  const [projects, setProjects] = useState<CreativeProject[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [category, setCategory] = useState<'graphics' | 'branding' | 'motion' | 'video' | 'page_design' | 'full_setup'>('branding');
  const [title, setTitle] = useState('');
  const [brief, setBrief] = useState('');
  const [budgetRange, setBudgetRange] = useState('₦300,000 - ₦750,000');
  const [deadline, setDeadline] = useState('2025-11-01');

  useEffect(() => {
    setProjects(TiditzStore.getCreativeProjects());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !brief.trim()) {
      alert('Please fill in the project title and creative brief.');
      return;
    }

    const created = TiditzStore.submitCreativeProject({
      customer_user_id: 'usr-organizer-1',
      customer_name: 'Tunde Adeleke',
      customer_email: 'tunde@africatech.io',
      service_category: category,
      title: title.trim(),
      brief: brief.trim(),
      budget_range: budgetRange,
      requested_deadline: deadline,
    });

    setProjects(TiditzStore.getCreativeProjects());
    setSubmitted(true);
    setTitle('');
    setBrief('');
  };

  const services = [
    {
      id: 'branding',
      title: 'Event Visual Identity & Branding',
      desc: 'Complete logo suite, color schemes, typography guides, and stage backdrop design assets.',
      icon: Layers,
    },
    {
      id: 'motion',
      title: '3D Motion Graphics & Teasers',
      desc: 'High-energy countdown animations, speaker announcement reels, and animated social stories.',
      icon: Sparkles,
    },
    {
      id: 'video',
      title: 'Promotional Video Production',
      desc: 'Engaging hype trailers, speaker montage highlights, and post-event recap video editing.',
      icon: Film,
    },
    {
      id: 'page_design',
      title: 'Custom Event Page Design',
      desc: 'Bespoke custom UI design and interactive registration flows tailored to your corporate brand.',
      icon: Palette,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#092B1B] via-[#0D3823] to-[#041D12] text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/70 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tiditz Done-For-You Creative Division</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Tiditz Creative Studio
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
            Don&apos;t have an in-house design team? Commission our specialized African event designers, motion animators, and video editors to create a world-class visual experience for your event.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 w-full space-y-10">
        {/* Services Showcase Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white p-5 rounded-3xl border border-gray-100 shadow-md hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Project Inquiry Submission & Tracking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Inquiry Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs">
            <div className="border-b pb-4 mb-6">
              <h2 className="text-xl font-black text-gray-950">Submit a Project Brief</h2>
              <p className="text-xs text-gray-500 mt-1">
                Tell us about your upcoming event, creative requirements, and timeline. We will review and provide a custom scope and quote within 24 hours.
              </p>
            </div>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Creative Brief Received!</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Our lead creative director will review your brief and send a proposal with milestones to your email.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800">Service Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="branding">Brand Identity & Visual Kit</option>
                  <option value="motion">3D Motion Graphics & Social Reels</option>
                  <option value="video">Promotional Video Production</option>
                  <option value="graphics">Event Graphic Design & Posters</option>
                  <option value="page_design">Custom Event Page Design</option>
                  <option value="full_setup">Full Done-For-You Event Setup</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800">Project / Event Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Key Visuals & Motion Graphics for Lagos Fintech Week"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">Estimated Budget Range</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="₦150,000 - ₦300,000">₦150,000 - ₦300,000 (~$100 - $200)</option>
                    <option value="₦300,000 - ₦750,000">₦300,000 - ₦750,000 (~$200 - $500)</option>
                    <option value="₦750,000 - ₦2,000,000">₦750,000 - ₦2,000,000 (~$500 - $1,300)</option>
                    <option value="₦2,000,000+">₦2,000,000+ (Enterprise Custom)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-800">Required Delivery Deadline</label>
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800">Creative Brief & Deliverables *</label>
                <textarea
                  rows={4}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Describe your design vision, brand guidelines, target audience, and specific deliverable formats (e.g. 1080x1920 Instagram reels, print banners, speaker badges)."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Creative Inquiry</span>
              </button>
            </form>
          </div>

          {/* Active Projects Tracker */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-black text-gray-900 text-sm">Your Creative Projects</h3>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {projects.length} Active
                </span>
              </div>

              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-gray-900 text-xs line-clamp-1">{proj.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 capitalize shrink-0">
                        {proj.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 line-clamp-2">{proj.brief}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                      <span>Budget: {proj.budget_range}</span>
                      <span>Due: {proj.requested_deadline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs space-y-1">
              <span className="font-bold text-emerald-950 block">Direct Inquiries</span>
              <p className="text-[11px] text-emerald-800">
                Need urgent turnaround for an upcoming press release? Reach our studio desk at <span className="font-semibold underline">creative@tiditz.com</span>.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
