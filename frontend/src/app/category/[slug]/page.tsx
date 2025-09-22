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
  
  return {
    title: `${category.name} Days & Holidays ${currentYear} – Complete Guide – TheDayOf`,
    description: `Discover all ${category.name.toLowerCase()} days and holidays in ${currentYear}. ${category.description} Find dates, celebration ideas, and history for ${categoryDays.length}+ special days.`,
    keywords: `${category.name.toLowerCase()} holidays, ${category.name.toLowerCase()} days ${currentYear}, national ${category.name.toLowerCase()} days, ${category.name.toLowerCase()} observances`,
    alternates: {
      canonical: `https://thedayof.net/category/${slug}`,
    },
    openGraph: {
      title: `${category.name} Days & Holidays ${currentYear} – Complete Guide`,
      description: `Discover all ${category.name.toLowerCase()} days and holidays in ${currentYear}. ${category.description}`,
      type: 'website',
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
    "description": `Discover all ${category.name.toLowerCase()} days, holidays, and celebrations. ${category.description}`,
    "url": `https://thedayof.net/category/${slug}`,
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
          "url": `https://thedayof.net/${slug}/${day.slug}`
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
          "item": "https://thedayof.net"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Categories",
          "item": "https://thedayof.net/categories"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": category.name,
          "item": `https://thedayof.net/category/${slug}`
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryStructuredData) }}
      />
      <CategoryPageClient 
        category={category} 
        allDays={allDays} 
        slug={slug}
      />
    </>
  );
}
