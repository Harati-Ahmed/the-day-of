import Link from 'next/link';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  dayCount?: number;
}

export default function CategoryCard({ category, dayCount }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-soft hover:shadow-medium dark:shadow-dark-soft dark:hover:shadow-dark-medium border border-neutral-100 dark:border-dark-700 hover:-translate-y-1 hover:border-primary-200 dark:hover:border-primary-700 group p-8 h-full">
        <div className="flex items-center justify-between mb-6">
          <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center text-3xl shadow-soft dark:shadow-dark-soft group-hover:scale-110 transition-transform duration-300`}>
            {category.icon}
          </div>
          {dayCount !== undefined && (
            <span className="text-sm text-neutral-500 dark:text-neutral-400 font-semibold bg-neutral-100 dark:bg-dark-700 px-3 py-1.5 rounded-full">
              {dayCount} days
            </span>
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-4">
          {category.name}
        </h3>
        
        <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed mb-6">
          {category.description}
        </p>
        
        <div className="flex items-center text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors group/link">
          Explore {category.name}
          <svg className="ml-2 h-4 w-4 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
