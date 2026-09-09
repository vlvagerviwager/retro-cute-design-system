/*
 * WCAG contrast guard.
 * Asserts AA ratios for the text/background pairs the components actually
 * render: body text >= 4.5:1, UI chrome (borders, focus) >= 3:1.
 */
import { DARK_PALETTE, LIGHT_PALETTE } from "../src/tokens";

const TEXT_MINIMUM_RATIO = 4.5;
const CHROME_MINIMUM_RATIO = 3;

const BLACK_HEX = "#000000";
const WHITE_HEX = "#ffffff";

interface ContrastCase {
  label: string;
  foreground: string;
  background: string;
  minimumRatio: number;
}

function linearChannel(channel: number): number {
  const normalizedChannel = channel / 255;
  return normalizedChannel <= 0.03928
    ? normalizedChannel / 12.92
    : Math.pow((normalizedChannel + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hexColor: string): number {
  const red = parseInt(hexColor.slice(1, 3), 16);
  const green = parseInt(hexColor.slice(3, 5), 16);
  const blue = parseInt(hexColor.slice(5, 7), 16);
  return (
    0.2126 * linearChannel(red) +
    0.7152 * linearChannel(green) +
    0.0722 * linearChannel(blue)
  );
}

function contrastRatio(foreground: string, background: string): number {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);
  const lighterLuminance = Math.max(foregroundLuminance, backgroundLuminance);
  const darkerLuminance = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighterLuminance + 0.05) / (darkerLuminance + 0.05);
}

const light = LIGHT_PALETTE;
const dark = DARK_PALETTE;

const contrastCases: ContrastCase[] = [
  { label: "light body", foreground: light.ink, background: light.card, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "light muted", foreground: light.muted, background: light.card, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "light link", foreground: light.link, background: light.card, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "light titlebar", foreground: light.ink, background: light.pink, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "light meta pill", foreground: BLACK_HEX, background: light.yellow, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "light primary button", foreground: WHITE_HEX, background: light.navy, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "light hidden tag", foreground: WHITE_HEX, background: light.red, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "light input", foreground: light.ink, background: light.cream, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "light peach titlebar", foreground: light.ink, background: light.peach, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "light mint titlebar", foreground: light.ink, background: light.mint, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "light border chrome", foreground: light.border, background: light.card, minimumRatio: CHROME_MINIMUM_RATIO },
  { label: "dark body", foreground: dark.ink, background: dark.card, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "dark muted", foreground: dark.muted, background: dark.card, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "dark link", foreground: dark.link, background: dark.card, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "dark titlebar", foreground: dark.ink, background: dark.pinkPale, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "dark meta pill", foreground: BLACK_HEX, background: dark.yellow, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "dark primary button", foreground: dark.cream, background: dark.navy, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "dark hidden tag", foreground: dark.cream, background: dark.red, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "dark peach titlebar", foreground: dark.ink, background: dark.peach, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "dark mint titlebar", foreground: dark.ink, background: dark.mint, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "dark lavender tag", foreground: dark.ink, background: dark.lavender, minimumRatio: TEXT_MINIMUM_RATIO },
  { label: "dark border chrome", foreground: dark.border, background: dark.card, minimumRatio: CHROME_MINIMUM_RATIO },
];

let failures = 0;
for (const contrastCase of contrastCases) {
  const measuredRatio = contrastRatio(contrastCase.foreground, contrastCase.background);
  const roundedRatio = Math.round(measuredRatio * 100) / 100;
  const passed = measuredRatio >= contrastCase.minimumRatio;
  if (passed === false) {
    failures += 1;
  }
  console.log(
    `${passed ? "PASS" : "FAIL"} ${contrastCase.label}: ${roundedRatio}:1 (needs ${contrastCase.minimumRatio}:1)`,
  );
}

if (failures > 0) {
  console.error(`${failures} contrast pair(s) below AA. Adjust the palette in tokens.css/tokens.ts.`);
  process.exit(1);
}
console.log("All contrast pairs meet AA.");
