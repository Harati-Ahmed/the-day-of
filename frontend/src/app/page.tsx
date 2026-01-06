import { getUpcomingDays, categories, getDaysByCategory, days } from '@/lib/data';
import { formatDate, getCategorySlug, getCategoryColor } from '@/lib/utils';
import { Calendar, Globe, TrendingUp, Star, Clock, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Import components directly for static site - no dynamic loading needed
import NewsletterSubscribe from '@/components/newsletter-subscribe';
import LazySection from '@/components/lazy-section';

export default function HomePage() {
  // Get today's celebrations
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayDay = today.getDate();
  const todaysDays = days.filter(day => {
    const dayDate = new Date(day.date);
    return dayDate.getMonth() === todayMonth && dayDate.getDate() === todayDay;
  });

  // Optimize initial data load for mobile performance - reduce data fetching
  const upcomingDays = getUpcomingDays(3); // Reduced for mobile
  const featuredCategories = categories.slice(0, 4);
  const trendingDays = days.slice(0, 2); // Minimal for mobile
  const thisWeekDays = upcomingDays.slice(0, 3); // Reuse data to reduce processing

  // Homepage structured data
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "TheDayOf - Discover National Days, Food & Holiday Calendar",
    "description": "Never miss a celebration! Find out what's special TODAY with 365+ national days, trending food holidays, exclusive deals & party ideas. Join millions celebrating now!",
    "url": "https://www.thedayof.net",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Special Days and Celebrations",
      "description": "A comprehensive list of special days, holidays, and celebrations",
      "itemListElement": upcomingDays.slice(0, 3).map((day, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Event",
          "name": day.title,
          "description": day.description,
          "startDate": day.date,
          "endDate": day.date,
          "url": `https://www.thedayof.net/${getCategorySlug(day.category)}/${day.slug}/`,
          "eventStatus": "https://schema.org/EventScheduled",
          "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
          "location": {
            "@type": "VirtualLocation",
            "url": `https://www.thedayof.net/${getCategorySlug(day.category)}/${day.slug}/`
          },
          "organizer": {
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
            "url": `https://www.thedayof.net/${getCategorySlug(day.category)}/${day.slug}/`
          }
        }
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.thedayof.net"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
      />
    <div className="min-h-screen bg-white dark:bg-dark-900">
      {/* Hero Section - Optimized for mobile performance */}
      <section className="relative bg-neutral-50 dark:bg-dark-800">
        <div className="container-custom py-10 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full px-3 py-1 mb-4 md:mb-6">
              <Star className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-xs md:text-sm font-semibold">America&apos;s #1 Trusted Celebration Resource</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-neutral-900 dark:text-neutral-100 mb-4 md:mb-6 leading-tight">
              The Day Of
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover, celebrate, and make every day special with our comprehensive guide to 
              holidays, food days, awareness campaigns, and unique celebrations from around the world.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12 md:mb-16">
              <Link href="/calendar/" className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 group">
                <Calendar className="inline h-4 w-4 md:h-5 md:w-5 mr-2" />
                Explore Calendar
                <ArrowRight className="inline h-3 w-3 md:h-4 md:w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/categories/" className="btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
                Browse Categories
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1 md:mb-2">{days.length}+</div>
                <div className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-medium">Special Days</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1 md:mb-2">365</div>
                <div className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-medium">Days Covered</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1 md:mb-2">8</div>
                <div className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-medium">Categories</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1 md:mb-2">∞</div>
                <div className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 font-medium">Celebrations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Featured Day - Prominent CTA */}
      {todaysDays.length > 0 && (
        <section className="bg-gradient-to-br from-primary-600 to-secondary-600 dark:from-primary-700 dark:to-secondary-700 py-12 md:py-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Happening Today</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Today is {todaysDays[0].title}!
              </h2>
              
              <p className="text-lg md:text-xl mb-8 opacity-95">
                {todaysDays[0].description}
              </p>
              
              {todaysDays.length > 1 && (
                <p className="text-base mb-8 opacity-90">
                  Plus {todaysDays.length - 1} more {todaysDays.length === 2 ? 'celebration' : 'celebrations'} today
                </p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/today/" 
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  <Clock className="h-5 w-5" />
                  See All Today&apos;s Celebrations
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  href={`/${getCategorySlug(todaysDays[0].category)}/${todaysDays[0].slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-2 border-white/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                >
                  Learn More About {todaysDays[0].title}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* The Latest - Allrecipes Style */}
      <section className="bg-white dark:bg-dark-900 py-12 md:py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">The Latest</h2>
            <Link href="/calendar/" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold flex items-center gap-2">
              See More Celebrations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {upcomingDays.map((day) => (
              <div key={day.slug} className="group flex">
                <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-soft hover:shadow-medium dark:shadow-dark-soft dark:hover:shadow-dark-medium transition-all duration-300 overflow-hidden border border-neutral-100 dark:border-dark-700 group-hover:border-primary-200 dark:group-hover:border-primary-700 flex flex-col w-full">
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white whitespace-nowrap ${getCategoryColor(day.category)}`}>
                        {day.category}
                      </span>
                      <div className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 flex-shrink-0">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="whitespace-nowrap">{formatDate(day.date)}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                      {day.title}
                    </h3>
                    
                    <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
                      {day.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-wrap gap-1">
                        {day.tags.slice(0, 2).map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-neutral-100 dark:bg-dark-700 text-neutral-600 dark:text-neutral-300 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href={`/${getCategorySlug(day.category)}/${day.slug}/`} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-semibold whitespace-nowrap">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now - Atlas Obscura Style */}
      <section className="bg-neutral-50 dark:bg-dark-800 py-12 md:py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">Trending Now</h2>
            <Link href="/categories/" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold flex items-center gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Featured Article */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-soft hover:shadow-medium dark:shadow-dark-soft dark:hover:shadow-dark-medium transition-all duration-300 overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <Calendar className="h-20 w-20 text-white opacity-80" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                    <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">Most Popular</span>
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                    National Coffee Day: The Ultimate Guide to Celebrating
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
                    From the first sip of your morning brew to discovering exotic coffee cultures around the world, 
                    National Coffee Day is your chance to explore the rich history and diverse flavors that make 
                    coffee the world&apos;s most beloved beverage.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
                      <span>September 29, 2025</span>
                      <span>•</span>
                      <span>Food</span>
                    </div>
                    <Link href="/food/national-coffee-day" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trending List */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {trendingDays.map((day, index) => (
                  <div key={day.slug} className="bg-white dark:bg-dark-800 rounded-xl shadow-soft hover:shadow-medium dark:shadow-dark-soft dark:hover:shadow-dark-medium transition-all duration-300 p-6 group">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg ${getCategoryColor(day.category)} flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor(day.category)}`}>
                            {day.category}
                          </span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">{formatDate(day.date)}</span>
                        </div>
                        <h4 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {day.title}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2 mb-3">
                          {day.description}
                        </p>
                        <Link href={`/${getCategorySlug(day.category)}/${day.slug}/`} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-semibold">
                          Discover More →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - Lazy loaded for mobile performance */}
      <LazySection className="bg-white dark:bg-dark-900 py-12 md:py-16">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Explore by Category
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Whether you&apos;re a foodie, an animal lover, or passionate about awareness causes, 
              we&apos;ve organized everything into categories that match your interests.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {featuredCategories.map((category) => {
              const dayCount = getDaysByCategory(category.name).length;
              return (
                <div key={category.slug} className="group">
                  <Link href={`/category/${category.slug}`}>
                    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-soft hover:shadow-medium dark:shadow-dark-soft dark:hover:shadow-dark-medium transition-all duration-300 p-6 text-center group-hover:-translate-y-1">
                      <div className={`w-16 h-16 rounded-2xl ${category.color} flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">{dayCount} days</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <Link href="/categories/" className="btn-secondary text-lg px-8 py-4">
              <Globe className="inline h-5 w-5 mr-2" />
              View All Categories
            </Link>
          </div>
        </div>
      </LazySection>

      {/* This Week's Highlights - Lazy loaded */}
      <LazySection className="bg-white dark:bg-dark-900 py-12 md:py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              This Week&apos;s Highlights
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Don&apos;t miss these special days coming up in the next week
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {thisWeekDays.map((day) => (
              <div key={day.slug} className="group">
                <div className="bg-white dark:bg-dark-800 rounded-xl shadow-soft hover:shadow-medium dark:shadow-dark-soft dark:hover:shadow-dark-medium transition-all duration-300 p-6 border border-neutral-100 dark:border-dark-700 group-hover:border-primary-200 dark:group-hover:border-primary-700">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white whitespace-nowrap ${getCategoryColor(day.category)}`}>
                      {day.category}
                    </span>
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-medium whitespace-nowrap flex-shrink-0">{formatDate(day.date)}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                    {day.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {day.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {day.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 bg-neutral-100 dark:bg-dark-700 text-neutral-600 dark:text-neutral-300 text-xs rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/${getCategorySlug(day.category)}/${day.slug}/`} className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-semibold">
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/calendar/" className="btn-primary text-lg px-8 py-4">
              <Calendar className="inline h-5 w-5 mr-2" />
              View Full Calendar
            </Link>
          </div>
        </div>
      </LazySection>

      {/* Newsletter CTA */}
      <NewsletterSubscribe />
      </div>
    </>
  );
}