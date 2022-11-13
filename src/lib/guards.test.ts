import { isFunction, isHTMLElement } from './guards';

describe('#isFunction()', () => {
  it('should return true when value is a function', () => {
    // eslint-disable-next-line no-new-func
    expect(isFunction(new Function('a', 'b', 'return a + b'))).toBe(true);
    expect(isFunction((a: number, b: number) => a + b)).toBe(true);
    expect(isFunction(function add(a: number, b: number) {
      return a + b;
    })).toBe(true);
  });

  it('should return false when value is not a function', () => {
    expect(isFunction(null)).toBe(false);
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction('a')).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
  });
});

describe('#isHTMLElement()', () => {
  it('should return true when value is a HTMLElement', () => {
    expect(isHTMLElement(document.createElement('div'))).toBe(true);
  });

  it('should return false when value is not a HTMLElement', () => {
    expect(isHTMLElement(document.createTextNode('foo'))).toBe(false);
  });
});
