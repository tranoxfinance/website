import sharp from "sharp";
import path from "node:path";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "..", "public", "images");

const jobs = [
  { file: "persona-family.png", maxWidth: 900, quality: 78 },
  { file: "persona-trader.png", maxWidth: 900, quality: 78 },
  { file: "persona-freelancer.png", maxWidth: 900, quality: 78 },
  { file: "persona-student.png", maxWidth: 900, quality: 78 },
  { file: "corridor-model.png", maxWidth: 900, quality: 82 },
  { file: "corridor-model-fr.png", maxWidth: 900, quality: 82 },
  { file: "features-hero.png", maxWidth: 1100, quality: 82 },
  { file: "features-hero-fr.png", maxWidth: 1100, quality: 82 },
  { file: "how-create-en.png", maxWidth: 640, quality: 75 },
  { file: "how-amount-en.png", maxWidth: 640, quality: 75 },
  { file: "how-paid-en.png", maxWidth: 640, quality: 75 },
  { file: "how-create-fr.png", maxWidth: 640, quality: 75 },
  { file: "how-amount-fr.png", maxWidth: 640, quality: 75 },
  { file: "how-paid-fr.png", maxWidth: 640, quality: 75 },
];

for (const job of jobs) {
  const inputPath = path.join(imagesDir, job.file);
  if (!existsSync(inputPath)) {
    console.warn(`Skipping ${job.file} (source not found)`);
    continue;
  }
  const outputPath = path.join(
    imagesDir,
    job.file.replace(/\.png$/, ".webp"),
  );

  const pipeline = sharp(inputPath).resize({
    width: job.maxWidth,
    withoutEnlargement: true,
  });

  const info = await pipeline.webp({ quality: job.quality }).toFile(outputPath);

  console.log(
    `${job.file} -> ${path.basename(outputPath)} (${info.width}x${info.height})`,
  );
}
