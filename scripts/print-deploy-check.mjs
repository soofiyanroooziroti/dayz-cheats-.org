/**
 * Prints fingerprints from dist/ so you can compare local build vs live Chrome.
 * Usage: npm run build && node scripts/print-deploy-check.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const site = 'https://dayz-cheats.org';

function read(file) {
  return fs.readFileSync(path.join(dist, file), 'utf8');
}

if (!fs.existsSync(dist)) {
  console.error('Run npm run build first (dist/ missing).');
  process.exit(1);
}

const home = read('index.html');
const blog = read('blog/index.html');
const search = read('search-index.json');

const buildMeta = home.match(/name="site-build"\s+content="([^"]+)"/)?.[1] ?? '(missing)';
const blogPageScript = blog.match(/\/_astro\/index\.astro_astro_type_script_index_0_lang\.[^"']+\.js/)?.[0];
const layoutScript = blog.match(/\/_astro\/BaseLayout\.astro_astro_type_script_index_0_lang\.[^"']+\.js/)?.[0];
const blogIndexChunk = fs
  .readdirSync(path.join(dist, '_astro'))
  .find((name) => name.startsWith('blog-index.') && name.endsWith('.js'));
const hasForumPhrase = search.includes('community forums');

console.log('\n=== Deploy check (compare to live site in Chrome) ===\n');
console.log('Build ID (View Page Source → search "site-build"):');
console.log(' ', buildMeta);
console.log('\nBlog page script (Network on /blog/):');
console.log(' ', blogPageScript ?? '(missing)');
console.log('Layout script (site search + nav):');
console.log(' ', layoutScript ?? '(missing)');
console.log('Blog-index chunk in dist/_astro/:');
console.log(' ', blogIndexChunk ? `/_astro/${blogIndexChunk}` : '(missing)');
console.log('\nSearch index includes "community forums":', hasForumPhrase ? 'yes' : 'NO');
console.log('\n--- Chrome on LIVE site ---');
console.log('1. Open', `${site}/blog/`);
console.log('2. Ctrl+U → find site-build → must match:', buildMeta);
console.log('3. If build ID differs → old HTML still cached or deploy did not upload dist/.');
console.log('4. F12 → Network → disable cache → reload → check blog-index*.js matches above.');
console.log('5. Ctrl+K → type "community forums" → Forum should appear.');
console.log('\n--- Match production locally in Chrome ---');
console.log('   npm run build && npm run preview');
console.log('   Open http://localhost:4321/blog/ (not npm run dev)\n');
