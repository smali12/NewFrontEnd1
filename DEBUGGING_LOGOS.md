# Logo Debugging Guide

## Quick Diagnostics

### Method 1: Browser Console (Recommended)

1. Open your app in the browser
2. Open Developer Tools (F12 or Right-click → Inspect)
3. Go to the **Console** tab
4. Run the diagnostic tool:

```javascript
// Import and run diagnostics
import { runLogoDiagnostics } from '@/utils/logoDiagnostics';
runLogoDiagnostics();

// Or use the global shortcut (in development)
window.__logoDiagnostics.run();

// Or quick asset check only
window.__logoDiagnostics.quickCheck();
```

### Method 2: Manual Network Check

1. Open DevTools (F12)
2. Go to **Network** tab
3. Reload the page (Ctrl+R)
4. Filter by "analyst-icon" or "yellowlogo"
5. Check if files show status **200** (success)
   - ✅ 200 = File loaded successfully
   - ❌ 404 = File not found
   - ❌ 403 = Access denied

---

## Common Issues & Fixes

### Issue: Logo Shows as Blank Space

**Diagnosis:**
- Network tab shows 404 errors for logo files
- Console shows "Failed to load image"

**Fix:**
```bash
# 1. Verify files exist
ls -la public/logos/

# 2. Check filename spelling (case-sensitive on Linux)
# Should be exactly: analyst-icon.png

# 3. Restart dev server
npm run dev
# or
pnpm dev
```

---

### Issue: Logo Appears Blurry/Pixelated

**Diagnosis:**
- Logo renders but looks low quality
- Image appears stretched or distorted

**Fix:**
```typescript
// Ensure proper image sizing in Logo.tsx
<img
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'contain',  // ← This is important
  }}
/>

// Or use Next.js Image for automatic optimization
import Image from 'next/image';
<Image
  src="/logos/analyst-icon.png"
  width={40}
  height={40}
  quality={95}  // High quality
/>
```

---

### Issue: Logo Only Shows on Desktop, Not Mobile

**Diagnosis:**
- Logo appears on desktop but not on mobile/tablet
- Sidebar appears but logo is missing

**Fix:**
```typescript
// Check MainLayout.tsx mobile section
// Should include Logo component in both mobile header AND desktop sidebar

// Mobile Header (around line 150)
<Logo
  variant="icon"
  size="medium"
  showText={true}  // Mobile needs text
/>

// Desktop Sidebar (around line 220)
<Logo
  variant="icon"
  size="medium"
  showText={!collapsed}  // Desktop can hide text when collapsed
/>
```

---

### Issue: Logo Doesn't Respond to Theme Changes

**Diagnosis:**
- Logo stays same color when theme changes
- Should be light on dark background, dark on light background

**Fix:**
```typescript
// Update MainLayout.tsx to use theme-aware Logo
import { useTheme } from '@/contexts/ThemeContext';

const { actualTheme } = useTheme();

<Logo
  theme={actualTheme === 'dark' ? 'dark' : 'light'}
/>
```

---

### Issue: Logo Takes Too Long to Load / Page Flash

**Diagnosis:**
- Page renders without logo first, then logo appears
- Noticeable delay between page load and logo showing

**Fix:**
```typescript
// Use OptimizedLogo with priority
import { OptimizedLogo } from '@/components/Logo';

<OptimizedLogo
  priority={true}  // Preload this image
  size="medium"
/>

// Or add preload link in layout.tsx
<link
  rel="preload"
  as="image"
  href="/logos/analyst-icon.png"
/>
```

---

### Issue: CORS Errors in Console

**Diagnosis:**
- Console shows: "Cross-Origin Request Blocked"
- Logo doesn't load from certain domains

**Fix:**
```typescript
// The Logo component already includes crossOrigin
<img
  src="/logos/analyst-icon.png"
  crossOrigin="anonymous"  // ← Already set in Logo.tsx
/>

// If using fetch:
fetch('/logos/analyst-icon.png', {
  headers: { 'Access-Control-Allow-Origin': '*' }
})
```

---

## Step-by-Step Troubleshooting

### Step 1: Check File Exists
```bash
# List files in public/logos/
ls -la public/logos/

# Expected output:
# -rw-r--r--  analyst-icon.png
# -rw-r--r--  analyst-full.png
# -rw-r--r--  analyst-dark.png
# -rw-r--r--  analyst-light.png
```

### Step 2: Verify Configuration
```typescript
// Check src/config/assets.ts
import { ASSETS } from '@/config/assets';

// In browser console:
console.log(ASSETS.logo);

// Should show all logo configurations
```

### Step 3: Test Component
```typescript
// Create a test page at app/debug/logo/page.tsx
'use client';

import { Logo } from '@/components/Logo';
import { OptimizedLogo } from '@/components/Logo';

export default function LogoDebug() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Logo Test Page</h1>

      <h2>Regular Logo Component</h2>
      <Logo variant="icon" size="medium" />

      <h2>With Text</h2>
      <Logo variant="icon" size="medium" showText={true} />

      <h2>Different Sizes</h2>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <Logo size="small" />
        <Logo size="medium" />
        <Logo size="large" />
      </div>

      <h2>Optimized Version</h2>
      <OptimizedLogo size="medium" priority={true} />

      <h2>Theme Test</h2>
      <div style={{ background: '#000', padding: '20px', marginTop: '20px' }}>
        <Logo theme="dark" size="medium" showText={true} />
      </div>
    </div>
  );
}
```

Visit `http://localhost:3000/debug/logo` to test all logo variations.

### Step 4: Check CSS
```typescript
// Open DevTools and inspect logo element
// Right-click logo → Inspect

// Check if any CSS hides it:
// ❌ display: none
// ❌ visibility: hidden
// ❌ opacity: 0
// ❌ width: 0 or height: 0
// ❌ color: transparent (for fallback text)
```

### Step 5: Monitor Network Traffic
```bash
# Open DevTools → Network tab
# Reload page
# Look for logo file requests

# Each should show:
# Request URL: /logos/analyst-icon.png
# Status: 200
# Size: ~15-30KB
# Time: <100ms
```

---

## Advanced Diagnostics

### Check Image Metadata
```javascript
// In browser console
const img = document.querySelector('img[alt*="Logo"]');
console.log({
  src: img.src,
  naturalWidth: img.naturalWidth,
  naturalHeight: img.naturalHeight,
  width: img.width,
  height: img.height,
  complete: img.complete,
  currentSrc: img.currentSrc,
});
```

### Monitor Image Load Events
```javascript
// Track when images load
const imgs = document.querySelectorAll('img[alt*="Logo"]');
imgs.forEach(img => {
  img.addEventListener('load', () => console.log('✓ Loaded:', img.src));
  img.addEventListener('error', () => console.error('✗ Error:', img.src));
});
```

### Performance Analysis
```javascript
// Check if logos are affecting page load time
const performance = window.performance;
const resources = performance.getEntriesByType('resource');
const logoResources = resources.filter(r => r.name.includes('logo'));

console.table(logoResources.map(r => ({
  name: r.name.split('/').pop(),
  size: r.transferSize,
  time: r.duration.toFixed(2) + 'ms'
})));
```

---

## Recovery Steps

### If Logo Completely Broken

1. **Quick fallback:**
```typescript
// Temporarily use text-based logo
<div style={{
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '20px',
  borderRadius: '8px',
  backgroundColor: '#FEC00F',
}}>
  A
</div>
```

2. **Restore original image:**
```bash
# Use the yellowlogo.png from public/
# Update src/config/assets.ts to point to /yellowlogo.png
```

3. **Force cache clear:**
```bash
# Clear build cache
rm -rf .next/

# Restart dev server
npm run dev
```

---

## Prevention Tips

1. **Always test after logo changes:**
   - Desktop view
   - Mobile/tablet view
   - Both light and dark themes
   - All supported browsers

2. **Keep assets organized:**
```
public/
└── logos/
    ├── analyst-icon.png       (40x40)
    ├── analyst-full.png       (200x60)
    ├── analyst-dark.png       (40x40)
    └── analyst-light.png      (40x40)
```

3. **Use centralized configuration:**
   - Update `src/config/assets.ts` when changing paths
   - Don't hardcode paths in components

4. **Monitor performance:**
   - Keep logo files < 30KB
   - Use WebP when possible
   - Compress PNG files

5. **Version control assets:**
```bash
# Git track logo files
git add public/logos/
git add src/config/assets.ts

# Don't track source files
echo "*.psd" >> .gitignore
```

---

## Getting Help

If diagnostics don't reveal the issue:

1. **Check the logs:**
   - Terminal: Any build errors?
   - Browser Console: Any JavaScript errors?
   - Network Tab: Any failed requests?

2. **Review recent changes:**
   - Was the logo working before?
   - What changed recently?
   - Revert to see if it fixes it

3. **Isolate the problem:**
   - Create a minimal test component
   - Test with direct `<img>` tag
   - Test with Next.js `<Image>` component

4. **Browser compatibility:**
   - Try different browser
   - Try incognito/private mode
   - Check browser console for errors

---

**For more details, see:** `LOGO_ASSETS_GUIDE.md`
