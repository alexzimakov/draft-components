import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Tag } from './tag';

it('renders without errors', () => {
  const badgeText = 'Badge';
  render(<Tag>{badgeText}</Tag>);

  screen.getByText(badgeText);
});

it('renders with leading icon', () => {
  const iconTestId = 'badge-icon';
  render(<Tag leadingIcon={<svg data-testid={iconTestId} />}>Badge</Tag>);

  screen.getByTestId(iconTestId);
});

it('should invoke `onRemove` callback when clicking on the remove button', () => {
  const onRemove = jest.fn();
  const ariaLabel = 'Remove tag';
  render(
    <Tag
      isRemovable={true}
      removeButtonAriaLabel={ariaLabel}
      onRemove={onRemove}
    >
      Badge
    </Tag>,
  );

  userEvent.click(screen.getByLabelText(ariaLabel));

  expect(onRemove).toHaveBeenCalledTimes(1);
});

it('should not invoke `onRemove` callback when remove button is disabled', () => {
  const onRemove = jest.fn();
  const ariaLabel = 'Remove tag';
  render(
    <Tag
      isRemovable={true}
      isRemoveButtonDisabled={true}
      removeButtonAriaLabel={ariaLabel}
      onRemove={onRemove}
    >
      Badge
    </Tag>,
  );

  userEvent.click(screen.getByLabelText(ariaLabel));

  expect(onRemove).toHaveBeenCalledTimes(0);
});
