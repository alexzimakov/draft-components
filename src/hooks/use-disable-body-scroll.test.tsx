import { expect, it } from 'vitest';
import { useDisableBodyScroll } from './use-disable-body-scroll.js';
import { render } from '../test/test-utils.js';

it('should disable body scroll', () => {
  const HookTest = () => {
    useDisableBodyScroll({ isEnabled: true });

    return <div />;
  };
  const { unmount } = render(<HookTest />);
  expect(document.body).toHaveStyle('overflow: hidden');

  unmount();
  expect(document.body).not.toHaveStyle('overflow: hidden');
});
