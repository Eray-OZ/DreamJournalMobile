// Design tokens matching the teal theme from design.js
export const colors = {
  // Primary
  primary: '#14B8A6',        // teal-500
  primaryDark: '#0D9488',    // teal-600
  primaryLight: '#5EEAD4',   // teal-300

  // Background
  background: '#000000',
  cardBg: 'rgba(255, 255, 255, 0.1)',
  cardBgHover: 'rgba(255, 255, 255, 0.15)',
  inputBg: 'rgba(255, 255, 255, 0.05)',

  // Borders
  border: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(255, 255, 255, 0.05)',

  // Text
  text: '#FFFFFF',
  textSecondary: '#9CA3AF',  // gray-400
  textMuted: '#6B7280',      // gray-500

  // Danger
  danger: '#EF4444',         // red-500

  // Category colors
  categoryFear: '#EF4444',
  categoryRelationship: '#EC4899',
  categoryWork: '#06B6D4',
  categoryFamily: '#F59E0B',
  categoryPast: '#8B5CF6',
  categoryFuture: '#10B981',
  categoryOther: '#6366F1',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  button: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
};
