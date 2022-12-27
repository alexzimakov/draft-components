import { render, screen } from '@testing-library/react';
import { Toast } from './toast';
import { ToastButton } from './toast-button';

const title = 'Focus is on';
const message = 'All notifications and alerts will be silent.';
const cancelButtonLabel = 'Cancel';
const confirmButtonLabel = 'Confirm';

it('renders without error', () => {
  render(
    <Toast
      message={message}
      actions={<>
        <ToastButton>{cancelButtonLabel}</ToastButton>
        <ToastButton>{confirmButtonLabel}</ToastButton>
      </>}
    >
      {title}
    </Toast>
  );

  screen.getByText(title);
  screen.getByText(message);
  const buttons = screen.getAllByRole('button');
  expect(buttons[0]).toHaveTextContent(cancelButtonLabel);
  expect(buttons[1]).toHaveTextContent(confirmButtonLabel);
});

it('renders with custom icon', () => {
  const icon = <svg role="img" />;

  render(<Toast icon={icon}>{title}</Toast>);

  screen.getByText(title);
  screen.getByRole('img');
});
