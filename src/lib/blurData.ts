export const BLUR_DATA: Record<string, string> = {
  "/images/office-desk.webp": "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAAAQBACdASoQABQAPu1iqU2ppaOiMAgBMB2JQBOmUABWfHc41LdjcmYJQAD+m6g+YSxziggEfrdIUvU+9mfAfBm8mR48musC1Rjiu7vVZ5pLU33XYtsGK8c9h+1NuW5+abxT4WTs/0W3VjD6fneKAAAA",
  "/images/people-family.webp": "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADwAQCdASoQAAsAA4BaJQBOgB0kDsThjOAA99lAcRDw/iFjvzKjebU+wkjzbLGAO98W6gl2ZiU5yy7I7n5DHZxh1wFoop1t1xcJqf4VAAA=",
  "/images/people-freelancer.webp": "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAACwAwCdASoQABQAPu1iqU2ppaOiMAgBMB2JYwAAUyxYa+tnHHvTQAD+4NGFYFLWwGlXLT/1FNi3rO0Z/Hv/qbeN11T7Dna7KEkIqXzcQjsJg3eJBNg9mi+JEYQYNNzyV6d9FVv36ns+/8AhewlaR9RR8vk9BI26/ClHBabUB3gAAA==",
  "/images/people-market.webp": "data:image/webp;base64,UklGRowAAABXRUJQVlA4IIAAAAAwBACdASoQABQAPu1iqU2ppaOiMAgBMB2JYgCdMoR3AB6hB8LJzi2iTAAA/ulF3kSOm9Y0Ts4h5aU7WoZeXZalvDFwKBYnnROi2hlBC70BYHSJc1jDMbucqblHGraXcj0P2LDHni5Lt+pyLltdMF3Ew1oCA7gEH6Thdk5AeIAAAA==",
  "/images/people-news.webp": "data:image/webp;base64,UklGRoYAAABXRUJQVlA4IHoAAAAQBACdASoQABQAPu1iqU2ppaOiMAgBMB2JYwCdACBvOu1qe8/oe+TogAD7Ex4kICe+n2zjGiF54+PyPrkzGI6trJoPc5cYHTQBoQf9bNv2FfPweh7D3f2QC6bN1q8vqP4lSNrvDQFOJWjtQUSO4A6Pb48pPsKApbAAAA==",
  "/images/people-student.webp": "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAABQAgCdASoQAAsAA4BaJZACdH8AGOv2DfG/44AA/tqgVrpCF63N2lYOBaqoUi17Th/VLUP2K+1lH8T+vH6+IvYG2AV2vFB6KkCpUdXLgAA=",
  "/images/people-team.webp": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAAAQAgCdASoQAAsAA4BaJYwCdADPyBFlZlwAAP7oY6k0uSUebaDt3W5b+hdOPJijjCX/QsaXD801gwWI6Rx307dXT5gEe2J4XPnSSnq7L5KwT+nEqSKAAA==",
  "/images/persona-family.webp": "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAABQAgCdASoQAAsAA4BaJYgCdAEREdLXpzEyAAAA/uiVwD5OmobegdQkmNOC1zt5PigHSkuqA093JXi4Oneg2faACaDJZhd4F0Nsrgun51YnxpSIGJW7axGWkAA=",
  "/images/persona-freelancer.webp": "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAAAwAgCdASoQAAsAA4BaJaACdADxLrPYzqC3AAD+8K3Vmn/c4KOlXjyO+bUKkHNQAhjgKpIJsYlLdqBc3MLVECQMA+V7NU2kNzNnL8biIk8I++5z441BNimhViiAeAAA",
  "/images/persona-student.webp": "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAACQAQCdASoQAAsAA4BaJQBUeg7lGZAA/rU2sXw+iAM3rhoXIfLaz8r2TiiFpXc0zXl2k01cpaHddUP75ATlaTDSJ71a9Pbki01DEKtVSgDdcVAN/gAAAA==",
  "/images/persona-trader.webp": "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAwAgCdASoQAAsAA4BaJbACdADhXymBaD4OYAD+6lk+Bh1/GA3g85MNNfHMpZd04QMLwgLGgN78rf29OE3YOc6agPe4XDW2p3xBJjx1k6K2nS44nWglcRMdroj82Dj3ACE5OQAA",
};

export function blurProps(src: string) {
  const blurDataURL = BLUR_DATA[src];
  return blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {};
}
