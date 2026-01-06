'use client';

import { useState, useEffect } from 'react';
import DayCard from '@/components/day-card';
import { ArrowLeft, Calendar, Filter } from 'lucide-react';
import Link from 'next/link';
import { Day } from '@/types';
import AdSenseAd from '@/components/adsense-ad';

interface CategoryPageClientProps {
  category: {
    name: string;
    description: string;
    icon: string;
    color: string;
    slug: string;
  };
  allDays: Day[];
  slug: string;
}

type FilterType = 'all' | 'upcoming' | 'thisMonth';

export default function CategoryPageClient({ category, allDays }: CategoryPageClientProps) {
  const [filterType, setFilterType] = useState<FilterType>('all'); // Show all days by default for better internal linking
  const [displayedDays, setDisplayedDays] = useState<Day[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 24; // Show more days per page to improve internal linking

  useEffect(() => {
    if (!category || allDays.length === 0) return;

    let filteredDays = [...allDays];

    switch (filterType) {
      case 'upcoming':
        filteredDays = allDays
          .filter(day => new Date(day.date) >= new Date())
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'thisMonth':
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        filteredDays = allDays
          .filter(day => {
            const dayDate = new Date(day.date);
            return dayDate.getMonth() === currentMonth && 
                   dayDate.getFullYear() === currentYear;
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'all':
      default:
        filteredDays = allDays
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
    }

    setDisplayedDays(filteredDays.slice(0, currentPage * itemsPerPage));
  }, [category, allDays, filterType, currentPage]);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilterType(newFilter);
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const hasMoreDays = displayedDays.length < allDays.filter(day => {
    switch (filterType) {
      case 'upcoming':
        return new Date(day.date) >= new Date();
      case 'thisMonth':
        const now = new Date();
        const dayDate = new Date(day.date);
        return dayDate.getMonth() === now.getMonth() && 
               dayDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  }).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-dark-800 border-b dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">Home</Link>
            <span className="text-gray-400 dark:text-neutral-500">/</span>
            <Link href="/categories/" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">Categories</Link>
            <span className="text-gray-400 dark:text-neutral-500">/</span>
            <span className="text-gray-900 dark:text-neutral-100 font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/categories/"
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
                <span>{allDays.length} days in this category</span>
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
              <button 
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === 'all' 
                    ? 'bg-blue-600 dark:bg-blue-700 text-white' 
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-300 dark:hover:bg-dark-600'
                }`}
              >
                All Days
              </button>
              <button 
                onClick={() => handleFilterChange('upcoming')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === 'upcoming' 
                    ? 'bg-blue-600 dark:bg-blue-700 text-white' 
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-300 dark:hover:bg-dark-600'
                }`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => handleFilterChange('thisMonth')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterType === 'thisMonth' 
                    ? 'bg-blue-600 dark:bg-blue-700 text-white' 
                    : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-300 dark:hover:bg-dark-600'
                }`}
              >
                This Month
              </button>
            </div>
          </div>
        </div>

        {/* Days Grid */}
        {displayedDays.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedDays.map((day, index) => (
                <DayCard key={day.slug} day={day} showCategory={false} />
              ))}
            </div>
            {/* In-Feed Ad - After all cards, lazy loaded for better performance */}
            <div className="mt-8">
              <AdSenseAd 
                adSlot="3709941377" 
                format="auto" 
                fullWidth 
                lazy={true} 
              />
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-12 w-12 text-gray-400 dark:text-neutral-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">
              No days found for this filter
            </h3>
            <p className="text-gray-600 dark:text-neutral-300 mb-6">
              {filterType === 'upcoming' && 'No upcoming days in this category. Check back later for new celebrations.'}
              {filterType === 'thisMonth' && 'No days this month in this category. Try a different month or filter.'}
              {filterType === 'all' && 'No days found in this category.'}
            </p>
            <Link href="/categories/" className="btn-primary">
              Browse Other Categories
            </Link>
          </div>
        )}

        {/* Load More */}
        {hasMoreDays && (
          <div className="text-center mt-8">
            <button 
              onClick={handleLoadMore}
              className="btn-secondary px-6 py-3 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              Load More Days
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
