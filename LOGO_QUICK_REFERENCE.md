# Logo Quick Reference Card

## 🚀 Quick Start

```typescript
// Import the Logo component
import { Logo } from '@/components/Logo';

// Use it
<Logo size="medium" />
```

---

## 📋 Component Props

```typescript
interface LogoProps {
  variant?: 'icon' | 'full';           // default: 'icon'
  theme?: 'dark' | 'light';             // default: 'light'
  size?: 'small' | 'medium' | 'large';  // default: 'medium'
  showText?: boolean;                   // default: false
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
```

---

## 🎨 Common Patterns

### Basic Logo
```typescript
<Logo />
// Output: 40x40px icon in light theme
```

### Logo with Text
```typescript
<Logo showText={true} />
// Output: Icon + "ANALYST" text
```

### Theme-Aware Logo
```typescript
import { useTheme } from '@/contexts/ThemeContext';

const { actualTheme } = useTheme();
<Logo theme={actualTheme === 'dark' ? 'dark' : 'light'} />
```

### Responsive Logo
```typescript
<Logo
  size={isMobile ? 'small' : 'medium'}
  showText={!isMobile}
/>
```

### Mobile Header Logo
```typescript
<Logo variant="icon" size="medium" showText={true} />
```

### Desktop Sidebar Logo
```typescript
<Logo variant="icon" size="medium" showText={!collapsed} />
```

---

## 🖼️ Asset Configuration

```typescript
// File: src/config/assets.ts
import { ASSETS } from '@/config/assets';

// Access logo sources
ASSETS.logo.icon.src        // '/logos/analyst-icon.png'
ASSETS.logo.full.src        // '/logos/analyst-full.png'
ASSETS.logo.dark.src        // '/logos/analyst-dark.png'
ASSETS.logo.light.src       // '/logos/analyst-light.png'

// Use in custom components
<img src={ASSETS.logo.icon.src} alt={ASSETS.logo.icon.alt} />
```

---

## 🔍 Debugging

### Run Full Diagnostics
```javascript
window.__logoDiagnostics.run();
```

### Quick Asset Check
```javascript
window.__logoDiagnostics.quickCheck();
```

### Check Logo in Console
```javascript
const img = document.querySelector('img[alt*="Logo"]');
console.log({
  src: img.src,
  loaded: img.complete,
  error: img.naturalWidth === 0,
  width: img.width,
  height: img.height
});
```

---

## 📁 Directory Structure

```
public/
├── logos/
│   ├── analyst-icon.png     ← Standard icon
│   ├── analyst-full.png     ← Full logo with text
│   ├── analyst-dark.png     ← For light backgrounds
│   └── analyst-light.png    ← For dark backgrounds
└── yellowlogo.png           ← Legacy path (still works)

src/
├── config/assets.ts         ← All paths defined here
├── components/Logo.tsx      ← Component implementation
└── utils/logoDiagnostics.ts ← Diagnostic tools
```

---

## ⚡ Size Mappings

| Size | Pixels | Use Case |
|------|--------|----------|
| small | 32x32 | Mobile thumbnails, nested components |
| medium | 40x40 | Default for headers/sidebars |
| large | 56x56 | Landing pages, hero sections |

---

## 🎯 Common Use Cases

### Header Logo
```typescript
<header>
  <Logo size="medium" showText={true} />
</header>
```

### Sidebar Logo
```typescript
<aside>
  <Logo
    size="medium"
    showText={!collapsed}
    theme={isDark ? 'dark' : 'light'}
  />
</aside>
```

### Footer Logo
```typescript
<footer>
  <Logo variant="icon" size="small" />
  <Logo variant="full" size="small" style={{ marginLeft: '12px' }} />
</footer>
```

### Navigation Logo
```typescript
<nav>
  <Link href="/">
    <Logo
      size="medium"
      theme={actualTheme === 'dark' ? 'dark' : 'light'}
    />
  </Link>
</nav>
```

### Favicon (in layout.tsx)
```typescript
export const metadata: Metadata = {
  icons: {
    icon: '/logos/analyst-icon.png',
    apple: '/apple-touch-icon.png',
  },
};
```

---

## ✅ Checklist: Logo Not Showing?

1. [ ] Is the file at `/public/logos/analyst-icon.png`?
2. [ ] Did you import `Logo` from `@/components/Logo`?
3. [ ] Is the container visible? (F12 → Elements)
4. [ ] Run diagnostic: `window.__logoDiagnostics.run()`
5. [ ] Check Network tab for 404 errors
6. [ ] Check Console for error messages
7. [ ] Clear cache: Ctrl+Shift+Delete
8. [ ] Restart dev server: `npm run dev`

---

## 🎯 Optimization Tips

### For Above-Fold Content
```typescript
import { OptimizedLogo } from '@/components/Logo';

<OptimizedLogo
  size="large"
  priority={true}  // ← Preload this image
/>
```

### For Multiple Logos
```typescript
// Store in variable to avoid repeated renders
const headerLogo = (
  <Logo size="medium" showText={true} />
);

export function Header() {
  return <header>{headerLogo}</header>;
}
```

### For CSS Customization
```typescript
<Logo
  size="medium"
  style={{
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  }}
  className="hover:opacity-80"
/>
```

---

## 🔧 Common Fixes

### Logo Too Small
```typescript
<Logo size="large" />  // ← Change to large
```

### Logo Blurry
```typescript
import { OptimizedLogo } from '@/components/Logo';
<OptimizedLogo quality={95} />  // ← Use optimized version
```

### Logo Not Responsive
```typescript
<Logo
  size={isMobile ? 'small' : 'medium'}
  showText={!isMobile}
/>
```

### Logo Color Wrong
```typescript
<Logo
  theme={isDarkMode ? 'dark' : 'light'}
/>
```

### Logo Doesn't Load
```javascript
// Check in console
window.__logoDiagnostics.run();
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `LOGO_ASSETS_GUIDE.md` | Complete logo management guide |
| `DEBUGGING_LOGOS.md` | Troubleshooting guide |
| `LOGO_FIX_SUMMARY.md` | What was fixed and why |
| `LOGO_QUICK_REFERENCE.md` | This file |

---

## 🆘 Emergency Recovery

If logo completely broken:

```typescript
// Temporary text fallback
<div style={{
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '20px',
  backgroundColor: '#FEC00F',
  borderRadius: '8px',
}}>
  A
</div>
```

```bash
# Or restore original:
cp /path/to/backup/yellowlogo.png public/yellowlogo.png
npm run dev
```

---

## 🔗 Related Files

- **Component:** `src/components/Logo.tsx`
- **Config:** `src/config/assets.ts`
- **Diagnostics:** `src/utils/logoDiagnostics.ts`
- **Usage:** `src/layouts/MainLayout.tsx`

---

**Pro Tip:** Bookmark this file for quick reference! 📌

Last Updated: February 15, 2026
