# TheDayOf - Celebrate Every Day

A comprehensive Next.js 15 website covering all US national days, holidays, fun days, food days, awareness days, and more. Built with modern web technologies and optimized for SEO.

## 🚀 Features

- **2,000+ Special Days**: Comprehensive coverage of holidays, food days, awareness campaigns, and more
- **8 Categories**: Organized by Food, Awareness, Animals, Fun, Holiday, Shopping, National, and International
- **SEO Optimized**: Meta tags, structured data, sitemap, and optimized URLs
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dynamic Pages**: Server-side rendered pages for each special day
- **Calendar View**: Interactive calendar to browse days by month
- **Search Functionality**: Find days by name, description, or tags
- **API Routes**: RESTful API for data fetching
- **Performance**: Fast loading with Next.js 15 and optimized images

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Lucide React (icons)
- **Animations**: Framer Motion
- **Notifications**: React Hot Toast
- **Charts**: Recharts (for future analytics)
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [category]/[slug]/  # Dynamic day pages
│   │   ├── category/[slug]/    # Category pages
│   │   ├── api/               # API routes
│   │   ├── calendar/          # Calendar view
│   │   ├── categories/        # Categories listing
│   │   └── about/             # About page
│   ├── components/            # Reusable components
│   ├── lib/                   # Utilities and data
│   └── types/                 # TypeScript types
├── days.json                  # Main data source
└── PROJECT_GUIDELINES.md      # Content guidelines
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm (preferred over pnpm for this project)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd the-day-of/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📊 Data Structure

Each day entry in `days.json` includes:

```typescript
interface Day {
  title: string;           // "National Coffee Day"
  slug: string;           // "national-coffee-day"
  date: string;           // "2025-09-29"
  category: string;       // "Food"
  description: string;    // Detailed description
  tags: string[];         // ["coffee", "beverage", "September"]
  image: string;          // "coffee-cup-morning.jpg"
  relatedDays: string[];  // Related day slugs
}
```

## 🎯 SEO Features

- **Meta Tags**: Dynamic titles and descriptions for each page
- **Structured Data**: JSON-LD schema for events and articles
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Search engine optimization
- **URL Structure**: SEO-friendly URLs (`/category/slug`)
- **Open Graph**: Social media sharing optimization

## 📱 Pages

- **Homepage**: Featured days, categories, and stats
- **Day Pages**: Individual celebration pages with full content
- **Category Pages**: Filtered views by category
- **Calendar**: Monthly view of all days
- **Categories**: Browse all available categories
- **About**: Information about the project

## 🔧 API Endpoints

- `GET /api/days` - Get all days (with filters)
- `GET /api/days/[slug]` - Get specific day
- `GET /api/categories` - Get all categories

### Query Parameters

- `category` - Filter by category
- `month` - Filter by month
- `year` - Filter by year
- `search` - Search in titles/descriptions
- `upcoming` - Get upcoming days only
- `limit` - Limit number of results

## 🎨 Customization

### Adding New Days

1. Add entries to `days.json`
2. Follow the data structure guidelines
3. Ensure unique slugs and proper categorization
4. Add relevant tags and related days

### Styling

- Uses Tailwind CSS for styling
- Custom utilities in `globals.css`
- Component-specific styles with `cn()` helper
- Responsive design patterns

### Content Guidelines

See `PROJECT_GUIDELINES.md` for detailed content and SEO guidelines.

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy automatically on push to main branch

### Other Platforms

- **Netlify**: Use `npm run build` and deploy `.next` folder
- **Railway**: Deploy with Node.js buildpack
- **AWS/GCP**: Use Docker or serverless functions

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Caching**: Static generation where possible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**TheDayOf** - Making every day worth celebrating! 🎉