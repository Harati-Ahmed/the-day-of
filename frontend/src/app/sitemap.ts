import { MetadataRoute } from 'next';
import { days, categories } from '@/lib/data';
import { getCategorySlug } from '@/lib/utils';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.thedayof.net';
  const currentYear = new Date().getFullYear();
  
  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/today/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calendar/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Month pages
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  const monthPages = months.map((month) => ({
    url: `${baseUrl}/month/${month}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Day pages with better lastModified dates and prioritization
  const now = new Date();
  const dayPages = days.map((day) => {
    const dayDate = new Date(day.date);
    const dayOfYear = Math.floor((dayDate.getTime() - new Date(dayDate.getFullYear(), 0, 0).getTime()) / 86400000);
    const currentDayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    
    // Calculate days until/since event
    const daysUntilEvent = dayOfYear - currentDayOfYear;
    
    // Determine priority and update frequency based on proximity
    let priority = 0.5;
    let changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'yearly';
    
    if (Math.abs(daysUntilEvent) <= 7) {
      // Within a week of the event
      priority = 0.9;
      changeFrequency = 'daily';
    } else if (Math.abs(daysUntilEvent) <= 30) {
      // Within a month
      priority = 0.8;
      changeFrequency = 'weekly';
    } else if (daysUntilEvent > 0 && daysUntilEvent <= 90) {
      // Upcoming within 3 months
      priority = 0.7;
      changeFrequency = 'weekly';
    } else if (daysUntilEvent > 0) {
      // Future events
      priority = 0.6;
      changeFrequency = 'monthly';
    }
    
    return {
      url: `${baseUrl}/${getCategorySlug(day.category)}/${day.slug}/`,
      lastModified: Math.abs(daysUntilEvent) <= 30 ? now : dayDate,
      changeFrequency,
      priority,
    };
  });

  // Year-specific pages for better organization
  const yearPages = [
    {
      url: `${baseUrl}/year/${currentYear}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/year/${currentYear + 1}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  return [...staticPages, ...categoryPages, ...monthPages, ...dayPages, ...yearPages];
}
