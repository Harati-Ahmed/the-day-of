/**
 * Open Graph Image Utilities
 * Provides fallback logic for OG images to ensure every page has a valid image
 */

export interface OGImageOptions {
  title?: string;
  category?: string;
  slug?: string;
  dayImage?: string | null;
}

/**
 * Get the best Open Graph image for a page
 * Priority: Day-specific image > Category fallback > Generic fallback
 */
export function getOGImage(options: OGImageOptions): string {
  const { dayImage, category } = options;
  
  // Priority 1: Use day-specific image if available
  if (dayImage) {
    const imageUrl = dayImage.startsWith('/') 
      ? `https://www.thedayof.net${dayImage}` 
      : `https://www.thedayof.net/images/${dayImage}`;
    return imageUrl;
  }
  
  // Priority 2: Try category-specific fallback
  if (category) {
    const categorySlug = category.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-');
    return `https://www.thedayof.net/images/og-${categorySlug}.jpg`;
  }
  
  // Priority 3: Use generic fallback
  return 'https://www.thedayof.net/images/og-default.jpg';
}

/**
 * Get category-specific OG image
 */
export function getCategoryOGImage(categorySlug: string): string {
  return `https://www.thedayof.net/images/og-category-${categorySlug}.jpg`;
}

/**
 * Get month-specific OG image
 */
export function getMonthOGImage(monthSlug: string): string {
  return `https://www.thedayof.net/images/og-month-${monthSlug}.jpg`;
}

/**
 * Get default/fallback OG image
 */
export function getDefaultOGImage(): string {
  return 'https://www.thedayof.net/images/og-default.jpg';
}

/**
 * Standard OG image dimensions (Facebook/Twitter/LinkedIn recommended)
 */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

/**
 * Generate OG image metadata object
 */
export function createOGImageMetadata(imageUrl: string, alt: string) {
  return {
    url: imageUrl,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    alt: alt,
    type: 'image/jpeg',
  };
}

