import { describe, expect, test } from "bun:test";
import {
  BORDER_WIDTH_FOCUS_PX,
  BORDER_WIDTH_PX,
  DARK_PALETTE,
  DEFAULT_HEADING_LEVEL,
  DOCS_NAV_WIDTH_PX,
  FONT_SIZE_H1_REM,
  LIGHT_PALETTE,
  MAX_HEADING_LEVEL,
  MIN_HEADING_LEVEL,
  PAGE_MAX_WIDTH_PX,
  RADIUS_CARD_PX,
  RADIUS_CONTROL_PX,
  SHADOW_OFFSET_PX,
  SPACE_LG_PX,
  SPACE_MD_PX,
  SPACE_SM_PX,
  SPACE_XL_PX,
  SPACE_XS_PX,
  SWATCH_MIN_WIDTH_PX,
  THEME_DARK,
  THEME_LIGHT,
} from "./tokens";

describe("theme names", () => {
  test("light and dark are distinct", () => {
    expect(THEME_LIGHT).not.toBe(THEME_DARK);
  });
});

describe("palettes", () => {
  test("light and dark expose the same token keys", () => {
    expect(Object.keys(DARK_PALETTE).sort()).toEqual(Object.keys(LIGHT_PALETTE).sort());
  });

  test("light and dark share a name field matching the theme", () => {
    expect(LIGHT_PALETTE.name).toBe(THEME_LIGHT);
    expect(DARK_PALETTE.name).toBe(THEME_DARK);
  });
});

describe("scales", () => {
  test("spacing scale ascends", () => {
    expect([SPACE_XS_PX, SPACE_SM_PX, SPACE_MD_PX, SPACE_LG_PX, SPACE_XL_PX]).toEqual(
      [SPACE_XS_PX, SPACE_SM_PX, SPACE_MD_PX, SPACE_LG_PX, SPACE_XL_PX].sort((a, b) => a - b),
    );
  });

  test("layout constants stay positive", () => {
    for (const layoutValue of [
      BORDER_WIDTH_PX,
      BORDER_WIDTH_FOCUS_PX,
      RADIUS_CARD_PX,
      RADIUS_CONTROL_PX,
      SHADOW_OFFSET_PX,
      PAGE_MAX_WIDTH_PX,
      DOCS_NAV_WIDTH_PX,
      SWATCH_MIN_WIDTH_PX,
      FONT_SIZE_H1_REM,
    ]) {
      expect(layoutValue).toBeGreaterThan(0);
    }
  });

  test("default heading level sits inside the allowed range", () => {
    expect(DEFAULT_HEADING_LEVEL).toBeGreaterThanOrEqual(MIN_HEADING_LEVEL);
    expect(DEFAULT_HEADING_LEVEL).toBeLessThanOrEqual(MAX_HEADING_LEVEL);
  });
});
