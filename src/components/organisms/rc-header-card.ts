import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Header card organism: the job-board hero panel
 * ("vlvagerviwager's jobs board" + headline + meta pill), generalized.
 * Titlebar carries the mac-style dots (aria-hidden, decorative) and an
 * actions slot for the theme toggle; the body takes title, subtitle,
 * and meta content through slots/attributes.
 */
@customElement("rc-header-card")
export class RcHeaderCard extends LitElement {
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
    }
    .titlebar-dots {
      display: inline-flex;
      gap: var(--rc-space-xs);
    }
    .dot {
      width: var(--rc-size-dot);
      height: var(--rc-size-dot);
      border-radius: 50%;
      border: var(--rc-border-width) solid var(--rc-color-border);
      display: inline-block;
    }
    .dot-one {
      background: var(--rc-color-red);
    }
    .dot-two {
      background: var(--rc-color-yellow);
    }
    .dot-three {
      background: var(--rc-color-navy);
    }
    .titlebar-text {
      margin: 0;
      font-weight: var(--rc-weight-heading);
      letter-spacing: var(--rc-letter-spacing-wide);
      flex: 1;
      min-width: 0;
    }
    .hero-body {
      padding: var(--rc-space-lg);
    }
    ::slotted(h1),
    ::slotted(h2) {
      font-family: var(--rc-font-display);
      font-weight: var(--rc-weight-heading);
      font-size: var(--rc-font-size-h1);
      margin: 0 0 var(--rc-space-sm);
      line-height: var(--rc-line-height-tight);
      letter-spacing: var(--rc-letter-spacing-tight);
    }
    ::slotted(p) {
      margin: 0 0 var(--rc-space-sm);
    }
  `;

  @property({ type: String })
  eyebrow = "";

  render() {
    return html`<header class="window" part="window">
      <div class="titlebar" part="titlebar">
        <span class="titlebar-dots" aria-hidden="true" part="dots">
          <span class="dot dot-one"></span>
          <span class="dot dot-two"></span>
          <span class="dot dot-three"></span>
        </span>
        <p class="titlebar-text" part="eyebrow">${this.eyebrow}</p>
        <slot name="actions"></slot>
      </div>
      <div class="hero-body" part="body"><slot></slot></div>
    </header>`;
  }
}
