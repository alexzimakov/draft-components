import { render, screen, within } from '@testing-library/react';
import { Alert } from './alert';

const title = `Alert title`;
const description = `Alert description.`;

it('renders without errors', () => {
  render(<Alert heading={title}>{description}</Alert>);

  const alertEl = screen.getByRole('alert');

  within(alertEl).getByText(title);
  within(alertEl).getByText(description);
});

it('should show icon', () => {
  render(
    <Alert heading={title} shouldShowIcon={true}>
      {description}
    </Alert>,
  );

  const alertEl = screen.getByRole('alert');

  within(alertEl).getByTestId('alert-icon');
});

it('renders only with title', () => {
  render(<Alert heading={title} />);

  const alertEl = screen.getByRole('alert');

  within(alertEl).getByText(title);
});

it('renders only with description', () => {
  render(<Alert>{description}</Alert>);

  const alertEl = screen.getByRole('alert');

  within(alertEl).getByText(description);
});
