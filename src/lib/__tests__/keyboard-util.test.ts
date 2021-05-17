import { keyboardUtil } from '../keyboard-util';

describe('isEscapePressed()', () => {
  it('should return true when event fired after esc press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 27 });
    expect(keyboardUtil.isEscPressed(event)).toBe(true);
  });

  it('should return false when event fired after non esc press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    expect(keyboardUtil.isEscPressed(event)).toBe(false);
  });
});

describe('isTabPressed()', () => {
  it('should return true when event fired after tab press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    expect(keyboardUtil.isTabPressed(event)).toBe(true);
  });

  it('should return false when event fired after non tab press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    expect(keyboardUtil.isTabPressed(event)).toBe(false);
  });
});

describe('isEnterPressed()', () => {
  it('should return true when event fired after enter press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 13 });
    expect(keyboardUtil.isEnterPressed(event)).toBe(true);
  });

  it('should return false when event fired after non enter press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    expect(keyboardUtil.isEnterPressed(event)).toBe(false);
  });
});

describe('isSpacePressed()', () => {
  it('should return true when event fired after space press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 32 });
    expect(keyboardUtil.isSpacePressed(event)).toBe(true);
  });

  it('should return false when event fired after non space press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    expect(keyboardUtil.isSpacePressed(event)).toBe(false);
  });
});

describe('isLeftArrowPressed()', () => {
  it('should return true when event fired after left arrow press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 37 });
    expect(keyboardUtil.isLeftArrowPressed(event)).toBe(true);
  });

  it('should return false when event fired after right arrow press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    expect(keyboardUtil.isLeftArrowPressed(event)).toBe(false);
  });
});

describe('isRightArrowPressed()', () => {
  it('should return true when event fired after left arrow press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 39 });
    expect(keyboardUtil.isRightArrowPressed(event)).toBe(true);
  });

  it('should return false when event fired after right arrow press', () => {
    const event = new KeyboardEvent('keydown', { keyCode: 9 });
    expect(keyboardUtil.isRightArrowPressed(event)).toBe(false);
  });
});
