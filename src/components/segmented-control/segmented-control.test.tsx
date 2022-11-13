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

it('should change focus using keyboard', async () => {
  const user = userEvent.setup();
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

  await user.tab();
  expect(popular).toHaveFocus();

  // Move focus to the "Newest" item.
  await user.type(popular, '{ArrowRight}', { skipClick: true });
  expect(newest).toHaveFocus();

  // Move focus to the "Popular" item.
  await user.type(newest, '{ArrowLeft}', { skipClick: true });
  expect(popular).toHaveFocus();

  // Move focus to the "Top-Rated" item.
  await user.type(popular, '{ArrowLeft}', { skipClick: true });
  expect(topRated).toHaveFocus();

  // Move focus to the "Popular" item.
  await user.type(topRated, '{ArrowRight}', { skipClick: true });
  expect(popular).toHaveFocus();

  // Move focus to the "Top-Rated" item.
  await user.type(popular, '{End}', { skipClick: true });
  expect(topRated).toHaveFocus();

  // Move focus to the "Popular" item.
  await user.type(topRated, '{Home}', { skipClick: true });
  expect(popular).toHaveFocus();
});

it('should call `onItemSelect` callback when select item', async () => {
  const user = userEvent.setup();
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

  const [popular] = screen.getAllByRole('radio');

  // Select first radio via click.
  await user.click(popular);
  // Move focus to second radio and select it via `Enter` press.
  await user.keyboard('{ArrowRight}');
  await user.keyboard('{Enter}');
  // Move focus to third radio and select it via `Space` press.
  await user.keyboard('{ArrowRight}');
  await user.keyboard(' ');

  expect(onItemSelect).toHaveBeenCalledTimes(2);
  expect(onItemSelect).toHaveBeenNthCalledWith(1, segments[1].value);
  expect(onItemSelect).toHaveBeenNthCalledWith(2, segments[2].value);
});
