'use client';

import { useState, useEffect } from 'react';
import { getCategorySlug } from '@/lib/utils';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import type { Day } from '@/types';

/**
 * Filters days that match today's date (month + day) in the user's local timezone.
 * Runs client-side to avoid static export build-time date freezing.
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

interface HomepageTodaySectionProps {
  days: Day[];
}

export default function HomepageTodaySection({ days }: HomepageTodaySectionProps) {
  const [todaysDays, setTodaysDays] = useState<Day[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTodaysDays(getTodaysDays(days));
    setMounted(true);
  }, [days]);

  if (!mounted || todaysDays.length === 0) {
    return null;
  }

  return (
    <section className="bg-gradient-to-br from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 py-12 md:py-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-5 w-5" />
            <span className="font-semibold">Happening Today</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Today is {todaysDays[0].title}!
          </h2>

          <p className="text-lg md:text-xl mb-8 opacity-95">
            {todaysDays[0].description}
          </p>

          {todaysDays.length > 1 && (
            <p className="text-base mb-8 opacity-90">
              Plus {todaysDays.length - 1} more {todaysDays.length === 2 ? 'celebration' : 'celebrations'} today
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/today/"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Clock className="h-5 w-5" />
              See All Today&apos;s Celebrations
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href={`/${getCategorySlug(todaysDays[0].category)}/${todaysDays[0].slug}/`}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Learn More About {todaysDays[0].title}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
