import { notFound } from 'next/navigation';
import { categories, getDaysByCategory } from '@/lib/data';
import DayCard from '@/components/day-card';
import { ArrowLeft, Calendar, Filter } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

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

  return {
    title: `${category.name} Days - TheDayOf`,
    description: `Discover all ${category.name.toLowerCase()} days, holidays, and celebrations. ${category.description}`,
    keywords: [category.name.toLowerCase(), 'days', 'holidays', 'celebrations', 'special days'],
    openGraph: {
      title: `${category.name} Days`,
      description: `Discover all ${category.name.toLowerCase()} days, holidays, and celebrations.`,
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

  const days = getDaysByCategory(category.name);
  const upcomingDays = days
    .filter(day => new Date(day.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-dark-800 border-b dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">Home</Link>
            <span className="text-gray-400 dark:text-neutral-500">/</span>
            <Link href="/categories" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">Categories</Link>
            <span className="text-gray-400 dark:text-neutral-500">/</span>
            <span className="text-gray-900 dark:text-neutral-100 font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/categories"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Categories
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className={`w-16 h-16 rounded-lg ${category.color} flex items-center justify-center text-3xl mr-6`}>
              {category.icon}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-neutral-100 mb-2">
                {category.name} Days
              </h1>
              <p className="text-xl text-gray-600 dark:text-neutral-300 mb-4">
                {category.description}
              </p>
              <div className="flex items-center text-gray-500 dark:text-neutral-400">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{days.length} days in this category</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Days
            </h2>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                All Days
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-neutral-300 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-600 transition-colors">
                Upcoming
              </button>
              <button className="px-4 py-2 bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-neutral-300 rounded-lg hover:bg-gray-300 dark:hover:bg-dark-600 transition-colors">
                This Month
              </button>
            </div>
          </div>
        </div>

        {/* Days Grid */}
        {upcomingDays.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingDays.map((day) => (
              <DayCard key={day.slug} day={day} showCategory={false} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-12 w-12 text-gray-400 dark:text-neutral-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">
              No upcoming days in this category
            </h3>
            <p className="text-gray-600 dark:text-neutral-300 mb-6">
              Check back later for new {category.name.toLowerCase()} days and celebrations.
            </p>
            <Link href="/categories" className="btn-primary">
              Browse Other Categories
            </Link>
          </div>
        )}

        {/* Load More */}
        {upcomingDays.length > 12 && (
          <div className="text-center mt-8">
            <button className="btn-secondary">
              Load More Days
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
