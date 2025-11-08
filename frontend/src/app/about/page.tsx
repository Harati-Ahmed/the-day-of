import { Metadata } from 'next';
import { Calendar, Heart, Users, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About TheDayOf 🎊 Our Mission to Celebrate Every Day',
  description: 'Join millions celebrating every day! 🎊 Discover our mission to spread joy worldwide with 365+ holidays, party ideas & celebration guides. Our story inside!',
  keywords: ['about', 'thedayof', 'special days', 'holidays', 'celebrations', 'mission'],
  openGraph: {
    title: 'About Us - TheDayOf',
    description: 'Join millions celebrating every day! Discover our mission to spread joy worldwide with 365+ holidays, party ideas & celebration guides.',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About TheDayOf
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Your comprehensive guide to celebrating every special day, holiday, and observance
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-neutral-300 mb-4">
            At TheDayOf, we believe that every day is worth celebrating. Our mission is to help you 
            discover, learn about, and celebrate the countless special days, holidays, and observances 
            that make life more meaningful and connected.
          </p>
          <p className="text-lg text-gray-700 dark:text-neutral-300">
            Whether you&apos;re looking for food days to inspire your next meal, awareness days to support 
            important causes, or fun holidays to add joy to your routine, we&apos;ve got you covered with 
            comprehensive information, fun facts, and celebration ideas.
          </p>
        </div>

        {/* What We Do */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-6">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">Comprehensive Coverage</h3>
                <p className="text-gray-700 dark:text-neutral-300">
                  We cover over 2,000 special days from food celebrations to awareness campaigns, 
                  ensuring you never miss an important date.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Heart className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">Meaningful Content</h3>
                <p className="text-gray-700 dark:text-neutral-300">
                  Each day includes rich descriptions, fun facts, celebration ideas, and ways to 
                  make the most of every special moment.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">Community Focused</h3>
                <p className="text-gray-700 dark:text-neutral-300">
                  We help you connect with others through shared celebrations and create lasting 
                  memories with family and friends.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-neutral-100 mb-2">Global Perspective</h3>
                <p className="text-gray-700 dark:text-neutral-300">
                  From local traditions to international observances, we celebrate the diversity 
                  of cultures and customs worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 dark:text-neutral-300 mb-4">
            TheDayOf was born from a simple realization: there are so many special days throughout 
            the year that most people never hear about. From National Coffee Day to World Kindness Day, 
            these celebrations offer opportunities to learn, connect, and add joy to our daily lives.
          </p>
          <p className="text-lg text-gray-700 dark:text-neutral-300 mb-4">
            What started as a personal project to track interesting holidays has grown into a 
            comprehensive platform that helps thousands of people discover new ways to celebrate 
            and make every day special.
          </p>
          <p className="text-lg text-gray-700 dark:text-neutral-300">
            Today, we&apos;re committed to expanding our coverage, improving our content, and helping 
            you find the perfect way to celebrate any day of the year.
          </p>
        </div>

        {/* Values */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md dark:shadow-dark-soft p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-6">Our Values</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 dark:text-neutral-300">
                <strong>Inclusivity:</strong> We celebrate diversity and ensure all cultures and 
                communities are represented in our content.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 dark:text-neutral-300">
                <strong>Accuracy:</strong> We research each day thoroughly to provide accurate, 
                up-to-date information you can trust.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 dark:text-neutral-300">
                <strong>Joy:</strong> We believe in the power of celebration to bring people 
                together and create positive experiences.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-600 dark:bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700 dark:text-neutral-300">
                <strong>Accessibility:</strong> We make it easy for everyone to discover and 
                participate in celebrations, regardless of background or experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
