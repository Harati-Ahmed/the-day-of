import { notFound } from 'next/navigation';
import { getDaysByMonth } from '@/lib/data';
import { getCategoryColor, getCategorySlug, getCategoryColorStyle } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import DayCard from '@/components/day-card';

interface PageProps {
  params: Promise<{
    month: string;
  }>;
}

const MONTHS = [
  { name: 'January', number: 1, slug: 'january' },
  { name: 'February', number: 2, slug: 'february' },
  { name: 'March', number: 3, slug: 'march' },
  { name: 'April', number: 4, slug: 'april' },
  { name: 'May', number: 5, slug: 'may' },
  { name: 'June', number: 6, slug: 'june' },
  { name: 'July', number: 7, slug: 'july' },
  { name: 'August', number: 8, slug: 'august' },
  { name: 'September', number: 9, slug: 'september' },
  { name: 'October', number: 10, slug: 'october' },
  { name: 'November', number: 11, slug: 'november' },
  { name: 'December', number: 12, slug: 'december' }
];

export async function generateStaticParams() {
  return MONTHS.map((month) => ({
    month: month.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { month: monthSlug } = await params;
  const month = MONTHS.find(m => m.slug === monthSlug);
  
  if (!month) {
    return {
      title: 'Month Not Found - TheDayOf',
    };
  }

  const currentYear = new Date().getFullYear();
  
  return {
    title: `${month.name} ${currentYear} Special Days & Holidays – TheDayOf`,
    description: `Discover all the special days, holidays, and celebrations happening in ${month.name} ${currentYear}. From national observances to fun themed days, find out what to celebrate this month.`,
    keywords: `${month.name} holidays, ${month.name} special days, ${month.name} ${currentYear}, national days in ${month.name}`,
    alternates: {
      canonical: `https://thedayof.net/month/${monthSlug}`,
    },
    openGraph: {
      title: `${month.name} ${currentYear} Special Days & Holidays`,
      description: `Discover all the special days, holidays, and celebrations happening in ${month.name} ${currentYear}.`,
      type: 'website',
    },
  };
}

export default async function MonthPage({ params }: PageProps) {
  const { month: monthSlug } = await params;
  const month = MONTHS.find(m => m.slug === monthSlug);
  
  if (!month) {
    notFound();
  }

  const currentYear = new Date().getFullYear();
  const monthDays = getDaysByMonth(month.number, currentYear);
  
  // Group by categories for better organization
  const daysByCategory = monthDays.reduce((acc, day) => {
    if (!acc[day.category]) {
      acc[day.category] = [];
    }
    acc[day.category].push(day);
    return acc;
  }, {} as Record<string, typeof monthDays>);

  // Generate structured data for the hub page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${month.name} ${currentYear} Special Days & Holidays`,
    "description": `Complete guide to special days, holidays, and celebrations in ${month.name} ${currentYear}`,
    "url": `https://thedayof.net/month/${monthSlug}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": monthDays.length,
      "itemListElement": monthDays.map((day, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Event",
          "name": day.title,
          "startDate": day.date,
          "url": `https://thedayof.net/${getCategorySlug(day.category)}/${day.slug}`
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
        {/* Breadcrumb */}
        <div className="bg-white dark:bg-dark-800 border-b dark:border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">Home</Link>
              <span className="text-gray-400 dark:text-neutral-500">/</span>
              <Link href="/calendar" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">Calendar</Link>
              <span className="text-gray-400 dark:text-neutral-500">/</span>
              <span className="text-gray-900 dark:text-neutral-100 font-medium">{month.name} {currentYear}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-neutral-100">
                  {month.name} {currentYear}
                </h1>
              </div>
              <div className="text-gray-500 dark:text-neutral-400">
                {monthDays.length} special days
              </div>
            </div>

            <p className="text-xl text-gray-600 dark:text-neutral-300 mb-6">
              Discover all the special days, holidays, and celebrations happening in {month.name} {currentYear}. 
              From national observances to international awareness days, find out what makes this month special.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(daysByCategory).map(([category, categoryDays]) => {
                const categoryColor = getCategoryColor(category);
                const categoryStyle = getCategoryColorStyle(category);
                return (
                  <div key={category} className="text-center">
                    <div 
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${categoryColor} mb-2 shadow-sm`}
                      style={categoryStyle}
                    >
                      {category}
                    </div>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">
                      {categoryDays.length} days
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Days by Category */}
          {Object.entries(daysByCategory).map(([category, categoryDays]) => (
            <div key={category} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 flex items-center">
                  <div 
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getCategoryColor(category)} mr-3 shadow-sm`}
                    style={getCategoryColorStyle(category)}
                  >
                    {category}
                  </div>
                  {category} Days in {month.name}
                </h2>
                <Link 
                  href={`/category/${getCategorySlug(category)}`}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  View all {category} →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((day) => (
                  <DayCard key={day.slug} day={day} />
                ))}
              </div>
            </div>
          ))}

          {/* Month Navigation */}
          <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-6">Explore Other Months</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {MONTHS.map((m) => (
                <Link
                  key={m.slug}
                  href={`/month/${m.slug}`}
                  className={`p-4 rounded-lg border text-center transition-colors ${
                    m.slug === monthSlug
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100'
                      : 'bg-gray-50 dark:bg-dark-700 border-gray-200 dark:border-dark-600 hover:bg-gray-100 dark:hover:bg-dark-600 text-gray-900 dark:text-neutral-100'
                  }`}
                >
                  <div className="font-medium">{m.name}</div>
                  <div className="text-sm text-gray-500 dark:text-neutral-400 mt-1">
                    {getDaysByMonth(m.number, currentYear).length} days
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
