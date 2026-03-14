/**
 * Generates vercel.json redirects for old /other/ URLs that cause 404s.
 * Run before deploy: node frontend/scripts/generate-404-redirects.js
 *
 * These redirects fix 151 Google Search Console 404 errors from:
 * - /other/[slug] (old category) -> /[correct-category]/[slug]/
 * - /year/2025, /year/2026 -> /calendar/
 * - /home.html -> /
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data/categories');
const categoryFiles = [
  'food.json',
  'awareness.json',
  'animals.json',
  'fun.json',
  'holiday.json',
  'shopping.json',
  'national.json',
  'international.json',
];

function getCategorySlug(category) {
  const map = {
    Food: 'food',
    Awareness: 'awareness-health',
    'Awareness & Health': 'awareness-health',
    Animals: 'animals-pets',
    'Animals & Pets': 'animals-pets',
    Fun: 'fun-weird',
    'Fun & Weird': 'fun-weird',
    Holiday: 'holiday',
    Shopping: 'shopping-deals',
    'Shopping & Deals': 'shopping-deals',
    National: 'national',
    International: 'international',
  };
  return map[category] || 'fun-weird';
}

const days = [];
categoryFiles.forEach((file) => {
  const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
  days.push(...data);
});

const redirects = [
  { source: '/year/:year*', destination: '/calendar/', permanent: true },
  { source: '/home.html', destination: '/', permanent: true },
  ...days.map((day) => ({
    source: `/other/${day.slug}`,
    destination: `/${getCategorySlug(day.category)}/${day.slug}/`,
    permanent: true,
  })),
  ...days.map((day) => ({
    source: `/other/${day.slug}/`,
    destination: `/${getCategorySlug(day.category)}/${day.slug}/`,
    permanent: true,
  })),
];

const vercelJsonPath = path.join(__dirname, '../../vercel.json');
const vercel = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
vercel.redirects = redirects;
fs.writeFileSync(vercelJsonPath, JSON.stringify(vercel, null, 2));
console.log(`Generated ${redirects.length} redirects (${days.length * 2 + 2} total)`);
console.log('Updated vercel.json');
