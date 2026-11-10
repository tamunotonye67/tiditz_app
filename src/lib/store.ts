'use client';

import {
  TiditzEvent,
  Registration,
  Ticket,
  CheckInRecord,
  CreativeProject,
  UserSession,
} from '@/types';

const INITIAL_EVENTS: TiditzEvent[] = [
  {
    id: 'evt-ats-2025',
    title: 'Africa Tech Summit 2025',
    slug: 'africa-tech-summit-2025',
    tagline: 'Innovation. Connection. Impact.',
    description:
      'The Africa Tech Summit 2025 brings together innovators, investors, founders, and industry leaders to explore the future of technology in Africa. Over two immersive days, attend keynotes on fintech, artificial intelligence, climate tech, and startup scaling across the continent.',
    category: 'Technology',
    format: 'physical',
    visibility: 'public',
    status: 'published',
    starts_at: '2025-11-15T09:00:00+01:00',
    ends_at: '2025-11-15T18:00:00+01:00',
    timezone: 'Africa/Lagos (WAT)',
    country_code: 'NG',
    city: 'Lagos',
    venue_name: 'Eko Convention Centre',
    address: 'Plot 1, Water Corporation Road, Victoria Island, Lagos, Nigeria',
    cover_image_url:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80',
    ],
    capacity: 1500,
    registered_count: 124,
    ticket_price_display: 'Free & From ₦15,000',
    is_free: true,
    created_by: 'usr-organizer-1',
    published_at: '2025-01-10T10:00:00Z',
    created_at: '2025-01-05T08:00:00Z',
    updated_at: '2025-01-10T10:00:00Z',
    organizer: {
      id: 'org-tech-africa',
      name: 'Tech Africa Network',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Leading organizer of premier Pan-African innovation and startup conferences since 2018.',
    },
    theme: {
      primaryColor: '#0F5132',
      accentColor: '#198754',
    },
    form_fields: [
      {
        id: 'fld-name',
        field_key: 'full_name',
        label: 'Full Name',
        field_type: 'text',
        placeholder: 'Enter your full name',
        is_required: true,
        position: 1,
        is_active: true,
      },
      {
        id: 'fld-email',
        field_key: 'email',
        label: 'Email Address',
        field_type: 'email',
        placeholder: 'you@example.com',
        is_required: true,
        position: 2,
        is_active: true,
      },
      {
        id: 'fld-phone',
        field_key: 'phone',
        label: 'Phone Number',
        field_type: 'phone',
        placeholder: '+234 801 234 5678',
        is_required: true,
        position: 3,
        is_active: true,
      },
      {
        id: 'fld-org',
        field_key: 'organisation',
        label: 'Organisation (Optional)',
        field_type: 'text',
        placeholder: 'Your organisation',
        is_required: false,
        position: 4,
        is_active: true,
      },
      {
        id: 'fld-job',
        field_key: 'job_title',
        label: 'Job Title (Optional)',
        field_type: 'text',
        placeholder: 'Your job title',
        is_required: false,
        position: 5,
        is_active: true,
      },
      {
        id: 'fld-interest',
        field_key: 'primary_interest',
        label: 'Primary Track of Interest',
        field_type: 'dropdown',
        options: ['Fintech & Payments', 'AI & Machine Learning', 'CleanTech', 'Venture Capital & Angel Investing', 'Developer Ecosystem'],
        is_required: false,
        position: 6,
        is_active: true,
      },
      {
        id: 'fld-show-list',
        field_key: 'show_on_attendee_list',
        label: 'Show my name on the attendee list',
        description: 'Let other attendees see that I am attending and connect',
        field_type: 'consent',
        is_required: false,
        position: 7,
        is_active: true,
      },
    ],
    ticket_types: [
      {
        id: 'tkt-free-gen',
        event_id: 'evt-ats-2025',
        name: 'General Admission',
        description: 'Access to main auditorium keynotes, expo hall, and coffee break networking.',
        currency: 'NGN',
        price_minor: 0,
        quantity_total: 1000,
        quantity_sold: 110,
        max_per_order: 2,
        status: 'active',
      },
      {
        id: 'tkt-vip',
        event_id: 'evt-ats-2025',
        name: 'VIP All-Access Pass',
        description: 'Reserved front-row seating, VIP lounge lunch, and exclusive investor dinner.',
        currency: 'NGN',
        price_minor: 1500000, // ₦15,000
        quantity_total: 200,
        quantity_sold: 14,
        max_per_order: 4,
        status: 'active',
      },
    ],
    speakers: [
      {
        id: 'spk-1',
        name: 'Chioma Okafor',
        role: 'Product Designer',
        company: 'TechNova Africa',
        avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'spk-2',
        name: 'Emeka Johnson',
        role: 'Principal Software Engineer',
        company: 'BuildFast Global',
        avatar_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'spk-3',
        name: 'Aisha Bello',
        role: 'Marketing Lead',
        company: 'GrowthCo Africa',
        avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'spk-4',
        name: 'David Wilson',
        role: 'Founder & Managing Partner',
        company: 'FutureLab Ventures',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'spk-5',
        name: 'Blessing Nwosu',
        role: 'Head of Community',
        company: 'Creative Hub Hub',
        avatar_url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=200&q=80',
      },
    ],
    agenda: [
      { id: 'ag-1', time: '09:00 AM', title: 'Registration & Welcome Coffee', description: 'Check-in with Tiditz QR scanner and morning coffee' },
      { id: 'ag-2', time: '10:00 AM', title: 'Opening Keynote: Africa Tech in 2026', speaker: 'David Wilson' },
      { id: 'ag-3', time: '11:30 AM', title: 'Panel: Designing for Next Billion Users', speaker: 'Chioma Okafor & Emeka Johnson' },
      { id: 'ag-4', time: '01:00 PM', title: 'Networking Lunch & Expo Demo Booths' },
      { id: 'ag-5', time: '02:30 PM', title: 'The Scale-Up Playbook', speaker: 'Aisha Bello' },
      { id: 'ag-6', time: '04:30 PM', title: 'Closing Remarks & VIP Networking Mixer' },
    ],
  },
  {
    id: 'evt-lagos-creative-2025',
    title: 'Lagos Creative & Brand Design Expo',
    slug: 'lagos-creative-brand-design-expo',
    tagline: 'Craft. Story. Brand Excellence.',
    description:
      'A gathering of Africa’s top visual artists, motion graphic designers, brand strategists, and event producers. Learn modern production workflows, 3D brand storytelling, and high-impact digital event branding.',
    category: 'Design & Creative',
    format: 'physical',
    visibility: 'public',
    status: 'published',
    starts_at: '2025-12-05T10:00:00+01:00',
    ends_at: '2025-12-05T17:00:00+01:00',
    timezone: 'Africa/Lagos (WAT)',
    country_code: 'NG',
    city: 'Lagos',
    venue_name: 'Landmark Centre, Victoria Island',
    address: 'Water Corporation Drive, Oniru, Victoria Island, Lagos',
    cover_image_url:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    capacity: 800,
    registered_count: 312,
    ticket_price_display: 'Free Registration',
    is_free: true,
    created_by: 'usr-organizer-1',
    published_at: '2025-01-15T12:00:00Z',
    created_at: '2025-01-12T09:00:00Z',
    updated_at: '2025-01-15T12:00:00Z',
    organizer: {
      id: 'org-tiditz-creative',
      name: 'Tiditz Creative Studio',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Professional event branding, graphics, and video design specialists.',
    },
    form_fields: [
      { id: 'fld-c-name', field_key: 'full_name', label: 'Full Name', field_type: 'text', is_required: true, position: 1, is_active: true },
      { id: 'fld-c-email', field_key: 'email', label: 'Email Address', field_type: 'email', is_required: true, position: 2, is_active: true },
      { id: 'fld-c-portfolio', field_key: 'portfolio', label: 'Portfolio Link (Optional)', field_type: 'text', is_required: false, position: 3, is_active: true },
    ],
    ticket_types: [
      {
        id: 'tkt-free-creatives',
        event_id: 'evt-lagos-creative-2025',
        name: 'Creative Community Pass',
        currency: 'NGN',
        price_minor: 0,
        quantity_sold: 312,
        max_per_order: 1,
        status: 'active',
      },
    ],
  },
  {
    id: 'evt-nairobi-cloud-ai',
    title: 'Nairobi Cloud & AI Developer Day',
    slug: 'nairobi-cloud-ai-developer-day',
    tagline: 'Building intelligent infrastructure for Africa.',
    description:
      'Join Kenyan engineers, machine learning specialists, and cloud architects in a day of hands-on technical labs, architectural case studies, and live benchmarking.',
    category: 'Technology',
    format: 'hybrid',
    visibility: 'public',
    status: 'published',
    starts_at: '2025-11-28T09:00:00+03:00',
    ends_at: '2025-11-28T16:30:00+03:00',
    timezone: 'Africa/Nairobi (EAT)',
    country_code: 'KE',
    city: 'Nairobi',
    venue_name: 'iHub Nairobi, Senteu Plaza',
    address: 'Galana Rd, Kilimani, Nairobi, Kenya',
    cover_image_url:
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    capacity: 400,
    registered_count: 240,
    ticket_price_display: 'Free Registration',
    is_free: true,
    created_by: 'usr-organizer-2',
    published_at: '2025-01-20T10:00:00Z',
    created_at: '2025-01-18T10:00:00Z',
    updated_at: '2025-01-20T10:00:00Z',
    organizer: {
      id: 'org-kenya-devs',
      name: 'Kenya Cloud Guild',
      bio: 'Non-profit developers alliance in East Africa.',
    },
    form_fields: [
      { id: 'fld-k-name', field_key: 'full_name', label: 'Full Name', field_type: 'text', is_required: true, position: 1, is_active: true },
      { id: 'fld-k-email', field_key: 'email', label: 'Email Address', field_type: 'email', is_required: true, position: 2, is_active: true },
      { id: 'fld-k-role', field_key: 'dev_role', label: 'Developer Track', field_type: 'dropdown', options: ['Cloud DevOps', 'AI/ML Engineering', 'Backend Go/Rust/Node', 'Data Engineering'], is_required: true, position: 3, is_active: true },
    ],
    ticket_types: [
      {
        id: 'tkt-free-ke',
        event_id: 'evt-nairobi-cloud-ai',
        name: 'Developer Attendee',
        currency: 'KES',
        price_minor: 0,
        quantity_sold: 240,
        max_per_order: 1,
        status: 'active',
      },
    ],
  },
  {
    id: 'evt-accra-gospel-2025',
    title: 'Accra Praise & Worship Gathering',
    slug: 'accra-praise-worship-gathering',
    tagline: 'An evening of unity, prayer, and uplifting music.',
    description:
      'An annual worship festival uniting community choirs, youth ministries, and families across Accra for a night of spiritual renewal and praise.',
    category: 'Ministries & Faith',
    format: 'physical',
    visibility: 'public',
    status: 'published',
    starts_at: '2025-12-19T18:00:00Z',
    ends_at: '2025-12-19T22:00:00Z',
    timezone: 'Africa/Accra (GMT)',
    country_code: 'GH',
    city: 'Accra',
    venue_name: 'Accra International Conference Centre',
    address: 'Castle Road, Ridge, Accra, Ghana',
    cover_image_url:
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    capacity: 2500,
    registered_count: 1420,
    ticket_price_display: 'Free Entry (Ticket Required)',
    is_free: true,
    created_by: 'usr-organizer-3',
    published_at: '2025-01-25T11:00:00Z',
    created_at: '2025-01-22T08:00:00Z',
    updated_at: '2025-01-25T11:00:00Z',
    organizer: {
      id: 'org-accra-fellowship',
      name: 'United Accra Ministries',
      bio: 'Faith and community organization in Greater Accra.',
    },
    form_fields: [
      { id: 'fld-gh-name', field_key: 'full_name', label: 'Full Name', field_type: 'text', is_required: true, position: 1, is_active: true },
      { id: 'fld-gh-email', field_key: 'email', label: 'Email Address', field_type: 'email', is_required: true, position: 2, is_active: true },
      { id: 'fld-gh-church', field_key: 'church', label: 'Home Church / Fellowship', field_type: 'text', is_required: false, position: 3, is_active: true },
    ],
    ticket_types: [
      {
        id: 'tkt-free-gh',
        event_id: 'evt-accra-gospel-2025',
        name: 'Complimentary Admission',
        currency: 'GHS',
        price_minor: 0,
        quantity_sold: 1420,
        max_per_order: 5,
        status: 'active',
      },
    ],
  },
  {
    id: 'evt-panafrican-webinar',
    title: 'Pan-African Product Leaders Masterclass',
    slug: 'panafrican-product-leaders-masterclass',
    tagline: 'Scaling Digital Products in Fragmented Markets.',
    description:
      'Exclusive live virtual masterclass on product discovery, localized UX, cross-border payments, and retention strategies across West and East Africa.',
    category: 'Workshops & Education',
    format: 'virtual',
    visibility: 'public',
    status: 'published',
    starts_at: '2025-11-20T14:00:00+01:00',
    ends_at: '2025-11-20T16:00:00+01:00',
    timezone: 'Africa/Lagos (WAT)',
    country_code: 'NG',
    virtual_instructions: {
      platform: 'Zoom Live Broadcast',
      meeting_url: 'https://zoom.us/j/98234192301?pwd=TiditzExclusivePass',
      joining_instructions: 'The meeting room will open 10 minutes prior to session start. Registered ticket holders will receive calendar invitations and direct reminder codes.',
    },
    cover_image_url:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    capacity: 500,
    registered_count: 388,
    ticket_price_display: 'Free Registration',
    is_free: true,
    created_by: 'usr-organizer-1',
    published_at: '2025-01-28T09:00:00Z',
    created_at: '2025-01-25T09:00:00Z',
    updated_at: '2025-01-28T09:00:00Z',
    organizer: {
      id: 'org-product-africa',
      name: 'Product Growth Africa',
      bio: 'Community of 8,000+ digital makers across the continent.',
    },
    form_fields: [
      { id: 'fld-w-name', field_key: 'full_name', label: 'Full Name', field_type: 'text', is_required: true, position: 1, is_active: true },
      { id: 'fld-w-email', field_key: 'email', label: 'Email Address', field_type: 'email', is_required: true, position: 2, is_active: true },
      { id: 'fld-w-country', field_key: 'country', label: 'Your Country', field_type: 'dropdown', options: ['Nigeria', 'Kenya', 'Ghana', 'Rwanda', 'South Africa', 'Uganda', 'Egypt', 'Other'], is_required: true, position: 3, is_active: true },
    ],
    ticket_types: [
      {
        id: 'tkt-free-webinar',
        event_id: 'evt-panafrican-webinar',
        name: 'Virtual Masterclass Access',
        currency: 'USD',
        price_minor: 0,
        quantity_sold: 388,
        max_per_order: 1,
        status: 'active',
      },
    ],
  },
];

const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 'reg-001',
    event_id: 'evt-ats-2025',
    attendee_name: 'Chioma Okafor',
    attendee_email: 'chioma.okafor@example.com',
    attendee_phone: '+234 801 234 5678',
    organisation: 'TechNova',
    job_title: 'Product Designer',
    status: 'confirmed',
    show_in_directory: true,
    answers: {
      full_name: 'Chioma Okafor',
      email: 'chioma.okafor@example.com',
      phone: '+234 801 234 5678',
      organisation: 'TechNova',
      job_title: 'Product Designer',
      primary_interest: 'AI & Machine Learning',
    },
    created_at: '2025-02-01T10:15:00Z',
  },
  {
    id: 'reg-002',
    event_id: 'evt-ats-2025',
    attendee_name: 'Emeka Johnson',
    attendee_email: 'emeka.johnson@example.com',
    attendee_phone: '+234 802 345 6789',
    organisation: 'BuildFast',
    job_title: 'Software Engineer',
    status: 'confirmed',
    show_in_directory: true,
    answers: {
      full_name: 'Emeka Johnson',
      email: 'emeka.johnson@example.com',
      phone: '+234 802 345 6789',
      organisation: 'BuildFast',
      job_title: 'Software Engineer',
      primary_interest: 'Developer Ecosystem',
    },
    created_at: '2025-02-01T11:20:00Z',
  },
  {
    id: 'reg-003',
    event_id: 'evt-ats-2025',
    attendee_name: 'Aisha Bello',
    attendee_email: 'aisha.bello@example.com',
    attendee_phone: '+234 803 456 7890',
    organisation: 'GrowthCo',
    job_title: 'Marketing Manager',
    status: 'confirmed',
    show_in_directory: true,
    answers: {
      full_name: 'Aisha Bello',
      email: 'aisha.bello@example.com',
      phone: '+234 803 456 7890',
      organisation: 'GrowthCo',
      job_title: 'Marketing Manager',
      primary_interest: 'Fintech & Payments',
    },
    created_at: '2025-02-01T12:00:00Z',
  },
  {
    id: 'reg-004',
    event_id: 'evt-ats-2025',
    attendee_name: 'David Wilson',
    attendee_email: 'david.wilson@example.com',
    attendee_phone: '+234 804 567 8901',
    organisation: 'FutureLab',
    job_title: 'Founder',
    status: 'confirmed',
    show_in_directory: true,
    answers: {
      full_name: 'David Wilson',
      email: 'david.wilson@example.com',
      organisation: 'FutureLab',
      job_title: 'Founder',
    },
    created_at: '2025-02-02T09:30:00Z',
  },
  {
    id: 'reg-005',
    event_id: 'evt-ats-2025',
    attendee_name: 'Blessing Nwosu',
    attendee_email: 'blessing.nwosu@example.com',
    attendee_phone: '+234 805 678 9012',
    organisation: 'Creative Hub',
    job_title: 'Content Creator',
    status: 'confirmed',
    show_in_directory: true,
    answers: {
      full_name: 'Blessing Nwosu',
      email: 'blessing.nwosu@example.com',
      organisation: 'Creative Hub',
      job_title: 'Content Creator',
    },
    created_at: '2025-02-02T14:45:00Z',
  },
];

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'tkt-001',
    event_id: 'evt-ats-2025',
    registration_id: 'reg-001',
    ticket_type_name: 'General Admission',
    ticket_code: 'TIDZ-7824-6619',
    qr_token: 'QR-TIDZ-7824-6619-AUTHKEY90234',
    status: 'issued', // Valid
    issued_at: '2025-02-01T10:15:00Z',
    attendee_name: 'Chioma Okafor',
    attendee_email: 'chioma.okafor@example.com',
    attendee_phone: '+234 801 234 5678',
    event_title: 'Africa Tech Summit 2025',
    event_starts_at: '2025-11-15T09:00:00+01:00',
    event_ends_at: '2025-11-15T18:00:00+01:00',
    event_timezone: 'WAT',
    venue_name: 'Eko Convention Centre, Lagos',
    address: 'Plot 1, Water Corporation Road, Victoria Island, Lagos, Nigeria',
    cover_image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'tkt-002',
    event_id: 'evt-ats-2025',
    registration_id: 'reg-002',
    ticket_type_name: 'General Admission',
    ticket_code: 'TIDZ-1049-3321',
    qr_token: 'QR-TIDZ-1049-3321-AUTHKEY11082',
    status: 'checked-in', // Already checked in
    issued_at: '2025-02-01T11:20:00Z',
    checked_in_at: '2025-11-15T09:12:00+01:00',
    attendee_name: 'Emeka Johnson',
    attendee_email: 'emeka.johnson@example.com',
    attendee_phone: '+234 802 345 6789',
    event_title: 'Africa Tech Summit 2025',
    event_starts_at: '2025-11-15T09:00:00+01:00',
    event_ends_at: '2025-11-15T18:00:00+01:00',
    event_timezone: 'WAT',
    venue_name: 'Eko Convention Centre, Lagos',
    address: 'Plot 1, Water Corporation Road, Victoria Island, Lagos, Nigeria',
    cover_image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
  },
];

const INITIAL_CHECKINS: CheckInRecord[] = [
  {
    id: 'chk-001',
    ticket_id: 'tkt-002',
    event_id: 'evt-ats-2025',
    ticket_code: 'TIDZ-1049-3321',
    attendee_name: 'Emeka Johnson',
    scanned_by: 'Staff Entrance Gate A',
    result: 'accepted',
    reason: 'First entry admitted',
    scanned_at: '2025-11-15T09:12:00+01:00',
    scanner_reference: 'Terminal-Scanner-01',
  },
];

const INITIAL_CREATIVE_PROJECTS: CreativeProject[] = [
  {
    id: 'cp-001',
    customer_user_id: 'usr-organizer-1',
    customer_name: 'Tunde Adeleke',
    customer_email: 'tunde@africatech.io',
    service_category: 'branding',
    title: 'Brand Identity & Visual Kit for Lagos Fintech Week',
    brief: 'We need full key visual designs, 5 motion graphics teasers for Instagram/LinkedIn, and custom speaker template cards.',
    budget_range: '₦500,000 - ₦1,000,000',
    requested_deadline: '2025-10-30',
    status: 'in_progress',
    quote_amount_minor: 75000000,
    quote_currency: 'NGN',
    created_at: '2025-01-20T14:30:00Z',
  },
];

const STORAGE_KEYS = {
  EVENTS: 'tiditz_events_v1',
  REGISTRATIONS: 'tiditz_registrations_v1',
  TICKETS: 'tiditz_tickets_v1',
  CHECKINS: 'tiditz_checkins_v1',
  CREATIVE: 'tiditz_creative_v1',
  USER_SESSION: 'tiditz_user_session_v1',
};

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to write to localStorage for key ${key}:`, err);
  }
}

export const TiditzStore = {
  // Current user session
  getCurrentUser(): UserSession {
    return readStorage<UserSession>(STORAGE_KEYS.USER_SESSION, {
      id: 'usr-organizer-1',
      name: 'Tunde Adeleke',
      email: 'tunde@tiditz.com',
      role: 'organizer',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    });
  },

  setCurrentUser(user: UserSession): void {
    writeStorage(STORAGE_KEYS.USER_SESSION, user);
  },

  // Events
  getEvents(): TiditzEvent[] {
    return readStorage<TiditzEvent[]>(STORAGE_KEYS.EVENTS, INITIAL_EVENTS);
  },

  getEventBySlug(slug: string): TiditzEvent | undefined {
    const events = this.getEvents();
    return events.find((e) => e.slug === slug);
  },

  getEventById(id: string): TiditzEvent | undefined {
    const events = this.getEvents();
    return events.find((e) => e.id === id);
  },

  saveEvent(event: TiditzEvent): TiditzEvent {
    const events = this.getEvents();
    const index = events.findIndex((e) => e.id === event.id);
    if (index >= 0) {
      events[index] = { ...event, updated_at: new Date().toISOString() };
    } else {
      events.unshift({
        ...event,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
    writeStorage(STORAGE_KEYS.EVENTS, events);
    return event;
  },

  deleteEvent(id: string): void {
    const events = this.getEvents().filter((e) => e.id !== id);
    writeStorage(STORAGE_KEYS.EVENTS, events);
  },

  // Registrations
  getRegistrations(): Registration[] {
    return readStorage<Registration[]>(STORAGE_KEYS.REGISTRATIONS, INITIAL_REGISTRATIONS);
  },

  getRegistrationsForEvent(eventId: string): Registration[] {
    return this.getRegistrations().filter((r) => r.event_id === eventId);
  },

  // Tickets
  getTickets(): Ticket[] {
    return readStorage<Ticket[]>(STORAGE_KEYS.TICKETS, INITIAL_TICKETS);
  },

  getTicketByCode(ticketCode: string): Ticket | undefined {
    const cleanCode = ticketCode.trim().toUpperCase();
    return this.getTickets().find(
      (t) => t.ticket_code.toUpperCase() === cleanCode || t.qr_token.toUpperCase() === cleanCode
    );
  },

  getTicketsForEvent(eventId: string): Ticket[] {
    return this.getTickets().filter((t) => t.event_id === eventId);
  },

  // Register attendee + issue ticket
  registerAttendee(data: {
    eventId: string;
    attendeeName: string;
    attendeeEmail: string;
    attendeePhone?: string;
    organisation?: string;
    jobTitle?: string;
    answers: Record<string, any>;
    showInDirectory?: boolean;
    ticketTypeId?: string;
  }): { registration: Registration; ticket: Ticket } {
    const event = this.getEventById(data.eventId);
    if (!event) throw new Error('Event not found');

    // Generate readable random ticket code, e.g. TIDZ-4921-8840
    const randomPart1 = Math.floor(1000 + Math.random() * 9000);
    const randomPart2 = Math.floor(1000 + Math.random() * 9000);
    const ticketCode = `TIDZ-${randomPart1}-${randomPart2}`;
    const qrToken = `QR-${ticketCode}-${Date.now().toString(36).toUpperCase()}`;

    const regId = `reg-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`;
    const ticketId = `tkt-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}`;

    const newRegistration: Registration = {
      id: regId,
      event_id: data.eventId,
      attendee_name: data.attendeeName,
      attendee_email: data.attendeeEmail,
      attendee_phone: data.attendeePhone,
      organisation: data.organisation,
      job_title: data.jobTitle,
      status: 'confirmed',
      answers: data.answers,
      show_in_directory: data.showInDirectory ?? true,
      ticket_type_id: data.ticketTypeId,
      created_at: new Date().toISOString(),
    };

    const newTicket: Ticket = {
      id: ticketId,
      event_id: data.eventId,
      registration_id: regId,
      ticket_type_name: 'General Admission',
      ticket_code: ticketCode,
      qr_token: qrToken,
      status: 'issued',
      issued_at: new Date().toISOString(),
      attendee_name: data.attendeeName,
      attendee_email: data.attendeeEmail,
      attendee_phone: data.attendeePhone,
      event_title: event.title,
      event_starts_at: event.starts_at,
      event_ends_at: event.ends_at,
      event_timezone: event.timezone,
      venue_name: event.venue_name || 'Online Platform',
      address: event.address,
      cover_image_url: event.cover_image_url,
    };

    // Save registration
    const registrations = this.getRegistrations();
    registrations.unshift(newRegistration);
    writeStorage(STORAGE_KEYS.REGISTRATIONS, registrations);

    // Save ticket
    const tickets = this.getTickets();
    tickets.unshift(newTicket);
    writeStorage(STORAGE_KEYS.TICKETS, tickets);

    // Update event registered_count
    event.registered_count = (event.registered_count || 0) + 1;
    this.saveEvent(event);

    return { registration: newRegistration, ticket: newTicket };
  },

  // Check-In Engine (Atomic validation)
  getCheckInHistory(eventId?: string): CheckInRecord[] {
    const list = readStorage<CheckInRecord[]>(STORAGE_KEYS.CHECKINS, INITIAL_CHECKINS);
    if (eventId) {
      return list.filter((c) => c.event_id === eventId);
    }
    return list;
  },

  checkInTicket(params: {
    scannedTokenOrCode: string;
    targetEventId?: string;
    staffName?: string;
  }): {
    success: boolean;
    status: 'VALID' | 'ALREADY_CHECKED_IN' | 'INVALID' | 'WRONG_EVENT' | 'REVOKED';
    message: string;
    ticket?: Ticket;
    checkInRecord?: CheckInRecord;
  } {
    const token = params.scannedTokenOrCode.trim();
    const tickets = this.getTickets();
    const ticketIndex = tickets.findIndex(
      (t) =>
        t.ticket_code.toUpperCase() === token.toUpperCase() ||
        t.qr_token.toUpperCase() === token.toUpperCase()
    );

    if (ticketIndex === -1) {
      return {
        success: false,
        status: 'INVALID',
        message: 'No ticket found with this code or QR signature.',
      };
    }

    const ticket = tickets[ticketIndex];

    // Check wrong event if targetEventId is enforced
    if (params.targetEventId && ticket.event_id !== params.targetEventId) {
      return {
        success: false,
        status: 'WRONG_EVENT',
        message: `This ticket is registered for a different event: "${ticket.event_title}".`,
        ticket,
      };
    }

    // Check revoked/cancelled
    if (ticket.status === 'cancelled' || ticket.status === 'revoked' || ticket.status === 'refunded') {
      return {
        success: false,
        status: 'REVOKED',
        message: `Admission denied: This ticket has been ${ticket.status}.`,
        ticket,
      };
    }

    // Check duplicate check-in
    if (ticket.status === 'checked-in') {
      const checkinTime = ticket.checked_in_at
        ? new Date(ticket.checked_in_at).toLocaleTimeString()
        : 'earlier';
      return {
        success: false,
        status: 'ALREADY_CHECKED_IN',
        message: `Warning: Already scanned and checked in at ${checkinTime}. Duplicate entry blocked.`,
        ticket,
      };
    }

    // Mark as checked in
    const checkinTime = new Date().toISOString();
    ticket.status = 'checked-in';
    ticket.checked_in_at = checkinTime;
    tickets[ticketIndex] = ticket;
    writeStorage(STORAGE_KEYS.TICKETS, tickets);

    // Record check-in log
    const checkInRecord: CheckInRecord = {
      id: `chk-${Date.now().toString(36)}`,
      ticket_id: ticket.id,
      event_id: ticket.event_id,
      ticket_code: ticket.ticket_code,
      attendee_name: ticket.attendee_name,
      scanned_by: params.staffName || 'Staff Scanner',
      result: 'accepted',
      reason: 'Valid ticket verified',
      scanned_at: checkinTime,
    };

    const checkIns = this.getCheckInHistory();
    checkIns.unshift(checkInRecord);
    writeStorage(STORAGE_KEYS.CHECKINS, checkIns);

    return {
      success: true,
      status: 'VALID',
      message: 'Ticket Valid! Entry approved.',
      ticket,
      checkInRecord,
    };
  },

  // Creative Studio
  getCreativeProjects(): CreativeProject[] {
    return readStorage<CreativeProject[]>(STORAGE_KEYS.CREATIVE, INITIAL_CREATIVE_PROJECTS);
  },

  submitCreativeProject(data: Omit<CreativeProject, 'id' | 'status' | 'created_at'>): CreativeProject {
    const projects = this.getCreativeProjects();
    const newProject: CreativeProject = {
      ...data,
      id: `cp-${Date.now().toString(36)}`,
      status: 'submitted',
      created_at: new Date().toISOString(),
    };
    projects.unshift(newProject);
    writeStorage(STORAGE_KEYS.CREATIVE, projects);
    return newProject;
  },

  resetToDefault(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.EVENTS);
    localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEYS.TICKETS);
    localStorage.removeItem(STORAGE_KEYS.CHECKINS);
    localStorage.removeItem(STORAGE_KEYS.CREATIVE);
  },
};
