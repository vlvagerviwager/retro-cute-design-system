import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { DEFAULT_HEADING_LEVEL, MAX_HEADING_LEVEL, MIN_HEADING_LEVEL } from "../../tokens";

/**
 * Typographic atoms. Headings render the requested h1–h6 level so the
 * document outline stays meaningful; text and link are styled inline
 * elements matching the job-board treatments.
 */
@customElement("rc-heading")
export class RcHeading extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: var(--rc-font-display);
      font-weight: var(--rc-weight-heading);
      line-height: var(--rc-line-height-tight);
      letter-spacing: var(--rc-letter-spacing-tight);
      margin: 0 0 var(--rc-space-sm);
      color: var(--rc-color-ink);
    }
    .size-1 {
      font-size: var(--rc-font-size-h1);
    }
    .size-2 {
      font-size: var(--rc-font-size-h2);
    }
    .size-3 {
      font-size: var(--rc-font-size-h3);
    }
    .size-4 {
      font-size: var(--rc-font-size-body);
    }
    .size-5 {
      font-size: var(--rc-font-size-sm);
    }
    .size-6 {
      font-size: var(--rc-font-size-xs);
    }
  `;

  @property({ type: Number })
  level: number = DEFAULT_HEADING_LEVEL;

  private clampedLevel(): number {
    if (this.level < MIN_HEADING_LEVEL) {
      return MIN_HEADING_LEVEL;
    }
    if (this.level > MAX_HEADING_LEVEL) {
      return MAX_HEADING_LEVEL;
    }
    return this.level;
  }

  render() {
    // Heading levels 1-6 are semantic HTML requirements, not styling
    // magic numbers; the allowed range is still guarded by token bounds.
    const headingLevel = this.clampedLevel();
    const sizeClass = `size-${headingLevel}`;
    switch (headingLevel) {
      case 1:
        return html`<h1 class=${sizeClass} part="heading"><slot></slot></h1>`;
      case 3:
        return html`<h3 class=${sizeClass} part="heading"><slot></slot></h3>`;
      case 4:
        return html`<h4 class=${sizeClass} part="heading"><slot></slot></h4>`;
      case 5:
        return html`<h5 class=${sizeClass} part="heading"><slot></slot></h5>`;
      case 6:
        return html`<h6 class=${sizeClass} part="heading"><slot></slot></h6>`;
      case 2:
      default:
        return html`<h2 class=${sizeClass} part="heading"><slot></slot></h2>`;
    }
  }
}

@customElement("rc-text")
export class RcText extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    p {
      margin: 0 0 var(--rc-space-sm);
      line-height: var(--rc-line-height-body);
      color: var(--rc-color-ink);
      font-size: var(--rc-font-size-body);
    }
    .variant-muted {
      color: var(--rc-color-muted);
    }
    .variant-small {
      font-size: var(--rc-font-size-sm);
    }
  `;

  @property({ type: String, reflect: true })
  variant: "body" | "muted" | "small" = "body";

  render() {
    return html`<p class="variant-${this.variant}" part="text"><slot></slot></p>`;
  }
}

@customElement("rc-link")
export class RcLink extends LitElement {
  static styles = css`
    :host {
      display: inline;
    }
    a {
      color: var(--rc-color-link);
      text-decoration-thickness: var(--rc-border-width);
      text-underline-offset: var(--rc-border-width);
      text-decoration-color: var(--rc-color-red);
      font-weight: var(--rc-weight-heading);
    }
    a:hover {
      text-decoration-thickness: var(--rc-border-width-focus);
    }
    a:focus-visible {
      outline: var(--rc-border-width-focus) solid var(--rc-color-focus);
      outline-offset: var(--rc-border-width);
    }
  `;

  @property({ type: String })
  href = "#";

  render() {
    return html`<a href=${this.href} part="link"><slot></slot></a>`;
  }
}
