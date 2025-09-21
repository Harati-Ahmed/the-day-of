const fs = require('fs');
const path = require('path');

// Read the main days.json file
const daysData = JSON.parse(fs.readFileSync('./days.json', 'utf8'));

// Create categories object to group days
const categories = {
  'Food': [],
  'Awareness': [],
  'Animals': [],
  'Fun': [],
  'Holiday': [],
  'Shopping': [],
  'National': [],
  'International': []
};

// Group days by category
daysData.forEach(day => {
  if (categories[day.category]) {
    categories[day.category].push(day);
  }
});

// Create directory if it doesn't exist
const categoriesDir = './src/data/categories';
if (!fs.existsSync(categoriesDir)) {
  fs.mkdirSync(categoriesDir, { recursive: true });
}

// Write each category to its own file
Object.keys(categories).forEach(categoryName => {
  const fileName = categoryName.toLowerCase().replace(/\s+/g, '-') + '.json';
  const filePath = path.join(categoriesDir, fileName);
  
  fs.writeFileSync(filePath, JSON.stringify(categories[categoryName], null, 2));
  console.log(`Created ${fileName} with ${categories[categoryName].length} days`);
});

console.log('Category separation completed!');
