import { Metadata } from 'next';
import { Mail, MessageCircle, MapPin, Send, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | TheDayOf',
  description: 'Get in touch with TheDayOf team! Have questions, suggestions, or want to collaborate? We\'d love to hear from you. Reach out today!',
  keywords: ['contact', 'thedayof', 'get in touch', 'support', 'feedback'],
  alternates: {
    canonical: 'https://www.thedayof.net/contact/',
  },
  openGraph: {
    title: 'Contact Us - TheDayOf',
    description: 'Get in touch with TheDayOf team! Have questions, suggestions, or want to collaborate? We\'d love to hear from you.',
    type: 'website',
    url: 'https://www.thedayof.net/contact/',
    siteName: 'TheDayOf',
    images: [
      {
        url: 'https://www.thedayof.net/images/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Contact TheDayOf',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - TheDayOf',
    description: 'Get in touch with TheDayOf team! Have questions, suggestions, or want to collaborate?',
    images: ['https://www.thedayof.net/images/og-default.svg'],
  },
};

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="container-custom py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Have a question, suggestion, or just want to say hello? We&apos;d love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-dark-700 shadow-lg dark:shadow-dark-soft">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Question</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-neutral-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full px-4 py-3 bg-white dark:bg-dark-700 border border-gray-300 dark:border-dark-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-dark-700 shadow-lg dark:shadow-dark-soft">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-neutral-300 mb-2">Send us an email anytime</p>
                      <a 
                        href="mailto:support@thedayof.net" 
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                      >
                        support@thedayof.net
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Response Time</h3>
                      <p className="text-gray-600 dark:text-neutral-300 mb-2">We typically respond within</p>
                      <p className="text-primary-600 dark:text-primary-400">24-48 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Location</h3>
                      <p className="text-gray-600 dark:text-neutral-300 mb-2">Based globally, serving worldwide</p>
                      <p className="text-primary-600 dark:text-primary-400">Remote Team</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-dark-700 shadow-lg dark:shadow-dark-soft">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How can I suggest a new day?</h3>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">
                      We&apos;d love to hear your suggestions! Send us an email with the day details and we&apos;ll consider adding it to our calendar.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Can I use your data for my project?</h3>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">
                      Our content is for personal use. For commercial or API access, please contact us to discuss licensing options.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">How often is the calendar updated?</h3>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">
                      We regularly update our calendar with new days and observances. Major updates happen monthly.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
