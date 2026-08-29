const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx') || file.endsWith('.js')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('/Users/nikita/Desktop/SAATHAPP/Customer Landing Page/src');
let modifiedCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const newContent = content
    .replace(/bg-white dark:bg-slate-900/g, 'bg-surface')
    .replace(/bg-slate-50 dark:bg-slate-950/g, 'bg-page')
    .replace(/border-slate-200 dark:border-slate-800/g, 'border-theme-border')
    .replace(/border-slate-100 dark:border-slate-800/g, 'border-theme-border')
    .replace(/text-slate-900 dark:text-white/g, 'text-theme')
    .replace(/text-slate-900 dark:text-slate-100/g, 'text-theme')
    .replace(/text-slate-600 dark:text-slate-400/g, 'text-theme-secondary')
    .replace(/text-slate-500 dark:text-slate-400/g, 'text-theme-secondary')
    .replace(/border-slate-200 dark:border-slate-700/g, 'border-theme-border');
    
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    modifiedCount++;
  }
});
console.log(`Modified ${modifiedCount} files.`);
