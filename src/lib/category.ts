/**
 * Formats a category slug to a proper display name
 * Converts "web-development" to "Web Development"
 */
export function formatCategoryName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Converts a formatted category name to a slug
 * Converts "Web Development" to "web-development"
 */
export function categoryNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

/**
 * Gets the category slug from a URL path
 * Handles both slug format and formatted name format
 */
export function getCategorySlug(category: string): string {
  // If it already looks like a slug (contains hyphens, lowercase), return as-is
  if (category.includes('-') || category === category.toLowerCase()) {
    return category
  }
  // Otherwise, convert formatted name to slug
  return categoryNameToSlug(category)
}

