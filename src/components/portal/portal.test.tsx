import * as React from 'react';
import { render, screen, within } from '@testing-library/react';
import { Portal } from './portal';

it('<Portal /> should create root node and mounts portals to it.', () => {
  const firstPortalContent = 'First Portal';
  const secondPortalContent = 'Second Portal';

  render(
    <Portal>
      <div>{firstPortalContent}</div>
    </Portal>
  );
  render(
    <Portal>
      <div>{secondPortalContent}</div>
    </Portal>
  );

  const portalRoots = screen.getAllByTestId('portals-root');
  expect(portalRoots).toHaveLength(1);

  const portalContainers = within(portalRoots[0]).getAllByTestId(
    'portal-container'
  );
  expect(portalContainers).toHaveLength(2);
  expect(portalContainers[0]).toHaveTextContent(firstPortalContent);
  expect(portalContainers[1]).toHaveTextContent(secondPortalContent);
});

it('should remove not used portal containers', () => {
  const { unmount } = render(<Portal>Portal content</Portal>);

  expect(screen.queryByTestId('portal-container')).not.toBeNull();

  unmount();

  expect(screen.queryByTestId('portal-container')).toBeNull();
});
