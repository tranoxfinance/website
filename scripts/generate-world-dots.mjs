import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { feature } from "topojson-client";
import { geoNaturalEarth1, geoContains } from "d3-geo";

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VB_W = 1400;
const VB_H = 480;
const GRID = 13;
const MIN_LAT = -58;
const DOT_MIN_R = 1.1;
const DOT_MAX_R = 2;

const PALETTE = [
  "brand",
  "brand",
  "brand",
  "brand",
  "brand-bright",
  "green",
  "gold",
];

const topo = JSON.parse(
  readFileSync("node_modules/world-atlas/land-110m.json", "utf8"),
);
const land = feature(topo, topo.objects.land);

const projection = geoNaturalEarth1();
projection.fitExtent(
  [
    [10, 10],
    [VB_W - 10, VB_H - 10],
  ],
  land,
);

const rng = mulberry32(1337);
const dots = [];

for (let y = 0; y <= VB_H; y += GRID) {
  for (let x = 0; x <= VB_W; x += GRID) {
    const lngLat = projection.invert([x, y]);
    if (!lngLat) continue;
    const [lng, lat] = lngLat;
    if (lat < MIN_LAT) continue;
    if (!geoContains(land, [lng, lat])) continue;
    const r = Number((DOT_MIN_R + rng() * (DOT_MAX_R - DOT_MIN_R)).toFixed(2));
    const color = PALETTE[Math.floor(rng() * PALETTE.length)];
    dots.push([x, y, r, color]);
  }
}

const out = `export const WORLD_VB_W = ${VB_W};
export const WORLD_VB_H = ${VB_H};

export type WorldDot = [number, number, number, string];

export const WORLD_DOTS: WorldDot[] = ${JSON.stringify(dots)};
`;

mkdirSync("src/lib", { recursive: true });
writeFileSync("src/lib/worldDots.ts", out);

console.log(`Generated ${dots.length} world dots.`);
