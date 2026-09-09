import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type RcPillTone =
  | "default"
  | "sun"
  | "mint"
  | "peach"
  | "lavender"
  | "pink"
  | "cherry";

const PILL_TONE_DEFAULT: RcPillTone = "default";

/**
 * Retro-cute pill / tag. Inline status or metadata label, mirroring the
 * job-board `.tag` and `.meta-line` treatments.
 */
@customElement("rc-pill")
export class RcPill extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    .pill {
      display: inline-block;
      font-size: var(--rc-font-size-xs);
      font-weight: var(--rc-weight-tag);
      border: var(--rc-border-width) solid var(--rc-color-border);
      border-radius: var(--rc-radius-pill);
      padding: var(--rc-space-xs) var(--rc-space-md);
      background: var(--rc-color-cream);
      color: var(--rc-color-ink);
      line-height: var(--rc-line-height-snug);
    }
    .pill-tone-sun {
      background: var(--rc-color-yellow);
      color: var(--rc-color-bright-ink);
    }
    .pill-tone-mint {
      background: var(--rc-color-mint);
    }
    .pill-tone-peach {
      background: var(--rc-color-peach);
    }
    .pill-tone-lavender {
      background: var(--rc-color-lavender);
    }
    .pill-tone-pink {
      background: var(--rc-color-pink);
    }
    .pill-tone-cherry {
      background: var(--rc-color-red);
      border-color: var(--rc-color-red);
      color: var(--rc-color-cream);
    }
  `;

  @property({ type: String, reflect: true })
  tone: RcPillTone = PILL_TONE_DEFAULT;

  render() {
    return html`<span class="pill pill-tone-${this.tone}" part="pill"
      ><slot></slot
    ></span>`;
  }
}
