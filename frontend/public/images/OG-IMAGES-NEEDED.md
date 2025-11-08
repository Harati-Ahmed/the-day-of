# Open Graph Images Required

This document lists all OG (Open Graph) images needed for optimal social media sharing.

## Image Specifications
- **Dimensions:** 1200x630px (Facebook/Twitter/LinkedIn standard)
- **Format:** JPG (better compression for photos) or PNG (if transparency needed)
- **File Size:** < 300KB recommended
- **Safe Zone:** Keep important text/logos within 1080x600px center area

## Required Images

### Core Pages
```
/public/images/og-default.jpg          - Generic fallback (TheDayOf branding + "365+ Celebrations")
/public/images/og-homepage.jpg         - Homepage specific
/public/images/og-today.jpg            - Today page specific
```

### Category Pages
```
/public/images/og-category-food.jpg                    - Food category
/public/images/og-category-holiday.jpg                 - Holiday category
/public/images/og-category-animals-pets.jpg            - Animals & Pets
/public/images/og-category-awareness-health.jpg        - Awareness & Health
/public/images/og-category-international.jpg           - International
/public/images/og-category-fun-weird.jpg               - Fun & Weird
/public/images/og-category-shopping-deals.jpg          - Shopping & Deals
/public/images/og-category-national.jpg                - National
```

### Month Pages (Optional but recommended)
```
/public/images/og-month-january.jpg
/public/images/og-month-february.jpg
... (one for each month)
```

## Design Guidelines

### og-default.jpg (Most Important!)
- TheDayOf logo prominently displayed
- Text: "365+ National Days & Celebrations"
- Bright, celebratory colors (confetti, balloons, etc.)
- This is the fallback for everything, so make it generic but appealing

### og-homepage.jpg
- Similar to default but with tagline
- Text: "Never Miss a Celebration"
- Show variety of celebration icons

### og-today.jpg
- Calendar icon or "TODAY" text prominent
- Dynamic feel (clock, "Live Now", etc.)
- Text: "What's Happening Today?"

### Category OG Images
Each should be themed to its category:
- **Food:** Colorful food items, dining theme
- **Holiday:** Party decorations, festive theme
- **Animals:** Cute animals, pet theme
- **Awareness:** Ribbon colors, supportive theme
- **International:** Globe, world flags
- **Fun & Weird:** Quirky, humorous theme
- **Shopping:** Gift boxes, shopping bags
- **National:** American flag theme

## Quick Creation Options

### Option 1: Canva (Recommended for non-designers)
1. Go to Canva.com
2. Create custom size: 1200 x 630px
3. Use "Social Media" templates
4. Export as JPG

### Option 2: Figma (For designers)
1. Create frame: 1200 x 630px
2. Design with brand colors
3. Export as JPG at 2x quality

### Option 3: Use AI Generation
- Use DALL-E, Midjourney, or similar
- Prompt: "Festive celebration banner, 1200x630px, vibrant colors, [theme]"
- Add text overlay in Canva/Photoshop

### Option 4: Dynamic OG Image Generation (Advanced)
- Use Vercel OG Image Generation
- Or integrate with services like:
  - Cloudinary
  - imgix
  - Bannerbear

## Testing OG Images

After creating images, test them using:
1. **Facebook Debugger:** https://developers.facebook.com/tools/debug/
2. **Twitter Card Validator:** https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

## Current Status

✅ Individual day images exist in `/public/images/food/`, `/public/images/holiday/`, etc.
❌ Core OG images (og-default.jpg, og-homepage.jpg, og-today.jpg) - **NEED TO BE CREATED**
❌ Category OG images - **NEED TO BE CREATED**
❌ Month OG images - **OPTIONAL**

## Priority Order

1. **CRITICAL:** `og-default.jpg` - This is used as fallback everywhere
2. **HIGH:** `og-homepage.jpg` - Homepage gets most traffic
3. **HIGH:** `og-today.jpg` - Today page is key feature
4. **MEDIUM:** Category OG images - Improves category page shares
5. **LOW:** Month OG images - Nice to have

---

**Note:** Until these images are created, the site will attempt to use existing day images or fall back gracefully. However, some social media platforms may show broken images or pull random images from the page.

