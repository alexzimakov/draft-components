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
