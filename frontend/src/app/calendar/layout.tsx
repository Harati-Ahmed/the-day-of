import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '365+ Days Calendar 🗓️ All National Holidays & Celebrations by Month',
  description: 'Interactive calendar with 365+ celebrations! 🗓️ See ALL national days, food holidays & events by month. Plan ahead with dates, party ideas & trending celebrations!',
  keywords: ['calendar', 'national days calendar', 'holiday calendar', 'special days calendar', 'celebration calendar'],
  openGraph: {
    title: 'Full Calendar - All National Days & Holidays',
    description: 'Interactive calendar with 365+ celebrations! See ALL national days, food holidays & events by month. Plan ahead with dates, party ideas & trending celebrations!',
    type: 'website',
    url: 'https://www.thedayof.net/calendar/',
  },
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

