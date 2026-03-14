'use client';

import { useState, useEffect } from 'react';
import { formatDate, getCategoryColor, getCategorySlug } from '@/lib/utils';
import { Calendar, Tag, Clock, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import SocialShare from '@/components/social-share';
import { getRelatedDays } from '@/lib/data';
import type { Day } from '@/types';

/**
 * Gets today's date in YYYY-MM-DD using the user's local timezone (client-side).
 * Avoids static export build-time date freezing.
 */
function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Filters days that match today's date (month + day) in the user's timezone.
 * Uses string parsing to avoid Date/UTC timezone edge cases.
 */
function getTodaysDays(days: Day[]): Day[] {
  const today = new Date();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  return days.filter((day) => {
    const parts = day.date.split('-');
    if (parts.length < 3) return false;
    const eventMonth = parseInt(parts[1], 10);
    const eventDay = parseInt(parts[2], 10);
    return eventMonth === todayMonth && eventDay === todayDay;
  });
}

interface TodayContentProps {
  days: Day[];
}

export default function TodayContent({ days }: TodayContentProps) {
  const [todaysDays, setTodaysDays] = useState<Day[]>([]);
  const [todayDateString, setTodayDateString] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const filtered = getTodaysDays(days);
    const dateStr = getTodayDateString();
    setTodaysDays(filtered);
    setTodayDateString(dateStr);
    setFormattedDate(formatDate(dateStr));
    setMounted(true);
  }, [days]);

  if (!mounted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-pulse text-gray-500 dark:text-neutral-400">
          Loading today&apos;s celebrations...
        </div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: "Today's National Days",
            description: `Find out what's special about ${formattedDate}! Discover trending celebrations happening today with party ideas, deals & inspiration.`,
            url: 'https://www.thedayof.net/today/',
            mainEntity:
              todaysDays.length > 0
                ? {
                    '@type': 'ItemList',
                    name: "Today's Special Days",
                    description: `Special days and celebrations for ${formattedDate}`,
                    numberOfItems: todaysDays.length,
                    itemListElement: todaysDays.map((day, index) => ({
                      '@type': 'ListItem',
                      position: index + 1,
                      item: {
                        '@type': 'Event',
                        name: day.title,
                        description: day.description,
                        startDate: todayDateString,
                        endDate: todayDateString,
                        url: `https://www.thedayof.net/${getCategorySlug(day.category)}/${day.slug}/`,
                        eventStatus: 'https://schema.org/EventScheduled',
                        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
                        location: {
                          '@type': 'VirtualLocation',
                          url: `https://www.thedayof.net/${getCategorySlug(day.category)}/${day.slug}/`,
                        },
                        organizer: { '@type': 'Organization', name: 'TheDayOf', url: 'https://www.thedayof.net' },
                        performer: { '@type': 'Organization', name: 'Global Community' },
                        offers: {
                          '@type': 'Offer',
                          price: '0',
                          priceCurrency: 'USD',
                          availability: 'https://schema.org/InStock',
                          validFrom: todayDateString,
                          url: `https://www.thedayof.net/${getCategorySlug(day.category)}/${day.slug}/`,
                        },
                      },
                    })),
                  }
                : undefined,
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.thedayof.net' },
                { '@type': 'ListItem', position: 2, name: 'Today', item: 'https://www.thedayof.net/today' },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: `What national days are today, ${formattedDate}?`,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text:
                    todaysDays.length > 0
                      ? `Today, ${formattedDate}, we're celebrating ${todaysDays.map((d) => d.title).slice(0, 5).join(', ')}${todaysDays.length > 5 ? ` and ${todaysDays.length - 5} more celebrations` : ''}!`
                      : `Check our calendar daily to discover what national days and celebrations are happening on ${formattedDate}.`,
                },
              },
              {
                '@type': 'Question',
                name: "How can I find out what day it is today?",
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Visit TheDayOf.net/today to see all national days, food holidays, and special celebrations happening today. We update daily with new celebrations, party ideas, and celebration tips!",
                },
              },
              {
                '@type': 'Question',
                name: 'Are there multiple national days celebrated on the same date?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `Yes! Many dates throughout the year celebrate multiple national days, holidays, and observances simultaneously. Today alone has ${todaysDays.length} different celebrations!`,
                },
              },
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
        <div className="bg-white dark:bg-dark-800 border-b dark:border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">
                Home
              </Link>
              <span className="text-gray-400 dark:text-neutral-500">/</span>
              <span className="text-gray-900 dark:text-neutral-100 font-medium">Today</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-lg p-8 md:p-12 mb-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-8 w-8" />
              <span className="text-lg font-semibold">Live Now</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">What&apos;s Today?</h1>
            <p className="text-xl md:text-2xl mb-2">{formattedDate}</p>
            <p className="text-lg opacity-90">
              {todaysDays.length > 0
                ? `${todaysDays.length} special ${todaysDays.length === 1 ? 'celebration' : 'celebrations'} happening today!`
                : "Check back daily to discover what's being celebrated today!"}
            </p>
          </div>

          {todaysDays.length > 0 ? (
            <>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-100">Featured Today</h2>
                </div>

                {todaysDays.slice(0, 1).map((day) => {
                  const categorySlug = getCategorySlug(day.category);
                  const categoryColor = getCategoryColor(day.category);
                  const relatedDays = getRelatedDays(day, 3);

                  return (
                    <div
                      key={day.slug}
                      className="bg-white dark:bg-dark-800 rounded-xl shadow-lg dark:shadow-dark-soft overflow-hidden"
                    >
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white ${categoryColor}`}>
                            {day.category}
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-neutral-400">
                            <Calendar className="h-5 w-5 mr-2" />
                            <span className="font-medium">{formatDate(day.date)}</span>
                          </div>
                        </div>

                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
                          {day.title}
                        </h3>

                        <p className="text-xl text-gray-600 dark:text-neutral-300 mb-6 leading-relaxed">{day.description}</p>

                        {day.tags && day.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-6">
                            {day.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-neutral-300"
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {day.howToCelebrate && (
                          <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-6 mb-6">
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-3">
                              How to Celebrate Today
                            </h4>
                            <p className="text-gray-700 dark:text-neutral-300 leading-relaxed">{day.howToCelebrate}</p>
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Link href={`/${categorySlug}/${day.slug}/`} className="btn-primary text-center">
                            Learn More About {day.title}
                          </Link>
                          <div className="flex-1">
                            <SocialShare
                              title={day.title}
                              url={`https://www.thedayof.net/${categorySlug}/${day.slug}/`}
                              description={day.description}
                              variant="dropdown"
                            />
                          </div>
                        </div>

                        {relatedDays.length > 0 && (
                          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-dark-600">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-4">
                              Related Celebrations
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {relatedDays.map((relatedDay) => (
                                <Link
                                  key={relatedDay.slug}
                                  href={`/${getCategorySlug(relatedDay.category)}/${relatedDay.slug}/`}
                                  className="block p-4 rounded-lg bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                                >
                                  <h5 className="font-medium text-gray-900 dark:text-neutral-100 mb-2 line-clamp-2">
                                    {relatedDay.title}
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-neutral-300 line-clamp-2">
                                    {relatedDay.description}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {todaysDays.length > 1 && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-6">
                    All Today&apos;s Celebrations
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {todaysDays.map((day) => {
                      const categorySlug = getCategorySlug(day.category);
                      const categoryColor = getCategoryColor(day.category);

                      return (
                        <Link key={day.slug} href={`/${categorySlug}/${day.slug}/`} className="group block">
                          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg dark:shadow-dark-soft dark:hover:shadow-dark-medium transition-all duration-300 p-6 h-full">
                            <div className="flex items-center justify-between mb-4">
                              <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${categoryColor}`}>
                                {day.category}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              {day.title}
                            </h3>

                            <p className="text-gray-600 dark:text-neutral-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                              {day.description}
                            </p>

                            {day.tags && day.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {day.tags.slice(0, 3).map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-neutral-300 text-xs rounded-md"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white dark:bg-dark-800 rounded-xl shadow-md dark:shadow-dark-soft p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-400 dark:text-neutral-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
                No Celebrations Found for Today
              </h2>
              <p className="text-gray-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
                While there are no specific celebrations in our database for today, every day is special! Check back
                tomorrow or explore our full calendar.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/calendar/" className="btn-primary">
                  <Calendar className="inline h-5 w-5 mr-2" />
                  View Full Calendar
                </Link>
                <Link href="/categories/" className="btn-secondary">
                  Browse Categories
                </Link>
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/calendar/"
              className="block p-6 bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg dark:shadow-dark-soft dark:hover:shadow-dark-medium transition-all"
            >
              <Calendar className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">Full Calendar</h3>
              <p className="text-gray-600 dark:text-neutral-300 text-sm">
                Browse all upcoming celebrations and plan ahead
              </p>
            </Link>

            <Link
              href="/categories/"
              className="block p-6 bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg dark:shadow-dark-soft dark:hover:shadow-dark-medium transition-all"
            >
              <Tag className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">Browse by Category</h3>
              <p className="text-gray-600 dark:text-neutral-300 text-sm">
                Explore celebrations by food, animals, awareness &amp; more
              </p>
            </Link>

            <Link
              href="/search/"
              className="block p-6 bg-white dark:bg-dark-800 rounded-xl shadow-md hover:shadow-lg dark:shadow-dark-soft dark:hover:shadow-dark-medium transition-all"
            >
              <TrendingUp className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">Search Days</h3>
              <p className="text-gray-600 dark:text-neutral-300 text-sm">
                Find specific celebrations and holidays
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
