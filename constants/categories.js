
// Dream categories with translation keys
export const CATEGORIES = [
  { id: 'all', labelKey: 'cat_all', icon: '🌙' },
  { id: 'Korku', labelKey: 'cat_fear', icon: '😨' },
  { id: 'İlişki', labelKey: 'cat_relationship', icon: '❤️' },
  { id: 'İş', labelKey: 'cat_work', icon: '💼' },
  { id: 'Aile', labelKey: 'cat_family', icon: '👨‍👩‍👧‍👦' },
  { id: 'Geçmiş', labelKey: 'cat_past', icon: '⏪' },
  { id: 'Gelecek', labelKey: 'cat_future', icon: '🔮' },
  { id: 'Diğer', labelKey: 'cat_other', icon: '✨' },
];

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
