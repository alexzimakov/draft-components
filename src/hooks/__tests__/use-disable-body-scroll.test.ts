import { renderHook } from '@testing-library/react-hooks';
import { useDisableBodyScroll } from '../use-disable-body-scroll';

it('should disable body scroll', () => {
  const { unmount } = renderHook(() => useDisableBodyScroll());
  expect(document.body).toHaveStyle('overflow: hidden');

  unmount();
  expect(document.body).not.toHaveStyle('overflow: hidden');
});
