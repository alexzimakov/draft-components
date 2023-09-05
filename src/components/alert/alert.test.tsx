import { Alert } from './alert';
import { expect, it, vitest } from 'vitest';
import { render, screen, userEvent } from '../../test/test-utils';

it('renders without errors', () => {
  const title = 'MIT License';
  const children = 'A short and simple permissive license';
  render(<Alert title={title}>{children}</Alert>);
  screen.getByText(title);
  screen.getByText(children);
});

it('renders with icon', () => {
  const icon = <svg role="img" />;
  const title = 'Successfully uploaded';
  render(<Alert title={title} icon={icon} />);

  screen.getByText(title);
  screen.getByRole('img');
});

it('renders with dismiss button', async () => {
  const user = userEvent.setup();
  const onClickDismissButtonMock = vitest.fn();
  render(
    <Alert
      title="Update is available"
      shouldShowDismissButton={true}
      onClickDismissButton={onClickDismissButtonMock}
    />,
  );

  await user.click(screen.getByRole('button'));
  expect(onClickDismissButtonMock).toHaveBeenCalledTimes(1);
});
