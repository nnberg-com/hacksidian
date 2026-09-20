/** Keep the reader's position while asynchronous examples change message heights. */
export class ConversationScroll {
  private following = true;
  private frame = 0;
  private anchor?: { element: HTMLElement; offset: number };
  private resize: ResizeObserver;
  private mutation: MutationObserver;
  private win: Window;

  constructor(private el: HTMLElement) {
    this.win = el.ownerDocument.defaultView!;
    this.resize = new ResizeObserver(() => this.schedule());
    this.mutation = new MutationObserver(() => { this.observe(); this.schedule(); });
    this.mutation.observe(el, { childList: true });
    this.observe();
    el.addEventListener('scroll', this.onScroll, { passive: true });
  }

  private observe(): void {
    this.resize.disconnect();
    this.resize.observe(this.el);
    for (const child of Array.from(this.el.children)) this.resize.observe(child);
  }

  private onScroll = (): void => {
    this.following = this.el.scrollHeight - this.el.clientHeight - this.el.scrollTop < 32;
    this.remember();
  };

  private remember(): void {
    const top = this.el.getBoundingClientRect().top;
    const element = Array.from(this.el.children).find(child => child.getBoundingClientRect().bottom > top) as HTMLElement | undefined;
    this.anchor = element ? { element, offset: element.getBoundingClientRect().top - top } : undefined;
  }

  follow(): void { this.following = true; this.schedule(); }

  private schedule(): void {
    if (this.frame) return;
    this.frame = this.win.requestAnimationFrame(() => {
      this.frame = 0;
      if (this.following) this.el.scrollTop = this.el.scrollHeight;
      else if (this.anchor?.element.parentElement === this.el) {
        this.el.scrollTop += this.anchor.element.getBoundingClientRect().top - this.el.getBoundingClientRect().top - this.anchor.offset;
      }
      this.remember();
    });
  }

  destroy(): void {
    this.resize.disconnect(); this.mutation.disconnect();
    this.win.cancelAnimationFrame(this.frame);
    this.el.removeEventListener('scroll', this.onScroll);
  }
}
