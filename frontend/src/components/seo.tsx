import Head from 'next/head';
import { SEOData } from '@/types';

interface SEOProps {
  data: SEOData;
}

export default function SEO({ data }: SEOProps) {
  const {
    title,
    description,
    keywords,
    image = '/og-image.jpg',
    url,
    type = 'website'
  } = data;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="TheDayOf" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
    </Head>
  );
}

export function generateStructuredData(day: { title: string; date: string; description: string; category: string; slug: string; image?: string }) {
  const categorySlug = getCategorySlug(day.category);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": day.title,
    "startDate": day.date,
    "endDate": day.date,
    "description": day.description,
    "url": `https://www.thedayof.net/${categorySlug}/${day.slug}/`,
    "image": day.image ? `https://www.thedayof.net${day.image}` : `https://www.thedayof.net/images/categories/${categorySlug}.jpg`,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "location": {
      "@type": "VirtualLocation",
      "url": `https://www.thedayof.net/${categorySlug}/${day.slug}/`
    },
    "organizer": {
      "@type": "Organization",
      "name": "TheDayOf",
      "url": "https://www.thedayof.net/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thedayof.net/logo.png"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "TheDayOf",
      "url": "https://www.thedayof.net/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thedayof.net/logo.png"
      }
    },
    "performer": {
      "@type": "Organization",
      "name": "Global Community"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": day.date,
      "url": `https://www.thedayof.net/${categorySlug}/${day.slug}/`
    }
  };

  return JSON.stringify(structuredData);
}

function getCategorySlug(category: string): string {
  const categoryMap: Record<string, string> = {
    'Food': 'food',
    'Awareness': 'awareness-health',
    'Animals': 'animals-pets',
    'Fun': 'fun-weird',
    'Holiday': 'holiday',
    'Shopping': 'shopping-deals',
    'National': 'national',
    'International': 'international'
  };
  return categoryMap[category] || 'other';
}
