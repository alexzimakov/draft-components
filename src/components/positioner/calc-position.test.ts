import { describe, expect, it } from 'vitest';
import { Alignment, Rect } from './types.js';
import { calcPosition } from './calc-position.js';

describe('calculates position for the \'top\' placement', () => {
  const anchorRect: Rect = {
    width: 80,
    height: 20,
    left: 400,
    right: 480,
    top: 800,
    bottom: 820,
  };
  const contentRect: Rect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    anchorRect,
    contentRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorGap: 10,
    viewportGap: 20,
  };

  const y = params.scrollY
    + anchorRect.top
    - contentRect.height
    - params.anchorGap;
  const testCases = [
    {
      alignment: 'end',
      coordinates: {
        y,
        x: params.scrollX + anchorRect.right - contentRect.width,
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
          - (contentRect.width / 2),
      },
    },
  ];

  testCases.forEach((testCase) => {
    const placement = 'top';
    const alignment = testCase.alignment as Alignment;
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
  const anchorRect: Rect = {
    width: 80,
    height: 20,
    left: 400,
    right: 480,
    top: 800,
    bottom: 820,
  };
  const contentRect: Rect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    anchorRect,
    contentRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorGap: 10,
    viewportGap: 20,
  };

  const y = params.scrollY + anchorRect.bottom + params.anchorGap;
  const testCases = [
    {
      alignment: 'end',
      coordinates: {
        y,
        x: params.scrollX + anchorRect.right - contentRect.width,
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
          - (contentRect.width / 2),
      },
    },
  ];

  testCases.forEach((testCase) => {
    const placement = 'bottom';
    const alignment = testCase.alignment as Alignment;
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
  const anchorRect: Rect = {
    width: 80,
    height: 20,
    left: 700,
    right: 780,
    top: 800,
    bottom: 820,
  };
  const contentRect: Rect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    anchorRect,
    contentRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorGap: 10,
    viewportGap: 20,
  };

  const x = params.scrollX
    + anchorRect.left
    - contentRect.width
    - params.anchorGap;
  const testCases = [
    {
      alignment: 'end',
      coordinates: {
        x,
        y: params.scrollY + anchorRect.bottom - contentRect.height,
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
          + (anchorRect.height / 2) - (contentRect.height / 2),
      },
    },
  ];

  testCases.forEach((testCase) => {
    const placement = 'left';
    const alignment = testCase.alignment as Alignment;
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
  const anchorRect: Rect = {
    width: 80,
    height: 20,
    left: 200,
    right: 280,
    top: 800,
    bottom: 820,
  };
  const contentRect: Rect = {
    width: 400,
    height: 100,
    left: 0,
    right: 400,
    top: 0,
    bottom: 100,
  };
  const params = {
    anchorRect,
    contentRect,
    viewportWidth: 1000,
    viewportHeight: 1000,
    scrollY: 0,
    scrollX: 0,
    anchorGap: 10,
    viewportGap: 20,
  };

  const x = params.scrollX + anchorRect.right + params.anchorGap;
  const testCases = [
    {
      alignment: 'end',
      coordinates: {
        x,
        y: params.scrollY + anchorRect.bottom - contentRect.height,
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
          + (anchorRect.height / 2) - (contentRect.height / 2),
      },
    },
  ];

  testCases.forEach((testCase) => {
    const placement = 'right';
    const alignment = testCase.alignment as Alignment;
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
      const anchorRect: Rect = {
        width: 200,
        height: 100,
        left: 100,
        right: 300,
        top: 450,
        bottom: 550,
      };
      const contentRect: Rect = {
        width: 400,
        height: 200,
        left: 0,
        right: 400,
        top: 0,
        bottom: 200,
      };
      const params = {
        anchorRect,
        contentRect,
        viewportWidth: 1000,
        viewportHeight: 1000,
        scrollY: 0,
        scrollX: 0,
        anchorGap: 10,
        viewportGap: 20,
      };

      expect(
        calcPosition({
          ...params,
          placement: 'bottom',
          alignment: 'end',
        }),
      ).toEqual({
        y: params.scrollY + anchorRect.bottom + params.anchorGap,
        x: params.scrollX + params.viewportGap,
        placement: 'bottom',
        alignment: 'end',
      });
    });

    it('at the right edge', () => {
      const anchorRect: Rect = {
        width: 200,
        height: 100,
        left: 700,
        right: 900,
        top: 450,
        bottom: 550,
      };
      const contentRect: Rect = {
        width: 400,
        height: 200,
        left: 0,
        right: 400,
        top: 0,
        bottom: 200,
      };
      const params = {
        anchorRect,
        contentRect,
        viewportWidth: 1000,
        viewportHeight: 1000,
        scrollY: 0,
        scrollX: 0,
        anchorGap: 10,
        viewportGap: 20,
      };

      expect(
        calcPosition({
          ...params,
          placement: 'bottom',
          alignment: 'start',
        }),
      ).toEqual({
        y: params.scrollY + anchorRect.bottom + params.anchorGap,
        x:
          params.scrollX
          + params.viewportWidth
          - contentRect.width
          - params.viewportGap,
        placement: 'bottom',
        alignment: 'start',
      });
    });
  },
);

describe('should flip placement when content out of viewport bounds', () => {
  it('at the top edge', () => {
    const anchorRect: Rect = {
      width: 200,
      height: 100,
      left: 400,
      right: 600,
      top: 100,
      bottom: 200,
    };
    const contentRect: Rect = {
      width: 400,
      height: 400,
      left: 0,
      right: 400,
      top: 0,
      bottom: 400,
    };
    const params = {
      anchorRect,
      contentRect,
      viewportWidth: 1000,
      viewportHeight: 1000,
      scrollY: 0,
      scrollX: 0,
      anchorGap: 10,
      viewportGap: 20,
    };

    expect(
      calcPosition({
        ...params,
        placement: 'top',
        alignment: 'start',
      }),
    ).toEqual({
      x: params.scrollX + anchorRect.left,
      y: params.scrollY + anchorRect.bottom + params.anchorGap,
      placement: 'bottom',
      alignment: 'start',
    });
  });

  it('at the bottom edge', () => {
    const anchorRect: Rect = {
      width: 200,
      height: 100,
      left: 400,
      right: 600,
      top: 800,
      bottom: 900,
    };
    const contentRect: Rect = {
      width: 400,
      height: 400,
      left: 0,
      right: 400,
      top: 0,
      bottom: 400,
    };
    const params = {
      anchorRect,
      contentRect,
      viewportWidth: 1000,
      viewportHeight: 1000,
      scrollY: 0,
      scrollX: 0,
      anchorGap: 10,
      viewportGap: 20,
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
        - contentRect.height - params.anchorGap,
      placement: 'top',
      alignment: 'start',
    });
  });
});

it('should place content at the start of left edge if not enough width', () => {
  const anchorRect: Rect = {
    width: 200,
    height: 200,
    left: 200,
    right: 400,
    top: 200,
    bottom: 400,
  };
  const contentRect: Rect = {
    width: 800,
    height: 200,
    left: 0,
    right: 800,
    top: 0,
    bottom: 200,
  };
  const params = {
    anchorRect,
    contentRect,
    viewportWidth: 600,
    viewportHeight: 600,
    scrollY: 0,
    scrollX: 0,
    anchorGap: 10,
    viewportGap: 20,
  };

  expect(
    calcPosition({
      ...params,
      placement: 'bottom',
      alignment: 'start',
    }),
  ).toEqual({
    y: params.scrollY + anchorRect.bottom + params.anchorGap,
    x: params.scrollX + params.viewportGap,
    placement: 'bottom',
    alignment: 'start',
  });
});

it(
  'should place content on bottom if not enough space on right or left side',
  () => {
    const anchorRect: Rect = {
      width: 200,
      height: 100,
      left: 400,
      right: 600,
      top: 450,
      bottom: 550,
    };
    const contentRect: Rect = {
      width: 500,
      height: 200,
      left: 0,
      right: 500,
      top: 0,
      bottom: 200,
    };
    const params = {
      anchorRect,
      contentRect,
      viewportWidth: 1000,
      viewportHeight: 1000,
      scrollY: 0,
      scrollX: 0,
      anchorGap: 10,
      viewportGap: 20,
    };

    expect(
      calcPosition({
        ...params,
        placement: 'left',
        alignment: 'start',
      }),
    ).toEqual({
      y: params.scrollY + anchorRect.bottom + params.anchorGap,
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
      y: params.scrollY + anchorRect.bottom + params.anchorGap,
      x: params.scrollX + anchorRect.left,
      placement: 'bottom',
      alignment: 'start',
    });
  },
);
