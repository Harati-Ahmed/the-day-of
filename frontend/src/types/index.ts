export interface Day {
  title: string;
  slug: string;
  date: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  relatedDays: string[];
  howToCelebrate?: string;
  funFacts?: string[];
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
}

export interface MonthData {
  month: string;
  year: number;
  days: Day[];
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url: string;
  type: 'website' | 'article';
}
