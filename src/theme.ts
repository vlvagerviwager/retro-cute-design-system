import { THEME_DARK, THEME_LIGHT, THEME_STORAGE_KEY } from "./tokens";

export type ThemeName = typeof THEME_LIGHT | typeof THEME_DARK;

const THEME_ATTRIBUTE = "data-theme";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

function isThemeName(value: string | null): value is ThemeName {
  return value === THEME_LIGHT || value === THEME_DARK;
}

export function getInitialTheme(): ThemeName {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (isThemeName(storedTheme)) {
    return storedTheme;
  }
  const prefersDark = window.matchMedia(DARK_MODE_QUERY).matches;
  return prefersDark ? THEME_DARK : THEME_LIGHT;
}

export function getCurrentTheme(): ThemeName {
  const activeTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE);
  return isThemeName(activeTheme) ? activeTheme : THEME_LIGHT;
}

export function applyTheme(themeName: ThemeName): void {
  document.documentElement.setAttribute(THEME_ATTRIBUTE, themeName);
  localStorage.setItem(THEME_STORAGE_KEY, themeName);
}

export function toggleTheme(): ThemeName {
  const nextTheme = getCurrentTheme() === THEME_DARK ? THEME_LIGHT : THEME_DARK;
  applyTheme(nextTheme);
  return nextTheme;
}
