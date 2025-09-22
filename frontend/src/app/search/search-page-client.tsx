'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter, Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import DayCard from '@/components/day-card';
import { Day } from '@/types';
import { categories, searchDays } from '@/lib/data';

interface SearchResults {
  results: Day[];
  total: number;
  page: number;
  totalPages: number;
  query: string;
  category: string;
}

export default function SearchPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const performSearch = useCallback((searchQuery: string, searchCategory: string, page: number) => {
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use client-side search
      let results = searchDays(searchQuery.trim());

      // Filter by category if specified
      if (searchCategory && searchCategory !== 'all') {
        results = results.filter(day => 
          day.category.toLowerCase() === searchCategory.toLowerCase()
        );
      }

      // Pagination
      const itemsPerPage = 12;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      
      const paginatedResults = results.slice(startIndex, endIndex);
      const totalPages = Math.ceil(results.length / itemsPerPage);

      setSearchResults({
        results: paginatedResults,
        total: results.length,
        page: page,
        totalPages,
        query: searchQuery.trim(),
        category: searchCategory
      });
    } catch (err) {
      setError('Failed to search. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize from URL parameters
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    const urlCategory = searchParams.get('category') || 'all';
    const urlPage = parseInt(searchParams.get('page') || '1');
    
    setQuery(urlQuery);
    setCategory(urlCategory);
    setCurrentPage(urlPage);
    
    if (urlQuery) {
      performSearch(urlQuery, urlCategory, urlPage);
    }
  }, [searchParams, performSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setCurrentPage(1);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('q', query.trim());
      newSearchParams.set('category', category);
      newSearchParams.set('page', '1');
      router.push(`/search?${newSearchParams.toString()}`);
      performSearch(query.trim(), category, 1);
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setCurrentPage(1);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', newCategory);
    newSearchParams.set('page', '1');
    router.push(`/search?${newSearchParams.toString()}`);
    performSearch(query, newCategory, 1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    router.push(`/search?${newSearchParams.toString()}`);
    performSearch(query, category, newPage);
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-dark-800 border-b dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">Home</Link>
            <span className="text-gray-400 dark:text-neutral-500">/</span>
            <span className="text-gray-900 dark:text-neutral-100 font-medium">Search</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Search Header */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-neutral-100 mb-6">
            Search Days & Celebrations
          </h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search days, holidays, and celebrations..."
                className="w-full px-4 py-4 pr-12 border border-neutral-200 dark:border-dark-600 rounded-xl focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 transition-all duration-200 text-base bg-white dark:bg-dark-700 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400"
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-neutral-400 dark:text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Category Filter */}
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-500 dark:text-neutral-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">Filter by category:</span>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-3 py-2 border border-neutral-200 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-neutral-900 dark:text-neutral-100 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Results */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600 dark:text-primary-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-neutral-300">Searching...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-8">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button
              onClick={() => performSearch(query, category, currentPage)}
              className="mt-2 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 underline"
            >
              Try again
            </button>
          </div>
        )}

        {searchResults && !isLoading && (
          <>
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">
                    {searchResults.total > 0 ? (
                      <>
                        {searchResults.total} result{searchResults.total !== 1 ? 's' : ''} for &ldquo;{searchResults.query}&rdquo;
                        {category !== 'all' && (
                          <span className="text-lg font-normal text-gray-600 dark:text-neutral-400">
                            {' '}in {categories.find(cat => cat.slug === category)?.name}
                          </span>
                        )}
                      </>
                    ) : (
                      <>No results found for &ldquo;{searchResults.query}&rdquo;</>
                    )}
              </h2>
              {searchResults.total > 0 && (
                <p className="text-gray-600 dark:text-neutral-300">
                  Page {searchResults.page} of {searchResults.totalPages}
                </p>
              )}
            </div>

            {/* Results Grid */}
            {searchResults.results.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {searchResults.results.map((day) => (
                    <DayCard key={day.slug} day={day} showCategory={true} />
                  ))}
                </div>

                {/* Pagination */}
                {searchResults.totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-300 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, searchResults.totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-primary-600 dark:bg-primary-700 text-white'
                              : 'bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-300 dark:hover:bg-dark-600'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === searchResults.totalPages}
                      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-dark-700 text-gray-700 dark:text-neutral-300 hover:bg-gray-300 dark:hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-gray-400 dark:text-neutral-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-neutral-300 mb-6">
                  Try different keywords or browse our categories
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!searchResults && !isLoading && !error && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 dark:bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-12 w-12 text-gray-400 dark:text-neutral-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">
              Start your search
            </h3>
            <p className="text-gray-600 dark:text-neutral-300 mb-6">
              Search for national days, holidays, and celebrations
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
