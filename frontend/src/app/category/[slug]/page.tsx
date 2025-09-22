import { notFound } from 'next/navigation';
import { categories, getDaysByCategory } from '@/lib/data';
import { Day } from '@/types';
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
