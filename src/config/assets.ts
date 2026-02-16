/**
 * Centralized asset configuration for the application
 * Manages all image assets, logos, and media files
 * 
 * Benefits:
 * - Single source of truth for asset paths
 * - Easy to update asset locations across the app
 * - Type-safe asset references
 * - Enables asset validation and optimization
 */

export const ASSETS = {
  // Logo configurations with multiple sizes and formats
  logo: {
    // Icon version (small, square format for headers and sidebars)
    icon: {
      src: '/logos/analyst-icon.png',
      alt: 'Analyst Platform Logo',
      width: 40,
      height: 40,
      formats: ['png', 'webp'], // For future optimization
    },
    // Full logo with text
    full: {
      src: '/logos/analyst-full.png',
      alt: 'Analyst Platform - Full Logo',
      width: 200,
      height: 60,
    },
    // Alternative dark version for light backgrounds
    dark: {
      src: '/logos/analyst-dark.png',
      alt: 'Analyst Platform Logo - Dark',
      width: 40,
      height: 40,
    },
    // Alternative light version for dark backgrounds
    light: {
      src: '/logos/analyst-light.png',
      alt: 'Analyst Platform Logo - Light',
      width: 40,
      height: 40,
    },
  },

  // Favicon configuration
  favicon: {
    src: '/favicon-32x32.png',
    alt: 'Analyst Favicon',
  },

  // Apple touch icon (for iOS home screen)
  appleTouchIcon: {
    src: '/apple-touch-icon.png',
    alt: 'Analyst Apple Touch Icon',
  },
} as const;

/**
 * Helper function to get logo source based on theme
 * Ensures logo always has appropriate contrast
 */
export function getLogoForTheme(theme: 'dark' | 'light') {
  return theme === 'dark' ? ASSETS.logo.light.src : ASSETS.logo.dark.src;
}

/**
 * Helper function to validate asset exists
 * Used for error handling and graceful degradation
 */
export async function validateAsset(src: string): Promise<boolean> {
  try {
    const response = await fetch(src, { method: 'HEAD' });
    return response.ok;
  } catch {
    console.warn(`[Assets] Failed to validate asset: ${src}`);
    return false;
  }
}

/**
 * Get optimized logo with fallback support
 */
export const getOptimizedLogo = (variant: 'icon' | 'full' = 'icon') => {
  return ASSETS.logo[variant].src;
};
