const fs = require('fs');
const path = require('path');

const srcDir = '/Users/nikita/.gemini/antigravity/brain/7ef04223-7d49-4c30-9d29-c5b1b37fef9f/';
const destDir = '/Users/nikita/Desktop/SAATHAPP/Customer Landing Page/public/images/saathpack/';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpg'));

files.forEach(file => {
  const match = file.match(/^(.*?)_\d+\.jpg$/);
  if (match) {
    const newName = match[1] + '.jpg';
    fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
    console.log(`Copied ${file} to ${newName}`);
  }
});
