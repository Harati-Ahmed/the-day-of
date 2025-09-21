import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function getMonthName(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long' });
}

export function getYear(dateString: string): number {
  const date = new Date(dateString);
  return date.getFullYear();
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getCategorySlug(category: string): string {
  const categoryMap: Record<string, string> = {
    'Food': 'food',
    'Awareness': 'awareness-health',
    'Animals': 'animals-pets',
    'Fun': 'fun-weird',
    'Holiday': 'holiday',
    'Shopping': 'shopping-deals',
    'National': 'national',
    'International': 'international'
  };
  return categoryMap[category] || 'other';
}

export function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'Food': 'bg-orange-500',
    'Awareness': 'bg-pink-500',
    'Animals': 'bg-green-500',
    'Fun': 'bg-purple-500',
    'Holiday': 'bg-red-500',
    'Shopping': 'bg-blue-500',
    'National': 'bg-indigo-500',
    'International': 'bg-teal-500'
  };
  return colorMap[category] || 'bg-gray-500';
}
