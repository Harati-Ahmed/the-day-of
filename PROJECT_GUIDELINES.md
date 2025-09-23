# TheDayOf Project – Content & SEO Guideline for Cursor

## 1️⃣ Project Overview
- **Goal**: Build a comprehensive website covering all US (and eventually Canada) national days, holidays, fun days, food days, awareness days, etc.
- **Target**: Start with 50–100 pages (timely upcoming days), scale to 2,000+ pages.
- **Focus**: SEO-first content that is fast, structured, and high-quality.

## 2️⃣ Content Source
- **Starting point**: JSON file (`days.json`) containing entries like:

```json
{
  "title": "National Coffee Day",
  "slug": "national-coffee-day",
  "date": "2025-09-29",
  "category": "Food",
  "description": "Celebrate the magic of coffee! Enjoy your favorite cup and discover coffee facts and traditions."
}
```

- **Each entry must have**:
  - `title` → Page H1 + SEO title reference
  - `slug` → URL-friendly lowercase, hyphens instead of spaces
  - `date` → Exact date (YYYY-MM-DD)
  - `category` → One of the main categories
  - `description` → 2–3 sentence short description

## 3️⃣ Categories
- **Primary categories** (used in JSON + URL structure):
  1. **National**
  2. **International**
  3. **Food**
  4. **Animals / Pets**
  5. **Fun / Weird**
  6. **Awareness / Health**
  7. **Holiday**
  8. **Shopping / Deals**

- **Guidelines**:
  - Each page must belong to exactly one category.
  - Use categories in URLs for SEO: `/category/slug` → `/food/national-coffee-day`

## 4️⃣ Tags
- **Tags are for cross-linking content**:
  - Examples: `coffee`, `holiday`, `October`, `2025`, `fun`, `awareness`
  - Tags should always be lowercase and relevant to the page content.
  - Avoid duplicate or unnecessary tags.

## 5️⃣ SEO Guidelines

### Meta Titles
- Format: `[Day Name] [Year] – TheDayOf`
- Example: `National Coffee Day 2025 – TheDayOf`

### Meta Descriptions
- Length: 120–155 characters
- Include category + main keyword + value for reader
- Example: `Celebrate National Coffee Day 2025 with fun coffee facts, recipes, and ways to enjoy your favorite drink.`

### H1 / H2 Structure
- **H1** → Page title (National Coffee Day)
- **H2** → Sections like History, Fun Facts, How to Celebrate, Recipes

### URL Slugs
- Always lowercase, hyphen-separated
- No spaces, special characters, or duplicates

### Internal Linking
- Link to category page
- Link to the month page
- Link to 3–5 related days (same month or similar theme)

## 6️⃣ Structured Data (JSON-LD)
- **Use FAQ / Event / ItemList schema where applicable**:
  - **Event** → For holidays / awareness days
  - **FAQPage** → If adding common questions (e.g., "How to celebrate?")
  - **ItemList** → For month pages (All days in October)

- **Example for one day**:

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "National Coffee Day",
  "startDate": "2025-09-29",
  "description": "Celebrate the magic of coffee! Enjoy your favorite cup and discover coffee facts and traditions.",
  "url": "https://www.thedayof.net/food/national-coffee-day"
}
```

## 7️⃣ Content Rules
- Each page must be **unique** → no duplicate descriptions or content
- **Minimum 300 words** per day page, can grow to 600–800
- Include images (free stock / royalty-free) with alt text relevant to the day
- Each page must include internal links, tags, and structured data

## 8️⃣ File / JSON Naming Guidelines
- **JSON file names**: `days.json` → append new entries as project grows
- **Slugs**: `[category]/[slug]`
- **Example**:

```json
{
  "title": "National Taco Day",
  "slug": "national-taco-day",
  "category": "Food"
}
```

- Keep all slugs lowercase and no special characters

## 9️⃣ Project Schedule / Roadmap
- **Phase 1**: End of September → Build first 50–100 pages for upcoming days
- **Phase 2**: October–November → Add 500+ pages (all US national / fun / awareness days)
- **Phase 3**: December → Reach 2,000 pages including Canada days + international days
- **Ongoing**: Add monthly new day pages as new observances are announced
- **Batch process**:
  - Every week, add 10–20 new day entries to JSON
  - Generate pages automatically via Next.js from JSON

## 🔹 Summary for Cursor
1. Pull day entries from JSON
2. Generate pages using template: title, description, H1/H2, images
3. Add tags, category links, month links, related days
4. Apply structured data JSON-LD correctly
5. Ensure unique content and SEO-friendly URLs / titles / descriptions
6. Follow the roadmap to scale from 50 → 2,000 pages
7. Avoid duplicate tags, slugs, or content

---

## Quick Reference

### Category URLs
- `/national/[slug]`
- `/international/[slug]`
- `/food/[slug]`
- `/animals-pets/[slug]`
- `/fun-weird/[slug]`
- `/awareness-health/[slug]`
- `/holiday/[slug]`
- `/shopping-deals/[slug]`

### Required Fields per Day Entry
```json
{
  "title": "string",
  "slug": "string",
  "date": "YYYY-MM-DD",
  "category": "string",
  "description": "string",
  "tags": ["array", "of", "strings"],
  "image": "string (optional)",
  "relatedDays": ["array", "of", "slugs"]
}
```

### SEO Checklist per Page
- [ ] Unique H1 title
- [ ] Meta title under 60 characters
- [ ] Meta description 120-155 characters
- [ ] At least 300 words of unique content
- [ ] Proper H2 structure
- [ ] Internal links to category and month pages
- [ ] 3-5 related day links
- [ ] Structured data JSON-LD
- [ ] Alt text for images
- [ ] Mobile-responsive design
