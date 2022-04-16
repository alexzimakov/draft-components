import { render, screen, within } from '@testing-library/react';
import { Portal } from './portal';

it('<Portal /> should create root node and mounts portals to it.', () => {
  const testId = 'portal';
  const firstPortalContent = 'First Portal';
  const secondPortalContent = 'Second Portal';

  render(
    <Portal data-testid={testId}>
      <div>{firstPortalContent}</div>
    </Portal>
  );
  render(
    <Portal data-testid={testId}>
      <div>{secondPortalContent}</div>
    </Portal>
  );

  const portalContainer = screen.getByTestId('dc-portal-container');
  within(portalContainer).getByText(firstPortalContent);
  within(portalContainer).getByText(secondPortalContent);
});
