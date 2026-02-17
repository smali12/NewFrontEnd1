import { readFileSync, writeFileSync } from 'fs';

// Fix DeveloperPage.tsx
let dev = readFileSync('src/page-components/DeveloperPage.tsx', 'utf8');

// Remove bad imports and add Clock
dev = dev.replace(/  Watch,\n/g, '');
dev = dev.replace(/  Glasses,\n/g, '');
dev = dev.replace(/  Hand,\n/g, '');
dev = dev.replace(/  Volume2,\n\} from 'lucide-react'/, "  Volume2,\n  Clock,\n} from 'lucide-react'");

// Replace usages: Watch -> Clock, Glasses -> Eye, Hand -> Sparkles
dev = dev.replace(/icon: Watch/g, 'icon: Clock');
dev = dev.replace(/icon: Glasses/g, 'icon: Eye');
dev = dev.replace(/<Hand /g, '<Sparkles ');

writeFileSync('src/page-components/DeveloperPage.tsx', dev);
console.log('[v0] Fixed DeveloperPage.tsx icon imports');

// Fix NonAppleDeveloperPage.tsx (no Watch/Glasses/Hand used there, but verify)
let nonApple = readFileSync('src/page-components/NonAppleDeveloperPage.tsx', 'utf8');
// Check for any bad icons
if (nonApple.includes('  Watch,')) {
  nonApple = nonApple.replace(/  Watch,\n/g, '');
}
if (nonApple.includes('  Glasses,')) {
  nonApple = nonApple.replace(/  Glasses,\n/g, '');
}
if (nonApple.includes('  Hand,')) {
  nonApple = nonApple.replace(/  Hand,\n/g, '');
}
writeFileSync('src/page-components/NonAppleDeveloperPage.tsx', nonApple);
console.log('[v0] Fixed NonAppleDeveloperPage.tsx icon imports');
