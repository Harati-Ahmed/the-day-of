import { notFound } from 'next/navigation';
import { getDayBySlug, getRelatedDays, getDaysByMonth, days } from '@/lib/data';
import { formatDate, getCategoryColor, getCategorySlug } from '@/lib/utils';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import SocialShare from '@/components/social-share';

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
  
  return {
    title: `${day.title} ${year} – TheDayOf`,
    description: day.description,
    keywords: day.tags.join(', '),
    alternates: {
      canonical: `https://www.thedayof.net/${category}/${slug}/`,
    },
    openGraph: {
      title: `${day.title} ${year}`,
      description: day.description,
      type: 'article',
      url: `https://www.thedayof.net/${category}/${slug}/`,
      siteName: 'TheDayOf',
      locale: 'en_US',
      publishedTime: day.date,
      ...(day.image && {
        images: [
          {
            url: day.image.startsWith('/') ? `https://www.thedayof.net${day.image}` : `https://www.thedayof.net/images/events/${day.image}`,
            width: 1200,
            height: 630,
            alt: day.title,
          }
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${day.title} ${year}`,
      description: day.description,
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
    ...(day.image && {
      "image": day.image.startsWith('/') ? `https://www.thedayof.net${day.image}` : `https://www.thedayof.net/images/events/${day.image}`
    }),
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

  // FAQ Schema
  const faqStructuredData = day.faqs && day.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": day.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

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

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": day.title,
    "description": day.description,
    ...(day.image && {
      "image": day.image.startsWith('/') ? `https://www.thedayof.net${day.image}` : `https://www.thedayof.net/images/events/${day.image}`
    }),
    "url": `https://www.thedayof.net/${categorySlug}/${day.slug}/`,
    "datePublished": day.date,
    "dateModified": day.date,
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
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
        {/* Breadcrumb */}
        <div className="bg-white dark:bg-dark-800 border-b dark:border-dark-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">Home</Link>
              <span className="text-gray-400 dark:text-neutral-500">/</span>
              <Link href="/categories/" className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">Categories</Link>
              <span className="text-gray-400 dark:text-neutral-500">/</span>
              <Link href={`/category/${categorySlug}/`} className="text-gray-500 dark:text-neutral-400 hover:text-gray-700 dark:hover:text-neutral-200">
                {day.category}
              </Link>
              <span className="text-gray-400 dark:text-neutral-500">/</span>
              <span className="text-gray-900 dark:text-neutral-100 font-medium">{day.title}</span>
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

              {/* Hero Image */}
              {day.image && (
                <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft overflow-hidden mb-8">
                  <div className="relative w-full h-64 md:h-96 lg:h-[500px]">
                    <Image
                      src={day.image}
                      alt={`${day.title} - ${day.description}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                      priority={true}
                      quality={90}
                    />
                  </div>
                </div>
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
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-4">How to Celebrate {day.title}</h3>
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

                  {/* When and Where Section */}
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
