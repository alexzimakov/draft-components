import { render, screen } from '@testing-library/react';
import { Alert } from './alert';

it('renders without errors', () => {
  const heading = 'MIT License';
  const children = 'A short and simple permissive license';
  render(<Alert heading={heading}>{children}</Alert>);
  screen.getByText(heading);
  screen.getByText(children);
});

it('should show icon', () => {
  const icon = <svg role="img" />;
  const heading = 'Successfully uploaded';
  render(<Alert heading={heading} icon={icon} />);

  screen.getByText(heading);
  screen.getByRole('img');
});
