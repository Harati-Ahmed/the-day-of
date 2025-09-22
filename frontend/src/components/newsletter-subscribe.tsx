'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface NewsletterSubscribeProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

export default function NewsletterSubscribe({ 
  className = '', 
  variant = 'default' 
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // For static export, we'll simulate a successful subscription
      // In a real deployment, you would integrate with a service like Mailchimp, ConvertKit, etc.
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setIsSubscribed(true);
      setEmail('');
      toast.success('Thank you for subscribing! You\'ll receive our updates soon.');
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
      
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'minimal') {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-dark-700 border border-neutral-200 dark:border-dark-600"
          disabled={isLoading || isSubscribed}
        />
        <button
          type="submit"
          disabled={isLoading || isSubscribed || !email}
          className="btn-primary px-4 py-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isSubscribed ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
          {isSubscribed ? 'Subscribed!' : 'Subscribe'}
        </button>
      </form>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white py-16 ${className}`}>
      <div className="container-custom text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Mail className="h-8 w-8 text-white" />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Never Miss a Celebration
        </h2>
        <p className="text-xl text-primary-100 dark:text-primary-200 mb-8 max-w-2xl mx-auto leading-relaxed">
          Get daily updates on special days, fun facts, and celebration ideas delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-400 dark:focus:ring-accent-300 bg-white dark:bg-dark-700 border-0"
            disabled={isLoading || isSubscribed}
          />
          <button
            type="submit"
            disabled={isLoading || isSubscribed || !email}
            className="btn-accent px-6 py-3 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isSubscribed ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Mail className="h-5 w-5" />
            )}
            {isSubscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </form>
        
        {isSubscribed && (
          <p className="text-primary-100 dark:text-primary-200 mt-4 text-sm">
            Thank you for subscribing! Check your email for confirmation.
          </p>
        )}
      </div>
    </div>
  );
}
