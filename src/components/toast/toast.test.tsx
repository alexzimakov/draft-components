import { render, screen } from '@testing-library/react';
import { Toast } from './toast';
import { SvgIcon } from '../svg-icon';
import { handThumbsUp } from '../../icons/hand-thumbs-up';

const headingText = `Campaign saved!`;
const messageText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`;
const cancelButtonText = 'Cancel';
const confirmButtonText = 'Confirm';

it('renders without error', () => {
  render(
    <Toast appearance="success" heading={headingText} message={messageText}>
      <Toast.Button>{cancelButtonText}</Toast.Button>
      <Toast.Button>{confirmButtonText}</Toast.Button>
    </Toast>
  );

  screen.getByText(headingText);
  screen.getByText(messageText);
  const buttons = screen.getAllByRole('button');
  expect(buttons[0]).toHaveTextContent(cancelButtonText);
  expect(buttons[1]).toHaveTextContent(confirmButtonText);
});

it('renders with custom icon', () => {
  const icon = <SvgIcon data-testid="custom-icon" icon={handThumbsUp} />;
  render(<Toast icon={icon} appearance="success" heading={headingText} />);

  screen.getByTestId(icon.props['data-testid']);
});
