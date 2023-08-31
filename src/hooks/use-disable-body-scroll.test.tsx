import { useDisableBodyScroll } from './use-disable-body-scroll';
import { expect, it } from 'vitest';
import { render } from '../test/test-utils';

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
