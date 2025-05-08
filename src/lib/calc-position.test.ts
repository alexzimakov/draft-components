import { describe, expect, it } from 'vitest';
import { calcPosition, BoundingRect } from './calc-position.js';

describe('calculates position for the \'top\' placement', () => {
  const anchorRect: BoundingRect = {
    width: 80,
    height: 20,
    left: 400,
    right: 480,
    top: 800,
    bottom: 820,
  };
  const popoverRect: BoundingRect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    anchorRect,
    popoverRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorPadding: 10,
    viewportPadding: 20,
  };

  const y = params.scrollY
    + anchorRect.top
    - popoverRect.height
    - params.anchorPadding;
  const testCases = [
    {
      alignment: 'end',
      coordinates: {
        y,
        x: params.scrollX + anchorRect.right - popoverRect.width,
      },
    },
    {
      alignment: 'start',
      coordinates: {
        y,
        x: params.scrollX + anchorRect.left,
      },
    },
    {
      alignment: 'center',
      coordinates: {
        y,
        x: params.scrollX
          + anchorRect.left
          + (anchorRect.width / 2)
          - (popoverRect.width / 2),
      },
    },
  ] as const;

  testCases.forEach((testCase) => {
    const placement = 'top';
    const alignment = testCase.alignment;
    it(`- '${alignment}' alignment`, () => {
      expect(
        calcPosition({
          ...params,
          placement,
          alignment,
        }),
      ).toEqual({
        ...testCase.coordinates,
        placement,
        alignment,
      });
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
  const popoverRect: BoundingRect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    anchorRect,
    popoverRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorPadding: 10,
    viewportPadding: 20,
  };

  const y = params.scrollY + anchorRect.bottom + params.anchorPadding;
  const testCases = [
    {
      alignment: 'end',
      coordinates: {
        y,
        x: params.scrollX + anchorRect.right - popoverRect.width,
      },
    },
    {
      alignment: 'start',
      coordinates: {
        y,
        x: params.scrollX + anchorRect.left,
      },
    },
    {
      alignment: 'center',
      coordinates: {
        y,
        x: params.scrollX
          + anchorRect.left
          + (anchorRect.width / 2)
          - (popoverRect.width / 2),
      },
    },
  ] as const;

  testCases.forEach((testCase) => {
    const placement = 'bottom';
    const alignment = testCase.alignment;
    it(`- '${alignment}' alignment`, () => {
      expect(
        calcPosition({
          ...params,
          placement,
          alignment,
        }),
      ).toEqual({
        ...testCase.coordinates,
        placement,
        alignment,
      });
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
  const popoverRect: BoundingRect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    anchorRect,
    popoverRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorPadding: 10,
    viewportPadding: 20,
  };

  const x = params.scrollX
    + anchorRect.left
    - popoverRect.width
    - params.anchorPadding;
  const testCases = [
    {
      alignment: 'end',
      coordinates: {
        x,
        y: params.scrollY + anchorRect.bottom - popoverRect.height,
      },
    },
    {
      alignment: 'start',
      coordinates: {
        x,
        y: params.scrollY + anchorRect.top,
      },
    },
    {
      alignment: 'center',
      coordinates: {
        x,
        y: params.scrollY + anchorRect.top
          + (anchorRect.height / 2) - (popoverRect.height / 2),
      },
    },
  ] as const;

  testCases.forEach((testCase) => {
    const placement = 'left';
    const alignment = testCase.alignment;
    it(`- '${alignment}' alignment`, () => {
      expect(
        calcPosition({
          ...params,
          placement,
          alignment,
        }),
      ).toEqual({
        ...testCase.coordinates,
        placement,
        alignment,
      });
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
  const popoverRect: BoundingRect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    anchorRect,
    popoverRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorPadding: 10,
    viewportPadding: 20,
  };

  const x = params.scrollX + anchorRect.right + params.anchorPadding;
  const testCases = [
    {
      alignment: 'end',
      coordinates: {
        x,
        y: params.scrollY + anchorRect.bottom - popoverRect.height,
      },
    },
    {
      alignment: 'start',
      coordinates: {
        x,
        y: params.scrollY + anchorRect.top,
      },
    },
    {
      alignment: 'center',
      coordinates: {
        x,
        y: params.scrollY + anchorRect.top
          + (anchorRect.height / 2) - (popoverRect.height / 2),
      },
    },
  ] as const;

  testCases.forEach((testCase) => {
    const placement = 'right';
    const alignment = testCase.alignment;
    it(`- '${alignment}' alignment`, () => {
      expect(
        calcPosition({
          ...params,
          placement,
          alignment,
        }),
      ).toEqual({
        ...testCase.coordinates,
        placement,
        alignment,
      });
    });
  });
});

describe(
  'should correct position by X-axis when content out of viewport bounds',
  () => {
    it('at the left edge', () => {
      const anchorRect: BoundingRect = {
        width: 200,
        height: 100,
        left: 100,
        right: 300,
        top: 450,
        bottom: 550,
      };
      const popoverRect: BoundingRect = {
        width: 400,
        height: 200,
        left: 0,
        right: 400,
        top: 0,
        bottom: 200,
      };
      const params = {
        anchorRect,
        popoverRect,
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
      const popoverRect: BoundingRect = {
        width: 400,
        height: 200,
        left: 0,
        right: 400,
        top: 0,
        bottom: 200,
      };
      const params = {
        anchorRect,
        popoverRect,
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
          - popoverRect.width
          - params.viewportPadding,
        placement: 'bottom',
        alignment: 'start',
      });
    });
  },
);

describe('should flip placement when content out of viewport bounds', () => {
  it('at the top edge', () => {
    const anchorRect: BoundingRect = {
      width: 200,
      height: 100,
      left: 400,
      right: 600,
      top: 100,
      bottom: 200,
    };
    const popoverRect: BoundingRect = {
      width: 400,
      height: 400,
      left: 0,
      right: 400,
      top: 0,
      bottom: 400,
    };
    const params = {
      anchorRect,
      popoverRect,
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
    const popoverRect: BoundingRect = {
      width: 400,
      height: 400,
      left: 0,
      right: 400,
      top: 0,
      bottom: 400,
    };
    const params = {
      anchorRect,
      popoverRect,
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
        - popoverRect.height - params.anchorPadding,
      placement: 'top',
      alignment: 'start',
    });
  });
});

it('should place content at the start of left edge if not enough width', () => {
  const anchorRect: BoundingRect = {
    width: 200,
    height: 200,
    left: 200,
    right: 400,
    top: 200,
    bottom: 400,
  };
  const popoverRect: BoundingRect = {
    width: 800,
    height: 200,
    left: 0,
    right: 800,
    top: 0,
    bottom: 200,
  };
  const params = {
    anchorRect,
    popoverRect,
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
  });
});

it(
  'should place content on bottom if not enough space on right or left side',
  () => {
    const anchorRect: BoundingRect = {
      width: 200,
      height: 100,
      left: 400,
      right: 600,
      top: 450,
      bottom: 550,
    };
    const popoverRect: BoundingRect = {
      width: 500,
      height: 200,
      left: 0,
      right: 500,
      top: 0,
      bottom: 200,
    };
    const params = {
      anchorRect,
      popoverRect,
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
    });
  },
);
