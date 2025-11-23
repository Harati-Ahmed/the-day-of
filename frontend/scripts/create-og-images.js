/**
 * Create simple placeholder OG images
 */

const fs = require('fs');
const path = require('path');

// Create a simple SVG-based placeholder
function createOGImage(text, filename) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0284c7"/>
  <text x="600" y="315" font-family="Arial, sans-serif" font-size="60" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
</svg>`;
  
  const outputPath = path.join(__dirname, '../public/images', filename);
  fs.writeFileSync(outputPath, svg);
  console.log(`Created ${filename}`);
}

// Create the OG images
createOGImage('TheDayOf.net', 'og-default.svg');
createOGImage('TheDayOf - Homepage', 'og-homepage.svg');
createOGImage("Today's Celebrations", 'og-today.svg');

console.log('OG images created as SVG files');

