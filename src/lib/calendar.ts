import { TiditzEvent, Ticket } from '@/types';

export function generateGoogleCalendarUrl(event: TiditzEvent | { title: string; description?: string; venue_name?: string; address?: string; starts_at: string; ends_at: string }): string {
  const startDate = new Date(event.starts_at).toISOString().replace(/-|:|\.\d\d\d/g, '');
  const endDate = new Date(event.ends_at).toISOString().replace(/-|:|\.\d\d\d/g, '');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startDate}/${endDate}`,
    details: event.description || 'Registered via Tiditz African Event Platform',
    location: event.address || event.venue_name || 'Online Platform',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(event: TiditzEvent | { title: string; description?: string; venue_name?: string; address?: string; starts_at: string; ends_at: string; slug?: string }, ticket?: Ticket): void {
  const startDate = new Date(event.starts_at).toISOString().replace(/-|:|\.\d\d\d/g, '');
  const endDate = new Date(event.ends_at).toISOString().replace(/-|:|\.\d\d\d/g, '');
  const now = new Date().toISOString().replace(/-|:|\.\d\d\d/g, '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tiditz Events Africa//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:tiditz-${ticket ? ticket.ticket_code : Date.now()}@tiditz.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${startDate}`,
    `DTEND:${endDate}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${(event.description || '').replace(/\n/g, '\\n')}${ticket ? `\\n\\nYour Ticket Code: ${ticket.ticket_code}` : ''}`,
    `LOCATION:${event.address || event.venue_name || 'Online'}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${(event.slug || 'event').replace(/[^a-z0-9_-]/gi, '_')}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
