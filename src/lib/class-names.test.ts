import { classNames } from './class-names';

describe('classNames()', () => {
  it('should return className string without falsy classes', () => {
    const classes = ['foo', 100, false, true, undefined, null];

    const className = classNames(...classes);

    expect(className).toBe('foo 100 true');
  });

  it('should return className string from nested class list', () => {
    const classes = ['foo', ['egg', 'spam'], 'bar'];

    const className = classNames(classes);

    expect(className).toBe('foo egg spam bar');
  });

  it('should return className string from class map', () => {
    const classes = [
      {
        foo: true,
        bar: false,
        egg: undefined,
        spam: null,
      },
    ];

    const className = classNames(...classes);

    expect(className).toBe('foo');
  });
});
