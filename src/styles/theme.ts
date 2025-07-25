// Modern Design System for "Từ Vựng Mỗi Ngày" app

export const colors = {
  // Primary gradient colors - Modern blue gradient
  primary: '#667eea',
  primaryDark: '#5a67d8',
  primaryLight: '#e6fffa',
  primaryGradient: ['#667eea', '#764ba2'],

  // Secondary gradient colors - Warm gradient
  secondary: '#f093fb',
  secondaryDark: '#f5576c',
  secondaryLight: '#fef7ff',
  secondaryGradient: ['#f093fb', '#f5576c'],

  // Success colors - Fresh green
  success: '#48bb78',
  successLight: '#f0fff4',
  successGradient: ['#48bb78', '#38a169'],

  // Warning colors - Warm orange
  warning: '#ed8936',
  warningLight: '#fffaf0',
  warningGradient: ['#ed8936', '#dd6b20'],

  // Topic colors - Beautiful gradients
  topicColors: {
    fruits: {
      primary: '#ff6b6b',
      secondary: '#ffa8a8',
      gradient: ['#ff6b6b', '#ff8e8e'],
      light: '#fff5f5'
    },
    animals: {
      primary: '#4ecdc4',
      secondary: '#81e6d9',
      gradient: ['#4ecdc4', '#38b2ac'],
      light: '#f0fdfa'
    },
    colors: {
      primary: '#ffd93d',
      secondary: '#faf089',
      gradient: ['#ffd93d', '#f6e05e'],
      light: '#fffff0'
    },
    family: {
      primary: '#ff8a65',
      secondary: '#ffab91',
      gradient: ['#ff8a65', '#ff7043'],
      light: '#fff3e0'
    },
    jobs: {
      primary: '#a78bfa',
      secondary: '#c4b5fd',
      gradient: ['#a78bfa', '#8b5cf6'],
      light: '#faf5ff'
    },
  },

  // Text colors - Better contrast
  textPrimary: '#1a202c',
  textSecondary: '#4a5568',
  textLight: '#a0aec0',
  textWhite: '#ffffff',
  textMuted: '#718096',

  // Background colors - Clean and modern
  background: '#f7fafc',
  backgroundWhite: '#ffffff',
  backgroundLight: '#edf2f7',
  backgroundCard: '#ffffff',

  // Border colors - Subtle
  border: '#e2e8f0',
  borderLight: '#f1f5f9',

  // Shadow colors
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.15)',
};

export const typography = {
  // Font sizes - larger for better readability
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    huge: 32,
  },
  
  // Font weights
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 15,
  xl: 20,
  round: 50,
};

export const shadows = {
  small: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  large: {
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
  },
  card: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
  },
};

// Common component styles
export const commonStyles = {
  // Card styles
  card: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    ...shadows.card,
  },

  // Gradient card
  gradientCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    ...shadows.medium,
  },

  // Button styles
  button: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...shadows.small,
  },

  // Gradient button
  gradientButton: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.xl,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    ...shadows.medium,
  },

  // Input styles
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    fontSize: typography.sizes.md,
    color: colors.textPrimary,
    backgroundColor: colors.backgroundWhite,
  },

  // Header styles
  header: {
    backgroundColor: colors.backgroundWhite,
    padding: spacing.xl,
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
    ...shadows.card,
    marginBottom: spacing.xl,
    alignItems: 'center' as const,
  },

  // Section styles
  section: {
    backgroundColor: colors.backgroundCard,
    padding: spacing.xl,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    ...shadows.card,
  },
};

// Accessibility helpers
export const accessibility = {
  // Minimum touch target size (44x44 points)
  minTouchTarget: 44,
  
  // High contrast colors for better visibility
  highContrast: {
    text: colors.textPrimary,
    background: colors.backgroundWhite,
    border: colors.textPrimary,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  commonStyles,
  accessibility,
};
