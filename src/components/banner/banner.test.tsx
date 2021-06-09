import { render, screen, fireEvent } from '@testing-library/react';
import { Banner } from './banner';
import type { BannerAction } from './banner';

const message = `Your app is out of date. Please update to get the latest version.`;

it('renders without error', () => {
  render(<Banner>{message}</Banner>);

  screen.getByText(
    'Your app is out of date. Please update to get the latest version.'
  );
});

it('should render with a single action', () => {
  const action: BannerAction = { label: 'Update', onClick: jest.fn() };
  render(<Banner actions={action}>{message}</Banner>);

  const actionButtonEl = screen.getByRole('button');
  fireEvent.click(actionButtonEl);

  expect(actionButtonEl).toHaveTextContent(action.label as string);
  expect(action.onClick).toHaveBeenCalledTimes(1);
});

it('should render with multiple actions', () => {
  const actions: [BannerAction, BannerAction] = [
    { label: 'Update', onClick: jest.fn() },
    { label: 'Close', onClick: jest.fn() },
  ];
  render(<Banner actions={actions}>{message}</Banner>);

  const actionButtonEls = screen.getAllByRole('button');
  fireEvent.click(actionButtonEls[0]);
  fireEvent.click(actionButtonEls[1]);

  expect(actionButtonEls[0]).toHaveTextContent(actions[0].label as string);
  expect(actionButtonEls[1]).toHaveTextContent(actions[1].label as string);

  expect(actions[0].onClick).toHaveBeenCalledTimes(1);
  expect(actions[1].onClick).toHaveBeenCalledTimes(1);
});
