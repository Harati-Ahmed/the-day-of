import { notFound, redirect } from 'next/navigation';
import { days } from '@/lib/data';
import { getCategorySlug } from '@/lib/utils';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function OtherRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Find the day by slug
  const day = days.find(d => d.slug === slug);
  
  if (day) {
    // Get the correct category slug
    const correctCategorySlug = getCategorySlug(day.category);
    const correctUrl = `/${correctCategorySlug}/${slug}/`;
    
    // Permanent redirect (301)
    redirect(correctUrl);
  }
  
  // If slug not found, return 404
  notFound();
}

// Generate static params for all days to enable static generation
export async function generateStaticParams() {
  return days.map((day) => ({
    slug: day.slug,
  }));
}

