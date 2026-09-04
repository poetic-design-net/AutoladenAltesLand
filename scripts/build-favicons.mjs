import sharp from 'sharp';

// Format conversion only: preserve the supplied logo, remove transparent padding.
const logo = await sharp('public/logo.png').trim().toBuffer();
for (const [size, name] of [
  [32, 'favicon-32.png'],
  [96, 'favicon-96.png'],
  [180, 'apple-touch-icon.png'],
]) {
  await sharp(logo)
    .resize(size, size, { fit: 'contain', background: '#ffffff' })
    .flatten({ background: '#ffffff' })
    .png()
    .toFile(`public/${name}`);
}
