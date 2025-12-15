import { notFound } from 'next/navigation';
import { categories, getDaysByCategory } from '@/lib/data';
import { Day } from '@/types';
import { Metadata } from 'next';
// Import the client component for interactive functionality
import CategoryPageClient from './category-page-client';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find(cat => cat.slug === slug);
  
  if (!category) {
    return {
      title: 'Category Not Found - TheDayOf',
    };
  }

  const categoryDays = getDaysByCategory(category.name);
  const currentYear = new Date().getFullYear();
  
  // Get category emoji
  const categoryEmojis: Record<string, string> = {
    'Food': '🍕',
    'Holiday': '🎊',
    'Animals & Pets': '🐾',
    'Awareness & Health': '💚',
    'International': '🌍',
    'Fun & Weird': '🎉',
    'Shopping & Deals': '🛍️',
    'National': '🇺🇸',
  };
  const emoji = categoryEmojis[category.name] || '📅';
  
  return {
    title: `${categoryDays.length}+ ${category.name} Days ${currentYear} ${emoji} - Complete Calendar & Ideas`,
    description: `${categoryDays.length}+ ${category.name.toLowerCase()} celebrations in ${currentYear}! Get dates, party ideas, trending hashtags & exclusive deals. ${category.description}`,
    keywords: `${category.name.toLowerCase()} holidays, ${category.name.toLowerCase()} days ${currentYear}, national ${category.name.toLowerCase()} days, ${category.name.toLowerCase()} observances`,
    alternates: {
      canonical: `https://www.thedayof.net/category/${slug}/`,
    },
    openGraph: {
      title: `${categoryDays.length}+ ${category.name} Days ${currentYear} ${emoji}`,
      description: `${categoryDays.length}+ ${category.name.toLowerCase()} celebrations in ${currentYear}! Get dates, party ideas, trending hashtags & exclusive deals.`,
      type: 'website',
      url: `https://www.thedayof.net/category/${slug}/`,
      siteName: 'TheDayOf',
      locale: 'en_US',
      images: [
        {
          url: 'https://www.thedayof.net/images/og-default.svg',
          width: 1200,
          height: 630,
          alt: `${category.name} Days & Holidays`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryDays.length}+ ${category.name} Days ${currentYear} ${emoji}`,
      description: `${categoryDays.length}+ ${category.name.toLowerCase()} celebrations in ${currentYear}! Get dates, party ideas, trending hashtags & exclusive deals.`,
      images: ['https://www.thedayof.net/images/og-default.svg'],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find(cat => cat.slug === slug);
  
  if (!category) {
    notFound();
  }

  const allDays = getDaysByCategory(category.name);

  // Category page structured data
  const categoryStructuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.name} Days`,
    "description": `Complete guide to ${allDays.length}+ ${category.name.toLowerCase()} celebrations with dates, party ideas, and celebration tips. ${category.description}`,
    "url": `https://www.thedayof.net/category/${slug}/`,
    "mainEntity": {
      "@type": "ItemList",
      "name": `${category.name} Days and Celebrations`,
      "description": category.description,
      "numberOfItems": allDays.length,
      "itemListElement": allDays.slice(0, 10).map((day: Day, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Event",
          "name": day.title,
          "description": day.description,
          "startDate": day.date,
          "endDate": day.date,
          "url": `https://www.thedayof.net/${slug}/${day.slug}/`,
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "location": {
            "@type": "VirtualLocation",
            "url": `https://www.thedayof.net/${slug}/${day.slug}/`
          },
          "organizer": {
            "@type": "Organization",
            "name": "TheDayOf",
            "url": "https://www.thedayof.net"
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
            "url": `https://www.thedayof.net/${slug}/${day.slug}/`
          }
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.thedayof.net"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Categories",
          "item": "https://www.thedayof.net/categories"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": category.name,
          "item": `https://www.thedayof.net/category/${slug}`
        }
      ]
    }
  };

  // FAQ Schema for Category pages
  const currentYear = new Date().getFullYear();
  const categoryFAQStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How many ${category.name.toLowerCase()} days are there in ${currentYear}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `There are ${allDays.length} ${category.name.toLowerCase()} days and celebrations in ${currentYear}. ${category.description}`
        }
      },
      {
        "@type": "Question",
        "name": `What are the most popular ${category.name.toLowerCase()} days?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Popular ${category.name.toLowerCase()} celebrations include ${allDays.slice(0, 5).map((d: Day) => d.title).join(', ')}, and many more throughout the year!`
        }
      },
      {
        "@type": "Question",
        "name": `Where can I find a complete list of ${category.name.toLowerCase()} days?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `TheDayOf.net provides a complete, searchable calendar of all ${allDays.length}+ ${category.name.toLowerCase()} days with dates, celebration ideas, and historical information.`
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryFAQStructuredData) }}
      />
      <CategoryPageClient 
        category={category} 
        allDays={allDays} 
        slug={slug}
      />
    </>
  );
}
