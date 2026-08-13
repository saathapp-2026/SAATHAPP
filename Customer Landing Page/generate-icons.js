import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/favicon.svg');
const icon192Path = path.resolve('public/pwa-192x192.png');
const icon512Path = path.resolve('public/pwa-512x512.png');

async function generateIcons() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);

    console.log('Generating 192x192 icon...');
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile(icon192Path);

    console.log('Generating 512x512 icon...');
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile(icon512Path);

    console.log('Icons generated successfully.');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
