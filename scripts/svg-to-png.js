import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Install sharp first:
// npm install sharp --save-dev

async function convertSvgToPng(svgPath, size = 128) {
  const pngPath = svgPath.replace('.svg', '.png');
  
  try {
    await sharp(svgPath)
      .resize(size, size)
      .png()
      .toFile(pngPath);
    
    console.log(`Converted ${svgPath} to ${pngPath}`);
  } catch (error) {
    console.error(`Error converting ${svgPath}:`, error);
  }
}

// Convert all SVGs in the icons directory
const iconsDir = path.join(__dirname, '../public/icons');
const files = fs.readdirSync(iconsDir);

for (const file of files) {
  if (file.endsWith('.svg')) {
    await convertSvgToPng(path.join(iconsDir, file));
  }
}
