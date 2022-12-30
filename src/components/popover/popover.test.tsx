import '../../tests/match-media.mock';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { Popover } from './popover';

const anchorLabel = 'Show Popover';
const popoverContent = 'Popover Content';

it('renders without errors', () => {
  const popoverTestId = 'popover';
  render(
    <Popover
      anchor={<button>{anchorLabel}</button>}
      defaultIsOpen={true}
      data-testid={popoverTestId}
    >
      {popoverContent}
    </Popover>
  );

  screen.getByRole('button');
  expect(screen.getByTestId(popoverTestId)).toHaveTextContent(popoverContent);
});

it('renders without errors when anchor property is function', () => {
  const popoverTestId = 'popover';
  render(
    <Popover
      anchor={({ ref }) => <button ref={ref}>{anchorLabel}</button>}
      defaultIsOpen={true}
      data-testid={popoverTestId}
    >
      {popoverContent}
    </Popover>
  );

  screen.getByRole('button');
  expect(screen.getByTestId(popoverTestId)).toHaveTextContent(popoverContent);
});

it('should open popover when click on anchor element', async () => {
  const user = userEvent.setup();
  const anchorTestId = 'anchor';
  const popoverTestId = 'popover';
  const openMock = jest.fn();
  render(
    <Popover
      anchor={<button data-testid={anchorTestId}>{anchorLabel}</button>}
      data-testid={popoverTestId}
      onOpen={openMock}
    >
      {popoverContent}
    </Popover>
  );

  expect(screen.queryByTestId(popoverTestId)).toBeNull();

  await user.click(screen.getByTestId(anchorTestId));
  screen.getByTestId(popoverTestId);
  expect(openMock).toHaveBeenCalledTimes(1);
});

it(
  'should close popover when click on element outside of popover',
  async () => {
    const user = userEvent.setup();
    const popoverTestId = 'popover';
    const externalElementTestId = 'close-popover';
    const closeMock = jest.fn();
    render(
      <div>
        <button data-testid={externalElementTestId}>Close popover</button>
        <Popover
          anchor={<button>{anchorLabel}</button>}
          defaultIsOpen={true}
          data-testid={popoverTestId}
          onClose={closeMock}
        >
          {popoverContent}
        </Popover>
      </div>
    );

    screen.getByTestId(popoverTestId);

    await user.click(screen.getByTestId(externalElementTestId));
    await waitFor(() => expect(screen.queryByTestId(popoverTestId)).toBeNull());
    expect(closeMock).toHaveBeenCalledTimes(1);
  }
);

it('should close popover when press Esc button', async () => {
  const user = userEvent.setup();
  const popoverTestId = 'popover';
  const closeMock = jest.fn();
  render(
    <Popover
      anchor={<button>{anchorLabel}</button>}
      defaultIsOpen={true}
      data-testid={popoverTestId}
      onClose={closeMock}
    >
      {popoverContent}
    </Popover>
  );

  screen.getByTestId(popoverTestId);

  await user.keyboard('{Escape}');
  await waitFor(() => expect(screen.queryByTestId(popoverTestId)).toBeNull());
  expect(closeMock).toHaveBeenCalledTimes(1);
});

it('should trap focus within the popover', async () => {
  const user = userEvent.setup();
  const popoverTestId = 'popover';
  const inputTestId = 'input';
  const buttonTestId = 'button';
  const closeMock = jest.fn();
  render(
    <Popover
      anchor={<button>{anchorLabel}</button>}
      defaultIsOpen={true}
      data-testid={popoverTestId}
      onClose={closeMock}
    >
      <input data-testid={inputTestId} />
      <button data-testid={buttonTestId}>Add</button>
    </Popover>
  );

  const input = screen.getByTestId(inputTestId);
  const button = screen.getByTestId(buttonTestId);

  await user.tab();
  expect(input).toHaveFocus();
  await user.tab();
  expect(button).toHaveFocus();

  await user.tab({ shift: true });
  expect(input).toHaveFocus();
  await user.tab({ shift: true });
  expect(button).toHaveFocus();
});
