import { Day, Category } from '@/types';
import { generateNextOccurrences, isRecurringEvent, generateAutoFAQs, generateDefaultHistory, generateDefaultWhyItMatters } from './utils';

// Import individual category files
import foodData from '../data/categories/food.json';
import awarenessData from '../data/categories/awareness.json';
import animalsData from '../data/categories/animals.json';
import funData from '../data/categories/fun.json';
import holidayData from '../data/categories/holiday.json';
import shoppingData from '../data/categories/shopping.json';
import nationalData from '../data/categories/national.json';
import internationalData from '../data/categories/international.json';

// Helper function to enhance each day with additional SEO content
function enhanceDay(day: Day): Day {
  const enhanced: Day = { ...day };
  
  // Add nextOccurrences if missing
  if (isRecurringEvent(day) && !day.nextOccurrences) {
    enhanced.nextOccurrences = generateNextOccurrences(day.date, 5);
  }
  
  // Add auto-generated FAQs if missing
  if (!enhanced.faqs || enhanced.faqs.length === 0) {
    enhanced.faqs = generateAutoFAQs(enhanced);
  }
  
  // Add default history if missing
  if (!enhanced.history) {
    enhanced.history = generateDefaultHistory(enhanced);
  }
  
  // Add default "why it matters" if missing
  if (!enhanced.whyItMatters) {
    enhanced.whyItMatters = generateDefaultWhyItMatters(enhanced);
  }
  
  return enhanced;
}

// Combine all category data into a single array and add nextOccurrences
const rawDays: Day[] = [
  ...foodData as Day[],
  ...awarenessData as Day[],
  ...animalsData as Day[],
  ...funData as Day[],
  ...holidayData as Day[],
  ...shoppingData as Day[],
  ...nationalData as Day[],
  ...internationalData as Day[]
];

export const days: Day[] = rawDays.map(enhanceDay);

export const categories: Category[] = [
  {
    name: 'Food',
    slug: 'food',
    description: 'Delicious celebrations and culinary delights',
    color: 'bg-orange-500',
    icon: '🍽️'
  },
  {
    name: 'Awareness',
    slug: 'awareness-health',
    description: 'Health awareness and important causes',
    color: 'bg-pink-500',
    icon: '❤️'
  },
  {
    name: 'Animals',
    slug: 'animals-pets',
    description: 'Celebrating our furry, feathered, and scaly friends',
    color: 'bg-green-500',
    icon: '🐾'
  },
  {
    name: 'Fun',
    slug: 'fun-weird',
    description: 'Quirky, fun, and weird celebrations',
    color: 'bg-purple-500',
    icon: '🎉'
  },
  {
    name: 'Holiday',
    slug: 'holiday',
    description: 'Traditional holidays and special occasions',
    color: 'bg-red-500',
    icon: '🎊'
  },
  {
    name: 'Shopping',
    slug: 'shopping-deals',
    description: 'Shopping events and special deals',
    color: 'bg-blue-500',
    icon: '🛍️'
  },
  {
    name: 'National',
    slug: 'national',
    description: 'National observances and celebrations',
    color: 'bg-indigo-500',
    icon: '🇺🇸'
  },
  {
    name: 'International',
    slug: 'international',
    description: 'Global celebrations and world events',
    color: 'bg-teal-500',
    icon: '🌍'
  }
];

export function getDaysByCategory(category: string): Day[] {
  // Map category names to handle both short and long formats
  const categoryMap: Record<string, string[]> = {
    'Food': ['Food'],
    'Awareness': ['Awareness', 'Awareness & Health'],
    'Animals': ['Animals', 'Animals & Pets'],
    'Fun': ['Fun', 'Fun & Weird'],
    'Holiday': ['Holiday'],
    'Shopping': ['Shopping', 'Shopping & Deals'],
    'National': ['National'],
    'International': ['International']
  };
  
  // Get all possible category name variations for this category
  const possibleNames = categoryMap[category] || [category];
  
  return days.filter(day => possibleNames.includes(day.category));
}

// Helper functions to get days from specific categories directly
export function getFoodDays(): Day[] {
  return foodData as Day[];
}

export function getAwarenessDays(): Day[] {
  return awarenessData as Day[];
}

export function getAnimalsDays(): Day[] {
  return animalsData as Day[];
}

export function getFunDays(): Day[] {
  return funData as Day[];
}

export function getHolidayDays(): Day[] {
  return holidayData as Day[];
}

export function getShoppingDays(): Day[] {
  return shoppingData as Day[];
}

export function getNationalDays(): Day[] {
  return nationalData as Day[];
}

export function getInternationalDays(): Day[] {
  return internationalData as Day[];
}

/**
 * Get the year that has the most data for a given month.
 * Useful for determining what year to display when the requested year has no data.
 * 
 * @param month - Month number (1-12)
 * @param preferredYear - Optional preferred year to use if it has data
 * @returns The year with the most data, or preferredYear if it has data
 */
export function getYearWithDataForMonth(month: number, preferredYear?: number): number {
  const yearCounts = new Map<number, number>();
  days.forEach(day => {
    const date = new Date(day.date);
    if (date.getMonth() === month - 1) {
      const dayYear = date.getFullYear();
      yearCounts.set(dayYear, (yearCounts.get(dayYear) || 0) + 1);
    }
  });

  if (yearCounts.size === 0) {
    return preferredYear || new Date().getFullYear();
  }

  // If preferred year has data, use it
  if (preferredYear && yearCounts.has(preferredYear)) {
    return preferredYear;
  }

  // Otherwise, find the year with the most data
  let bestYear = preferredYear || new Date().getFullYear();
  let maxCount = 0;
  yearCounts.forEach((count, y) => {
    if (count > maxCount) {
      maxCount = count;
      bestYear = y;
    }
  });

  return bestYear;
}

/**
 * Generate a day entry for a specific year based on a base day entry.
 * This creates a recurring event for the requested year.
 */
function generateDayForYear(baseDay: Day, targetYear: number): Day {
  // Parse the base date string (YYYY-MM-DD) to avoid timezone issues
  const [baseYear, baseMonth, baseDayNum] = baseDay.date.split('-').map(Number);
  
  // Create the target date string directly in YYYY-MM-DD format
  // This avoids timezone conversion issues
  const targetDateString = `${targetYear}-${String(baseMonth).padStart(2, '0')}-${String(baseDayNum).padStart(2, '0')}`;
  
  // Create a new day entry with the target year's date
  const generatedDay: Day = {
    ...baseDay,
    date: targetDateString,
  };
  
  // Update nextOccurrences to reflect the new year
  if (isRecurringEvent(baseDay)) {
    generatedDay.nextOccurrences = generateNextOccurrences(generatedDay.date, 5);
  }
  
  return generatedDay;
}

/**
 * Get days for a specific month and year.
 * 
 * Strategy:
 * 1. First, try to get data that exists for the requested year
 * 2. If no data exists for the requested year, generate recurring events from base data
 * 3. For years before the base data, fall back to the year with the most data
 * 
 * This ensures:
 * - 2026 and future years show generated recurring events
 * - Years before base data (like 2024) fall back to available data
 * - The calendar always shows content
 */
export function getDaysByMonth(month: number, year: number): Day[] {
  // First, try to get data that exists for the requested year
  const daysForRequestedYear = days.filter(day => {
    const date = new Date(day.date);
    return date.getMonth() === month - 1 && date.getFullYear() === year;
  });

  // If we have data for the requested year, return it
  if (daysForRequestedYear.length > 0) {
    return daysForRequestedYear;
  }

  // Find the base year that has data for this month (for generating recurring events)
  // We don't pass preferredYear here because we want the actual base year with data
  const baseYear = getYearWithDataForMonth(month);
  
  // Get all days from the base year for this month
  const baseDays = days.filter(day => {
    const date = new Date(day.date);
    return date.getMonth() === month - 1 && date.getFullYear() === baseYear;
  });

  if (baseDays.length === 0) {
    return []; // No data exists for this month at all
  }

  // If the requested year is after the base year, generate recurring events for that year
  if (year > baseYear) {
    return baseDays.map(baseDay => {
      // Generate all events for the requested year (treat all as recurring for future years)
      // This ensures 2026 and beyond show events with correct dates
      return generateDayForYear(baseDay, year);
    });
  }

  // For years before or equal to the base year, return the base year's data as fallback
  // This handles cases where someone views 2024 or earlier, or if baseYear === year
  // (though year === baseYear should have been caught in the first check)
  return baseDays;
}

export function getUpcomingDays(limit: number = 10): Day[] {
  const today = new Date();
  return days
    .filter(day => new Date(day.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export function getDayBySlug(slug: string): Day | undefined {
  return days.find(day => day.slug === slug);
}

export function getRelatedDays(day: Day, limit: number = 5): Day[] {
  // First, get explicitly related days
  const relatedSlugs = day.relatedDays || [];
  const explicitRelated = relatedSlugs
    .map(slug => getDayBySlug(slug))
    .filter(Boolean) as Day[];
  
  // If we don't have enough explicit related days, find similar ones
  if (explicitRelated.length < limit) {
    const dayDate = new Date(day.date);
    const dayMonth = dayDate.getMonth();
    const dayYear = dayDate.getFullYear();
    
    const similarDays = days
      .filter((d: Day) => d.slug !== day.slug) // Exclude current day
      .filter((d: Day) => !explicitRelated.some(er => er.slug === d.slug)) // Exclude already related
      .map((d: Day) => {
        // Score days based on similarity
        const dDate = new Date(d.date);
        const dMonth = dDate.getMonth();
        const dYear = dDate.getFullYear();
        
        let score = 0;
        
        // Same category gets high score
        if (d.category === day.category) score += 10;
        
        // Same month gets medium score
        if (dMonth === dayMonth && dYear === dayYear) score += 5;
        
        // Common tags get score based on count
        const commonTags = day.tags.filter(tag => d.tags.includes(tag));
        score += commonTags.length * 2;
        
        return { day: d, score };
      })
      .filter((item: { day: Day; score: number }) => item.score > 0) // Only include days with some similarity
      .sort((a: { day: Day; score: number }, b: { day: Day; score: number }) => b.score - a.score) // Sort by score descending
      .map((item: { day: Day; score: number }) => item.day)
      .slice(0, limit - explicitRelated.length);
    
    return [...explicitRelated, ...similarDays];
  }
  
  return explicitRelated.slice(0, limit);
}

export function searchDays(query: string): Day[] {
  const lowercaseQuery = query.toLowerCase();
  return days.filter(day => 
    day.title.toLowerCase().includes(lowercaseQuery) ||
    day.description.toLowerCase().includes(lowercaseQuery) ||
    day.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
