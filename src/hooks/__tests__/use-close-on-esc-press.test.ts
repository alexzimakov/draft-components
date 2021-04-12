import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react-hooks';
import { useCloseOnEscPress } from '../use-close-on-esc-press';

it('should invoke the passed callback when press Esc key', () => {
  const onClose = jest.fn();
  renderHook(() => useCloseOnEscPress(onClose));

  userEvent.keyboard('{esc}');

  expect(onClose).toHaveBeenCalledTimes(1);
});

it('should not invoke the passed callback when isEnabled param is false', () => {
  const onClose = jest.fn();
  renderHook(() => useCloseOnEscPress(onClose, false));

  userEvent.keyboard('{esc}');

  expect(onClose).not.toHaveBeenCalled();
});

it('should invoke only the last callback', () => {
  const onClose = jest.fn();
  const onClose1 = jest.fn();
  renderHook(() => useCloseOnEscPress(onClose));
  renderHook(() => useCloseOnEscPress(onClose1));

  userEvent.keyboard('{esc}');

  expect(onClose).not.toHaveBeenCalled();
  expect(onClose1).toHaveBeenCalledTimes(1);
});
