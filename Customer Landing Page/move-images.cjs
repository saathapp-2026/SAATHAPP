const fs = require('fs');
const path = require('path');

const srcDir = '/Users/nikita/Desktop/SAATHAPP/Customer Landing Page/public/images/saathpack/';
const destDir = '/Users/nikita/Desktop/SAATHAPP/Customer Landing Page/src/assets/images/saathpack/';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.jpg'));
  files.forEach(file => {
    fs.renameSync(path.join(srcDir, file), path.join(destDir, file));
    console.log(`Moved ${file} to src/assets`);
  });
}
