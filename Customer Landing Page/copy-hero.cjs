const fs = require('fs');
const path = require('path');

const srcFile = '/Users/nikita/.gemini/antigravity/brain/7ef04223-7d49-4c30-9d29-c5b1b37fef9f/.user_uploaded/media_1787298662868.jpg';
const destDir = '/Users/nikita/Desktop/SAATHAPP/Customer Landing Page/public/images/saathpack/';
const destFile = path.join(destDir, 'saathpack-hero-composition.jpg');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(srcFile, destFile);
console.log('Copied hero image successfully!');
