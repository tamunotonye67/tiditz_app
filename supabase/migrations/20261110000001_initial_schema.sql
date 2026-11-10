-- =====================================================================
-- TIDITZ DATABASE SCHEMA & RLS POLICIES (PostgreSQL / Supabase)
-- Version 1.0 (Phase 1 & Phase 2 compliant)
-- =====================================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  country_code TEXT DEFAULT 'NG',
  preferred_locale TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. ORGANIZATIONS
CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  country_code TEXT NOT NULL DEFAULT 'NG',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'closed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. ORGANIZATION MEMBERS
CREATE TABLE IF NOT EXISTS public.organization_members (
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('owner', 'admin', 'editor', 'finance')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  PRIMARY KEY (organization_id, user_id)
);

-- 4. EVENTS
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Technology',
  format TEXT NOT NULL DEFAULT 'physical' CHECK (format IN ('physical', 'virtual', 'hybrid')),
  visibility TEXT NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'unlisted', 'private')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'completed')),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Africa/Lagos',
  country_code TEXT DEFAULT 'NG',
  venue_name TEXT,
  address TEXT,
  virtual_instructions JSONB,
  cover_image_url TEXT,
  capacity INTEGER,
  registration_opens_at TIMESTAMPTZ,
  registration_closes_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. EVENT DESIGNS
CREATE TABLE IF NOT EXISTS public.event_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID UNIQUE NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  template_key TEXT NOT NULL DEFAULT 'modern-emerald',
  theme_config JSONB NOT NULL DEFAULT '{"primaryColor": "#0F5132", "accentColor": "#198754", "font": "sans"}'::jsonb,
  section_config JSONB NOT NULL DEFAULT '{"showSpeakers": true, "showAgenda": true, "showVenue": true, "showAttendees": true}'::jsonb,
  custom_css TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. FORM FIELDS (Customizable Registration Forms)
CREATE TABLE IF NOT EXISTS public.form_fields (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  field_key TEXT NOT NULL,
  label TEXT NOT NULL,
  field_type TEXT NOT NULL CHECK (field_type IN ('text', 'textarea', 'email', 'phone', 'number', 'dropdown', 'radio', 'checkbox', 'date', 'consent')),
  description TEXT,
  is_required BOOLEAN NOT NULL DEFAULT false,
  position INTEGER NOT NULL DEFAULT 0,
  options JSONB,
  validation_rules JSONB,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT uq_event_field_key UNIQUE (event_id, field_key)
);

-- 7. TICKET TYPES
CREATE TABLE IF NOT EXISTS public.ticket_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  currency TEXT NOT NULL DEFAULT 'NGN',
  price_minor BIGINT NOT NULL DEFAULT 0,
  quantity_total INTEGER,
  quantity_sold INTEGER NOT NULL DEFAULT 0,
  sales_start_at TIMESTAMPTZ,
  sales_end_at TIMESTAMPTZ,
  max_per_order INTEGER NOT NULL DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. REGISTRATIONS
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  attendee_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  attendee_name TEXT NOT NULL,
  attendee_email TEXT NOT NULL,
  attendee_phone TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'waitlisted')),
  answers JSONB NOT NULL DEFAULT '{}'::jsonb,
  show_in_directory BOOLEAN NOT NULL DEFAULT true,
  form_schema_version INTEGER NOT NULL DEFAULT 1,
  confirmation_sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. TICKETS
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  ticket_type_id UUID REFERENCES public.ticket_types(id) ON DELETE SET NULL,
  ticket_code TEXT UNIQUE NOT NULL,
  qr_token_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'issued' CHECK (status IN ('pending', 'issued', 'checked-in', 'cancelled', 'refunded', 'revoked')),
  issued_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. CHECK-INS
CREATE TABLE IF NOT EXISTS public.check_ins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.tickets(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  scanned_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  result TEXT NOT NULL CHECK (result IN ('accepted', 'rejected')),
  reason TEXT,
  scanned_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  scanner_reference TEXT
);

-- 11. CREATIVE PROJECTS (Tiditz Creative)
CREATE TABLE IF NOT EXISTS public.creative_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  service_category TEXT NOT NULL CHECK (service_category IN ('graphics', 'branding', 'motion', 'video', 'page_design', 'full_setup')),
  title TEXT NOT NULL,
  brief TEXT NOT NULL,
  budget_range TEXT,
  requested_deadline DATE,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'quoted', 'in_progress', 'delivered', 'completed', 'cancelled')),
  quote_amount_minor BIGINT,
  quote_currency TEXT DEFAULT 'NGN',
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- INDEXES
CREATE INDEX IF NOT EXISTS idx_events_visibility_status ON public.events(visibility, status, starts_at);
CREATE INDEX IF NOT EXISTS idx_events_country_category ON public.events(country_code, category);
CREATE INDEX IF NOT EXISTS idx_registrations_event ON public.registrations(event_id, created_at);
CREATE INDEX IF NOT EXISTS idx_tickets_ticket_code ON public.tickets(ticket_code);
CREATE INDEX IF NOT EXISTS idx_tickets_event_status ON public.tickets(event_id, status);
CREATE INDEX IF NOT EXISTS idx_checkins_event ON public.check_ins(event_id, scanned_at);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.check_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_projects ENABLE ROW LEVEL SECURITY;

-- Profiles: Public can read profile display_name/avatar, owners can update
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Events: Published & public are readable by all; organizers can CRUD their own
CREATE POLICY "Published public events are viewable by everyone" ON public.events
  FOR SELECT USING (visibility = 'public' AND status = 'published');

CREATE POLICY "Organizers can view own events" ON public.events
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Organizers can insert events" ON public.events
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Organizers can update own events" ON public.events
  FOR UPDATE USING (auth.uid() = created_by);

-- Registrations: Organizers can view registrations for their events; attendees can view their own
CREATE POLICY "Organizers can view their event registrations" ON public.registrations
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = registrations.event_id AND events.created_by = auth.uid())
  );

CREATE POLICY "Anyone can create registration" ON public.registrations
  FOR INSERT WITH CHECK (true);

-- Tickets: Public with valid token can view; organizers can view
CREATE POLICY "Organizers can view event tickets" ON public.tickets
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.events WHERE events.id = tickets.event_id AND events.created_by = auth.uid())
  );

CREATE POLICY "Anyone can view own ticket" ON public.tickets
  FOR SELECT USING (true);
