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
  return days.filter(day => day.category === category);
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

export function getDaysByMonth(month: number, year: number): Day[] {
  return days.filter(day => {
    const date = new Date(day.date);
    return date.getMonth() === month - 1 && date.getFullYear() === year;
  });
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
  const relatedSlugs = day.relatedDays || [];
  return relatedSlugs
    .map(slug => getDayBySlug(slug))
    .filter(Boolean)
    .slice(0, limit) as Day[];
}

export function searchDays(query: string): Day[] {
  const lowercaseQuery = query.toLowerCase();
  return days.filter(day => 
    day.title.toLowerCase().includes(lowercaseQuery) ||
    day.description.toLowerCase().includes(lowercaseQuery) ||
    day.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
