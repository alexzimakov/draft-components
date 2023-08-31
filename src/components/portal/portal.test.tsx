import { Portal } from './portal';
import { PortalRootProvider } from './portal-context';
import { it } from 'vitest';
import { render, screen, within } from '../../test/test-utils';

it('creates HTML element and mounts portals to it.', () => {
  const content1 = 'First Portal';
  const content2 = 'Second Portal';

  render(
    <>
      <Portal>
        <div>{content1}</div>
      </Portal>
      <Portal>
        <div>{content2}</div>
      </Portal>
    </>,
  );

  const container = screen.getByTestId('portal-root');
  within(container).getByText(content1);
  within(container).getByText(content2);
});

it('mounts portals to the provided container', () => {
  const container = document.createElement('div');
  document.body.append(container);

  const content = 'Portal content';
  render(
    <PortalRootProvider getPortalRoot={() => container}>
      <Portal>
        <div>{content}</div>
      </Portal>
    </PortalRootProvider>,
  );

  within(container).getByText(content);
});
