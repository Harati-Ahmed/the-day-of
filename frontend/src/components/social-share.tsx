'use client';

import { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Mail, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
  className?: string;
  variant?: 'button' | 'dropdown' | 'inline';
}

export default function SocialShare({ 
  title, 
  url, 
  description = '', 
  className = '',
  variant = 'button'
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareText = `${title}${description ? ` - ${description}` : ''}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedText}&body=${encodedText}%0A%0A${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (platform === 'email') {
      window.location.href = shareLinks[platform];
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
    setIsOpen(false);
    toast.success(`Shared on ${platform.charAt(0).toUpperCase() + platform.slice(1)}!`);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        toast.success('Shared successfully!');
    } catch (err) {
      // User cancelled or error occurred
      if (err instanceof Error && err.name !== 'AbortError') {
        toast.error('Failed to share');
      }
    }
    } else {
      // Fallback to dropdown
      setIsOpen(!isOpen);
    }
  };

  if (variant === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-neutral-600 dark:text-neutral-400">Share:</span>
        <div className="flex gap-2">
          <button
            onClick={() => handleShare('twitter')}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            aria-label="Share on Twitter"
          >
            <Twitter className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleShare('facebook')}
            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            aria-label="Share on Facebook"
          >
            <Facebook className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="p-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors"
            aria-label="Share on LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleShare('email')}
            className="p-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
            aria-label="Share via Email"
          >
            <Mail className="h-4 w-4" />
          </button>
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white transition-colors"
            aria-label="Copy Link"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={handleNativeShare}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-neutral-200 dark:border-dark-700 z-10">
            <div className="py-2">
              <button
                onClick={() => handleShare('twitter')}
                className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-700 flex items-center gap-3"
              >
                <Twitter className="h-4 w-4 text-blue-500" />
                Twitter
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-700 flex items-center gap-3"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-700 flex items-center gap-3"
              >
                <Linkedin className="h-4 w-4 text-blue-700" />
                LinkedIn
              </button>
              <button
                onClick={() => handleShare('email')}
                className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-700 flex items-center gap-3"
              >
                <Mail className="h-4 w-4 text-gray-600" />
                Email
              </button>
              <button
                onClick={handleCopyLink}
                className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-dark-700 flex items-center gap-3"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4 text-gray-600" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default button variant
  return (
    <button
      onClick={handleNativeShare}
      className={`btn-primary inline-flex items-center gap-2 ${className}`}
    >
      <Share2 className="h-4 w-4" />
      Share on Social Media
    </button>
  );
}
