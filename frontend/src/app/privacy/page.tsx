import { Metadata } from 'next';
import { Shield, Eye, Lock, Database } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | TheDayOf',
  description: 'Learn how TheDayOf protects your privacy and handles your data. Read our privacy policy to understand how we collect, use, and safeguard your information.',
  keywords: ['privacy policy', 'data protection', 'privacy', 'thedayof'],
  alternates: {
    canonical: 'https://www.thedayof.net/privacy/',
  },
  openGraph: {
    title: 'Privacy Policy - TheDayOf',
    description: 'Learn how TheDayOf protects your privacy and handles your data. Read our comprehensive privacy policy.',
    type: 'website',
    url: 'https://www.thedayof.net/privacy/',
    siteName: 'TheDayOf',
    images: [
      {
        url: 'https://www.thedayof.net/images/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - TheDayOf',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - TheDayOf',
    description: 'Learn how TheDayOf protects your privacy and handles your data.',
    images: ['https://www.thedayof.net/images/og-default.svg'],
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your information when you use TheDayOf.
            </p>
            <p className="text-sm text-gray-500 dark:text-neutral-400 mt-4">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-dark-700 shadow-lg dark:shadow-dark-soft">
            <div className="prose dark:prose-invert max-w-none">
              
              {/* Information We Collect */}
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="h-6 w-6 text-primary-500 dark:text-primary-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    TheDayOf is designed to be privacy-friendly. We collect minimal information 
                    necessary to provide our service:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Usage Data:</strong> Basic analytics about how you interact with our website (pages visited, time spent)</li>
                    <li><strong>Device Information:</strong> Browser type, operating system, and device type for optimization</li>
                    <li><strong>Location Data:</strong> General geographic location (country/region) for content personalization</li>
                    <li><strong>Cookies:</strong> Essential cookies for website functionality and analytics</li>
                  </ul>
                </div>
              </section>

              {/* How We Use Information */}
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="h-6 w-6 text-primary-500 dark:text-primary-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Use Your Information</h2>
                </div>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Provide and improve our day discovery service</li>
                    <li>Personalize content and recommendations</li>
                    <li>Analyze website performance and user experience</li>
                    <li>Ensure website security and prevent abuse</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </section>

              {/* Data Protection */}
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="h-6 w-6 text-primary-500 dark:text-primary-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Protection</h2>
                </div>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>We implement appropriate security measures to protect your information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>HTTPS encryption for all data transmission</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited data retention periods</li>
                    <li>No sharing of personal data with third parties for marketing</li>
                    <li>Secure hosting infrastructure</li>
                  </ul>
                </div>
              </section>

              {/* Third-Party Services */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Third-Party Services</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>We use the following third-party services that may collect data:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Vercel:</strong> Hosting and analytics (privacy-focused)</li>
                    <li><strong>Google Analytics:</strong> Website usage statistics (anonymized)</li>
                    <li><strong>Fonts:</strong> Google Fonts for typography</li>
                  </ul>
                  <p className="mt-4">
                    These services have their own privacy policies. We recommend reviewing them 
                    for complete transparency.
                  </p>
                </div>
              </section>

              {/* Your Rights */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Rights</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access your personal data</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of data collection (via browser settings)</li>
                    <li>Data portability</li>
                  </ul>
                </div>
              </section>

              {/* Contact */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    If you have questions about this privacy policy or want to exercise your rights, 
                    please contact us:
                  </p>
                  <div className="bg-gray-100 dark:bg-dark-700/50 rounded-lg p-6">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">Email:</p>
                    <p className="text-primary-600 dark:text-primary-400">support@thedayof.net</p>
                  </div>
                </div>
              </section>

              {/* Updates */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Policy Updates</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    We may update this privacy policy from time to time. We will notify you of 
                    any significant changes by posting the new policy on this page and updating 
                    the &quot;Last updated&quot; date.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
