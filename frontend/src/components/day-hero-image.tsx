'use client';

import { useState } from 'react';
import Image from 'next/image';

interface DayHeroImageProps {
  src: string;
  alt: string;
  categorySlug: string;
}

export default function DayHeroImage({ src, alt, categorySlug }: DayHeroImageProps) {
  const [imageError, setImageError] = useState(false);

  // Don't render if image fails to load
  if (imageError) {
    return null;
  }

  const imageSrc = src.startsWith('/') ? src : `/images/${categorySlug}/${src}`;

  return (
    <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft overflow-hidden mb-8">
      <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
        <Image
          src={imageSrc}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
          priority={true}
          quality={90}
          onError={() => {
            setImageError(true);
          }}
        />
      </div>
    </div>
  );
}

