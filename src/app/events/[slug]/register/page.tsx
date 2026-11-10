'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import Navbar from '@/components/Navbar';
import PhoneMockupWrapper from '@/components/PhoneMockupWrapper';
import { TiditzStore } from '@/lib/store';
import { TiditzEvent, FormField } from '@/types';
import {
  ChevronLeft,
  CheckCircle2,
  Lock,
  Sparkles,
  Ticket,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

interface RegisterPageProps {
  params: Promise<{ slug: string }>;
}

function RegisterContent({ params }: RegisterPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();

  const [event, setEvent] = useState<TiditzEvent | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({
    full_name: '',
    email: '',
    phone: '',
    organisation: '',
    job_title: '',
    show_on_attendee_list: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [isPhoneMockup, setIsPhoneMockup] = useState(false);

  useEffect(() => {
    const found = TiditzStore.getEventBySlug(resolvedParams.slug);
    if (found) {
      setEvent(found);
    }
  }, [resolvedParams.slug]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-xs text-gray-500">Loading event registration form...</div>
      </div>
    );
  }

  const handleFieldChange = (fieldKey: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldKey]: value }));
    if (errors[fieldKey]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldKey];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Standard fields validation
    if (!formData.full_name?.trim()) {
      newErrors.full_name = 'Full name is required';
    }
    if (!formData.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Custom form fields validation from event configuration
    event.form_fields.forEach((field) => {
      if (field.is_required && field.is_active) {
        const val = formData[field.field_key];
        if (val === undefined || val === null || val === '') {
          newErrors[field.field_key] = `${field.label} is required`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      const { ticket } = TiditzStore.registerAttendee({
        eventId: event.id,
        attendeeName: formData.full_name,
        attendeeEmail: formData.email,
        attendeePhone: formData.phone,
        organisation: formData.organisation,
        jobTitle: formData.job_title,
        answers: formData,
        showInDirectory: Boolean(formData.show_on_attendee_list),
      });

      // Fire celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#047857', '#10B981', '#34D399', '#064E3B'],
      });

      // Redirect directly to digital ticket view (Screen 7 in mockup)
      setTimeout(() => {
        router.push(`/tickets/${ticket.ticket_code}`);
      }, 700);
    } catch (err: any) {
      alert(`Registration failed: ${err.message}`);
      setSubmitting(false);
    }
  };

  const content = (
    <div className="min-h-screen bg-[#FDFDFC] pb-24">
      {/* Top Header matching Screen 4 in mockup */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="p-1 rounded-full text-gray-700 hover:bg-gray-100 flex items-center gap-1 text-xs font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        <h1 className="text-base font-extrabold text-gray-900">Register</h1>

        <div className="w-6" />
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Stepper matching Screen 4 mockup: Details -> Form -> Payment -> Complete */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-xs">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-3 left-4 right-4 h-0.5 bg-gray-200 -z-0" />
            
            {/* Step 1: Details (Completed) */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                ✓
              </div>
              <span className="text-[11px] font-bold text-emerald-800 mt-1">Details</span>
            </div>

            {/* Step 2: Form (Active) */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-6 h-6 rounded-full bg-emerald-700 text-white ring-4 ring-emerald-100 flex items-center justify-center text-xs font-bold">
                2
              </div>
              <span className="text-[11px] font-bold text-emerald-800 mt-1">Form</span>
            </div>

            {/* Step 3: Payment */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-[11px] font-semibold text-gray-400 mt-1">Payment</span>
            </div>

            {/* Step 4: Complete */}
            <div className="flex flex-col items-center relative z-10">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold">
                4
              </div>
              <span className="text-[11px] font-semibold text-gray-400 mt-1">Complete</span>
            </div>
          </div>
        </div>

        {/* Section Heading matching Screen 4 */}
        <div>
          <h2 className="text-xl font-black text-gray-950">Attendee Information</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Fill in the required details to complete your registration for <strong className="text-gray-800">{event.title}</strong>.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-800 flex items-center gap-1">
              <span>Full Name</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.full_name || ''}
              onChange={(e) => handleFieldChange('full_name', e.target.value)}
              placeholder="Enter your full name"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 ${
                errors.full_name ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200'
              }`}
            />
            {errors.full_name && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.full_name}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-800 flex items-center gap-1">
              <span>Email Address</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700 ${
                errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-gray-200'
              }`}
            />
            {errors.email && (
              <p className="text-[11px] text-rose-600 font-semibold">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-800 flex items-center gap-1">
              <span>Phone Number</span>
              <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              placeholder="+234 801 234 5678"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Organisation (Optional) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-800">
              Organisation (Optional)
            </label>
            <input
              type="text"
              value={formData.organisation || ''}
              onChange={(e) => handleFieldChange('organisation', e.target.value)}
              placeholder="Your organisation"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Job Title (Optional) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-800">
              Job Title (Optional)
            </label>
            <input
              type="text"
              value={formData.job_title || ''}
              onChange={(e) => handleFieldChange('job_title', e.target.value)}
              placeholder="Your job title"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Custom Form Fields from Builder */}
          {event.form_fields
            .filter((f) => !['full_name', 'email', 'phone', 'organisation', 'job_title', 'show_on_attendee_list'].includes(f.field_key))
            .map((field) => {
              if (field.field_type === 'dropdown' && field.options) {
                return (
                  <div key={field.id} className="space-y-1">
                    <label className="text-xs font-bold text-gray-800 flex items-center gap-1">
                      <span>{field.label}</span>
                      {field.is_required && <span className="text-rose-500">*</span>}
                    </label>
                    <select
                      value={formData[field.field_key] || ''}
                      onChange={(e) => handleFieldChange(field.field_key, e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    >
                      <option value="">Select an option...</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (field.field_type === 'textarea') {
                return (
                  <div key={field.id} className="space-y-1">
                    <label className="text-xs font-bold text-gray-800 flex items-center gap-1">
                      <span>{field.label}</span>
                      {field.is_required && <span className="text-rose-500">*</span>}
                    </label>
                    <textarea
                      rows={3}
                      value={formData[field.field_key] || ''}
                      onChange={(e) => handleFieldChange(field.field_key, e.target.value)}
                      placeholder={field.placeholder || ''}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                    />
                  </div>
                );
              }

              return null;
            })}

          {/* Consent Checkbox: Show my name on attendee list matching Screen 4 */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100 cursor-pointer hover:bg-emerald-50 transition-colors">
              <input
                type="checkbox"
                checked={Boolean(formData.show_on_attendee_list)}
                onChange={(e) => handleFieldChange('show_on_attendee_list', e.target.checked)}
                className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-600 w-4 h-4"
              />
              <div className="text-xs">
                <span className="font-bold text-gray-900 block">
                  Show my name on the attendee list
                </span>
                <span className="text-gray-500 text-[11px] block mt-0.5">
                  Let other attendees see that I am attending and connect.
                </span>
              </div>
            </label>
          </div>

          {/* Submit Button matching Screen 4 mockup: "Continue" */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-75 text-white font-extrabold rounded-2xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span>Generating Ticket...</span>
              ) : (
                <>
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
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

export default function RegisterPage({ params }: RegisterPageProps) {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-xs text-gray-400">Loading registration form...</div>}>
      <RegisterContent params={params} />
    </React.Suspense>
  );
}
