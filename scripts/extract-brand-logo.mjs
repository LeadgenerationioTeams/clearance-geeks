/**
 * Regenerate header/hero logos and favicon from brand/van-sam.png
 * (cargo-panel crop — not a redraw).
 */
import sharp from "sharp";
import { copyFileSync } from "fs";

const store = "/cursor/stores/bot/clearance-geeks/van-sam.png";
const src = "brand/van-sam.png";
try {
  copyFileSync(store, src);
} catch {
  /* use committed brand/van-sam.png */
}

const logoCrop = { left: 232, top: 70, width: 348, height: 508 };

const logoMaster = await sharp(src)
  .extract(logoCrop)
  .resize({
    width: logoCrop.width * 3,
    height: logoCrop.height * 3,
    kernel: sharp.kernel.lanczos3,
  })
  .sharpen({ sigma: 0.5 })
  .png()
  .toBuffer();

await sharp(logoMaster).toFile("public/brand/logo-lockup-master.png");
await sharp(logoMaster).resize({ height: 96 }).webp({ quality: 95 }).toFile("public/brand/logo-lockup.webp");
await sharp(logoMaster).resize({ height: 96 }).png().toFile("public/brand/logo-lockup.png");
await sharp(logoMaster).resize({ height: 280 }).webp({ quality: 92 }).toFile("public/brand/logo-hero-lockup.webp");
await sharp(logoMaster).resize({ height: 280 }).png().toFile("public/brand/logo-hero-lockup.png");

const meta = await sharp(logoMaster).metadata();
const mascot = {
  left: Math.round(meta.width * 0.05),
  top: Math.round(meta.height * 0.02),
  width: Math.round(meta.width * 0.9),
  height: Math.round(meta.height * 0.38),
};
const mascotBuf = await sharp(logoMaster).extract(mascot).png().toBuffer();
await sharp(mascotBuf).resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } }).png().toFile("src/app/apple-icon.png");
await sharp(mascotBuf).resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 1 } }).png().toFile("src/app/icon.png");

console.log("Brand logo assets updated from van-sam cargo panel.");
