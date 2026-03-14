import { days } from '@/lib/data';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import TodayContent from '@/components/today-content';

// Build-time helpers for metadata (static export = metadata uses build date)
function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodaysDaysForMetadata() {
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  return days.filter((day) => {
    const dayDate = new Date(day.date);
    return dayDate.getMonth() === todayMonth && dayDate.getDate() === todayDay;
  });
}

export async function generateMetadata(): Promise<Metadata> {
  const todaysDays = getTodaysDaysForMetadata();
  const formattedDate = formatDate(getTodayDateString());

  const title =
    todaysDays.length > 0
      ? `Today's Celebrations: ${todaysDays[0].title} + ${todaysDays.length - 1} More! 🎉 ${formattedDate}`
      : `What's Happening Today? ${formattedDate} 🗓️ National Days & Holidays`;

  const description =
    todaysDays.length > 0
      ? `🎉 It's ${todaysDays[0].title}! Plus ${todaysDays.length - 1} more celebrations happening TODAY (${formattedDate}). Get party ideas, deals & join the fun!`
      : `What's special about ${formattedDate}? Find out what's trending TODAY! Daily celebration ideas, exclusive deals & party inspiration.`;

  return {
    title,
    description,
    keywords: `today's national day, what national day is today, today's holiday, ${formattedDate}, current celebrations`,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://www.thedayof.net/today/',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://www.thedayof.net/today/',
      siteName: 'TheDayOf',
      locale: 'en_US',
      images: [
        {
          url: 'https://www.thedayof.net/images/og-today.svg',
          width: 1200,
          height: 630,
          alt: "Today's National Days",
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.thedayof.net/images/og-today.svg'],
    },
  };
}

export default function TodayPage() {
  return <TodayContent days={days} />;
}
