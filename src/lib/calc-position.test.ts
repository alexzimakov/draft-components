import { describe, expect, it } from 'vitest';
import { calcPosition, type BoundingRect } from './calc-position.js';

describe('calculates position for the \'top\' placement', () => {
  const anchorRect: BoundingRect = {
    width: 80,
    height: 20,
    left: 400,
    right: 480,
    top: 800,
    bottom: 820,
  };
  const elementRect: BoundingRect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    placement: 'top',
    anchorRect,
    elementRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorPadding: 10,
    viewportPadding: 20,
  } as const;

  const y = params.scrollY
    + anchorRect.top
    - elementRect.height
    - params.anchorPadding;
  const testCases = [
    {
      input: {
        ...params,
        alignment: 'end',
      },
      output: {
        y,
        x: params.scrollX + anchorRect.right - elementRect.width,
        placement: 'top',
        alignment: 'end',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
    {
      input: {
        ...params,
        alignment: 'start',
      },
      output: {
        y,
        x: params.scrollX + anchorRect.left,
        placement: 'top',
        alignment: 'start',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
    {
      input: {
        ...params,
        alignment: 'center',
      },
      output: {
        y,
        x: params.scrollX
          + anchorRect.left
          + (anchorRect.width / 2)
          - (elementRect.width / 2),
        placement: 'top',
        alignment: 'center',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
  ] as const;

  testCases.forEach((testCase) => {
    it(`- '${testCase.input.alignment}' alignment`, () => {
      expect(calcPosition(testCase.input)).toEqual(testCase.output);
    });
  });
});

describe('calculates position for the \'bottom\' placement', () => {
  const anchorRect: BoundingRect = {
    width: 80,
    height: 20,
    left: 400,
    right: 480,
    top: 800,
    bottom: 820,
  };
  const elementRect: BoundingRect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    placement: 'bottom',
    anchorRect,
    elementRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorPadding: 10,
    viewportPadding: 20,
  } as const;

  const y = params.scrollY + anchorRect.bottom + params.anchorPadding;
  const testCases = [
    {
      input: {
        ...params,
        alignment: 'end',
      },
      output: {
        y,
        x: params.scrollX + anchorRect.right - elementRect.width,
        placement: 'bottom',
        alignment: 'end',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
    {
      input: {
        ...params,
        alignment: 'start',
      },
      output: {
        y,
        x: params.scrollX + anchorRect.left,
        placement: 'bottom',
        alignment: 'start',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
    {
      input: {
        ...params,
        alignment: 'center',
      },
      output: {
        y,
        x: params.scrollX
          + anchorRect.left
          + (anchorRect.width / 2)
          - (elementRect.width / 2),
        placement: 'bottom',
        alignment: 'center',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
  ] as const;

  testCases.forEach((testCase) => {
    it(`- '${testCase.input.alignment}' alignment`, () => {
      expect(calcPosition(testCase.input)).toEqual(testCase.output);
    });
  });
});

describe('calculates position for the \'left\' placement', () => {
  const anchorRect: BoundingRect = {
    width: 80,
    height: 20,
    left: 700,
    right: 780,
    top: 800,
    bottom: 820,
  };
  const elementRect: BoundingRect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    placement: 'left',
    anchorRect,
    elementRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorPadding: 10,
    viewportPadding: 20,
  } as const;

  const x = params.scrollX
    + anchorRect.left
    - elementRect.width
    - params.anchorPadding;
  const testCases = [
    {
      input: {
        ...params,
        alignment: 'end',
      },
      output: {
        x,
        y: params.scrollY + anchorRect.bottom - elementRect.height,
        placement: 'left',
        alignment: 'end',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
    {
      input: {
        ...params,
        alignment: 'start',
      },
      output: {
        x,
        y: params.scrollY + anchorRect.top,
        placement: 'left',
        alignment: 'start',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
    {
      input: {
        ...params,
        alignment: 'center',
      },
      output: {
        x,
        y: params.scrollY
          + anchorRect.top
          + (anchorRect.height / 2) - (elementRect.height / 2),
        placement: 'left',
        alignment: 'center',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
  ] as const;

  testCases.forEach((testCase) => {
    it(`- '${testCase.input.alignment}' alignment`, () => {
      expect(calcPosition(testCase.input)).toEqual(testCase.output);
    });
  });
});

describe('calculates position for the \'right\' placement', () => {
  const anchorRect: BoundingRect = {
    width: 80,
    height: 20,
    left: 200,
    right: 280,
    top: 800,
    bottom: 820,
  };
  const elementRect: BoundingRect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    placement: 'right',
    anchorRect,
    elementRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorPadding: 10,
    viewportPadding: 20,
  } as const;

  const x = params.scrollX + anchorRect.right + params.anchorPadding;
  const testCases = [
    {
      input: {
        ...params,
        alignment: 'end',
      },
      output: {
        x,
        y: params.scrollY + anchorRect.bottom - elementRect.height,
        placement: 'right',
        alignment: 'end',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
    {
      input: {
        ...params,
        alignment: 'start',
      },
      output: {
        x,
        y: params.scrollY + anchorRect.top,
        placement: 'right',
        alignment: 'start',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
    {
      input: {
        ...params,
        alignment: 'center',
      },
      output: {
        x,
        y: params.scrollY
          + anchorRect.top
          + (anchorRect.height / 2) - (elementRect.height / 2),
        placement: 'right',
        alignment: 'center',
        maxWidth: elementRect.width,
        maxHeight: elementRect.height,
      },
    },
  ] as const;

  testCases.forEach((testCase) => {
    it(`- '${testCase.input.alignment}' alignment`, () => {
      expect(calcPosition(testCase.input)).toEqual(testCase.output);
    });
  });
});

describe('should correct position by X-axis when popover out of viewport bounds', () => {
  it('at the left edge', () => {
    const anchorRect: BoundingRect = {
      width: 200,
      height: 100,
      left: 100,
      right: 300,
      top: 450,
      bottom: 550,
    };
    const elementRect: BoundingRect = {
      width: 400,
      height: 200,
      left: 0,
      right: 400,
      top: 0,
      bottom: 200,
    };
    const params = {
      anchorRect,
      elementRect,
      viewportWidth: 1000,
      viewportHeight: 1000,
      scrollY: 0,
      scrollX: 0,
      anchorPadding: 10,
      viewportPadding: 20,
    };

    expect(
      calcPosition({
        ...params,
        placement: 'bottom',
        alignment: 'end',
      }),
    ).toEqual({
      y: params.scrollY + anchorRect.bottom + params.anchorPadding,
      x: params.scrollX + params.viewportPadding,
      placement: 'bottom',
      alignment: 'end',
      maxWidth: elementRect.width,
      maxHeight: elementRect.height,
    });
  });

  it('at the right edge', () => {
    const anchorRect: BoundingRect = {
      width: 200,
      height: 100,
      left: 700,
      right: 900,
      top: 450,
      bottom: 550,
    };
    const elementRect: BoundingRect = {
      width: 400,
      height: 200,
      left: 0,
      right: 400,
      top: 0,
      bottom: 200,
    };
    const params = {
      anchorRect,
      elementRect,
      viewportWidth: 1000,
      viewportHeight: 1000,
      scrollY: 0,
      scrollX: 0,
      anchorPadding: 10,
      viewportPadding: 20,
    };

    expect(
      calcPosition({
        ...params,
        placement: 'bottom',
        alignment: 'start',
      }),
    ).toEqual({
      y: params.scrollY + anchorRect.bottom + params.anchorPadding,
      x:
        params.scrollX
        + params.viewportWidth
        - elementRect.width
        - params.viewportPadding,
      placement: 'bottom',
      alignment: 'start',
      maxWidth: elementRect.width,
      maxHeight: elementRect.height,
    });
  });
});

describe('should flip placement when popover out of viewport bounds', () => {
  it('at the top edge', () => {
    const anchorRect: BoundingRect = {
      width: 200,
      height: 100,
      left: 400,
      right: 600,
      top: 100,
      bottom: 200,
    };
    const elementRect: BoundingRect = {
      width: 400,
      height: 400,
      left: 0,
      right: 400,
      top: 0,
      bottom: 400,
    };
    const params = {
      anchorRect,
      elementRect,
      viewportWidth: 1000,
      viewportHeight: 1000,
      scrollY: 0,
      scrollX: 0,
      anchorPadding: 10,
      viewportPadding: 20,
    };

    expect(
      calcPosition({
        ...params,
        placement: 'top',
        alignment: 'start',
      }),
    ).toEqual({
      x: params.scrollX + anchorRect.left,
      y: params.scrollY + anchorRect.bottom + params.anchorPadding,
      placement: 'bottom',
      alignment: 'start',
      maxWidth: elementRect.width,
      maxHeight: elementRect.height,
    });
  });

  it('at the bottom edge', () => {
    const anchorRect: BoundingRect = {
      width: 200,
      height: 100,
      left: 400,
      right: 600,
      top: 800,
      bottom: 900,
    };
    const elementRect: BoundingRect = {
      width: 400,
      height: 400,
      left: 0,
      right: 400,
      top: 0,
      bottom: 400,
    };
    const params = {
      anchorRect,
      elementRect,
      viewportWidth: 1000,
      viewportHeight: 1000,
      scrollY: 0,
      scrollX: 0,
      anchorPadding: 10,
      viewportPadding: 20,
    };

    expect(
      calcPosition({
        ...params,
        placement: 'bottom',
        alignment: 'start',
      }),
    ).toEqual({
      x: params.scrollX + anchorRect.left,
      y:
        params.scrollY + anchorRect.top
        - elementRect.height - params.anchorPadding,
      placement: 'top',
      alignment: 'start',
      maxWidth: elementRect.width,
      maxHeight: elementRect.height,
    });
  });
});

it('should calc new width and height if not enough space for popover', () => {
  const anchorRect: BoundingRect = {
    width: 200,
    height: 200,
    left: 200,
    right: 400,
    top: 200,
    bottom: 400,
  };
  const elementRect: BoundingRect = {
    width: 800,
    height: 200,
    left: 0,
    right: 800,
    top: 0,
    bottom: 200,
  };
  const params = {
    anchorRect,
    elementRect,
    viewportWidth: 600,
    viewportHeight: 600,
    scrollY: 0,
    scrollX: 0,
    anchorPadding: 10,
    viewportPadding: 20,
  };

  expect(
    calcPosition({
      ...params,
      placement: 'bottom',
      alignment: 'start',
    }),
  ).toEqual({
    y: params.scrollY + anchorRect.bottom + params.anchorPadding,
    x: params.scrollX + params.viewportPadding,
    placement: 'bottom',
    alignment: 'start',
    maxWidth: params.viewportWidth - 2 * params.viewportPadding,
    maxHeight: params.viewportHeight - anchorRect.bottom - params.anchorPadding - params.viewportPadding,
  });
});

it('should place popover on bottom if not enough space on right or left side', () => {
  const anchorRect: BoundingRect = {
    width: 200,
    height: 100,
    left: 400,
    right: 600,
    top: 450,
    bottom: 550,
  };
  const elementRect: BoundingRect = {
    width: 500,
    height: 200,
    left: 0,
    right: 500,
    top: 0,
    bottom: 200,
  };
  const params = {
    anchorRect,
    elementRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorPadding: 10,
    viewportPadding: 20,
  };

  expect(
    calcPosition({
      ...params,
      placement: 'left',
      alignment: 'start',
    }),
  ).toEqual({
    y: params.scrollY + anchorRect.bottom + params.anchorPadding,
    x: params.scrollX + anchorRect.left,
    placement: 'bottom',
    alignment: 'start',
    maxWidth: elementRect.width,
    maxHeight: elementRect.height,
  });

  expect(
    calcPosition({
      ...params,
      placement: 'right',
      alignment: 'start',
    }),
  ).toEqual({
    y: params.scrollY + anchorRect.bottom + params.anchorPadding,
    x: params.scrollX + anchorRect.left,
    placement: 'bottom',
    alignment: 'start',
    maxWidth: elementRect.width,
    maxHeight: elementRect.height,
  });
});
