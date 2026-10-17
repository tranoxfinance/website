import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const designRules = [
  {
    selector:
      "Literal[value=/\\b(bg|text|border|ring|from|to|via)-(red|green|emerald|amber|yellow|orange|blue|sky|slate|gray|zinc)-\\d{2,3}\\b/]",
    message: "Use the brand tokens (brand, green, gold, danger, ink, muted).",
  },
  {
    selector: "Literal[value=/text-\\[(\\d|\\.)+px\\]/]",
    message: "Use a text size token such as text-md, text-2xs or text-3xs.",
  },
  {
    selector:
      "CallExpression[callee.object.name='window'][callee.property.name=/^(confirm|alert)$/]",
    message: "Show the message in the page instead of a browser dialog.",
  },
];

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        ...designRules,
        {
          selector: "Literal[value=/#(\\d|a|b|c|d|e|f|A|B|C|D|E|F){6}\\b/]",
          message: "Use a colour token from globals.css.",
        },
      ],
    },
  },
  {
    files: [
      "src/components/Flag.tsx",
      "src/components/TranoxMark.tsx",
      "src/components/WorldDotMap.tsx",
      "src/components/CorridorMap.tsx",
      "src/app/**/opengraph-image.tsx",
      "src/app/**/twitter-image.tsx",
    ],
    rules: {
      "no-restricted-syntax": ["error", ...designRules],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".claude/**",
  ]),
]);

export default eslintConfig;
