import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

export type RcButtonVariant = "default" | "primary";
export type RcButtonSize = "md" | "sm";

const BUTTON_VARIANT_DEFAULT: RcButtonVariant = "default";
const BUTTON_SIZE_MD: RcButtonSize = "md";

/**
 * Retro-cute button. Renders a native <button>, or a native <a> when
 * `href` is set (e.g. job-board "view role" links), so keyboard,
 * screen-reader, and focus behavior stay platform-native.
 */
@customElement("rc-button")
export class RcButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    .control {
      font: inherit;
      font-weight: var(--rc-weight-button);
      font-size: var(--rc-font-size-sm);
      background: var(--rc-color-cream);
      color: var(--rc-color-ink);
      border: var(--rc-border-width) solid var(--rc-color-border);
      border-radius: var(--rc-radius-control);
      padding: var(--rc-space-sm) var(--rc-space-md);
      cursor: pointer;
      box-shadow: var(--rc-shadow-offset-sm) var(--rc-shadow-offset-sm) 0 var(--rc-color-border);
      text-decoration: none;
      display: inline-block;
    }
    .control-size-sm {
      padding: var(--rc-space-xs) var(--rc-space-sm);
    }
    .control-variant-primary {
      background: var(--rc-color-navy);
      border-color: var(--rc-color-navy);
      color: var(--rc-color-cream);
    }
    [data-theme="dark"] .control-variant-primary,
    :host-context([data-theme="dark"]) .control-variant-primary {
      color: var(--rc-color-cream);
    }
    .control:hover {
      filter: brightness(1.06);
    }
    .control:active {
      transform: translate(
        var(--rc-border-width),
        var(--rc-border-width)
      );
      box-shadow: var(--rc-border-width) var(--rc-border-width) 0 var(--rc-color-border);
    }
    .control:focus-visible {
      outline: var(--rc-border-width-focus) solid var(--rc-color-focus);
      outline-offset: var(--rc-border-width);
    }
    .control:disabled {
      cursor: not-allowed;
      opacity: 0.6;
      transform: none;
    }
    @media (forced-colors: active) {
      .control {
        box-shadow: none;
        forced-color-adjust: auto;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: RcButtonVariant = BUTTON_VARIANT_DEFAULT;

  @property({ type: String, reflect: true })
  size: RcButtonSize = BUTTON_SIZE_MD;

  @property({ type: String })
  href = "";

  @property({ type: String })
  type: "button" | "submit" | "reset" = "button";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    const controlClass = [
      "control",
      `control-variant-${this.variant}`,
      `control-size-${this.size}`,
    ].join(" ");
    if (this.href.length > 0) {
      return html`<a class=${controlClass} href=${this.href} part="control"
        ><slot></slot
      ></a>`;
    }
    return html`<button
      class=${controlClass}
      type=${this.type}
      ?disabled=${this.disabled}
      part="control"
    >
      <slot></slot>
    </button>`;
  }
}
