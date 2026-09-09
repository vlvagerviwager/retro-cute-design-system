import { DARK_PALETTE, LIGHT_PALETTE, type ThemePalette } from "./tokens";
import { initSite } from "./site";
import "./docs.css";

const SWATCH_GRID_SELECTOR = "[data-palette-swatch]";
const SWATCH_LIGHT_VALUE = "light";
const NAV_LINK_ACTIVE_CLASS = "docs-nav-link-active";

interface SwatchEntry {
  label: string;
  value: string;
}

function paletteEntries(palette: ThemePalette): SwatchEntry[] {
  return [
    { label: "ink", value: palette.ink },
    { label: "muted", value: palette.muted },
    { label: "card", value: palette.card },
    { label: "pink", value: palette.pink },
    { label: "pink pale", value: palette.pinkPale },
    { label: "peach", value: palette.peach },
    { label: "peach soft", value: palette.peachSoft },
    { label: "cream", value: palette.cream },
    { label: "yellow", value: palette.yellow },
    { label: "yellow soft", value: palette.yellowSoft },
    { label: "mint", value: palette.mint },
    { label: "lavender", value: palette.lavender },
    { label: "red", value: palette.red },
    { label: "navy", value: palette.navy },
    { label: "border", value: palette.border },
    { label: "link", value: palette.link },
    { label: "focus", value: palette.focus },
  ];
}

function renderSwatches(): void {
  for (const swatchGrid of document.querySelectorAll<HTMLElement>(SWATCH_GRID_SELECTOR)) {
    const paletteName = swatchGrid.getAttribute("data-palette-swatch");
    const palette = paletteName === SWATCH_LIGHT_VALUE ? LIGHT_PALETTE : DARK_PALETTE;
    swatchGrid.innerHTML = "";
    for (const swatchEntry of paletteEntries(palette)) {
      const swatchItem = document.createElement("div");
      swatchItem.className = "swatch-item";
      swatchItem.setAttribute("role", "listitem");

      const swatchChip = document.createElement("span");
      swatchChip.className = "swatch-chip";
      swatchChip.style.backgroundColor = swatchEntry.value;
      swatchChip.setAttribute("aria-hidden", "true");

      const swatchLabel = document.createElement("span");
      swatchLabel.className = "swatch-label";
      swatchLabel.textContent = swatchEntry.label;

      const swatchValue = document.createElement("code");
      swatchValue.className = "swatch-value";
      swatchValue.textContent = swatchEntry.value;

      swatchItem.append(swatchChip, swatchLabel, swatchValue);
      swatchGrid.appendChild(swatchItem);
    }
  }
}

function initScrollSpy(): void {
  const navLinks = [...document.querySelectorAll<HTMLAnchorElement>("[data-docs-nav-link]")];
  if (navLinks.length === 0) {
    return;
  }
  const sectionById = new Map<string, HTMLElement>();
  for (const navLink of navLinks) {
    const sectionId = navLink.hash.slice(1);
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement !== null) {
      sectionById.set(sectionId, sectionElement);
    }
  }
  const observer = new IntersectionObserver(
    (observedEntries) => {
      for (const observedEntry of observedEntries) {
        if (observedEntry.isIntersecting === false) {
          continue;
        }
        for (const navLink of navLinks) {
          const isActive = navLink.hash.slice(1) === observedEntry.target.id;
          navLink.classList.toggle(NAV_LINK_ACTIVE_CLASS, isActive);
          if (isActive) {
            navLink.setAttribute("aria-current", "true");
          } else {
            navLink.removeAttribute("aria-current");
          }
        }
      }
    },
    { rootMargin: "-40% 0% -55% 0%" },
  );
  for (const sectionElement of sectionById.values()) {
    observer.observe(sectionElement);
  }
}

initSite();
renderSwatches();
initScrollSpy();
