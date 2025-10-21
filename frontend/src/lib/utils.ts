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
    'Awareness & Health': 'awareness-health',
    'Animals': 'animals-pets',
    'Animals & Pets': 'animals-pets',
    'Fun': 'fun-weird',
    'Fun & Weird': 'fun-weird',
    'Holiday': 'holiday',
    'Shopping': 'shopping-deals',
    'Shopping & Deals': 'shopping-deals',
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
  return colorMap[category] || 'bg-gray-600';
}

export function getCategoryColorStyle(category: string): Record<string, string> {
  const colorMap: Record<string, Record<string, string>> = {
    'Food': { backgroundColor: '#f97316' }, // orange-500
    'Awareness': { backgroundColor: '#ec4899' }, // pink-500
    'Animals': { backgroundColor: '#22c55e' }, // green-500
    'Fun': { backgroundColor: '#a855f7' }, // purple-500
    'Holiday': { backgroundColor: '#ef4444' }, // red-500
    'Shopping': { backgroundColor: '#3b82f6' }, // blue-500
    'National': { backgroundColor: '#6366f1' }, // indigo-500
    'International': { backgroundColor: '#14b8a6' } // teal-500
  };
  return colorMap[category] || { backgroundColor: '#4b5563' }; // gray-600
}

export function generateNextOccurrences(dateString: string, years: number = 5): string[] {
  const baseDate = new Date(dateString);
  const month = baseDate.getMonth();
  const day = baseDate.getDate();
  const currentYear = new Date().getFullYear();
  
  const occurrences: string[] = [];
  
  for (let i = 0; i < years; i++) {
    const year = currentYear + i;
    const nextDate = new Date(year, month, day);
    
    // Format as YYYY-MM-DD
    const formattedDate = nextDate.toISOString().split('T')[0];
    occurrences.push(formattedDate);
  }
  
  return occurrences;
}

export function isRecurringEvent(day: { title: string; category: string; date: string }): boolean {
  // Most national/international days and holidays are recurring annually
  const recurringCategories = ['National', 'International', 'Holiday', 'Food', 'Awareness', 'Animals', 'Fun', 'Shopping'];
  return recurringCategories.includes(day.category);
}

export function generateAutoFAQs(day: { title: string; date: string; category: string; howToCelebrate?: string; nextOccurrences?: string[] }): Array<{ question: string; answer: string }> {
  const faqs = [];
  const currentYear = new Date().getFullYear();
  const eventDate = new Date(day.date);
  const month = eventDate.toLocaleDateString('en-US', { month: 'long' });
  const dayNum = eventDate.getDate();
  
  // When is the event this year?
  faqs.push({
    question: `When is ${day.title} ${currentYear}?`,
    answer: `${day.title} ${currentYear} is on ${month} ${dayNum}, ${currentYear}.`
  });
  
  // When is the event next year?
  if (day.nextOccurrences && day.nextOccurrences.length > 1) {
    const nextYear = new Date(day.nextOccurrences[1]);
    faqs.push({
      question: `When is ${day.title} ${nextYear.getFullYear()}?`,
      answer: `${day.title} ${nextYear.getFullYear()} will be on ${nextYear.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.`
    });
  }
  
  // Is it always on the same date?
  if (isRecurringEvent(day)) {
    faqs.push({
      question: `Is ${day.title} always on ${month} ${dayNum}?`,
      answer: `Yes, ${day.title} is celebrated annually on ${month} ${dayNum} each year.`
    });
  }
  
  // How to celebrate
  if (day.howToCelebrate) {
    faqs.push({
      question: `How do people celebrate ${day.title}?`,
      answer: day.howToCelebrate
    });
  }
  
  // What is the purpose/significance
  faqs.push({
    question: `What is the purpose of ${day.title}?`,
    answer: `${day.title} is observed to celebrate and raise awareness about this important topic. It provides an opportunity for people to come together, learn, and participate in meaningful activities related to the theme of the day.`
  });
  
  return faqs;
}

export function generateDefaultHistory(day: { title: string; category: string }): string {
  const categoryDescriptions: Record<string, string> = {
    'National': 'Many national observances in the United States were established through proclamations, grassroots movements, or legislative actions to bring attention to important causes and celebrations.',
    'International': 'International observances are often established by the United Nations, international organizations, or through global movements to address worldwide issues and celebrations.',
    'Holiday': 'Traditional holidays often have deep historical roots, stemming from religious traditions, cultural practices, or significant historical events.',
    'Food': 'Food-related celebrations often emerge from cultural traditions, marketing campaigns by food industries, or grassroots movements by food enthusiasts.',
    'Awareness': 'Awareness days are typically established by health organizations, advocacy groups, or government agencies to educate the public about important health and social issues.',
    'Animals': 'Animal-focused observances are usually created by animal welfare organizations, conservation groups, or pet industry associations to promote animal welfare and appreciation.',
    'Fun': 'Fun and quirky observances often start as lighthearted social media movements, marketing campaigns, or creative initiatives to bring joy and entertainment.',
    'Shopping': 'Shopping-related observances are typically created by retail industries, marketing associations, or consumer advocacy groups to promote commerce and consumer awareness.'
  };
  
  return categoryDescriptions[day.category] || `${day.title} was established to bring attention to this important topic and provide a dedicated time for celebration and awareness.`;
}

export function generateDefaultWhyItMatters(day: { title: string; category: string }): string {
  const categoryImportance: Record<string, string> = {
    'National': 'National observances help unite communities around shared values and important causes, fostering national identity and civic engagement.',
    'International': 'International observances promote global awareness, cooperation, and understanding of issues that affect people worldwide.',
    'Holiday': 'Traditional holidays preserve cultural heritage, strengthen family bonds, and provide important opportunities for rest, reflection, and celebration.',
    'Food': 'Food celebrations promote culinary diversity, support local agriculture, and bring people together through shared dining experiences.',
    'Awareness': 'Awareness days play a crucial role in public health education, early detection of conditions, and reducing stigma around important health topics.',
    'Animals': 'Animal observances promote compassion, conservation efforts, and responsible pet ownership while highlighting the important role animals play in our lives.',
    'Fun': 'Fun observances provide stress relief, encourage creativity, and remind us of the importance of joy and playfulness in our daily lives.',
    'Shopping': 'Shopping observances can promote economic activity, consumer awareness, and support for local businesses and artisans.'
  };
  
  return categoryImportance[day.category] || `This observance matters because it brings attention to important topics and provides opportunities for community engagement and learning.`;
}
