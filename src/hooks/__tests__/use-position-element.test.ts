import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import {
  usePositionElement,
  getElementCoordinates,
  getHorizontalAxisOffset,
  getVerticalAxisOffset,
} from '../use-position-element';

describe('#getHorizontalAxisOffset()', () => {
  const viewportOffset = 10;
  const viewportWidth = 1000;
  const scrollX = 100;
  const anchorX = 450;
  const anchorWidth = 100;
  const targetWidth = 200;
  const wideTargetWidth = anchorX + targetWidth;

  it('should calculate offset when aligned at the start of the anchor element', () => {
    const expectedOffset = scrollX + anchorX;
    const offset = getHorizontalAxisOffset({
      alignment: 'start',
      viewportOffset,
      viewportWidth,
      scrollX,
      anchorX,
      anchorWidth,
      targetWidth,
    });

    expect(offset).toBe(expectedOffset);
  });

  it('should calculate offset when aligned at the center of the anchor element', () => {
    const expectedOffset =
      scrollX + anchorX + anchorWidth / 2 - targetWidth / 2;
    const offset = getHorizontalAxisOffset({
      alignment: 'center',
      viewportOffset,
      viewportWidth,
      scrollX,
      anchorX,
      anchorWidth,
      targetWidth,
    });

    expect(offset).toBe(expectedOffset);
  });

  it('should calculate offset when aligned at the end of the anchor element', () => {
    const expectedOffset = scrollX + anchorX + anchorWidth - targetWidth;
    const offset = getHorizontalAxisOffset({
      alignment: 'end',
      viewportOffset,
      viewportWidth,
      scrollX,
      anchorX,
      anchorWidth,
      targetWidth,
    });

    expect(offset).toBe(expectedOffset);
  });

  it('should recalculate offset when the target element out of the left side of the viewport', () => {
    const expectedOffset = scrollX + viewportOffset;
    const offset = getHorizontalAxisOffset({
      alignment: 'end',
      viewportOffset,
      viewportWidth,
      scrollX,
      anchorX,
      anchorWidth,
      targetWidth: wideTargetWidth,
    });

    expect(offset).toBe(expectedOffset);
  });

  it('should recalculate offset when the target element out of the right side of the viewport', () => {
    const expectedOffset =
      scrollX + viewportWidth - viewportOffset - wideTargetWidth;
    const offset = getHorizontalAxisOffset({
      alignment: 'start',
      viewportOffset,
      viewportWidth,
      scrollX,
      anchorX,
      anchorWidth,
      targetWidth: wideTargetWidth,
    });

    expect(offset).toBe(expectedOffset);
  });
});

describe('#getVerticalAxisOffset()', () => {
  const anchorOffset = 5;
  const viewportHeight = 1000;
  const scrollY = 100;
  const anchorY = 475;
  const anchorHeight = 50;
  const targetHeight = 200;

  it('should calculate offset when arranged at the top or left of the anchor element', () => {
    const expectedOffset = scrollY + anchorY - anchorOffset - targetHeight;

    expect(
      getVerticalAxisOffset({
        arrangement: 'top',
        anchorOffset,
        scrollY,
        anchorY,
        viewportHeight,
        anchorHeight,
        targetHeight,
      })
    ).toBe(expectedOffset);
    expect(
      getVerticalAxisOffset({
        arrangement: 'left',
        anchorOffset,
        scrollY,
        anchorY,
        viewportHeight,
        anchorHeight,
        targetHeight,
      })
    ).toBe(expectedOffset);
  });

  it('should recalculate offset when the target element out of the top side of the viewport', () => {
    const anchorY = 175;
    const expectedOffset = scrollY + anchorY + anchorHeight + anchorOffset;

    expect(
      getVerticalAxisOffset({
        arrangement: 'top',
        anchorOffset,
        scrollY,
        anchorY,
        viewportHeight,
        anchorHeight,
        targetHeight,
      })
    ).toBe(expectedOffset);
    expect(
      getVerticalAxisOffset({
        arrangement: 'left',
        anchorOffset,
        scrollY,
        anchorY,
        viewportHeight,
        anchorHeight,
        targetHeight,
      })
    ).toBe(expectedOffset);
  });

  it('should calculate offset when arranged at the bottom or right of the anchor element', () => {
    const expectedOffset = scrollY + anchorY + anchorHeight + anchorOffset;

    expect(
      getVerticalAxisOffset({
        arrangement: 'bottom',
        anchorOffset,
        scrollY,
        anchorY,
        viewportHeight,
        anchorHeight,
        targetHeight,
      })
    ).toBe(expectedOffset);
    expect(
      getVerticalAxisOffset({
        arrangement: 'right',
        anchorOffset,
        scrollY,
        anchorY,
        viewportHeight,
        anchorHeight,
        targetHeight,
      })
    ).toBe(expectedOffset);
  });

  it('should recalculate offset when the target element out of the bottom side of the viewport', () => {
    const anchorY = 875;
    const expectedOffset = scrollY + anchorY - anchorOffset - targetHeight;

    expect(
      getVerticalAxisOffset({
        arrangement: 'bottom',
        anchorOffset,
        scrollY,
        anchorY,
        viewportHeight,
        anchorHeight,
        targetHeight,
      })
    ).toBe(expectedOffset);
    expect(
      getVerticalAxisOffset({
        arrangement: 'right',
        anchorOffset,
        scrollY,
        anchorY,
        viewportHeight,
        anchorHeight,
        targetHeight,
      })
    ).toBe(expectedOffset);
  });
});

describe('#getElementCoordinates()', () => {
  const anchorRect = new DOMRect(450, 475, 100, 50);
  const targetRect = new DOMRect(0, 0, 200, 200);
  const viewport = { width: 1000, height: 1000 };
  const scroll = { x: 100, y: 100 };
  const offset = { anchor: 5, viewport: 10 };

  it('should calculate coordinates of the target element placed vertically', () => {
    const expectedCoordinates = {
      x: scroll.x + anchorRect.left,
      y: scroll.y + anchorRect.bottom + offset.anchor,
    };
    setup({ anchorRect, targetRect, viewport, scroll });

    expect(
      getElementCoordinates({
        anchorRect,
        targetRect,
        position: 'absolute',
        arrangement: 'bottom',
        alignment: 'start',
        anchorOffset: offset.anchor,
        viewportOffset: offset.viewport,
      })
    ).toEqual(expectedCoordinates);
  });

  it('should calculate coordinates of the target element without scroll values when positioned fixed', () => {
    const expectedCoordinates = {
      x: anchorRect.left,
      y: anchorRect.bottom + offset.anchor,
    };
    setup({ anchorRect, targetRect, viewport, scroll });

    expect(
      getElementCoordinates({
        anchorRect,
        targetRect,
        position: 'fixed',
        arrangement: 'bottom',
        alignment: 'start',
        anchorOffset: offset.anchor,
        viewportOffset: offset.viewport,
      })
    ).toEqual(expectedCoordinates);
  });

  it('should calculate coordinates of the target element placed horizontally', () => {
    const expectedCoordinates = {
      x: scroll.x + anchorRect.right + offset.anchor,
      y: scroll.y + anchorRect.top,
    };
    setup({ anchorRect, targetRect, viewport, scroll });

    expect(
      getElementCoordinates({
        anchorRect,
        targetRect,
        position: 'absolute',
        arrangement: 'right',
        alignment: 'start',
        anchorOffset: offset.anchor,
        viewportOffset: offset.viewport,
      })
    ).toEqual(expectedCoordinates);
  });

  it('should calculate coordinates of the target element when it fills the whole viewport space', () => {
    const targetRect = new DOMRect(0, 0, 980, 200);
    const expectedCoordinates = {
      x: scroll.x + offset.viewport,
      y: scroll.y + anchorRect.bottom + offset.anchor,
    };
    setup({ anchorRect, targetRect, viewport, scroll });

    expect(
      getElementCoordinates({
        anchorRect,
        targetRect,
        position: 'absolute',
        arrangement: 'bottom',
        alignment: 'start',
        anchorOffset: offset.anchor,
        viewportOffset: offset.viewport,
      })
    ).toEqual(expectedCoordinates);
  });

  it('should calculate coordinates of the target element and arrange it below the anchor element when not enough space horizontally', () => {
    const anchorRect = new DOMRect(100, 475, 800, 200);
    const expectedCoordinates = {
      x: scroll.x + anchorRect.left,
      y: scroll.y + anchorRect.bottom + offset.anchor,
    };
    setup({ anchorRect, targetRect, viewport, scroll });

    expect(
      getElementCoordinates({
        anchorRect,
        targetRect,
        position: 'absolute',
        arrangement: 'right',
        alignment: 'start',
        anchorOffset: offset.anchor,
        viewportOffset: offset.viewport,
      })
    ).toEqual(expectedCoordinates);
  });
});

describe('#usePositionElement()', () => {
  const anchorRect = new DOMRect(450, 475, 100, 50);
  const targetRect = new DOMRect(0, 0, 200, 200);
  const viewport = { width: 1000, height: 1000 };
  const scroll = { x: 100, y: 100 };
  const offset = { anchor: 5, viewport: 10 };

  it('should not place target element near the anchor element when hook is disabled', () => {
    const { anchor, target } = setup({
      anchorRect,
      targetRect,
      viewport,
      scroll,
    });
    const initialTargetTransform = target.style.transform;
    renderHook(() =>
      usePositionElement({
        anchorRef: { current: anchor },
        targetRef: { current: target },
        position: 'absolute',
        arrangement: 'bottom',
        alignment: 'start',
        anchorOffset: offset.anchor,
        viewportOffset: offset.viewport,
        isShown: false,
      })
    );

    expect(target.style.transform).toBe(initialTargetTransform);
  });

  it('should place target element near the anchor element when hook is enabled', () => {
    const { anchor, target } = setup({
      anchorRect,
      targetRect,
      viewport,
      scroll,
    });
    const x = scroll.x + anchorRect.left;
    const y = scroll.y + anchorRect.bottom + offset.anchor;
    renderHook(() =>
      usePositionElement({
        anchorRef: { current: anchor },
        targetRef: { current: target },
        position: 'absolute',
        arrangement: 'bottom',
        alignment: 'start',
        anchorOffset: offset.anchor,
        viewportOffset: offset.viewport,
        isShown: true,
      })
    );

    expect(target.style.transform).toBe(`translate(${x}px, ${y}px)`);
  });

  it('should update the target element placement when scrolling', () => {
    const { anchor, target } = setup({
      anchorRect,
      targetRect,
      viewport,
      scroll,
    });
    const x = scroll.x + anchorRect.left;
    const y = scroll.y + anchorRect.bottom + offset.anchor;
    renderHook(() =>
      usePositionElement({
        anchorRef: { current: anchor },
        targetRef: { current: target },
        position: 'absolute',
        arrangement: 'bottom',
        alignment: 'start',
        anchorOffset: offset.anchor,
        viewportOffset: offset.viewport,
        isShown: true,
        shouldUpdatePositionWhenScroll: true,
      })
    );

    expect(target.style.transform).toBe(`translate(${x}px, ${y}px)`);

    setup({
      anchorRect,
      targetRect,
      viewport,
      scroll: { ...scroll, y: scroll.y + 10 },
    });
    fireEvent.scroll(window);
    expect(target.style.transform).toBe(`translate(${x}px, ${y + 10}px)`);
  });
});

function setup(params: {
  anchorRect: DOMRect;
  targetRect: DOMRect;
  viewport: { width: number; height: number };
  scroll: { x: number; y: number };
}) {
  const anchor = document.createElement('button');
  Object.defineProperty(anchor, 'getBoundingClientRect', {
    configurable: true,
    value: () => params.anchorRect,
  });

  const target = document.createElement('div');
  Object.defineProperty(target, 'getBoundingClientRect', {
    configurable: true,
    value: () => params.targetRect,
  });

  Object.defineProperties(document.documentElement, {
    clientWidth: { configurable: true, value: params.viewport.width },
    clientHeight: { configurable: true, value: params.viewport.height },
  });

  Object.defineProperties(window, {
    pageXOffset: { configurable: true, value: params.scroll.x },
    pageYOffset: { configurable: true, value: params.scroll.y },
  });

  return { anchor, target, viewport: document.body };
}
