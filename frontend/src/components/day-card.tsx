'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Day } from '@/types';
import { formatDate, getCategorySlug, getCategoryColor } from '@/lib/utils';
import { Calendar, Tag, Sparkles } from 'lucide-react';

interface DayCardProps {
  day: Day;
  showCategory?: boolean;
}

export default function DayCard({ day, showCategory = true }: DayCardProps) {
  const categorySlug = getCategorySlug(day.category);
  const categoryColor = getCategoryColor(day.category);

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-soft dark:shadow-dark-soft border border-neutral-100 dark:border-dark-700 hover:shadow-medium dark:hover:shadow-dark-medium group overflow-hidden transition-all duration-300">
      {/* Image or Icon */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
        {day.image ? (
          <>
            <Image
              src={day.image}
              alt={day.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              priority={false} // Lazy load images below the fold
              quality={85} // Optimize quality for mobile
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              onError={(e) => {
                // Fallback to SVG if image fails
                const target = e.target as HTMLImageElement;
                if (!target.src.endsWith('.svg')) {
                  target.src = day.image.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '.svg');
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Sparkles className="h-16 w-16 text-primary-400 dark:text-primary-500" />
          </div>
        )}
      </div>
      
      <div className="p-8">
        {/* Category Badge and Date */}
        <div className="flex items-center justify-between mb-6">
          {showCategory && (
            <Link
              href={`/category/${categorySlug}/`}
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white shadow-soft ${categoryColor} hover:shadow-medium transition-all duration-300`}
            >
              {day.category}
            </Link>
          )}
          <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 font-medium">
            <Calendar className="h-4 w-4 mr-2" />
            {formatDate(day.date)}
          </div>
        </div>

        {/* Title */}
        <Link href={`/${categorySlug}/${day.slug}/`}>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-4 line-clamp-2 leading-tight">
            {day.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-base mb-6 line-clamp-3 leading-relaxed">
          {day.description}
        </p>

        {/* Tags */}
        {day.tags && day.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {day.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-dark-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-dark-600 transition-colors"
              >
                <Tag className="h-3 w-3 mr-1.5" />
                {tag}
              </span>
            ))}
            {day.tags.length > 3 && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium px-3 py-1.5">
                +{day.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read More Link */}
        <Link
          href={`/${categorySlug}/${day.slug}/`}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-semibold transition-colors group/link"
        >
          Discover More
          <svg className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
