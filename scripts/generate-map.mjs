import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { feature } from "topojson-client";
import { geoMercator, geoPath, geoBounds, geoContains } from "d3-geo";

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VB_W = 480;
const VB_H = 540;
const NG_ID = "566";
const CI_ID = "384";
const POINTS_PER_COUNTRY = 40;

const AFRICAN_IDS = new Set([
  "012", "024", "204", "072", "854", "108", "120", "140", "148", "178",
  "180", "384", "262", "818", "226", "232", "748", "231", "266", "270",
  "288", "324", "624", "404", "426", "430", "434", "450", "454", "466",
  "478", "504", "508", "516", "562", "566", "646", "686", "694", "706",
  "710", "728", "729", "834", "768", "788", "800", "732", "894", "716",
  "384",
]);

const ISLANDS = new Set(["132", "480", "690", "174"]);

const topo = JSON.parse(
  readFileSync("node_modules/world-atlas/countries-110m.json", "utf8"),
);
const fc = feature(topo, topo.objects.countries);

const african = fc.features.filter(
  (f) => AFRICAN_IDS.has(String(f.id)) && !ISLANDS.has(String(f.id)),
);

const projection = geoMercator();
projection.fitExtent(
  [
    [16, 16],
    [VB_W - 16, VB_H - 16],
  ],
  { type: "FeatureCollection", features: african },
);

const pathGen = geoPath(projection);

function round(d) {
  return d.replace(/-?\d+\.\d+/g, (n) => Number(n).toFixed(1));
}

const countries = african
  .map((f) => ({
    id: String(f.id),
    name: f.properties.name,
    d: round(pathGen(f) || ""),
  }))
  .filter((c) => c.d.length > 0);

function randomPoints(feat, n, seed) {
  const rng = mulberry32(seed);
  const [[w, s], [e, nth]] = geoBounds(feat);
  const points = [];
  let guard = 0;
  while (points.length < n && guard < n * 400) {
    guard += 1;
    const lng = w + rng() * (e - w);
    const lat = s + rng() * (nth - s);
    if (!geoContains(feat, [lng, lat])) continue;
    const [x, y] = projection([lng, lat]);
    points.push([Number(x.toFixed(1)), Number(y.toFixed(1))]);
  }
  return points;
}

function labelAnchor(feat) {
  const [[x0, y0], [x1, y1]] = pathGen.bounds(feat);
  void y0;
  return { x: Number(((x0 + x1) / 2).toFixed(1)), y: Number(y1.toFixed(1)) };
}

const ngFeature = african.find((f) => String(f.id) === NG_ID);
const ciFeature = african.find((f) => String(f.id) === CI_ID);

const ngPoints = randomPoints(ngFeature, POINTS_PER_COUNTRY, 7);
const ciPoints = randomPoints(ciFeature, POINTS_PER_COUNTRY, 21);
const ngLabel = labelAnchor(ngFeature);
const ciLabel = labelAnchor(ciFeature);

const out = `export const VB_W = ${VB_W};
export const VB_H = ${VB_H};
export const NG_ID = "${NG_ID}";
export const CI_ID = "${CI_ID}";

export interface Country {
  id: string;
  name: string;
  d: string;
}

export type Point = [number, number];

export const NG_POINTS: Point[] = ${JSON.stringify(ngPoints)};
export const CI_POINTS: Point[] = ${JSON.stringify(ciPoints)};
export const NG_LABEL = ${JSON.stringify(ngLabel)};
export const CI_LABEL = ${JSON.stringify(ciLabel)};

export const COUNTRIES: Country[] = ${JSON.stringify(countries)};
`;

mkdirSync("src/lib", { recursive: true });
writeFileSync("src/lib/mapPaths.ts", out);

console.log(
  `Generated ${countries.length} countries, ${ngPoints.length} NG points, ${ciPoints.length} CI points.`,
);
