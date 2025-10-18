#!/bin/bash
# Script to fix all trailing slash inconsistencies

echo "🔧 Fixing trailing slash inconsistencies..."

# Fix /calendar links
echo "Fixing /calendar links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href="/calendar"|href="/calendar/"|g' {} +

# Fix /categories links  
echo "Fixing /categories links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href="/categories"|href="/categories/"|g' {} +

# Fix /search links
echo "Fixing /search links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href="/search"|href="/search/"|g' {} +

# Fix /about links
echo "Fixing /about links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href="/about"|href="/about/"|g' {} +

# Fix /contact links
echo "Fixing /contact links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href="/contact"|href="/contact/"|g' {} +

# Fix /privacy links
echo "Fixing /privacy links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href="/privacy"|href="/privacy/"|g' {} +

# Fix /terms links
echo "Fixing /terms links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href="/terms"|href="/terms/"|g' {} +

# Fix /today links
echo "Fixing /today links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href="/today"|href="/today/"|g' {} +

# Fix category links /category/${slug}
echo "Fixing /category/... links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href={`/category/\${|href={`/category/${|g' {} +
find src/ -name "*.tsx" -type f -exec sed -i '' 's|/category/\${[^}]*}`|&/|g' {} +

# Fix month links /month/${month}
echo "Fixing /month/... links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href={`/month/\${|href={`/month/${|g' {} +

# Fix related day links without trailing slashes
echo "Fixing related day links..."
find src/ -name "*.tsx" -type f -exec sed -i '' 's|\${getCategorySlug(relatedDay\.category)}/\${relatedDay\.slug}`|\${getCategorySlug(relatedDay.category)}/\${relatedDay.slug}/`|g' {} +
find src/ -name "*.tsx" -type f -exec sed -i '' 's|\${getCategorySlug(event\.category)}/\${event\.slug}`|\${getCategorySlug(event.category)}/\${event.slug}/`|g' {} +
find src/ -name "*.tsx" -type f -exec sed -i '' 's|\${getCategorySlug(day\.category)}/\${day\.slug}`|\${getCategorySlug(day.category)}/\${day.slug}/`|g' {} +
find src/ -name "*.tsx" -type f -exec sed -i '' 's|\${getCategorySlug(monthDay\.category)}/\${monthDay\.slug}`|\${getCategorySlug(monthDay.category)}/\${monthDay.slug}/`|g' {} +

# Fix /category/${cat.slug} in search
find src/ -name "*.tsx" -type f -exec sed -i '' 's|href={`/category/\${cat\.slug}`}|href={`/category/\${cat.slug}/`}|g' {} +

echo "✅ All trailing slashes fixed!"

