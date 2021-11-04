import { once, randomInt, randomString, uniqueId } from './util';

describe('#once()', () => {
  it('creates function that invokes only once', () => {
    const fn = jest.fn();
    const fnOnce = once(fn);

    fnOnce();
    fnOnce();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('#randomInt()', () => {
  it('should throw an error when "min" greater than "max"', () => {
    expect(() => randomInt(4, 2)).toThrow();
    expect(() => randomInt(3, 3)).toThrow();
  });

  it('should generate integer between min and max', () => {
    const intRegex = /^-?[0-9]+$/;
    const min = 1;
    const max = 10;
    const n = randomInt(min, max);
    expect(n.toString()).toMatch(intRegex);
    expect(n >= min && n <= max).toBeTruthy();
  });
});

describe('#randomString()', () => {
  it('should throw an error when "size" param less than 1', () => {
    expect(() => randomString(0)).toThrow();
    expect(() => randomString(-3)).toThrow();
  });

  it('should generate random string specified size', () => {
    const size = 5;
    const pattern = /^[A-Za-z0-9]+$/;
    const s = randomString(size);

    expect(s).toHaveLength(size);
    expect(s).toMatch(pattern);
  });
});

describe('#uniqueId()', () => {
  it('should generate unique IDs', () => {
    const id1 = uniqueId();
    const id2 = uniqueId();
    const pattern = /^[A-Za-z0-9]{5}$/;

    expect(id1).toMatch(pattern);
    expect(id2).toMatch(pattern);
    expect(id1).not.toBe(id2);
  });

  it('should generate unique IDs with prefix', () => {
    const prefix = 'test-';
    const id1 = uniqueId(prefix);
    const id2 = uniqueId(prefix);
    const pattern = /^test-[A-Za-z0-9]{5}$/;

    expect(id1).toMatch(pattern);
    expect(id2).toMatch(pattern);
    expect(id1).not.toBe(id2);
  });
});
