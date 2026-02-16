/**
 * Logo Diagnostics Utility
 * 
 * Helps identify and troubleshoot logo rendering issues
 * Run this in the browser console to get a comprehensive report
 * 
 * Usage:
 * import { runLogoDiagnostics } from '@/utils/logoDiagnostics';
 * runLogoDiagnostics();
 */

interface DiagnosticResult {
  name: string;
  status: 'pass' | 'warning' | 'fail';
  message: string;
  details?: string;
}

const diagnostics: DiagnosticResult[] = [];

/**
 * Check if all logo assets exist and are accessible
 */
async function checkAssetExistence(): Promise<void> {
  const assets = [
    '/logos/analyst-icon.png',
    '/logos/analyst-full.png',
    '/logos/analyst-dark.png',
    '/logos/analyst-light.png',
    '/favicon-32x32.png',
    '/apple-touch-icon.png',
  ];

  for (const asset of assets) {
    try {
      const response = await fetch(asset, { method: 'HEAD' });
      if (response.ok) {
        diagnostics.push({
          name: `Asset Existence: ${asset}`,
          status: 'pass',
          message: `✓ Asset found and accessible`,
          details: `Status: ${response.status}`,
        });
      } else {
        diagnostics.push({
          name: `Asset Existence: ${asset}`,
          status: 'fail',
          message: `✗ Asset returned error status`,
          details: `Status: ${response.status}`,
        });
      }
    } catch (error) {
      diagnostics.push({
        name: `Asset Existence: ${asset}`,
        status: 'fail',
        message: `✗ Asset not accessible`,
        details: `Error: ${error instanceof Error ? error.message : 'Unknown'}`,
      });
    }
  }
}

/**
 * Check if logo images are actually rendering on the page
 */
function checkRenderedLogos(): void {
  const logoImages = document.querySelectorAll('img[alt*="Logo"], img[alt*="logo"]');
  const logoContainers = document.querySelectorAll('[role="img"][aria-label*="Logo"]');

  diagnostics.push({
    name: 'Rendered Logo Elements',
    status: logoImages.length > 0 ? 'pass' : 'warning',
    message: `Found ${logoImages.length} logo images on page`,
    details: `IMG elements with logo alt text: ${logoImages.length}`,
  });

  diagnostics.push({
    name: 'Logo Component Containers',
    status: logoContainers.length > 0 ? 'pass' : 'warning',
    message: `Found ${logoContainers.length} logo containers`,
    details: `DIV elements with aria-label: ${logoContainers.length}`,
  });

  // Check visibility of each logo
  logoImages.forEach((img, index) => {
    const computedStyle = window.getComputedStyle(img);
    const isVisible =
      computedStyle.display !== 'none' &&
      computedStyle.visibility !== 'hidden' &&
      computedStyle.opacity !== '0';

    diagnostics.push({
      name: `Logo Visibility (Image ${index + 1})`,
      status: isVisible ? 'pass' : 'fail',
      message: isVisible ? '✓ Logo is visible' : '✗ Logo is hidden by CSS',
      details: `Display: ${computedStyle.display}, Visibility: ${computedStyle.visibility}, Opacity: ${computedStyle.opacity}`,
    });
  });
}

/**
 * Check CSS display properties that might hide logos
 */
function checkCSSIssues(): void {
  const logoImages = document.querySelectorAll('img[alt*="Logo"], img[alt*="logo"]');

  logoImages.forEach((img, index) => {
    const computedStyle = window.getComputedStyle(img);
    const parent = img.parentElement;
    const parentStyle = parent ? window.getComputedStyle(parent) : null;

    // Check dimensions
    const width = img.clientWidth;
    const height = img.clientHeight;

    diagnostics.push({
      name: `Logo Dimensions (Logo ${index + 1})`,
      status: width > 0 && height > 0 ? 'pass' : 'fail',
      message: `Logo dimensions: ${width}px x ${height}px`,
      details: `Displayed size is ${width > 0 ? 'correct' : 'zero - element may not be visible'}`,
    });

    // Check if container has proper sizing
    if (parentStyle) {
      const containerWidth = parent!.clientWidth;
      const containerHeight = parent!.clientHeight;
      diagnostics.push({
        name: `Container Dimensions (Logo ${index + 1})`,
        status: containerWidth > 0 && containerHeight > 0 ? 'pass' : 'warning',
        message: `Container: ${containerWidth}px x ${containerHeight}px`,
        details: `Parent has proper dimensions for content`,
      });
    }
  });
}

/**
 * Check image load events
 */
function checkImageLoadStatus(): void {
  const logoImages = document.querySelectorAll<HTMLImageElement>(
    'img[alt*="Logo"], img[alt*="logo"]'
  );

  logoImages.forEach((img, index) => {
    const isLoaded = img.complete;
    const hasError = img.naturalWidth === 0 && img.naturalHeight === 0;

    diagnostics.push({
      name: `Image Load Status (Logo ${index + 1})`,
      status: isLoaded && !hasError ? 'pass' : hasError ? 'fail' : 'warning',
      message: isLoaded ? '✓ Image loaded' : '⏳ Image still loading',
      details: `Loaded: ${isLoaded}, Error: ${hasError}, Size: ${img.naturalWidth}x${img.naturalHeight}`,
    });
  });
}

/**
 * Check browser console for errors
 */
function checkConsoleErrors(): void {
  // This is informational - users should check console manually
  diagnostics.push({
    name: 'Console Errors',
    status: 'warning',
    message: 'Check browser console for CORS, 404, or network errors',
    details: 'Open DevTools (F12) → Console tab → Look for red error messages',
  });
}

/**
 * Check responsive/mobile considerations
 */
function checkResponsiveness(): void {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const isMobile = viewportWidth < 768;

  diagnostics.push({
    name: 'Viewport Dimensions',
    status: 'pass',
    message: `Viewport: ${viewportWidth}x${viewportHeight}px`,
    details: `Device type: ${isMobile ? 'Mobile' : 'Desktop'}`,
  });

  const logoImages = document.querySelectorAll<HTMLImageElement>(
    'img[alt*="Logo"], img[alt*="logo"]'
  );

  logoImages.forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    const isInViewport =
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0;

    diagnostics.push({
      name: `Logo Viewport (Logo ${index + 1})`,
      status: isInViewport ? 'pass' : 'warning',
      message: isInViewport ? '✓ Logo is in viewport' : '⚠ Logo is off-screen',
      details: `Position: ${Math.round(rect.top)}px from top, ${Math.round(rect.left)}px from left`,
    });
  });
}

/**
 * Generate a comprehensive diagnostic report
 */
function generateReport(): void {
  console.clear();
  console.log('%c=== ANALYST LOGO DIAGNOSTICS REPORT ===', 'font-size: 16px; font-weight: bold; color: #FEC00F;');
  console.log(`Generated: ${new Date().toLocaleString()}\n`);

  // Group by status
  const passed = diagnostics.filter((d) => d.status === 'pass');
  const warnings = diagnostics.filter((d) => d.status === 'warning');
  const failed = diagnostics.filter((d) => d.status === 'fail');

  // Print results
  if (passed.length > 0) {
    console.log('%c✓ PASSED CHECKS', 'color: #4CAF50; font-weight: bold; font-size: 12px;');
    passed.forEach((diag) => {
      console.log(`  ${diag.name}`);
      console.log(`  ${diag.message}`);
      if (diag.details) console.log(`  ℹ ${diag.details}`);
      console.log('');
    });
  }

  if (warnings.length > 0) {
    console.log('%c⚠ WARNINGS', 'color: #FF9800; font-weight: bold; font-size: 12px;');
    warnings.forEach((diag) => {
      console.log(`  ${diag.name}`);
      console.log(`  ${diag.message}`);
      if (diag.details) console.log(`  ℹ ${diag.details}`);
      console.log('');
    });
  }

  if (failed.length > 0) {
    console.log('%c✗ FAILED CHECKS', 'color: #F44336; font-weight: bold; font-size: 12px;');
    failed.forEach((diag) => {
      console.log(`  ${diag.name}`);
      console.log(`  ${diag.message}`);
      if (diag.details) console.log(`  ℹ ${diag.details}`);
      console.log('');
    });
  }

  // Summary
  console.log('%c=== SUMMARY ===', 'font-weight: bold;');
  console.log(`Total Checks: ${diagnostics.length}`);
  console.log(`%c✓ Passed: ${passed.length}`, 'color: #4CAF50;');
  console.log(`%c⚠ Warnings: ${warnings.length}`, 'color: #FF9800;');
  console.log(`%c✗ Failed: ${failed.length}`, 'color: #F44336;');

  // Recommendations
  if (failed.length > 0 || warnings.length > 0) {
    console.log('%c=== RECOMMENDATIONS ===', 'font-weight: bold; color: #2196F3;');
    console.log('1. Check LOGO_ASSETS_GUIDE.md for troubleshooting steps');
    console.log('2. Verify asset files exist in public/logos/ directory');
    console.log('3. Clear browser cache (Ctrl+Shift+Delete)');
    console.log('4. Check Network tab in DevTools for failed requests');
    console.log('5. Verify CSS is not hiding the logo element');
  } else {
    console.log('%c✓ All checks passed! Your logos are configured correctly.', 'color: #4CAF50; font-weight: bold;');
  }
}

/**
 * Main diagnostic function
 * Run this to get a complete report
 */
export async function runLogoDiagnostics(): Promise<void> {
  try {
    console.log('Starting logo diagnostics...');

    await checkAssetExistence();
    checkRenderedLogos();
    checkCSSIssues();
    checkImageLoadStatus();
    checkConsoleErrors();
    checkResponsiveness();

    generateReport();
  } catch (error) {
    console.error('Error running diagnostics:', error);
  }
}

/**
 * Quick check - just test asset availability
 */
export async function quickAssetCheck(): Promise<void> {
  const assets = [
    '/logos/analyst-icon.png',
    '/logos/analyst-full.png',
    '/favicon-32x32.png',
  ];

  console.log('Checking logo assets...');
  for (const asset of assets) {
    try {
      const response = await fetch(asset, { method: 'HEAD' });
      const status = response.ok ? '✓' : '✗';
      console.log(`${status} ${asset}`);
    } catch {
      console.log(`✗ ${asset} (network error)`);
    }
  }
}

/**
 * Export for debugging in development
 */
if (typeof window !== 'undefined') {
  (window as any).__logoDiagnostics = {
    run: runLogoDiagnostics,
    quickCheck: quickAssetCheck,
  };
}
