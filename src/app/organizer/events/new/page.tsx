'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { TiditzStore } from '@/lib/store';
import { TiditzEvent, FormField, FieldType } from '@/types';
import {
  Calendar,
  Layers,
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  Save,
  Globe2,
} from 'lucide-react';

export default function NewEventPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Event Basic Details
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Technology');
  const [format, setFormat] = useState<'physical' | 'virtual' | 'hybrid'>('physical');
  const [startsAt, setStartsAt] = useState('2025-11-20T09:00');
  const [endsAt, setEndsAt] = useState('2025-11-20T17:00');
  const [timezone, setTimezone] = useState('Africa/Lagos (WAT)');
  const [countryCode, setCountryCode] = useState('NG');
  const [city, setCity] = useState('Lagos');
  const [venueName, setVenueName] = useState('Landmark Centre');
  const [address, setAddress] = useState('Water Corporation Drive, Victoria Island, Lagos');
  const [coverImageUrl, setCoverImageUrl] = useState(
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'
  );

  // Tickets
  const [isFree, setIsFree] = useState(true);
  const [ticketName, setTicketName] = useState('General Admission');
  const [capacity, setCapacity] = useState<number>(500);

  // Custom Form Builder Fields (PRD 4.3)
  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: 'fld-1',
      field_key: 'full_name',
      label: 'Full Name',
      field_type: 'text',
      is_required: true,
      position: 1,
      is_active: true,
    },
    {
      id: 'fld-2',
      field_key: 'email',
      label: 'Email Address',
      field_type: 'email',
      is_required: true,
      position: 2,
      is_active: true,
    },
    {
      id: 'fld-3',
      field_key: 'phone',
      label: 'Phone Number',
      field_type: 'phone',
      is_required: true,
      position: 3,
      is_active: true,
    },
    {
      id: 'fld-4',
      field_key: 'organisation',
      label: 'Organisation (Optional)',
      field_type: 'text',
      is_required: false,
      position: 4,
      is_active: true,
    },
    {
      id: 'fld-5',
      field_key: 'show_on_attendee_list',
      label: 'Show my name on the attendee list',
      field_type: 'consent',
      is_required: false,
      position: 5,
      is_active: true,
    },
  ]);

  // Adding a new custom form field
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<FieldType>('text');
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  const [newFieldOptions, setNewFieldOptions] = useState('');

  const addCustomField = () => {
    if (!newFieldLabel.trim()) return;

    const fieldKey = newFieldLabel.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newField: FormField = {
      id: `fld-${Date.now()}`,
      field_key: fieldKey,
      label: newFieldLabel.trim(),
      field_type: newFieldType,
      is_required: newFieldRequired,
      position: formFields.length + 1,
      is_active: true,
      options:
        newFieldType === 'dropdown' || newFieldType === 'radio'
          ? newFieldOptions
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : undefined,
    };

    setFormFields([...formFields, newField]);
    setNewFieldLabel('');
    setNewFieldOptions('');
    setNewFieldRequired(false);
  };

  const removeField = (id: string) => {
    setFormFields(formFields.filter((f) => f.id !== id));
  };

  const handlePublishOrSave = (status: 'draft' | 'published') => {
    if (!title.trim()) {
      alert('Please enter an event title');
      setStep(1);
      return;
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newEvent: TiditzEvent = {
      id: `evt-${Date.now().toString(36)}`,
      created_by: 'usr-organizer-1',
      title: title.trim(),
      slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
      tagline: tagline.trim(),
      description: description.trim() || 'Join us for this exciting African event experience.',
      category,
      format,
      visibility: 'public',
      status,
      starts_at: new Date(startsAt).toISOString(),
      ends_at: new Date(endsAt).toISOString(),
      timezone,
      country_code: countryCode,
      city,
      venue_name: venueName,
      address,
      cover_image_url: coverImageUrl,
      capacity,
      registered_count: 0,
      ticket_price_display: isFree ? 'Free Registration' : 'From ₦10,000',
      is_free: isFree,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      organizer: {
        id: 'org-1',
        name: 'My Organization',
      },
      form_fields: formFields,
      ticket_types: [
        {
          id: `tkt-${Date.now()}`,
          event_id: `evt-${Date.now()}`,
          name: ticketName,
          currency: 'NGN',
          price_minor: 0,
          quantity_total: capacity,
          quantity_sold: 0,
          max_per_order: 2,
          status: 'active',
        },
      ],
    };

    TiditzStore.saveEvent(newEvent);
    router.push(`/events/${newEvent.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Event Builder & Custom Registration Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-950 mt-1">Create an Event</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Build your branded event page, configure custom registration fields, and issue QR tickets.
          </p>
        </div>

        {/* Wizard Steps Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-gray-200/80 shadow-xs mb-6 flex items-center justify-between overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setStep(1)}
            className={`py-2 px-3 rounded-xl transition-all ${
              step === 1 ? 'bg-emerald-800 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            1. Event Info
          </button>
          <button
            onClick={() => setStep(2)}
            className={`py-2 px-3 rounded-xl transition-all ${
              step === 2 ? 'bg-emerald-800 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            2. Format & Venue
          </button>
          <button
            onClick={() => setStep(3)}
            className={`py-2 px-3 rounded-xl transition-all ${
              step === 3 ? 'bg-emerald-800 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            3. Form Builder
          </button>
          <button
            onClick={() => setStep(4)}
            className={`py-2 px-3 rounded-xl transition-all ${
              step === 4 ? 'bg-emerald-800 text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            4. Review & Publish
          </button>
        </div>

        {/* Step 1: Event Information */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5 animate-in fade-in">
            <h2 className="text-lg font-black text-gray-900 border-b pb-3">Step 1: Basic Information</h2>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-800">Event Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. West Africa AI Summit 2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-800">Tagline (Optional)</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="e.g. Innovation. Connection. Impact."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="Technology">Technology</option>
                  <option value="Design & Creative">Design & Creative</option>
                  <option value="Workshops & Education">Workshops & Education</option>
                  <option value="Ministries & Faith">Ministries & Faith</option>
                  <option value="Concerts & Festivals">Concerts & Festivals</option>
                  <option value="Business & Finance">Business & Finance</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800">Registration Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  placeholder="e.g. 500"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-800">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide event details, schedule highlights, who should attend, and what to expect."
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-800">Cover Image URL</label>
              <input
                type="url"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
              <div className="flex gap-2 pt-2 text-[11px] text-gray-500">
                <span>Presets:</span>
                <button
                  type="button"
                  onClick={() =>
                    setCoverImageUrl('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80')
                  }
                  className="text-emerald-700 underline"
                >
                  Tech Conference
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCoverImageUrl('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80')
                  }
                  className="text-emerald-700 underline"
                >
                  Creative Expo
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCoverImageUrl('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80')
                  }
                  className="text-emerald-700 underline"
                >
                  Music & Worship
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2"
              >
                <span>Next: Format & Venue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Format & Venue */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-5 animate-in fade-in">
            <h2 className="text-lg font-black text-gray-900 border-b pb-3">Step 2: Format, Date & Venue</h2>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-800">Event Format</label>
              <div className="grid grid-cols-3 gap-2">
                {(['physical', 'virtual', 'hybrid'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormat(fmt)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold capitalize border transition-all ${
                      format === fmt
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-600 ring-1 ring-emerald-600'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800">Starts At</label>
                <input
                  type="datetime-local"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800">Ends At</label>
                <input
                  type="datetime-local"
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800">Country</label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="NG">Nigeria (NG)</option>
                  <option value="KE">Kenya (KE)</option>
                  <option value="GH">Ghana (GH)</option>
                  <option value="RW">Rwanda (RW)</option>
                  <option value="ZA">South Africa (ZA)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-800">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Lagos, Nairobi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-800">Venue Name</label>
              <input
                type="text"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                placeholder="e.g. Eko Convention Centre"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-800">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Plot 1, Water Corporation Road, Victoria Island"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2"
              >
                <span>Next: Form Builder</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Registration Form Builder (PRD Section 4.3) */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6 animate-in fade-in">
            <div className="border-b pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-gray-900">Step 3: Registration Form Builder</h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Configure the questions and data fields attendees must answer to register.
                </p>
              </div>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
                {formFields.length} Fields Configured
              </span>
            </div>

            {/* List of active fields */}
            <div className="space-y-2.5">
              {formFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200/80 rounded-2xl hover:bg-gray-50/80 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-xs">{field.label}</span>
                        {field.is_required && (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-500 font-mono mt-0.5">
                        type: {field.field_type} {field.options ? `(${field.options.join(', ')})` : ''}
                      </div>
                    </div>
                  </div>

                  {/* Built-in core fields cannot be deleted to protect integrity */}
                  {!['full_name', 'email', 'phone'].includes(field.field_key) && (
                    <button
                      type="button"
                      onClick={() => removeField(field.id)}
                      className="p-1.5 text-gray-400 hover:text-rose-600 transition-colors"
                      title="Remove field"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Custom Field Tool Box */}
            <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-200/80 space-y-3">
              <span className="text-xs font-extrabold text-emerald-950 block">
                + Add Custom Question Field
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  placeholder="Field Label (e.g. Dietary Restrictions)"
                  className="sm:col-span-2 px-3 py-2 bg-white rounded-xl border border-gray-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                />

                <select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value as FieldType)}
                  className="px-3 py-2 bg-white rounded-xl border border-gray-200 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="text">Short Text</option>
                  <option value="textarea">Long Text / Bio</option>
                  <option value="dropdown">Dropdown Select</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="consent">Consent Checkbox</option>
                </select>
              </div>

              {(newFieldType === 'dropdown' || newFieldType === 'radio') && (
                <input
                  type="text"
                  value={newFieldOptions}
                  onChange={(e) => setNewFieldOptions(e.target.value)}
                  placeholder="Options separated by comma (e.g. Vegetarian, Halal, Kosher, None)"
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-200 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-700"
                />
              )}

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newFieldRequired}
                    onChange={(e) => setNewFieldRequired(e.target.checked)}
                    className="rounded text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>Mark as Required field</span>
                </label>

                <button
                  type="button"
                  onClick={addCustomField}
                  className="px-3.5 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Field</span>
                </button>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center gap-2"
              >
                <span>Next: Review & Publish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Publish */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xs space-y-6 animate-in fade-in">
            <h2 className="text-lg font-black text-gray-900 border-b pb-3">Step 4: Review & Publish</h2>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 text-xs">
              <div>
                <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">
                  Event Title
                </span>
                <span className="text-sm font-extrabold text-gray-900">{title || 'Untitled Event'}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">
                    Category & Format
                  </span>
                  <span className="font-bold text-gray-800">{category} • {format}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">
                    Location
                  </span>
                  <span className="font-bold text-gray-800">{venueName || 'Online'}, {city}</span>
                </div>
              </div>
              <div>
                <span className="text-gray-400 font-bold uppercase tracking-wider block text-[10px]">
                  Configured Form Fields
                </span>
                <span className="font-semibold text-emerald-800">
                  {formFields.map((f) => f.label).join(', ')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Form Builder</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => handlePublishOrSave('draft')}
                  className="flex-1 sm:flex-none px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-gray-600" />
                  <span>Save as Draft</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePublishOrSave('published')}
                  className="flex-1 sm:flex-none px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl text-xs shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Publish Event Now</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
