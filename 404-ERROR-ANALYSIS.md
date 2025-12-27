# 404 Error Analysis - Bing Webmaster Tools

**Date:** December 27, 2025  
**Issue:** 152 pages returning 404 errors  
**Impact:** Bing impressions dropped significantly  
**Root Cause:** Old URL structure with `/other/` category

## Problem Summary

Bing has indexed 152 pages with incorrect URLs that no longer exist:

### Breakdown of 404 Errors

1. **147 pages with `/other/` category** (PRIMARY ISSUE)
   - Example: `https://www.thedayof.net/other/national-coffee-day-commercial-deals/`
   - Should be: `https://www.thedayof.net/food/national-coffee-day-commercial-deals/`

2. **2 pages with `/year/` routes** (removed from sitemap)
   - `https://www.thedayof.net/year/2025/`
   - `https://www.thedayof.net/year/2026/`

3. **1 old site structure URL**
   - `http://www.thedayof.net/home.html`

4. **2 duplicate URLs** (with and without trailing slash)
   - `https://www.thedayof.net/other/national-name-yourself-day-april-9` (no trailing slash)
   - `https://www.thedayof.net/other/national-name-yourself-day-april-9/` (with trailing slash)

## Root Cause

### The Fallback Problem

In `frontend/src/lib/utils.ts`, the `getCategorySlug()` function has a fallback:

```typescript
export function getCategorySlug(category: string): string {
  const categoryMap: Record<string, string> = {
    'Food': 'food',
    'Awareness & Health': 'awareness-health',
    'Animals & Pets': 'animals-pets',
    'Fun & Weird': 'fun-weird',
    'Holiday': 'holiday',
    'Shopping & Deals': 'shopping-deals',
    'National': 'national',
    'International': 'international'
  };
  return categoryMap[category] || 'other';  // ❌ FALLBACK TO 'other'
}
```

**What happened:**
1. At some point, pages were built with unmatched categories or typos
2. The fallback returned `'other'` as the category slug
3. URLs were generated as `/other/[slug]/`
4. Bing crawled and indexed these URLs
5. Later, categories were fixed, but old URLs were never redirected
6. Now Bing has 147 dead URLs returning 404

## Fix Strategy

We need to implement **301 redirects** to redirect old `/other/` URLs to their correct category URLs.

### Option 1: Server-Side Redirects (Recommended)

Add redirects in `next.config.ts` or `vercel.json` to redirect based on slug lookup.

### Option 2: Middleware Redirects

Create a middleware that:
1. Detects `/other/[slug]` requests
2. Looks up the correct category for that slug
3. Returns a 301 redirect to the correct URL

### Option 3: Client-Side Redirect Page

Create a catch-all page at `/other/[slug]/page.tsx` that:
1. Looks up the slug in the database
2. Redirects to the correct category URL
3. Returns 404 if slug doesn't exist

## Solution: Middleware with Dynamic Redirects

**Best approach:** Use Next.js middleware to handle all old URLs dynamically.

### Why This Approach?

1. ✅ **Dynamic:** Looks up correct category for each slug
2. ✅ **SEO-friendly:** Returns proper 301 redirects
3. ✅ **Maintains link equity:** Passes SEO value to new URLs
4. ✅ **Handles all cases:** Works for all 147 pages automatically
5. ✅ **No manual mapping:** No need to manually map each URL

## Implementation

### Step 1: Create Middleware

File: `frontend/src/middleware.ts`

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Handle /other/ redirects
  if (pathname.startsWith('/other/')) {
    const slug = pathname.replace('/other/', '').replace(/\/$/, '');
    
    // Import days data to find correct category
    // This needs to be done dynamically
    const correctUrl = lookupCorrectUrl(slug);
    
    if (correctUrl) {
      return NextResponse.redirect(new URL(correctUrl, request.url), 301);
    }
  }
  
  // Handle /year/ redirects
  if (pathname.startsWith('/year/')) {
    return NextResponse.redirect(new URL('/calendar/', request.url), 301);
  }
  
  // Handle old home.html
  if (pathname === '/home.html') {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/other/:path*',
    '/year/:path*',
    '/home.html',
  ],
};
```

### Step 2: Remove 'other' Fallback

File: `frontend/src/lib/utils.ts`

```typescript
export function getCategorySlug(category: string): string {
  const categoryMap: Record<string, string> = {
    'Food': 'food',
    'Awareness & Health': 'awareness-health',
    'Animals & Pets': 'animals-pets',
    'Fun & Weird': 'fun-weird',
    'Holiday': 'holiday',
    'Shopping & Deals': 'shopping-deals',
    'National': 'national',
    'International': 'international'
  };
  
  const slug = categoryMap[category];
  
  if (!slug) {
    console.error(`❌ Unknown category: "${category}"`);
    // Return a default or throw an error
    return 'fun-weird'; // Default fallback
  }
  
  return slug;
}
```

### Step 3: Submit Updated URLs to Bing

After implementing redirects, tell Bing about the changes:

```bash
cd frontend
npm run indexnow
```

## Expected Outcome

1. **Immediate:** All `/other/` URLs return 301 redirects to correct URLs
2. **24-48 hours:** Bing re-crawls and updates index
3. **1 week:** 404 errors cleared from Bing Webmaster Tools
4. **Ongoing:** Impressions and rankings recover

## Prevention

To prevent this in the future:

1. ✅ **Never use fallback category:** Log error instead
2. ✅ **Validate data:** Ensure all days have valid categories
3. ✅ **Monitor 404s:** Check Bing/Google Search Console regularly
4. ✅ **Test builds:** Verify all URLs before deployment
5. ✅ **Use TypeScript:** Strong typing prevents category typos

## Monitoring

### Check for Category Mismatches

```bash
cd frontend
node -e "
const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, 'src/data/categories');
const files = fs.readdirSync(dataDir);
const validCategories = ['Food', 'Awareness & Health', 'Animals & Pets', 'Fun & Weird', 'Holiday', 'Shopping & Deals', 'National', 'International'];

files.forEach(file => {
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
  data.forEach(day => {
    if (!validCategories.includes(day.category)) {
      console.log(\`❌ Invalid category in \${file}: \${day.category} (day: \${day.slug})\`);
    }
  });
});
"
```

### Test Redirects After Implementation

```bash
# Test /other/ redirect
curl -I https://www.thedayof.net/other/national-coffee-day-commercial-deals/

# Should return:
# HTTP/1.1 301 Moved Permanently
# Location: https://www.thedayof.net/food/national-coffee-day-commercial-deals/
```

## Summary

**Problem:** 152 pages with old `/other/` URLs returning 404  
**Cause:** Fallback in `getCategorySlug()` created invalid URLs  
**Solution:** Implement middleware with 301 redirects  
**Timeline:** 1 week for full recovery

---

**Next Steps:**
1. Implement middleware with redirects
2. Remove 'other' fallback
3. Validate all category data
4. Deploy and monitor
5. Submit to IndexNow

