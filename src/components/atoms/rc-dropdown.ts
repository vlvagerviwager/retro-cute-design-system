import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Accessible dropdown wrapper. The native <label> + <select> stay in the
 * light DOM (projected via slots) so keyboard behavior, screen-reader
 * announcements, and form participation remain platform-native. Only
 * the retro visual treatment is added via ::slotted selectors.
 *
 * Usage:
 *   <rc-dropdown>
 *     <label for="source">Source</label>
 *     <select id="source">…</select>
 *   </rc-dropdown>
 */
@customElement("rc-dropdown")
export class RcDropdown extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--rc-space-xs);
      min-width: 0;
    }
    ::slotted(label) {
      font-size: var(--rc-font-size-sm);
      font-weight: var(--rc-weight-label);
      letter-spacing: var(--rc-letter-spacing-tight);
      color: var(--rc-color-ink);
    }
    ::slotted(select) {
      font: inherit;
      color: var(--rc-color-ink);
      background: var(--rc-color-cream);
      border: var(--rc-border-width) solid var(--rc-color-border);
      border-radius: var(--rc-radius-control);
      padding: var(--rc-space-sm) var(--rc-space-md);
      outline-offset: var(--rc-border-width);
      min-width: 0;
    }
    ::slotted(select:focus-visible) {
      outline: var(--rc-border-width-focus) solid var(--rc-color-focus);
    }
    .hint {
      margin: 0;
      font-size: var(--rc-font-size-sm);
      font-weight: var(--rc-weight-label);
      color: var(--rc-color-muted);
    }
  `;

  @property({ type: String })
  hint = "";

  render() {
    return html`<slot></slot>
      ${this.hint.length > 0
        ? html`<p class="hint" part="hint">${this.hint}</p>`
        : html``}`;
  }
}
