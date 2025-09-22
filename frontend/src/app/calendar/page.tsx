'use client';

import { useState, useEffect } from 'react';
import { getDaysByMonth } from '@/lib/data';
import { getMonthName, getCategorySlug, getCategoryColor, formatDate } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

export default function CalendarPage() {
  const [currentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [monthDays, setMonthDays] = useState(getDaysByMonth(selectedMonth, selectedYear));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const days = getDaysByMonth(selectedMonth, selectedYear);
    setMonthDays(days);
  }, [selectedMonth, selectedYear]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (selectedMonth === 1) {
        setSelectedMonth(12);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 12) {
        setSelectedMonth(1);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      calendarDays.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }
    
    return calendarDays;
  };

  const getDaysForDate = (day: number) => {
    return monthDays.filter(dayData => {
      const dayDate = new Date(dayData.date);
      return dayDate.getDate() === day && 
             dayDate.getMonth() === selectedMonth - 1 && 
             dayDate.getFullYear() === selectedYear;
    });
  };

  const handleShowMoreEvents = (day: number) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const calendarDays = getDaysInMonth(selectedMonth, selectedYear);
  const monthName = getMonthName(new Date(selectedYear, selectedMonth - 1, 1).toISOString());

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 dark:from-primary-700 dark:via-primary-800 dark:to-secondary-700 text-white">
        <div className="container-custom py-16">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <CalendarIcon className="h-4 w-4" />
              <span className="text-sm font-semibold">Interactive Calendar</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Calendar View
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Browse special days and celebrations by month. Never miss an important date again.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* Quick Month Navigation */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Browse by Month</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'].map((month, index) => (
              <Link
                key={month}
                href={`/month/${month}`}
                className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-center transition-colors group"
              >
                <div className="font-medium text-neutral-900 dark:text-neutral-100 capitalize group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  {month}
                </div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {getDaysByMonth(index + 1, selectedYear).length} days
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="card p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {monthName} {selectedYear}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300">
                {monthDays.length} special days this month
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-3 hover:bg-neutral-100 dark:hover:bg-dark-700 rounded-xl hover:scale-105"
                aria-label="Go to previous month"
              >
                <ChevronLeft className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              </button>
              <button
                onClick={() => {
                  setSelectedMonth(currentDate.getMonth() + 1);
                  setSelectedYear(currentDate.getFullYear());
                }}
                className="btn-primary px-6 py-3"
              >
                Today
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="p-3 hover:bg-neutral-100 dark:hover:bg-dark-700 rounded-xl hover:scale-105"
                aria-label="Go to next month"
              >
                <ChevronRight className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-4 text-center text-sm font-bold text-neutral-600 dark:text-neutral-300 bg-neutral-50 dark:bg-dark-800 rounded-lg">
                {day}
              </div>
            ))}
            
            {/* Calendar Days */}
            {calendarDays.map((day, index) => {
              const dayEvents = day ? getDaysForDate(day) : [];
              const isToday = day === currentDate.getDate() && 
                             selectedMonth === currentDate.getMonth() + 1 && 
                             selectedYear === currentDate.getFullYear();
              
              
              return (
                <div
                  key={index}
                  className={`min-h-[120px] p-3 rounded-xl border ${
                    day ? 'bg-white dark:bg-dark-800 hover:bg-neutral-50 dark:hover:bg-dark-700 border-neutral-200 dark:border-dark-600 hover:border-primary-200 dark:hover:border-primary-700 hover:shadow-soft dark:hover:shadow-dark-soft' : 'bg-neutral-50 dark:bg-dark-800 border-neutral-100 dark:border-dark-700'
                  } ${isToday ? 'ring-2 ring-primary-500 dark:ring-primary-400 bg-primary-50 dark:bg-primary-900/20' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-lg font-bold mb-2 ${isToday ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-900 dark:text-neutral-100'}`}>
                        {day}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => {
                          const colorClass = getCategoryColor(event.category);
                          return (
                            <Link
                              key={event.slug}
                              href={`/${getCategorySlug(event.category)}/${event.slug}`}
                              className={`block text-xs p-2 rounded-lg truncate text-white font-medium ${colorClass} hover:opacity-80 transition-opacity cursor-pointer`}
                              title={event.title}
                              style={{ 
                                backgroundColor: event.category === 'Food' ? '#f97316' : 
                                               event.category === 'Awareness' ? '#ec4899' : 
                                               event.category === 'Animals' ? '#22c55e' : '#6b7280'
                              }}
                            >
                              {event.title}
                            </Link>
                          );
                        })}
                        {dayEvents.length > 2 && (
                          <button
                            onClick={() => handleShowMoreEvents(day)}
                            className="w-full text-xs text-neutral-500 dark:text-neutral-400 font-medium bg-neutral-100 dark:bg-dark-700 px-2 py-1 rounded-lg text-center hover:bg-neutral-200 dark:hover:bg-dark-600 cursor-pointer transition-colors"
                          >
                            +{dayEvents.length - 2} more
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Month Summary */}
        <div className="card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {monthName} {selectedYear} Summary
            </h3>
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300">
              <Clock className="h-4 w-4" />
              <span>{monthDays.length} special days</span>
            </div>
          </div>
          
          {monthDays.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {monthDays.map((day) => (
                <Link
                  key={day.slug}
                  href={`/${getCategorySlug(day.category)}/${day.slug}`}
                  className="group block p-6 border border-neutral-200 dark:border-dark-600 rounded-xl hover:shadow-medium dark:hover:shadow-dark-medium hover:-translate-y-1 hover:border-primary-200 dark:hover:border-primary-700 bg-white dark:bg-dark-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getCategoryColor(day.category)}`}>
                      {day.category}
                    </span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium">
                      {formatDate(day.date)}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                    {day.title}
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed mb-4">
                    {day.description}
                  </p>
                  <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300">
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-neutral-100 dark:bg-dark-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CalendarIcon className="h-10 w-10 text-neutral-400 dark:text-neutral-500" />
              </div>
              <h4 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                No special days this month
              </h4>
              <p className="text-neutral-600 dark:text-neutral-300 mb-8 max-w-md mx-auto">
                Try browsing a different month or check out our categories to discover amazing celebrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigateMonth('next')}
                  className="btn-primary px-6 py-3"
                >
                  Next Month
                </button>
                <Link href="/categories" className="btn-secondary px-6 py-3">
                  Browse Categories
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Events Modal */}
      {isModalOpen && selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-dark-700">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Events for {selectedDay} {monthName} {selectedYear}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-neutral-500 dark:text-neutral-400" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {getDaysForDate(selectedDay).length > 0 ? (
                <div className="space-y-4">
                  {getDaysForDate(selectedDay).map((event) => (
                    <Link
                      key={event.slug}
                      href={`/${getCategorySlug(event.category)}/${event.slug}`}
                      className="block p-4 border border-neutral-200 dark:border-dark-600 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-md dark:hover:shadow-dark-soft transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                        <span className="text-sm text-neutral-500 dark:text-neutral-400">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-2">
                        {event.description}
                      </p>
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {event.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-neutral-100 dark:bg-dark-700 text-neutral-600 dark:text-neutral-300 text-xs rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-12 w-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
                  <p className="text-neutral-600 dark:text-neutral-300">No events found for this day.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
