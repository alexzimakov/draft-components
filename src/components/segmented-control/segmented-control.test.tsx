import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { SegmentedControl } from './segmented-control';

it('renders without errors', () => {
  const icon = <svg data-testid="item-icon" />;
  const items = [
    { value: 1, label: 'Popular', icon },
    { value: 2, label: 'Newest' },
    { value: 3, label: 'Top rated' },
  ];
  render(
    <SegmentedControl
      items={items}
      selectedValue={items[0].value}
      onChangeSelectedValue={jest.fn()}
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
    { value: 1, label: 'Popular' },
    { value: 2, label: 'Newest' },
    { value: 3, label: 'Top-Rated' },
  ];
  render(
    <SegmentedControl
      items={items}
      selectedValue={items[0].value}
      onChangeSelectedValue={jest.fn()}
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
  const segments = [
    { value: 1, label: 'Popular' },
    { value: 2, label: 'Newest' },
    { value: 3, label: 'Top rated' },
  ];
  const onItemSelect = jest.fn();
  render(
    <SegmentedControl
      items={segments}
      selectedValue={segments[0].value}
      onChangeSelectedValue={onItemSelect}
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

  expect(onItemSelect).toHaveBeenCalledTimes(2);
  expect(onItemSelect).toHaveBeenNthCalledWith(1, segments[1].value);
  expect(onItemSelect).toHaveBeenNthCalledWith(2, segments[2].value);
});
