import sharp from 'sharp';
import { readdirSync, unlinkSync } from 'fs';
import { join, extname, basename } from 'path';

const dir = new URL('../src/Assets/Images/', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1');

const files = readdirSync(dir).filter(f => /\.(png|jpg|jpeg)$/i.test(f));

console.log(`Converting ${files.length} images to WebP...\n`);

for (const file of files) {
  const input = join(dir, file);
  const name = basename(file, extname(file));
  const output = join(dir, `${name}.webp`);

  const info = await sharp(input)
    .webp({ quality: 78, effort: 4 })
    .toFile(output);

  const inputSize = (await import('fs')).statSync(input).size;
  const reduction = (((inputSize - info.size) / inputSize) * 100).toFixed(0);
  console.log(`✓ ${file} → ${name}.webp  ${(inputSize/1024/1024).toFixed(1)}MB → ${(info.size/1024/1024).toFixed(1)}MB  (-${reduction}%)`);

  // Remove original
  unlinkSync(input);
}

console.log('\nDone! All images converted to WebP.');
