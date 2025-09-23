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
