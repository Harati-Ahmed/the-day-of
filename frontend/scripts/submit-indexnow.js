/**
 * IndexNow Submission Script
 * Submits all site URLs to IndexNow API for instant indexing
 * Run after deployment: node scripts/submit-indexnow.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Read all category JSON files
const dataDir = path.join(__dirname, '../src/data/categories');
const categoryFiles = [
  'food.json',
  'awareness.json',
  'animals.json',
  'fun.json',
  'holiday.json',
  'shopping.json',
  'national.json',
  'international.json'
];

// Load all days from category files
const days = [];
categoryFiles.forEach(file => {
  const filePath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  days.push(...data);
});

// Define categories
const categories = [
  { name: 'Food', slug: 'food' },
  { name: 'Awareness', slug: 'awareness-health' },
  { name: 'Animals', slug: 'animals-pets' },
  { name: 'Fun', slug: 'fun-weird' },
  { name: 'Holiday', slug: 'holiday' },
  { name: 'Shopping', slug: 'shopping-deals' },
  { name: 'National', slug: 'national' },
  { name: 'International', slug: 'international' }
];

// Your IndexNow API Key
const API_KEY = '4d6622cdf7544226b205126f222df023';
const SITE_URL = 'https://www.thedayof.net';
const KEY_LOCATION = `${SITE_URL}/${API_KEY}.txt`;

// Helper function to get category slug - matches utils.ts logic
function getCategorySlug(category) {
  const categoryMap = {
    'Food': 'food',
    'Awareness': 'awareness-health',
    'Awareness & Health': 'awareness-health',
    'Animals': 'animals-pets',
    'Animals & Pets': 'animals-pets',
    'Fun': 'fun-weird',
    'Fun & Weird': 'fun-weird',
    'Holiday': 'holiday',
    'Shopping': 'shopping-deals',
    'Shopping & Deals': 'shopping-deals',
    'National': 'national',
    'International': 'international'
  };
  
  // First try exact match
  if (categoryMap[category]) {
    return categoryMap[category];
  }
  
  // Fallback: remove ampersand first, then replace spaces
  return category
    .toLowerCase()
    .replace(/[&]/g, '')  // Remove ampersand first
    .replace(/\s+/g, '-')  // Then replace spaces with dashes
    .replace(/-+/g, '-')   // Replace multiple dashes with single dash
    .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
    .trim();
}

// Generate all URLs from your site
function generateAllUrls() {
  const urls = [];
  
  // Static pages
  const staticPages = [
    '/',
    '/today/',
    '/categories/',
    '/calendar/',
    '/search/',
    '/about/',
    '/contact/',
    '/privacy/',
    '/terms/',
  ];
  
  staticPages.forEach(page => {
    urls.push(`${SITE_URL}${page}`);
  });
  
  // Category pages
  categories.forEach(category => {
    urls.push(`${SITE_URL}/category/${category.slug}/`);
  });
  
  // Month pages
  const months = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  
  months.forEach(month => {
    urls.push(`${SITE_URL}/month/${month}/`);
  });
  
  // Day pages
  days.forEach(day => {
    const categorySlug = getCategorySlug(day.category);
    urls.push(`${SITE_URL}/${categorySlug}/${day.slug}/`);
  });
  
  // Note: Year pages removed - route doesn't exist, was causing 404s
  
  return urls;
}

// Submit URLs to IndexNow in batches
async function submitToIndexNow(urls, batchSize = 100) {
  console.log(`📋 Preparing to submit ${urls.length} URLs to IndexNow...`);
  
  // Split URLs into batches (IndexNow accepts up to 10,000 URLs per request, but we'll use 100 for safety)
  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }
  
  console.log(`📦 Split into ${batches.length} batches of ${batchSize} URLs each\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`🚀 Submitting batch ${i + 1}/${batches.length} (${batch.length} URLs)...`);
    
    try {
      await submitBatch(batch);
      successCount += batch.length;
      console.log(`✅ Batch ${i + 1} submitted successfully!\n`);
      
      // Wait 1 second between batches to avoid rate limiting
      if (i < batches.length - 1) {
        await sleep(1000);
      }
    } catch (error) {
      failCount += batch.length;
      console.error(`❌ Batch ${i + 1} failed:`, error.message, '\n');
    }
  }
  
  console.log('\n📊 SUMMARY:');
  console.log(`✅ Successfully submitted: ${successCount} URLs`);
  console.log(`❌ Failed: ${failCount} URLs`);
  console.log(`📈 Total: ${urls.length} URLs`);
  
  if (successCount > 0) {
    console.log('\n🎉 IndexNow submission complete!');
    console.log('⏰ Search engines will be notified within minutes.');
    console.log('📊 Check Bing Webmaster Tools in 24-48 hours for indexing progress.');
  }
}

// Submit a single batch to IndexNow API
function submitBatch(urls) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      host: 'www.thedayof.net',
      key: API_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    });
    
    const options = {
      hostname: 'api.indexnow.org',
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ statusCode: res.statusCode, body: data });
        } else if (res.statusCode === 202) {
          // 202 Accepted is also success
          resolve({ statusCode: res.statusCode, body: data });
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(postData);
    req.end();
  });
}

// Helper function to sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Main execution
async function main() {
  console.log('🚀 IndexNow URL Submission Script');
  console.log('==================================\n');
  
  try {
    const urls = generateAllUrls();
    await submitToIndexNow(urls);
  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main();

