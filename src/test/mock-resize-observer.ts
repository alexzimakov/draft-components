export function mockResizeObserver() {
  if (typeof window['ResizeObserver'] === 'undefined') {
    type ObservableElement = Element | SVGElement;

    type ObserveOptions = {
      box?: 'content-box' | 'border-box' | 'device-pixel-content-box';
    };

    type ResizeObserverEntryMock = {
      borderBoxSize: { inlineSize: number; blockSize: number };
      contentBoxSize: { inlineSize: number; blockSize: number };
      devicePixelContentBoxSize: { inlineSize: number; blockSize: number };
      contentRect: DOMRectReadOnly;
      target: ObservableElement;
    };

    type Callback = (entries: ResizeObserverEntryMock[], observer: ResizeObserverMock) => void;

    class ResizeObserverMock {
      #targets: [ObservableElement, ObserveOptions][];
      #callback: Callback;

      constructor(callback: Callback) {
        this.#targets = [];
        this.#callback = callback;
      }

      observe(target: ObservableElement, options: ObserveOptions = {}): void {
        this.#targets.push([target, options]);
        this.#callback([{
          target,
          borderBoxSize: { inlineSize: 0, blockSize: 0 },
          contentBoxSize: { inlineSize: 0, blockSize: 0 },
          devicePixelContentBoxSize: { inlineSize: 0, blockSize: 0 },
          contentRect: Object.freeze({
            x: 0,
            y: 0,
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0,
            toJSON() { },
          }),
        }], this);
      }

      unobserve(target: ObservableElement) {
        this.#targets = this.#targets.filter(([el]) => el !== target);
      }

      disconnect() {
        this.#targets = [];
        return;
      }
    }
    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      value: ResizeObserverMock,
    });
  }
}
