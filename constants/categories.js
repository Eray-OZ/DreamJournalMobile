
// Dream categories with translation keys
export const CATEGORIES = [
  { id: 'all', labelKey: 'cat_all', icon: '🌙' },
  { id: 'fear', labelKey: 'cat_fear', icon: '😨' },
  { id: 'relationship', labelKey: 'cat_relationship', icon: '❤️' },
  { id: 'work', labelKey: 'cat_work', icon: '💼' },
  { id: 'family', labelKey: 'cat_family', icon: '👨‍👩‍👧‍👦' },
  { id: 'past', labelKey: 'cat_past', icon: '⏪' },
  { id: 'future', labelKey: 'cat_future', icon: '🔮' },
  { id: 'other', labelKey: 'cat_other', icon: '✨' },
];

// Category colors for calendar dots
export const CATEGORY_COLORS = {
  fear: '#EF4444',
  relationship: '#EC4899',
  work: '#F59E0B',
  family: '#10B981',
  past: '#6366F1',
  future: '#8B5CF6',
  other: '#6B7280',
};

// Get category by id
export const getCategoryById = (id) => {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
};

// Get category icon
export const getCategoryIcon = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category?.icon || '✨';
};

// Get translated category label
export const getCategoryLabel = (categoryId, t) => {
  const category = getCategoryById(categoryId);
  return t(category?.labelKey) || categoryId;
};
