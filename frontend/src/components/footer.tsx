import Link from 'next/link';
import { Calendar, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <span className="text-3xl font-bold gradient-text">TheDayOf</span>
            </div>
            <p className="text-neutral-300 mb-6 max-w-lg leading-relaxed text-lg">
              Discover and celebrate every special day, holiday, and observance. 
              From food days to awareness campaigns, we&apos;ve got you covered with 
              fun facts, traditions, and ways to celebrate.
            </p>
            <div className="flex items-center space-x-3 text-neutral-400">
              <Heart className="h-5 w-5 text-red-400" />
              <span className="font-medium">Made with love for every day of the year</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-neutral-300 hover:text-primary-400 transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-neutral-300 hover:text-primary-400 transition-colors font-medium">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="text-neutral-300 hover:text-primary-400 transition-colors font-medium">
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-primary-400 transition-colors font-medium">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Popular Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/category/food" className="flex items-center gap-3 text-neutral-300 hover:text-primary-400 transition-colors font-medium group">
                  <span className="text-lg group-hover:scale-110 transition-transform">🍽️</span>
                  <span>Food Days</span>
                </Link>
              </li>
              <li>
                <Link href="/category/holiday" className="flex items-center gap-3 text-neutral-300 hover:text-primary-400 transition-colors font-medium group">
                  <span className="text-lg group-hover:scale-110 transition-transform">🎊</span>
                  <span>Holidays</span>
                </Link>
              </li>
              <li>
                <Link href="/category/awareness-health" className="flex items-center gap-3 text-neutral-300 hover:text-primary-400 transition-colors font-medium group">
                  <span className="text-lg group-hover:scale-110 transition-transform">❤️</span>
                  <span>Awareness</span>
                </Link>
              </li>
              <li>
                <Link href="/category/fun-weird" className="flex items-center gap-3 text-neutral-300 hover:text-primary-400 transition-colors font-medium group">
                  <span className="text-lg group-hover:scale-110 transition-transform">🎉</span>
                  <span>Fun & Weird</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-base font-medium">
              © 2025 TheDayOf. All rights reserved.
            </p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <Link href="/privacy" className="text-neutral-400 hover:text-primary-400 text-base font-medium transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-neutral-400 hover:text-primary-400 text-base font-medium transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-neutral-400 hover:text-primary-400 text-base font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
