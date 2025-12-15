import { Metadata } from 'next';
import { FileText, Scale, Users, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | TheDayOf',
  description: 'Read our terms of service and user agreement for TheDayOf. Understand your rights and responsibilities when using our celebration calendar and content.',
  keywords: ['terms of service', 'user agreement', 'terms', 'thedayof'],
  alternates: {
    canonical: 'https://www.thedayof.net/terms/',
  },
  openGraph: {
    title: 'Terms of Service - TheDayOf',
    description: 'Read our terms of service and user agreement for TheDayOf. Understand your rights and responsibilities.',
    type: 'website',
    url: 'https://www.thedayof.net/terms/',
    siteName: 'TheDayOf',
    images: [
      {
        url: 'https://www.thedayof.net/images/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'Terms of Service - TheDayOf',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - TheDayOf',
    description: 'Read our terms of service and user agreement for TheDayOf.',
    images: ['https://www.thedayof.net/images/og-default.svg'],
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Please read these terms carefully before using TheDayOf. By using our service, 
              you agree to be bound by these terms.
            </p>
            <p className="text-sm text-gray-500 dark:text-neutral-400 mt-4">
              Last updated: January 2025
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-dark-700 shadow-lg dark:shadow-dark-soft">
            <div className="prose dark:prose-invert max-w-none">
              
              {/* Acceptance of Terms */}
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="h-6 w-6 text-primary-500 dark:text-primary-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Acceptance of Terms</h2>
                </div>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    By accessing and using TheDayOf (&quot;the Service&quot;), you accept and agree to be 
                    bound by the terms and provision of this agreement. If you do not agree to 
                    abide by the above, please do not use this service.
                  </p>
                </div>
              </section>

              {/* Description of Service */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Description of Service</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    TheDayOf is a web application that provides information about special days, 
                    holidays, and observances. Our service includes:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Daily calendar of special days and observances</li>
                    <li>Categories of holidays and special days</li>
                    <li>Educational content about various celebrations</li>
                    <li>Search and discovery features</li>
                    <li>Mobile-responsive design</li>
                  </ul>
                </div>
              </section>

              {/* User Responsibilities */}
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-primary-500 dark:text-primary-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Responsibilities</h2>
                </div>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>As a user of TheDayOf, you agree to:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use the service only for lawful purposes</li>
                    <li>Not attempt to gain unauthorized access to our systems</li>
                    <li>Not use the service to transmit harmful or malicious code</li>
                    <li>Respect intellectual property rights</li>
                    <li>Not interfere with the proper functioning of the service</li>
                    <li>Provide accurate information when contacting us</li>
                  </ul>
                </div>
              </section>

              {/* Prohibited Uses */}
              <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Prohibited Uses</h2>
                </div>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>You may not use TheDayOf:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                    <li>To upload or transmit viruses or any other type of malicious code</li>
                    <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                    <li>For any obscene or immoral purpose</li>
                  </ul>
                </div>
              </section>

              {/* Intellectual Property */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Intellectual Property</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    The service and its original content, features, and functionality are and will 
                    remain the exclusive property of TheDayOf and its licensors. The service is 
                    protected by copyright, trademark, and other laws.
                  </p>
                  <p>
                    Our trademarks and trade dress may not be used in connection with any product 
                    or service without our prior written consent.
                  </p>
                </div>
              </section>

              {/* Disclaimer of Warranties */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Disclaimer of Warranties</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    The information on this service is provided on an &quot;as is&quot; basis. To the fullest 
                    extent permitted by law, TheDayOf:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Excludes all representations and warranties relating to this service and its contents</li>
                    <li>Does not warrant that the service will be constantly available or available at all</li>
                    <li>Does not warrant that the information on this service is complete, true, accurate, or non-misleading</li>
                  </ul>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Limitation of Liability</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    In no event shall TheDayOf, nor its directors, employees, partners, agents, 
                    suppliers, or affiliates, be liable for any indirect, incidental, special, 
                    consequential, or punitive damages, including without limitation, loss of 
                    profits, data, use, goodwill, or other intangible losses, resulting from your 
                    use of the service.
                  </p>
                </div>
              </section>

              {/* Termination */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Termination</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    We may terminate or suspend your access immediately, without prior notice or 
                    liability, for any reason whatsoever, including without limitation if you 
                    breach the Terms.
                  </p>
                  <p>
                    Upon termination, your right to use the service will cease immediately.
                  </p>
                </div>
              </section>

              {/* Changes to Terms */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Changes to Terms</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these 
                    Terms at any time. If a revision is material, we will try to provide at 
                    least 30 days notice prior to any new terms taking effect.
                  </p>
                  <p>
                    By continuing to access or use our service after those revisions become 
                    effective, you agree to be bound by the revised terms.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
                <div className="space-y-4 text-gray-700 dark:text-neutral-300">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-100 dark:bg-dark-700/50 rounded-lg p-6">
                    <p className="font-medium text-gray-900 dark:text-white mb-2">Email:</p>
                    <p className="text-primary-600 dark:text-primary-400">support@thedayof.net</p>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
