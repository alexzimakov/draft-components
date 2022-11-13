import { KeyCode, similarToClick } from './keyboard-helpers';

describe('#similarToClick', () => {
  it('should return true when event fired after Enter of Space press', () => {
    const enterPressEvent = new KeyboardEvent('keydown', {
      code: KeyCode.enter,
    });
    const spacePressEvent = new KeyboardEvent('keydown', {
      code: KeyCode.space,
    });

    expect(similarToClick(enterPressEvent)).toBe(true);
    expect(similarToClick(spacePressEvent)).toBe(true);
  });

  it(
    'should return false when event not fired ' +
    'after Enter of Space press',
    () => {
      const tabPressEvent = new KeyboardEvent('keydown', { code: KeyCode.tab });
      expect(similarToClick(tabPressEvent)).toBe(false);
    }
  );
});
