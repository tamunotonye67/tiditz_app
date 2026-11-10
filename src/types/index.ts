export type EventFormat = 'physical' | 'virtual' | 'hybrid';
export type EventVisibility = 'public' | 'unlisted' | 'private';
export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export type FieldType =
  | 'text'
  | 'textarea'
  | 'email'
  | 'phone'
  | 'number'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'consent';

export interface FormField {
  id: string;
  field_key: string;
  label: string;
  field_type: FieldType;
  description?: string;
  is_required: boolean;
  position: number;
  options?: string[]; // for dropdown, radio, multi-checkbox
  placeholder?: string;
  is_active: boolean;
}

export interface TicketType {
  id: string;
  event_id: string;
  name: string;
  description?: string;
  currency: string;
  price_minor: number;
  quantity_total?: number;
  quantity_sold: number;
  max_per_order: number;
  status: 'active' | 'inactive';
}

export interface EventSpeaker {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar_url?: string;
}

export interface EventAgendaItem {
  id: string;
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}

export interface TiditzEvent {
  id: string;
  organization_id?: string;
  created_by: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  category: string;
  format: EventFormat;
  visibility: EventVisibility;
  status: EventStatus;
  starts_at: string; // ISO string
  ends_at: string;
  timezone: string;
  country_code: string;
  city?: string;
  venue_name?: string;
  address?: string;
  virtual_instructions?: {
    platform?: string;
    meeting_url?: string;
    joining_instructions?: string;
  };
  cover_image_url: string;
  gallery_images?: string[];
  capacity?: number;
  registered_count: number;
  ticket_price_display?: string; // e.g. "Free" or "From ₦15,000"
  is_free: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  organizer: {
    id: string;
    name: string;
    avatar_url?: string;
    bio?: string;
  };
  theme?: {
    primaryColor: string;
    accentColor: string;
  };
  form_fields: FormField[];
  ticket_types: TicketType[];
  speakers?: EventSpeaker[];
  agenda?: EventAgendaItem[];
}

export interface Registration {
  id: string;
  event_id: string;
  attendee_name: string;
  attendee_email: string;
  attendee_phone?: string;
  organisation?: string;
  job_title?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'waitlisted';
  answers: Record<string, any>;
  show_in_directory: boolean;
  ticket_type_id?: string;
  created_at: string;
}

export interface Ticket {
  id: string;
  event_id: string;
  registration_id: string;
  ticket_type_id?: string;
  ticket_type_name: string;
  ticket_code: string; // e.g. "TIDZ-7824-6619"
  qr_token: string;
  status: 'issued' | 'checked-in' | 'cancelled' | 'refunded' | 'revoked';
  issued_at: string;
  checked_in_at?: string;
  attendee_name: string;
  attendee_email: string;
  attendee_phone?: string;
  event_title: string;
  event_starts_at: string;
  event_ends_at: string;
  event_timezone: string;
  venue_name?: string;
  address?: string;
  cover_image_url?: string;
}

export interface CheckInRecord {
  id: string;
  ticket_id: string;
  event_id: string;
  ticket_code: string;
  attendee_name: string;
  scanned_by: string;
  result: 'accepted' | 'rejected';
  reason?: string;
  scanned_at: string;
  scanner_reference?: string;
}

export interface CreativeProject {
  id: string;
  customer_user_id: string;
  customer_name: string;
  customer_email: string;
  service_category: 'graphics' | 'branding' | 'motion' | 'video' | 'page_design' | 'full_setup';
  title: string;
  brief: string;
  budget_range?: string;
  requested_deadline?: string;
  status: 'submitted' | 'under_review' | 'quoted' | 'in_progress' | 'delivered' | 'completed' | 'cancelled';
  quote_amount_minor?: number;
  quote_currency?: string;
  created_at: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'attendee' | 'organizer' | 'admin';
  avatar_url?: string;
}
