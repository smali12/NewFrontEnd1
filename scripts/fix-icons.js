import { readFileSync, writeFileSync } from 'fs';

const root = '/vercel/share/v0-project';

// Fix DeveloperPage.tsx
let dev = readFileSync(root + '/src/page-components/DeveloperPage.tsx', 'utf8');

// Remove bad imports
dev = dev.replace(/  Watch,\n/g, '');
dev = dev.replace(/  Glasses,\n/g, '');
dev = dev.replace(/  Hand,\n/g, '');

// Add Clock if not already there
if (!dev.includes('  Clock,')) {
  dev = dev.replace(/  Volume2,\n\} from 'lucide-react'/, "  Volume2,\n  Clock,\n} from 'lucide-react'");
}

// Replace usages: Watch -> Clock, Glasses -> Eye, Hand -> Sparkles
dev = dev.replace(/icon: Watch/g, 'icon: Clock');
dev = dev.replace(/icon: Glasses/g, 'icon: Eye');
dev = dev.replace(/<Hand /g, '<Sparkles ');

writeFileSync(root + '/src/page-components/DeveloperPage.tsx', dev);
console.log('[v0] Fixed DeveloperPage.tsx');

// Fix NonAppleDeveloperPage.tsx
let nonApple = readFileSync(root + '/src/page-components/NonAppleDeveloperPage.tsx', 'utf8');
nonApple = nonApple.replace(/  Watch,\n/g, '');
nonApple = nonApple.replace(/  Glasses,\n/g, '');
nonApple = nonApple.replace(/  Hand,\n/g, '');
writeFileSync(root + '/src/page-components/NonAppleDeveloperPage.tsx', nonApple);
console.log('[v0] Fixed NonAppleDeveloperPage.tsx');

console.log('[v0] Done - all bad icon imports removed');
