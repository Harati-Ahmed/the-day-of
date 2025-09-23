import { Suspense } from 'react';
import { Metadata } from 'next';
import SearchPageClient from './search-page-client';

export const metadata: Metadata = {
  title: 'Search Results - TheDayOf',
  description: 'Search for national days, holidays, and celebrations. Find your favorite days and discover new ones.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function SearchPage() {
  // Search page structured data
  const searchStructuredData = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": "Search Results",
    "description": "Search results for national days, holidays, and celebrations on TheDayOf",
    "url": "https://www.thedayof.net/search",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Search Results",
      "description": "Find national days, holidays, and celebrations"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchStructuredData) }}
      />
      <Suspense fallback={<SearchPageSkeleton />}>
        <SearchPageClient />
      </Suspense>
    </>
  );
}

function SearchPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-dark-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-6">
                <div className="h-4 bg-gray-200 dark:bg-dark-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-dark-700 rounded w-1/2 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-dark-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-dark-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
