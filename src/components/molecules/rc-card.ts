import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type RcCardTone = "default" | "pink" | "sun" | "peach" | "mint";

const CARD_TONE_DEFAULT: RcCardTone = "default";

/**
 * Generic retro window card: bordered card with hard offset shadow and
 * an optional titlebar. Content is projected through slots so headings,
 * links, and controls in the light DOM keep their native semantics.
 *
 * Slots: "titlebar" (titlebar row content), default (card body).
 */
@customElement("rc-card")
export class RcCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-width: 0;
    }
    .window {
      background: var(--rc-color-card);
      border: var(--rc-border-width) solid var(--rc-color-border);
      border-radius: var(--rc-radius-card);
      box-shadow: var(--rc-shadow-offset) var(--rc-shadow-offset) 0 var(--rc-color-border);
      overflow: hidden;
    }
    .titlebar {
      display: flex;
      align-items: center;
      gap: var(--rc-space-sm);
      padding: var(--rc-space-sm) var(--rc-space-md);
      background: var(--rc-color-pink);
      border-bottom: var(--rc-border-width) solid var(--rc-color-border);
      color: var(--rc-color-ink);
      font-weight: var(--rc-weight-heading);
      letter-spacing: var(--rc-letter-spacing-wide);
    }
    .titlebar-tone-sun {
      background: var(--rc-color-yellow);
    }
    /* Sun titlebars stay bright in both themes, so slotted title text uses
     * the static bright ink instead of the theme-flipping ink. */
    .titlebar-tone-sun slot::slotted(*) {
      color: var(--rc-color-bright-ink);
    }
    .titlebar-tone-peach {
      background: var(--rc-color-peach);
    }
    .titlebar-tone-mint {
      background: var(--rc-color-mint);
    }
    .titlebar-tone-pink {
      background: var(--rc-color-pink);
    }
    .titlebar-text {
      flex: 1;
      min-width: 0;
    }
    .body {
      padding: var(--rc-space-lg);
    }
  `;

  @property({ type: String, reflect: true })
  tone: RcCardTone = CARD_TONE_DEFAULT;

  @property({ type: Boolean, reflect: true })
  noTitlebar = false;

  render() {
    return html`<section class="window" part="window">
      ${this.noTitlebar
        ? html``
        : html`<header class="titlebar titlebar-tone-${this.tone}" part="titlebar">
            <span class="titlebar-text" part="titlebar-text"
              ><slot name="titlebar"></slot
            ></span>
          </header>`}
      <div class="body" part="body"><slot></slot></div>
    </section>`;
  }
}
