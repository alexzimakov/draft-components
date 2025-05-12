import { getElementBoundingRect } from '../../lib/get-element-bounding-rect.js';

export type MoveObserverCallback = () => void;

export type MoveObserverDestructor = () => void;

/**
 * @see https://samthor.au/2021/observing-dom/#3.-move-observations
 */
export function observeMove(
  element: Element,
  callback: MoveObserverCallback,
): MoveObserverDestructor {
  let rootIntersectionObserver: IntersectionObserver | null = null;

  const elementResizeObserver = new ResizeObserver(() => setupRootIntersectionObserver());
  elementResizeObserver.observe(element);

  const root = (element.ownerDocument || window.document).documentElement;
  const rootResizeObserver = new ResizeObserver(() => setupRootIntersectionObserver());
  rootResizeObserver.observe(root);

  function setupRootIntersectionObserver() {
    if (rootIntersectionObserver) {
      rootIntersectionObserver.disconnect();
    }

    callback();

    const { width, height, top, right, bottom, left } = getElementBoundingRect(element);
    if (!width || !height) {
      return;
    }

    let isFirstUpdate = true;
    rootIntersectionObserver = new IntersectionObserver(() => {
      if (isFirstUpdate) {
        isFirstUpdate = false;
      } else {
        setupRootIntersectionObserver();
      }
    }, {
      root,
      rootMargin: `-${top}px -${root.offsetWidth - right}px -${root.offsetHeight - bottom}px -${left}px`,
      threshold: 1.0,
    });
  }

  return () => {
    elementResizeObserver.disconnect();
    rootResizeObserver.disconnect();
    if (rootIntersectionObserver) {
      rootIntersectionObserver.disconnect();
    }
  };
}
