/*
 * Token mirrors for TypeScript.
 * Canonical values live in tokens.css; this module re-exports the same
 * scale under semantic names so component logic never uses magic literals.
 * Hex values here are for docs swatches and tests only. Rendering must
 * use var(--rc-*) so light and dark themes apply.
 */

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";
export const THEME_STORAGE_KEY = "retro-cute-design-system:theme";

/* Static dark ink for text on bright surfaces (yellow pills, sun titlebars)
 * that stay light in both themes, where theme-flipping ink would fail. */
export const BRIGHT_INK_HEX = "#232a3d";

export const SPACE_XS_PX = 6;
export const SPACE_SM_PX = 10;
export const SPACE_MD_PX = 16;
export const SPACE_LG_PX = 24;
export const SPACE_XL_PX = 36;

export const RADIUS_CARD_PX = 14;
export const RADIUS_CONTROL_PX = 10;
export const RADIUS_PILL_PX = 999;

export const BORDER_WIDTH_PX = 2;
export const BORDER_WIDTH_FOCUS_PX = 3;
export const DOT_SIZE_PX = 12;
export const GRID_LINE_WIDTH_PX = 1;
export const PAGE_MAX_WIDTH_PX = 1280;
export const DOCS_NAV_WIDTH_PX = 264;
export const SWATCH_MIN_WIDTH_PX = 140;
export const SHADOW_OFFSET_PX = 5;
export const SHADOW_OFFSET_SMALL_PX = 3;
export const GRID_CELL_PX = 28;

export const FONT_SIZE_XS_REM = 0.78;
export const FONT_SIZE_SM_REM = 0.85;
export const FONT_SIZE_BODY_REM = 1;
export const FONT_SIZE_H3_REM = 1.15;
export const FONT_SIZE_H2_REM = 1.75;
export const FONT_SIZE_H1_REM = 2.1;

export const MIN_HEADING_LEVEL = 1;
export const MAX_HEADING_LEVEL = 6;
export const DEFAULT_HEADING_LEVEL = 2;

export const LETTER_SPACING_TIGHT = "0.01em";
export const LETTER_SPACING_WIDE = "0.02em";

export const FOCUS_OUTLINE_OFFSET_PX = BORDER_WIDTH_PX;

export interface ThemePalette {
  name: string;
  gridBg: string;
  gridLine: string;
  ink: string;
  muted: string;
  card: string;
  pink: string;
  pinkPale: string;
  peach: string;
  peachSoft: string;
  cream: string;
  yellow: string;
  yellowSoft: string;
  mint: string;
  lavender: string;
  red: string;
  navy: string;
  border: string;
  link: string;
  focus: string;
  brightInk: string;
}

export const LIGHT_PALETTE: ThemePalette = {
  name: THEME_LIGHT,
  gridBg: "#8f9fe6",
  gridLine: "rgba(255, 255, 255, 0.65)",
  ink: "#232a3d",
  muted: "#5f5486",
  card: "#fffaf2",
  pink: "#f7a8c6",
  pinkPale: "#f9b1cd",
  peach: "#ffcf9f",
  peachSoft: "#ffe9d6",
  cream: "#ffffff",
  yellow: "#ffcf4d",
  yellowSoft: "#fff3c4",
  mint: "#bfe8b0",
  lavender: "#d7ddff",
  red: "#c62f45",
  navy: "#232a5a",
  border: "#232a3d",
  link: "#232a5a",
  focus: "#232a5a",
  brightInk: BRIGHT_INK_HEX,
};

export const DARK_PALETTE: ThemePalette = {
  name: THEME_DARK,
  gridBg: "#141022",
  gridLine: "rgba(249, 177, 205, 0.16)",
  ink: "#f9eef6",
  muted: "#d3c6e8",
  card: "#3e365c",
  pink: "#a83a63",
  pinkPale: "#5c2340",
  peach: "#5c3a2a",
  peachSoft: "#443055",
  cream: "#241f36",
  yellow: "#ffd74d",
  yellowSoft: "#4a3d18",
  mint: "#3d4a2e",
  lavender: "#5a4416",
  red: "#ff8fa0",
  navy: "#ffd74d",
  border: "#f9eef6",
  link: "#ffe9a8",
  focus: "#ffd74d",
  brightInk: BRIGHT_INK_HEX,
};
