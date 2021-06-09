import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { SegmentedControl } from './segmented-control';

it('renders without errors', () => {
  const icon = <svg data-testid="item-icon" />;
  const items = [
    { id: 1, label: 'Popular', icon },
    { id: 2, label: 'Newest' },
    { id: 3, label: 'Top rated' },
  ];
  render(
    <SegmentedControl
      items={items}
      selectedItemKey={items[0].id}
      onItemSelect={jest.fn()}
    />
  );

  const radioGroup = screen.getByRole('radiogroup');
  const radioButtons = within(radioGroup).getAllByRole('radio');
  expect(radioButtons).toHaveLength(3);

  const [popular, newest, topRated] = radioButtons;

  expect(popular).toHaveTextContent(items[0].label);
  within(popular).getByTestId(icon.props['data-testid']);

  expect(newest).toHaveTextContent(items[1].label);

  expect(topRated).toHaveTextContent(items[2].label);
});

it('should change focus using keyboard', () => {
  const items = [
    { id: 1, label: 'Popular' },
    { id: 2, label: 'Newest' },
    { id: 3, label: 'Top-Rated' },
  ];
  render(
    <SegmentedControl
      items={items}
      selectedItemKey={items[0].id}
      onItemSelect={jest.fn()}
    />
  );

  const [popular, newest, topRated] = screen.getAllByRole('radio');

  expect(document.body).toHaveFocus();

  userEvent.tab();
  expect(popular).toHaveFocus();

  // Move focus to the "Newest" item.
  userEvent.type(popular, '{arrowright}', { skipClick: true });
  expect(newest).toHaveFocus();

  // Move focus to the "Popular" item.
  userEvent.type(newest, '{arrowleft}', { skipClick: true });
  expect(popular).toHaveFocus();

  // Move focus to the "Top-Rated" item.
  userEvent.type(popular, '{arrowleft}', { skipClick: true });
  expect(topRated).toHaveFocus();

  // Move focus to the "Popular" item.
  userEvent.type(topRated, '{arrowright}', { skipClick: true });
  expect(popular).toHaveFocus();

  // Move focus to the "Top-Rated" item.
  userEvent.type(popular, '{end}', { skipClick: true });
  expect(topRated).toHaveFocus();

  // Move focus to the "Popular" item.
  userEvent.type(topRated, '{home}', { skipClick: true });
  expect(popular).toHaveFocus();
});

it('should call `onItemSelect` callback when select item', () => {
  const items = [
    { id: 1, label: 'Popular' },
    { id: 2, label: 'Newest' },
    { id: 3, label: 'Top rated' },
  ];
  const onItemSelect = jest.fn();
  render(
    <SegmentedControl
      items={items}
      selectedItemKey={items[0].id}
      onItemSelect={onItemSelect}
    />
  );

  const [popular, newest, topRated] = screen.getAllByRole('radio');

  // Select first radio via click.
  userEvent.click(popular);
  // Move focus to second radio and select it via `Enter` press.
  userEvent.type(popular, '{arrowright}', { skipClick: true });
  userEvent.type(newest, '{enter}', { skipClick: true });
  // Move focus to third radio and select it via `Space` press.
  userEvent.type(newest, '{arrowright}', { skipClick: true });
  userEvent.type(topRated, '{space}', { skipClick: true });

  expect(onItemSelect).toHaveBeenCalledTimes(3);
  expect(onItemSelect).toHaveBeenNthCalledWith(1, items[0].id, items[0]);
  expect(onItemSelect).toHaveBeenNthCalledWith(2, items[1].id, items[1]);
  expect(onItemSelect).toHaveBeenNthCalledWith(3, items[2].id, items[2]);
});
