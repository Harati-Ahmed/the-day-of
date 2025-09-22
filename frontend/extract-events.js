#!/usr/bin/env node

/**
 * Extract all event names from category files
 */

const fs = require('fs');
const path = require('path');

// Function to get all events from category files
function getAllEvents() {
  const categoriesDir = path.join(__dirname, 'src/data/categories');
  const categoryFiles = fs.readdirSync(categoriesDir).filter(file => file.endsWith('.json'));
  
  let allEvents = [];
  
  for (const file of categoryFiles) {
    const filePath = path.join(categoriesDir, file);
    const categoryData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allEvents = allEvents.concat(categoryData);
  }
  
  return allEvents;
}

// Main function to extract event names
function extractEventNames() {
  const events = getAllEvents();
  
  console.log(`Total Events: ${events.length}\n`);
  console.log('=== ALL EVENT NAMES ===\n');
  
  events.forEach((event, index) => {
    console.log(`${index + 1}. ${event.title}`);
  });
  
  console.log(`\n=== SUMMARY ===`);
  console.log(`Total Events: ${events.length}`);
  
  // Group by category
  const byCategory = {};
  events.forEach(event => {
    if (!byCategory[event.category]) {
      byCategory[event.category] = [];
    }
    byCategory[event.category].push(event.title);
  });
  
  console.log('\n=== BY CATEGORY ===');
  Object.keys(byCategory).forEach(category => {
    console.log(`\n${category} (${byCategory[category].length} events):`);
    byCategory[category].forEach(title => {
      console.log(`  - ${title}`);
    });
  });
}

// Run the script
if (require.main === module) {
  extractEventNames();
}

module.exports = { extractEventNames, getAllEvents };
