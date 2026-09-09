import { applyTheme, getCurrentTheme, getInitialTheme, toggleTheme } from "./theme";
import { THEME_DARK } from "./tokens";
import "./components";

const THEME_TOGGLE_SELECTOR = "[data-theme-toggle]";
const THEME_LABEL_DARK = "dark mode";
const THEME_LABEL_LIGHT = "light mode";

function labelForTheme(themeName: string): string {
  return themeName === THEME_DARK ? THEME_LABEL_LIGHT : THEME_LABEL_DARK;
}

function syncToggleLabels(): void {
  const activeTheme = getCurrentTheme();
  for (const toggleButton of document.querySelectorAll(THEME_TOGGLE_SELECTOR)) {
    toggleButton.textContent = labelForTheme(activeTheme);
    toggleButton.setAttribute("aria-pressed", String(activeTheme === THEME_DARK));
  }
}

/** Apply stored/preferred theme and wire every theme-toggle button. */
export function initSite(): void {
  applyTheme(getInitialTheme());
  syncToggleLabels();
  for (const toggleButton of document.querySelectorAll(THEME_TOGGLE_SELECTOR)) {
    toggleButton.addEventListener("click", () => {
      toggleTheme();
      syncToggleLabels();
    });
  }
}
