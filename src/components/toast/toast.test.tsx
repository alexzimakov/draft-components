import { render, screen } from '@testing-library/react';
import { Toast } from './toast';
import { SvgIcon } from '../svg-icon';
import { handThumbsUp } from '../../bootstrap-icons/hand-thumbs-up';

const message = `Campaign saved!`;
const informativeText = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`;
const cancelButtonText = 'Cancel';
const confirmButtonText = 'Confirm';

it('renders without error', () => {
  render(
    <Toast
      appearance="success"
      message={message}
      informativeText={informativeText}
    >
      <Toast.Button>{cancelButtonText}</Toast.Button>
      <Toast.Button>{confirmButtonText}</Toast.Button>
    </Toast>,
  );

  screen.getByText(message);
  screen.getByText(informativeText);
  const buttons = screen.getAllByRole('button');
  expect(buttons[0]).toHaveTextContent(cancelButtonText);
  expect(buttons[1]).toHaveTextContent(confirmButtonText);
});

it('renders with custom icon', () => {
  const icon = <SvgIcon data-testid="custom-icon" icon={handThumbsUp} />;
  render(<Toast icon={icon} appearance="success" message={message} />);

  screen.getByTestId(icon.props['data-testid']);
});
