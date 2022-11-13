import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Secret } from './secret';

const secret = 'bcTd5koyfVgPJAoTp87Y';
const buttonLabels = {
  show: 'Reveal secret',
  hide: 'Hide secret',
};
const expectedStyle = {
  opacity: 0.3,
  filter: 'blur(4px)',
};

it('should reveal secret', async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  const secret = 'bcTd5koyfVgPJAoTp87Y';
  render(
    <Secret
      showButtonLabel={buttonLabels.show}
      hideButtonLabel={buttonLabels.hide}
      onChange={onChange}
    >
      {secret}
    </Secret>
  );

  expect(screen.getByText(secret)).toHaveStyle(expectedStyle);

  await user.click(screen.getByText(buttonLabels.show));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(true);
});

it('should hide secret', async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(
    <Secret
      defaultIsShown={true}
      showButtonLabel={buttonLabels.show}
      hideButtonLabel={buttonLabels.hide}
      onChange={onChange}
    >
      {secret}
    </Secret>
  );

  expect(screen.getByText(secret)).not.toHaveStyle(expectedStyle);

  await user.click(screen.getByText(buttonLabels.hide));
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(false);
});
