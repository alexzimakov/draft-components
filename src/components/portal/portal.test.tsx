import { render, screen, within } from '@testing-library/react';
import { Portal } from './portal';
import { PortalContainerProvider } from './portal-context';

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
    </>
  );

  const container = screen.getByTestId('portals-container');
  within(container).getByText(content1);
  within(container).getByText(content2);
});

it('mounts portals to the provided container', () => {
  const container = document.createElement('div');
  document.body.append(container);

  const content = 'Portal content';
  render(
    <PortalContainerProvider value={container}>
      <Portal>
        <div>{content}</div>
      </Portal>
    </PortalContainerProvider>
  );

  within(container).getByText(content);
});
