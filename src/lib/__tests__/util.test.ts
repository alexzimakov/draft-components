import { once } from '../util';

describe('#once()', () => {
  it('creates function that invokes only once', () => {
    const fn = jest.fn();
    const fnOnce = once(fn);

    fnOnce();
    fnOnce();

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
