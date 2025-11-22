import Link from 'next/link';
import { Home, Search, Calendar, ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found | TheDayOf',
  description: 'The page you are looking for could not be found. Browse our calendar of national days, holidays, and celebrations.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-dark-700 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-neutral-400 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
          <p className="text-gray-700 dark:text-neutral-300 mb-6">
            Don&apos;t worry! Here are some helpful links to get you back on track:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
            >
              <Home className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-neutral-100">Home</span>
            </Link>
            
            <Link
              href="/today/"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
            >
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-neutral-100">Today</span>
            </Link>
            
            <Link
              href="/search/"
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
            >
              <Search className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-medium text-gray-900 dark:text-neutral-100">Search</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

