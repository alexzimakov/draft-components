import { expect, it } from 'vitest';
import { render } from '../test/test-utils.js';
import { useLockBodyScroll } from './use-lock-body-scroll.js';

it('should disable body scroll', () => {
  const HookTest = () => {
    useLockBodyScroll({ disabled: false });
    return <div />;
  };

  const { unmount } = render(<HookTest />);
  expect(document.body).toHaveStyle('overflow: hidden');

  unmount();
  expect(document.body).not.toHaveStyle('overflow: hidden');
});
