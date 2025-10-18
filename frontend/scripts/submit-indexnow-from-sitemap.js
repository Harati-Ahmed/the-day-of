/**
 * IndexNow Submission Script (Sitemap-based)
 * Submits all URLs from your sitemap to IndexNow API for instant indexing
 * Run after deployment: node scripts/submit-indexnow-from-sitemap.js
 */

const https = require('https');

// Your IndexNow API Key
const API_KEY = '4d6622cdf7544226b205126f222df023';
const SITE_URL = 'https://www.thedayof.net';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const KEY_LOCATION = `${SITE_URL}/${API_KEY}.txt`;

// Fetch and parse sitemap
function fetchSitemap() {
  return new Promise((resolve, reject) => {
    https.get(SITEMAP_URL, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Failed to fetch sitemap: HTTP ${res.statusCode}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Extract URLs from sitemap XML
function parseUrls(sitemapXml) {
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  
  while ((match = urlRegex.exec(sitemapXml)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

// Submit URLs to IndexNow in batches
async function submitToIndexNow(urls, batchSize = 100) {
  console.log(`📋 Preparing to submit ${urls.length} URLs to IndexNow...`);
  
  // Split URLs into batches
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
    console.log('\n💡 Pro Tip: Run this script after every deployment to keep search engines updated!');
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
        if (res.statusCode === 200 || res.statusCode === 202) {
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
    console.log('📥 Fetching sitemap from', SITEMAP_URL, '...');
    const sitemapXml = await fetchSitemap();
    console.log('✅ Sitemap fetched successfully!\n');
    
    console.log('🔍 Parsing URLs from sitemap...');
    const urls = parseUrls(sitemapXml);
    console.log(`✅ Found ${urls.length} URLs\n`);
    
    if (urls.length === 0) {
      console.error('❌ No URLs found in sitemap!');
      process.exit(1);
    }
    
    await submitToIndexNow(urls);
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

