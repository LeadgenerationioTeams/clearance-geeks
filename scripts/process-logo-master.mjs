/**
 * Build header/hero/favicon assets from brand/logo-crop.png (Sam's master crop).
 */
import sharp from "sharp";
import { copyFileSync } from "fs";

const sourceStore = "/cursor/stores/bot/clearance-geeks/logo-crop.png";
const sourceRepo = "brand/logo-crop.png";
try {
  copyFileSync(sourceStore, sourceRepo);
} catch {
  /* committed brand/logo-crop.png */
}

const W = 1024;
const H = 732;

const { data, info } = await sharp(sourceRepo)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const x = (i / 4) % info.width;
  const y = Math.floor(i / 4 / info.width);

  const isGreenAccent = g > 90 && g > r + 15 && g > b + 5;
  const isWhiteText = r > 190 && g > 190 && b > 190;

  // Bottom-right edge only: stray van photo (furniture), not the wordmark
  if (x >= info.width * 0.86 && y >= info.height * 0.82) {
    const isPhotoBleed =
      !isGreenAccent &&
      !isWhiteText &&
      (r > 35 || Math.abs(r - g) > 15) &&
      !(r < 25 && g < 25 && b < 25);
    if (isPhotoBleed) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 255;
      continue;
    }
  }

  if (!isGreenAccent && !isWhiteText && r < 60 && g < 60 && b < 60) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
  }
}

let master = sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
});

await master.png().toFile("public/brand/logo-master.png");

const meta = await sharp("public/brand/logo-master.png").metadata();
const aspect = meta.width / meta.height;

// Header @2x (48px CSS height)
await sharp("public/brand/logo-master.png")
  .resize({ height: 96 })
  .webp({ quality: 95 })
  .toFile("public/brand/logo-lockup.webp");
await sharp("public/brand/logo-master.png")
  .resize({ height: 96 })
  .png()
  .toFile("public/brand/logo-lockup.png");

// Hero @2x (360px CSS width)
await sharp("public/brand/logo-master.png")
  .resize({ width: 720 })
  .webp({ quality: 92 })
  .toFile("public/brand/logo-hero-lockup.webp");
await sharp("public/brand/logo-hero-lockup.webp")
  .resize({ width: 360 })
  .webp({ quality: 92 })
  .toFile("public/brand/logo-hero-lockup-1x.webp");

const mascotCrop = {
  left: Math.round(W * 0.2),
  top: Math.round(H * 0.02),
  width: Math.round(W * 0.6),
  height: Math.round(H * 0.4),
};

await sharp("public/brand/logo-master.png")
  .extract(mascotCrop)
  .resize(180, 180, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  })
  .png()
  .toFile("src/app/apple-icon.png");

await sharp("public/brand/logo-master.png")
  .extract(mascotCrop)
  .resize(32, 32, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  })
  .png()
  .toFile("src/app/icon.png");

console.log("logo-master ready", meta.width, meta.height, "aspect", aspect.toFixed(4));
