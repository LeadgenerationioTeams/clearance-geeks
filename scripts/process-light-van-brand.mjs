/**
 * Light van hero option: box-side van crops + header logo from Sam's van artwork.
 * Source: brand/van-sam.png (same as van-branding) and brand/logo-crop.png.
 */
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const OUT = "public/brand/light-van";
mkdirSync(OUT, { recursive: true });

const vanSrc = "brand/van-sam.png";
const logoSrc = "brand/logo-crop.png";

/** Cargo panel — logo, checklist, service icons, furniture photo. */
const boxExtract = { left: 240, top: 50, width: 940, height: 890 };
/** Tighter panel for 16:10 mobile — mascot + wordmark + service row. */
const mobileExtract = { left: 200, top: 45, width: 700, height: 880 };

const desktopSizes = [
  { w: 480, h: 360, name: "van-desktop-480.webp" },
  { w: 768, h: 576, name: "van-desktop-768.webp" },
  { w: 1024, h: 768, name: "van-desktop-1024.webp" },
  { w: 1200, h: 900, name: "van-desktop-1200.webp" },
];

const mobileSizes = [
  { w: 390, h: 244, name: "van-mobile-390.webp" },
  { w: 640, h: 400, name: "van-mobile-640.webp" },
  { w: 800, h: 500, name: "van-mobile-800.webp" },
];

for (const { w, h, name } of desktopSizes) {
  await sharp(vanSrc)
    .extract(boxExtract)
    .resize(w, h, { fit: "cover", position: "attention" })
    .webp({ quality: 88 })
    .toFile(`${OUT}/${name}`);
}

for (const { w, h, name } of mobileSizes) {
  await sharp(vanSrc)
    .extract(mobileExtract)
    .resize(w, h, { fit: "cover", position: "centre" })
    .webp({ quality: 88 })
    .toFile(`${OUT}/${name}`);
}

// Header logo: photo crop from box-side wordmark (no redraw).
const { data, info } = await sharp(logoSrc)
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
      data[i + 3] = 0;
      continue;
    }
  }

  if (!isGreenAccent && !isWhiteText && r < 60 && g < 60 && b < 60) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
    data[i + 3] = 255;
  }
}

const logoMasterPath = `${OUT}/logo-header-master.png`;
await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(logoMasterPath);

const logoMeta = await sharp(logoMasterPath).metadata();

await sharp(logoMasterPath)
  .resize({ height: 112 })
  .webp({ quality: 95 })
  .toFile(`${OUT}/logo-header.webp`);

const manifest = {
  vanDesktop: { width: 1200, height: 900, src: "/brand/light-van/van-desktop-1200.webp" },
  vanMobile: { width: 800, height: 500, src: "/brand/light-van/van-mobile-800.webp" },
  headerLogo: {
    width: logoMeta.width,
    height: logoMeta.height,
    displayHeight: 112,
    src: "/brand/light-van/logo-header.webp",
  },
};

console.log(JSON.stringify(manifest, null, 2));
