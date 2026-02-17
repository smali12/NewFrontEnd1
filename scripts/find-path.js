import { readdirSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('cwd:', process.cwd());
console.log('__dirname attempt:', import.meta.url);

// Check common paths
const paths = ['.', '..', '../src', './src', '/home/user', '/home/user/src'];
for (const p of paths) {
  try {
    const items = readdirSync(resolve(p));
    console.log(`ls ${p}:`, items.slice(0, 15).join(', '));
  } catch (e) {
    console.log(`ls ${p}: ERROR -`, e.message);
  }
}

// Check if src exists relative to cwd
if (existsSync('src')) {
  console.log('src/ exists at cwd');
  console.log('src contents:', readdirSync('src').join(', '));
} else {
  console.log('src/ does NOT exist at cwd');
}
