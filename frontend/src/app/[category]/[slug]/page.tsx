import { notFound } from 'next/navigation';
import { getDayBySlug, getRelatedDays, getDaysByMonth, days } from '@/lib/data';
import { formatDate, getCategoryColor, getCategorySlug } from '@/lib/utils';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';
import SocialShare from '@/components/social-share';
import DayHeroImage from '@/components/day-hero-image';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return days.map((day) => ({
    category: getCategorySlug(day.category),
    slug: day.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const day = getDayBySlug(slug);
  
  if (!day) {
    return {
      title: 'Day Not Found - TheDayOf',
    };
  }

  const year = new Date(day.date).getFullYear();
  const formattedDate = formatDate(day.date);
  const dateObj = new Date(day.date);
  const monthShort = dateObj.toLocaleDateString('en-US', { month: 'short' });
  const dayNum = dateObj.getDate();
  const shortDate = `${monthShort} ${dayNum}`;
  
  // Get category emoji
  const categoryEmojis: Record<string, string> = {
    'Food': '🍕',
    'Holiday': '🎊',
    'Animals & Pets': '🐾',
    'Awareness & Health': '💚',
    'International': '🌍',
    'Fun & Weird': '🎉',
    'Shopping & Deals': '🛍️',
    'National': '🇺🇸',
  };
  const emoji = categoryEmojis[day.category] || '🎉';
  
  return {
    title: `${day.title} ${year} (${shortDate}) ${emoji} - Deals, Ideas & Facts`,
    description: `Celebrating ${day.title} on ${formattedDate}! 🎉 Find out WHY this day matters, get creative celebration ideas, trending hashtags & exclusive deals. Join thousands celebrating right now!`,
    keywords: day.tags.join(', '),
    other: {
      'article:modified_time': new Date().toISOString(),
      'article:published_time': day.date,
    },
    alternates: {
      canonical: `https://www.thedayof.net/${category}/${slug}/`,
    },
    openGraph: {
      title: `${day.title} ${year} (${shortDate}) ${emoji}`,
      description: `Celebrating ${day.title}! Find out WHY this day matters, get creative celebration ideas, trending hashtags & exclusive deals. Join thousands celebrating right now!`,
      type: 'article',
      url: `https://www.thedayof.net/${category}/${slug}/`,
      siteName: 'TheDayOf',
      locale: 'en_US',
      publishedTime: day.date,
      images: [
        {
          url: 'https://www.thedayof.net/images/og-default.svg',
          width: 1200,
          height: 630,
          alt: day.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${day.title} ${year} (${shortDate}) ${emoji}`,
      description: `Celebrating ${day.title}! Find out WHY this day matters, get creative celebration ideas, trending hashtags & exclusive deals. Join thousands celebrating right now!`,
      images: ['https://www.thedayof.net/images/og-default.svg'],
    },
  };
}

export default async function DayPage({ params }: PageProps) {
  const { slug } = await params;
  const day = getDayBySlug(slug);
  
  if (!day) {
    notFound();
  }

  const relatedDays = getRelatedDays(day);
  const categorySlug = getCategorySlug(day.category);
  const categoryColor = getCategoryColor(day.category);
  const formattedDate = formatDate(day.date);

  // Generate comprehensive structured data
  const eventStructuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": day.title,
    "startDate": day.date,
    "endDate": day.date,
    "description": day.description,
    "url": `https://www.thedayof.net/${categorySlug}/${day.slug}/`,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "keywords": day.tags.join(', '),
    "location": {
      "@type": "VirtualLocation",
      "url": `https://www.thedayof.net/${categorySlug}/${day.slug}/`
    },
    "organizer": {
      "@type": "Organization",
      "name": "TheDayOf",
      "url": "https://www.thedayof.net"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "TheDayOf",
      "url": "https://www.thedayof.net"
    },
    "performer": {
      "@type": "Organization",
      "name": "Global Community"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "validFrom": day.date,
      "url": `https://www.thedayof.net/${categorySlug}/${day.slug}/`
    },
    ...(day.nextOccurrences && day.nextOccurrences.length > 0 && {
      "recurringEvent": {
        "@type": "EventSeries",
        "eventSchedule": day.nextOccurrences.map(date => ({
          "@type": "Schedule",
          "startDate": date,
          "endDate": date
        }))
      }
    })
  };

  // FAQ Schema - Always generate for better SEO
  const generateDefaultFAQs = () => {
    const baseFAQs = [
      {
        question: `When is ${day.title}?`,
        answer: `${day.title} is celebrated on ${formattedDate}. ${day.nextOccurrences && day.nextOccurrences.length > 0 ? `Upcoming dates include ${day.nextOccurrences.slice(0, 2).map(d => formatDate(d)).join(' and ')}.` : `It occurs annually on the same date.`}`
      },
      {
        question: `What is ${day.title}?`,
        answer: `${day.description} ${day.whyItMatters || `This special day provides an opportunity to celebrate and raise awareness.`}`
      },
      {
        question: `How can I celebrate ${day.title}?`,
        answer: `${day.howToCelebrate || `There are many ways to celebrate ${day.title}! You can participate by sharing on social media, organizing events, or simply taking time to acknowledge the significance of this day with friends and family.`}`
      }
    ];
    
    // Add custom FAQs if they exist
    if (day.faqs && day.faqs.length > 0) {
      return [...baseFAQs, ...day.faqs];
    }
    
    return baseFAQs;
  };
  
  const allFAQs = generateDefaultFAQs();
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.thedayof.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Categories",
        "item": "https://www.thedayof.net/categories/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": day.category,
        "item": `https://www.thedayof.net/category/${categorySlug}/`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": day.title,
        "item": `https://www.thedayof.net/${categorySlug}/${day.slug}/`
      }
    ]
  };

  // Generate current timestamp for freshness
  const publishYear = new Date(day.date).getFullYear();
  const currentYear = new Date().getFullYear();
  
  // Use current year date for dateModified to show freshness
  const modifiedDate = currentYear > publishYear 
    ? `${currentYear}-${String(new Date(day.date).getMonth() + 1).padStart(2, '0')}-${String(new Date(day.date).getDate()).padStart(2, '0')}`
    : day.date;
  
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": day.title,
    "description": day.description,
    "url": `https://www.thedayof.net/${categorySlug}/${day.slug}/`,
    "datePublished": day.date,
    "dateModified": modifiedDate,
    "keywords": day.tags.join(', '),
    "author": {
      "@type": "Organization",
      "name": "TheDayOf"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TheDayOf",
      "url": "https://www.thedayof.net",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thedayof.net/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.thedayof.net/${categorySlug}/${day.slug}/`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
        {/* Breadcrumb */}
        <div className="bg-white dark:bg-dark-800 border-b dark:border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb" itemScope itemType="https://schema.org/BreadcrumbList">
              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/" itemProp="item" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </span>
              <span className="text-gray-400 dark:text-neutral-500">/</span>
              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href="/categories/" itemProp="item" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">
                  <span itemProp="name">Categories</span>
                </Link>
                <meta itemProp="position" content="2" />
              </span>
              <span className="text-gray-400 dark:text-neutral-500">/</span>
              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link href={`/category/${categorySlug}/`} itemProp="item" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">
                  <span itemProp="name">{day.category}</span>
                </Link>
                <meta itemProp="position" content="3" />
              </span>
              <span className="text-gray-400 dark:text-neutral-500">/</span>
              <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span itemProp="name" className="text-gray-900 dark:text-neutral-100 font-medium">{day.title}</span>
                <meta itemProp="position" content="4" />
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Back Button */}
              <Link 
                href={`/category/${categorySlug}/`}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to {day.category}
              </Link>

              {/* Header */}
              <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${categoryColor}`}>
                    {day.category}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-neutral-400">
                    <Calendar className="h-4 w-4 mr-2" />
                    {formattedDate}
                  </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
                  {day.title}
                </h1>

                <p className="text-xl text-gray-600 dark:text-neutral-300 mb-6">
                  {day.description}
                </p>

                {/* Tags */}
                {day.tags && day.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {day.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-neutral-300"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Hero Image - Only shows if image exists and loads successfully */}
              {day.image && (
                <DayHeroImage
                  src={day.image}
                  alt={`${day.title} - ${day.description}`}
                  categorySlug={categorySlug}
                />
              )}

              {/* Content Sections */}
              <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-6">About {day.title}</h2>
                
                <div className="prose max-w-none">
                  <p className="text-gray-700 dark:text-neutral-300 mb-6 text-lg leading-relaxed">
                    {day.description}
                  </p>

                  {/* Introduction/Overview - Always show substantial content */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">What is {day.title}?</h3>
                    <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                      {day.title} is {day.category.toLowerCase() === 'international' ? 'an internationally recognized' : 'a special'} day celebrated on {formatDate(day.date)}. 
                      This {day.category.toLowerCase().includes('national') ? 'national' : 'special'} observance brings together people to {day.description.toLowerCase()}.
                    </p>
                    <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                      Whether you&apos;re a long-time enthusiast or just discovering this special day, {day.title} offers a unique opportunity to engage with the {day.category.toLowerCase()} community and participate in meaningful activities.
                    </p>
                  </div>
                  
                  {day.history && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">History & Origins</h3>
                      <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                        {day.history}
                      </p>
                    </div>
                  )}
                  
                  {day.whyItMatters && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Why {day.title} Matters</h3>
                      <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                        {day.whyItMatters}
                      </p>
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">How do you celebrate {day.title}?</h3>
                    <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                      {day.howToCelebrate || `There are many wonderful ways to participate in ${day.title}. Whether you choose to celebrate individually, with family and friends, or as part of a larger community event, your participation helps raise awareness and spreads joy.`}
                    </p>
                    {!day.howToCelebrate && (
                      <>
                        <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                          Consider sharing your experiences on social media using relevant hashtags, organizing or attending local events, or simply taking time to reflect on the significance of this day. Every act of participation, no matter how small, contributes to the spirit of {day.title}.
                        </p>
                        <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                          Many people also use this day as an opportunity to learn more about the {day.category.toLowerCase()} aspects related to {day.title}, connect with like-minded individuals, or support relevant organizations and causes.
                        </p>
                      </>
                    )}
                  </div>
                  
                  {day.funFacts && day.funFacts.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Interesting Facts About {day.title}</h3>
                      <ul className="list-disc list-inside text-gray-700 dark:text-neutral-300 space-y-3">
                        {day.funFacts.map((fact, index) => (
                          <li key={index} className="leading-relaxed">{fact}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Additional Context Section */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Getting Involved with {day.title}</h3>
                    <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                      Participating in {day.title} can be both meaningful and enjoyable. Here are some ways you can get involved and make the most of this special occasion:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 dark:text-neutral-300 space-y-2 mb-4">
                      <li>Learn more about the history and significance of {day.title}</li>
                      <li>Share information about this day with friends, family, and colleagues</li>
                      <li>Engage with online communities celebrating {day.title}</li>
                      <li>Create or participate in local events and activities</li>
                      <li>Use social media to spread awareness using relevant hashtags</li>
                    </ul>
                    <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                      Remember that celebrating {day.title} doesn&apos;t have to be elaborate or expensive. Even small gestures of recognition and participation can contribute to the broader celebration and help keep the spirit of this day alive for future generations.
                    </p>
                  </div>

                  {/* When and Where Section - PAA Optimized */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">When is {day.title}?</h3>
                    <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                      {day.title} is celebrated annually on {formatDate(day.date)}. Mark your calendar and set a reminder so you don&apos;t miss this special occasion!
                    </p>
                    {day.nextOccurrences && day.nextOccurrences.length > 0 && (
                      <>
                        <p className="text-gray-700 dark:text-neutral-300 mb-2 font-medium">Upcoming dates:</p>
                        <ul className="list-disc list-inside text-gray-700 dark:text-neutral-300 space-y-1 mb-4">
                          {day.nextOccurrences.slice(0, 3).map((date, index) => (
                            <li key={index}>{formatDate(date)}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                      Whether you celebrate individually or as part of a larger community, {day.title} provides an opportunity to connect with others who share your interests and values. Check back regularly for updates on events and activities happening in your area.
                    </p>
                  </div>

                  {/* Additional PAA-Optimized Questions */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Who started {day.title}?</h3>
                    <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                      {day.history || `While the exact origins of ${day.title} may vary, this ${day.category.toLowerCase()} observance has become an important part of our cultural calendar. Many ${day.category.toLowerCase()} days like this one have grassroots origins, starting from community initiatives or organizational campaigns.`}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Where is {day.title} celebrated?</h3>
                    <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                      {day.category.toLowerCase().includes('international') || day.category.toLowerCase().includes('world')
                        ? `${day.title} is observed internationally across many countries and cultures. People around the world participate in various ways, making it a truly global celebration.`
                        : day.category.toLowerCase().includes('national')
                        ? `${day.title} is primarily celebrated in the United States, though its popularity has spread to other countries through social media and cultural exchange.`
                        : `${day.title} is celebrated wherever enthusiasts gather, both online and in local communities. Thanks to social media, participation has grown beyond geographical boundaries.`}
                    </p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Why do we celebrate {day.title}?</h3>
                    <p className="text-gray-700 dark:text-neutral-300 mb-4 leading-relaxed">
                      {day.whyItMatters || `We celebrate ${day.title} to ${day.description.toLowerCase()}. This special day serves as a reminder to appreciate and acknowledge the significance of this ${day.category.toLowerCase()} observance in our lives. It brings people together and creates a sense of community around shared interests and values.`}
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              {day.faqs && day.faqs.length > 0 && (
                <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {day.faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-200 dark:border-dark-600 pb-4 last:border-b-0">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-gray-700 dark:text-neutral-300">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Share This Day</h3>
                <p className="text-gray-600 dark:text-neutral-300 mb-6">
                  Help others discover this special day by sharing it with your friends and family.
                </p>
                <div className="space-y-4">
                  <SocialShare
                    title={day.title}
                    url={`https://www.thedayof.net/${categorySlug}/${day.slug}/`}
                    description={day.description}
                    variant="dropdown"
                  />
                  <SocialShare
                    title={day.title}
                    url={`https://www.thedayof.net/${categorySlug}/${day.slug}/`}
                    description={day.description}
                    variant="inline"
                    className="mt-4"
                  />
                </div>
              </div>

              {/* Quick Links Section for Internal Linking */}
              <div className="bg-blue-50 dark:bg-dark-700 rounded-lg shadow-md dark:shadow-dark-soft p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-neutral-100 mb-4">Explore More</h3>
                <div className="space-y-3 text-sm">
                  <Link 
                    href="/calendar/" 
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    View Full Calendar of Events
                  </Link>
                  <Link 
                    href={`/category/${categorySlug}/`}
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    <Tag className="h-4 w-4 mr-2" />
                    More {day.category} Events
                  </Link>
                  <Link 
                    href="/categories/" 
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Browse All Categories
                  </Link>
                  <Link 
                    href="/" 
                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    Discover Today&apos;s Special Days
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Days */}
              {relatedDays.length > 0 && (
                <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-6 mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Related Days</h3>
                  <div className="space-y-4">
                    {relatedDays.map((relatedDay) => (
                      <div key={relatedDay.slug} className="border-b border-gray-200 dark:border-dark-600 pb-4 last:border-b-0">
                        <Link 
                          href={`/${getCategorySlug(relatedDay.category)}/${relatedDay.slug}/`}
                          className="block hover:bg-gray-50 dark:hover:bg-dark-700 p-2 rounded transition-colors"
                        >
                          <h4 className="font-medium text-gray-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            {relatedDay.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-neutral-300 mt-1 line-clamp-2">
                            {relatedDay.description}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Topic Clusters Navigation */}
              <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Related Collections</h3>
                <div className="space-y-3">
                  <Link 
                    href={`/category/${categorySlug}/`}
                    className="block p-3 rounded-lg bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-neutral-100">All {day.category} Days</div>
                    <p className="text-sm text-gray-600 dark:text-neutral-300">Explore more {day.category.toLowerCase()} celebrations</p>
                  </Link>
                  <Link 
                    href={`/month/${new Date(day.date).toLocaleDateString('en-US', { month: 'long' }).toLowerCase()}`}
                    className="block p-3 rounded-lg bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                  >
                    <div className="font-medium text-gray-900 dark:text-neutral-100">{new Date(day.date).toLocaleDateString('en-US', { month: 'long' })} Special Days</div>
                    <p className="text-sm text-gray-600 dark:text-neutral-300">See all celebrations this month</p>
                  </Link>
                </div>
              </div>

              {/* More Days in This Month */}
              <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">More Days in {new Date(day.date).toLocaleDateString('en-US', { month: 'long' })}</h3>
                <div className="space-y-3">
                  {getDaysByMonth(new Date(day.date).getMonth() + 1, new Date(day.date).getFullYear())
                    .filter(d => d.slug !== day.slug)
                    .slice(0, 5)
                    .map((monthDay) => (
                      <Link
                        key={monthDay.slug}
                        href={`/${getCategorySlug(monthDay.category)}/${monthDay.slug}/`}
                        className="block p-3 rounded-lg bg-gray-50 dark:bg-dark-700 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                      >
                        <div className="font-medium text-gray-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {monthDay.title}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-neutral-300 mt-1">
                          {formatDate(monthDay.date)} • {monthDay.category}
                        </p>
                      </Link>
                    ))}
                  <Link 
                    href={`/month/${new Date(day.date).toLocaleDateString('en-US', { month: 'long' }).toLowerCase()}`}
                    className="block text-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium pt-2"
                  >
                    View all {new Date(day.date).toLocaleDateString('en-US', { month: 'long' })} days →
                  </Link>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-neutral-400">Date:</span>
                    <p className="text-gray-900 dark:text-neutral-100">{formattedDate}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-neutral-400">Last Updated:</span>
                    <p className="text-gray-900 dark:text-neutral-100">{currentYear > publishYear ? `Updated for ${currentYear}` : `Current for ${currentYear}`}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-neutral-400">Category:</span>
                    <p className="text-gray-900 dark:text-neutral-100">{day.category}</p>
                  </div>
                  {day.tags && day.tags.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-neutral-400">Tags:</span>
                      <p className="text-gray-900 dark:text-neutral-100">{day.tags.join(', ')}</p>
                    </div>
                  )}
                  {day.nextOccurrences && day.nextOccurrences.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-neutral-400">Next Occurrences:</span>
                      <div className="mt-2 space-y-1">
                        {day.nextOccurrences.slice(0, 3).map((occurrence, index) => {
                          const occurrenceDate = new Date(occurrence);
                          const year = occurrenceDate.getFullYear();
                          const month = occurrenceDate.toLocaleDateString('en-US', { month: 'short' });
                          const dayNum = occurrenceDate.getDate();
                          return (
                            <p key={index} className="text-gray-900 dark:text-neutral-100 text-sm">
                              {month} {dayNum}, {year}
                            </p>
                          );
                        })}
                        {day.nextOccurrences.length > 3 && (
                          <p className="text-gray-500 dark:text-neutral-400 text-sm">
                            +{day.nextOccurrences.length - 3} more
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
