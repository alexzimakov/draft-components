import { render, screen, within } from '@testing-library/react';
import { Portal } from './portal';

it('<Portal /> should create root node and mounts portals to it.', () => {
  const testId = 'portal';
  const firstPortalContent = 'First Portal';
  const secondPortalContent = 'Second Portal';

  render(
    <Portal data-testid={testId}>
      <div>{firstPortalContent}</div>
    </Portal>,
  );
  render(
    <Portal data-testid={testId}>
      <div>{secondPortalContent}</div>
    </Portal>,
  );

  const portalRoots = screen.getAllByTestId('portals-root');
  expect(portalRoots).toHaveLength(1);

  const portalContainers = within(portalRoots[0]).getAllByTestId(testId);
  expect(portalContainers).toHaveLength(2);
  expect(portalContainers[0]).toHaveTextContent(firstPortalContent);
  expect(portalContainers[1]).toHaveTextContent(secondPortalContent);
});

it('should remove not used portal containers', () => {
  const testId = 'portal';
  const { unmount } = render(
    <Portal data-testid={testId}>Portal content</Portal>,
  );

  screen.getAllByTestId(testId);

  unmount();

  expect(screen.queryByTestId(testId)).toBeNull();
});
