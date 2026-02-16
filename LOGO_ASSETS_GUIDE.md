# Logo & Asset Management Guide

## Overview

This guide explains how logos and assets are managed in the Analyst Platform, ensuring consistent, responsive, and optimized rendering across all devices.

---

## Directory Structure

```
public/
├── logos/
│   ├── analyst-icon.png          # Icon version (40x40)
│   ├── analyst-icon.webp         # Optimized webp version
│   ├── analyst-full.png          # Full logo with text
│   ├── analyst-dark.png          # Dark theme variant
│   └── analyst-light.png         # Light theme variant
├── favicon-32x32.png
├── apple-touch-icon.png
└── [other assets]

src/
├── config/
│   └── assets.ts                 # Centralized asset configuration
├── components/
│   └── Logo.tsx                  # Logo component (client-safe)
└── layouts/
    └── MainLayout.tsx            # Uses Logo component
```

---

## Common Logo Issues & Solutions

### Issue 1: Logo Not Appearing

**Symptoms:**
- Blank space where logo should be
- No image displayed on sidebar or header
- Network errors in console

**Root Causes & Solutions:**

| Cause | Solution |
|-------|----------|
| Incorrect file path | Verify path in `src/config/assets.ts` matches actual file location |
| File doesn't exist | Ensure logo files exist in `public/logos/` directory |
| CORS issues | Add `crossOrigin="anonymous"` to img tags (already done in Logo component) |
| Image too large | Compress logo files; recommended max 50KB per image |
| Missing alt text | Alt text is required for accessibility and SEO |
| CSS hiding the image | Check for `display: none`, `width: 0`, `height: 0` styles |

### Issue 2: Logo Looks Blurry or Pixelated

**Solutions:**
- Use `object-fit: contain` for proper scaling
- Provide high-DPI versions (2x, 3x)
- Use WebP format for better compression
- Ensure logo is SVG or PNG at actual display size

### Issue 3: Logo Not Responsive

**Solutions:**
- Use the `Logo` component with `size` prop
- Adjust responsive sizes in `sizeMap` object
- Use media queries for different breakpoints
- Test on actual mobile devices

---

## Usage

### Basic Logo Component

```tsx
import { Logo } from '@/components/Logo';

export function MyComponent() {
  return (
    <Logo
      variant="icon"           // 'icon' | 'full'
      theme="light"            // 'light' | 'dark' (for contrast)
      size="medium"            // 'small' | 'medium' | 'large'
      showText={false}         // Show "ANALYST" text
    />
  );
}
```

### With Theme Support

```tsx
import { Logo } from '@/components/Logo';
import { useTheme } from '@/contexts/ThemeContext';

export function Header() {
  const { actualTheme } = useTheme();
  
  return (
    <Logo
      variant="icon"
      theme={actualTheme === 'dark' ? 'dark' : 'light'}
      size="medium"
      showText={true}
    />
  );
}
```

### Optimized Image Version

```tsx
import { OptimizedLogo } from '@/components/Logo';

export function LandingPage() {
  return (
    <OptimizedLogo
      variant="full"
      size="large"
      priority={true}  // For above-the-fold content
    />
  );
}
```

---

## Asset Configuration

All assets are centralized in `src/config/assets.ts`:

```typescript
export const ASSETS = {
  logo: {
    icon: { src: '/logos/analyst-icon.png', width: 40, height: 40 },
    full: { src: '/logos/analyst-full.png', width: 200, height: 60 },
    dark: { src: '/logos/analyst-dark.png', width: 40, height: 40 },
    light: { src: '/logos/analyst-light.png', width: 40, height: 40 },
  },
};
```

**Benefits:**
- Single source of truth for all asset paths
- Type-safe references
- Easy bulk updates
- Version control friendly

---

## Best Practices for Next.js

### 1. File Organization

```
✅ DO:
- Store logos in /public/logos/
- Group related assets together
- Use descriptive filenames
- Maintain a config file for all paths

❌ DON'T:
- Store logos in random directories
- Hardcode paths in components
- Use unclear names like 'logo1.png'
- Mix different asset versions
```

### 2. Image Optimization

```typescript
// ✅ RECOMMENDED: Use Next.js Image component
import Image from 'next/image';

<Image
  src="/logos/analyst-icon.png"
  alt="Analyst Logo"
  width={40}
  height={40}
  priority={true}
  quality={95}
/>

// ⚠️ OK: Use regular img tag with optimization settings
<img
  src="/logos/analyst-icon.png"
  alt="Analyst Logo"
  loading="eager"
  decoding="async"
/>
```

### 3. Responsive Images

```typescript
// Use size prop in Logo component
<Logo
  size={isMobile ? 'small' : 'medium'}
  showText={!collapsed}
/>

// Or use CSS media queries
@media (max-width: 640px) {
  .logo { width: 32px; height: 32px; }
}
@media (min-width: 641px) {
  .logo { width: 40px; height: 40px; }
}
```

### 4. Error Handling

```typescript
// Logo component includes fallback
<Logo /> // Falls back to "A" text if image fails

// Or add error handling
<img
  src="/logos/analyst-icon.png"
  onError={(e) => {
    e.currentTarget.src = '/fallback-logo.png';
    console.error('Logo failed to load');
  }}
/>
```

### 5. Accessibility

```typescript
// ✅ Always include alt text
<img alt="Analyst Platform Logo" />

// ✅ Use aria-label for meaningful descriptions
<Logo aria-label="Analyst Platform Logo" />

// ✅ Use semantic HTML
<header>
  <Logo variant="icon" showText={true} />
</header>
```

### 6. Performance

```typescript
// ✅ Preload critical images
<link rel="preload" as="image" href="/logos/analyst-icon.png" />

// ✅ Use modern formats
<picture>
  <source srcSet="/logos/analyst-icon.webp" type="image/webp" />
  <img src="/logos/analyst-icon.png" alt="Logo" />
</picture>

// ✅ Lazy load non-critical images
<img loading="lazy" src="/logos/..." />

// ✅ Optimize file size
- PNG: 15-30KB
- WebP: 8-15KB
- SVG: 2-5KB (if possible)
```

---

## File Size Guidelines

| Format | Recommended Size | Max Size | Use Case |
|--------|-----------------|----------|----------|
| PNG    | 15-20KB         | 50KB     | Fallback, transparency needed |
| WebP   | 8-12KB          | 30KB     | Modern browsers, better compression |
| SVG    | 2-5KB           | 20KB     | Scalable logos, animations |
| JPEG   | 10-20KB         | 40KB     | Photos (not recommended for logos) |

---

## Troubleshooting Checklist

Before assuming the logo is broken, verify:

- [ ] File exists at the specified path
- [ ] File extension is correct (.png, .jpg, .webp, etc.)
- [ ] Path is relative to `/public/` (e.g., `/logos/analyst-icon.png`)
- [ ] File permissions allow public access
- [ ] No typos in filename (case-sensitive on Linux)
- [ ] CSS doesn't hide the element (`display: none`, `visibility: hidden`)
- [ ] Container has explicit width/height
- [ ] Image doesn't have `width: 0` or `height: 0`
- [ ] Alt text is present (if using img tag)
- [ ] Browser cache is cleared (Ctrl+Shift+Delete)
- [ ] Console has no CORS or 404 errors
- [ ] Network tab shows successful request (200 status)

---

## Adding New Logos

### Step 1: Prepare the File

```bash
# Optimize PNG
pnpx imagemin logo.png --out-dir=public/logos/

# Convert to WebP
cwebp logo.png -o public/logos/logo.webp
```

### Step 2: Add to Configuration

```typescript
// src/config/assets.ts
export const ASSETS = {
  logo: {
    newLogo: {
      src: '/logos/new-logo.png',
      alt: 'Description',
      width: 40,
      height: 40,
    },
  },
};
```

### Step 3: Use in Component

```tsx
import { Logo } from '@/components/Logo';
import { ASSETS } from '@/config/assets';

<Logo variant="newLogo" />
// or
<img src={ASSETS.logo.newLogo.src} alt={ASSETS.logo.newLogo.alt} />
```

---

## Mobile & Responsive Considerations

### Sidebar Logo (Desktop/Mobile)

```typescript
// Desktop: 40x40px with text
// Tablet: 40x40px, text hidden
// Mobile: 40x40px with text in header

<Logo
  size={isMobile ? 'medium' : 'medium'}
  showText={isMobile || !collapsed}
  theme={isDark ? 'dark' : 'light'}
/>
```

### Header Logo (Mobile Only)

```typescript
// Mobile header: 40x40px with text
// Ensures logo and text fit in 64px header

<Logo size="medium" showText={true} />
```

### Touch Targets

- Minimum 44x44px for touch targets
- Logo should be clickable and at least 44x44px
- Leave 8px padding around clickable logo

---

## SEO & Metadata

### Favicon Configuration

```typescript
// layout.tsx
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
};
```

### Logo Markup

```html
<!-- High-res logo for search engines -->
<meta property="og:image" content="/logos/analyst-full.png" />
<meta name="twitter:image" content="/logos/analyst-full.png" />
```

---

## Version Control

Never commit large binary files directly. Instead:

```bash
# .gitignore
public/logos/*.psd  # Source files
src/assets/*.psd    # Design files

# DO commit optimized versions
public/logos/*.png
public/logos/*.webp
```

---

## Support & Resources

- Next.js Image Optimization: https://nextjs.org/docs/app/building-your-application/optimizing/images
- Web.dev Image Best Practices: https://web.dev/image-optimization/
- Accessible Images: https://www.w3.org/WAI/tutorials/images/

---

**Last Updated:** February 2026
**Maintained By:** Development Team
