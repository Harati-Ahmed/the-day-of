import { categories, getDaysByCategory } from '@/lib/data';
import CategoryCard from '@/components/category-card';
import { Calendar, TrendingUp, Star } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Browse All Celebration Categories 🎯 Food, Holidays & More',
  description: 'Explore 10+ celebration categories! 🎯 Food holidays, awareness days, international events & more. Find YOUR perfect celebration with instant dates & party ideas!',
  keywords: ['categories', 'holidays', 'special days', 'food days', 'awareness days', 'celebrations'],
  alternates: {
    canonical: 'https://www.thedayof.net/categories/',
  },
  openGraph: {
    title: 'Categories - TheDayOf',
    description: 'Explore 10+ celebration categories! Food holidays, awareness days, international events & more. Find YOUR perfect celebration with instant dates & party ideas!',
    type: 'website',
    url: 'https://www.thedayof.net/categories/',
    siteName: 'TheDayOf',
    images: [
      {
        url: 'https://www.thedayof.net/images/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Celebration Categories - TheDayOf',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Categories - TheDayOf',
    description: 'Explore 10+ celebration categories! Food holidays, awareness days, international events & more.',
    images: ['https://www.thedayof.net/images/og-default.svg'],
  },
};

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Browse Categories
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Discover special days, holidays, and celebrations organized by category. 
              Find exactly what you&apos;re looking for or explore something new.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => {
            const dayCount = getDaysByCategory(category.name).length;
            return (
              <CategoryCard 
                key={category.slug} 
                category={category} 
                dayCount={dayCount}
              />
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-6 text-center">
            Category Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-2">
                {categories.reduce((total, category) => total + getDaysByCategory(category.name).length, 0)}
              </h3>
              <p className="text-gray-600 dark:text-neutral-300">Total Days</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-2">
                {categories.length}
              </h3>
              <p className="text-gray-600 dark:text-neutral-300">Categories</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-2">
                {Math.max(...categories.map(category => getDaysByCategory(category.name).length))}
              </h3>
              <p className="text-gray-600 dark:text-neutral-300">Most Popular Category</p>
            </div>
          </div>
        </div>

        {/* Category Details */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 text-center mb-8">
            What&apos;s in Each Category?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => {
              const dayCount = getDaysByCategory(category.name).length;
              const sampleDays = getDaysByCategory(category.name).slice(0, 3);
              
              return (
                <div key={category.slug} className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-2xl mr-4`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">{category.name}</h3>
                      <p className="text-gray-600 dark:text-neutral-300">{dayCount} days</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-neutral-300 mb-4">{category.description}</p>
                  
                  {sampleDays.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-neutral-100 mb-2">Sample Days:</h4>
                      <ul className="text-sm text-gray-600 dark:text-neutral-300 space-y-1">
                        {sampleDays.map((day) => (
                          <li key={day.slug} className="flex items-center">
                            <span className="w-2 h-2 bg-gray-400 dark:bg-neutral-500 rounded-full mr-2"></span>
                            {day.title}
                          </li>
                        ))}
                        {dayCount > 3 && (
                          <li className="text-gray-500 dark:text-neutral-400 italic">
                            ...and {dayCount - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
