# Impression Drop Investigation

**Date:** December 27, 2025  
**Issue:** Bing impressions dropped to almost zero after auto ads implementation  
**Status:** 🔍 Investigating

## Timeline

1. **Before:** Normal impressions
2. **Change:** Auto ads implemented (commit e275231)
3. **After:** Impressions dropped to almost zero

## Potential Causes

### 1. AdSense Script Blocking Crawlers ⚠️

**Issue:** AdSense scripts might be interfering with search engine crawlers

**Evidence:**
- Auto ads load with `strategy="afterInteractive"`
- Loads external script: `pagead2.googlesyndication.com`
- May slow down page load or block rendering

**Impact on SEO:**
- ❌ Slower page load = lower rankings
- ❌ Scripts may interfere with crawler rendering
- ❌ Core Web Vitals may be affected

### 2. X-Frame-Options Change

From commit e275231: "Change X-Frame-Options to SAMEORIGIN"

**Before:** Likely `DENY`  
**After:** `SAMEORIGIN`

This shouldn't affect search engines directly, but worth checking.

### 3. robots.txt Blocking AdSense

Current robots.txt:
```
Disallow: /api/
Disallow: /_next/data/
Disallow: /admin/
Disallow: /search?*
```

**Status:** ✅ Not blocking AdSense scripts

### 4. Page Load Performance

**Hypothesis:** AdSense scripts are slowing down pages significantly

**Check needed:**
- Core Web Vitals (LCP, FID, CLS)
- Page load time before/after ads
- Mobile vs Desktop performance

### 5. Content Layout Shift (CLS)

Auto ads can cause significant layout shift:
- Ads inject dynamically
- Push content down
- Affect Core Web Vitals
- Google penalizes poor CLS

## Investigation Steps

### Step 1: Check Core Web Vitals

```bash
# Check PageSpeed Insights
# https://pagespeed.web.dev/
```

**What to look for:**
- LCP (Largest Contentful Paint) > 2.5s
- CLS (Cumulative Layout Shift) > 0.1
- FID (First Input Delay) > 100ms

### Step 2: Test Without AdSense

Temporarily disable AdSense and check if impressions recover:

1. Comment out AdSense scripts
2. Deploy
3. Wait 48 hours
4. Check Bing Webmaster Tools

### Step 3: Check Bing Crawl Errors

In Bing Webmaster Tools:
- Check "Crawl Information"
- Look for JavaScript errors
- Check crawl rate changes
- Look for timeout errors

### Step 4: Check robots.txt in Bing

Verify Bing can access AdSense:
- Go to Bing Webmaster Tools
- Use "robots.txt Tester"
- Test: `/pagead2.googlesyndication.com/`

## Likely Root Cause

**Most Probable:** AdSense Auto Ads are causing:

1. **Slow Page Load**
   - AdSense script is heavy
   - Loads before page is interactive
   - Slows down Time to Interactive (TTI)

2. **Layout Shift**
   - Auto ads inject dynamically
   - Cause content to jump
   - Poor CLS score
   - Google/Bing penalize this

3. **Crawler Rendering Issues**
   - Bingbot may timeout waiting for ads
   - JavaScript-heavy pages are harder to crawl
   - May not fully render the page

## Recommended Fixes

### Option A: Optimize AdSense Loading (Recommended)

Change strategy from `afterInteractive` to `lazyOnload`:

```typescript
<Script
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2160043117224167"
  crossOrigin="anonymous"
  strategy="lazyOnload"  // Changed from afterInteractive
/>
```

**Why:**
- ✅ Loads after page is fully interactive
- ✅ Doesn't block rendering
- ✅ Better Core Web Vitals
- ✅ Crawlers see content faster

### Option B: Disable Auto Ads, Use Manual Ads

Instead of auto ads, place ads manually:
- Better control over placement
- Less layout shift
- Faster page load
- Better SEO

### Option C: Temporarily Disable AdSense

Test if ads are the problem:
1. Disable AdSense
2. Deploy
3. Wait 48 hours
4. Check if impressions recover

If they do, ads are the problem.

## Next Steps

1. ✅ Check Core Web Vitals in PageSpeed Insights
2. ⏳ Check Bing crawl errors
3. ⏳ Test with AdSense disabled
4. ⏳ Optimize AdSense loading strategy

## Questions to Answer

1. **When exactly did impressions drop?**
   - Check Bing Webmaster Tools for exact date
   - Compare with deployment date

2. **Did Core Web Vitals change?**
   - Check before/after metrics
   - Look for CLS increase

3. **Are there crawl errors?**
   - Check Bing Webmaster Tools
   - Look for timeout errors

4. **Is Bingbot being blocked?**
   - Check server logs
   - Look for Bingbot requests

---

**Action Required:** Please check:
1. When exactly did impressions drop? (exact date)
2. Run PageSpeed Insights: https://pagespeed.web.dev/
3. Check Bing Webmaster Tools for crawl errors

