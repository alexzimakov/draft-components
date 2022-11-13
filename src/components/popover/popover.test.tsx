import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { Popover } from './popover';

const anchorLabel = 'Show Popover';
const popoverContent = 'Popover Content';

it('<Popover /> renders without errors', () => {
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

it(
  '<Popover /> renders without errors when anchor property is function',
  () => {
    const popoverTestId = 'popover';
    render(
      <Popover
        anchor={({ setRef }) => <button ref={setRef}>{anchorLabel}</button>}
        defaultIsOpen={true}
        data-testid={popoverTestId}
      >
        {popoverContent}
      </Popover>
    );

    screen.getByRole('button');
    expect(screen.getByTestId(popoverTestId)).toHaveTextContent(popoverContent);
  }
);

it('should open popover when click on anchor element', () => {
  const onOpenMock = jest.fn();
  const anchorTestId = 'anchor';
  const popoverTestId = 'popover';
  render(
    <Popover
      anchor={<button data-testid={anchorTestId}>{anchorLabel}</button>}
      data-testid={popoverTestId}
      onOpen={onOpenMock}
    >
      {popoverContent}
    </Popover>
  );

  expect(screen.queryByTestId(popoverTestId)).toBeNull();

  userEvent.click(screen.getByTestId(anchorTestId));
  screen.getByTestId(popoverTestId);
  expect(onOpenMock).toHaveBeenCalledTimes(1);
});

it('should close popover when click on element outside of popover', () => {
  jest.useFakeTimers();

  const onCloseMock = jest.fn();
  const popoverTestId = 'popover';
  const externalElementTestId = 'close-popover';
  render(
    <div>
      <button data-testid={externalElementTestId}>Close popover</button>
      <Popover
        anchor={<button>{anchorLabel}</button>}
        defaultIsOpen={true}
        data-testid={popoverTestId}
        onClose={onCloseMock}
      >
        {popoverContent}
      </Popover>
    </div>
  );

  screen.getByTestId(popoverTestId);

  userEvent.click(screen.getByTestId(externalElementTestId));
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(screen.queryByTestId(popoverTestId)).toBeNull();
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

it('should close popover when press Esc button', () => {
  jest.useFakeTimers();

  const onCloseMock = jest.fn();
  const popoverTestId = 'popover';
  render(
    <Popover
      anchor={<button>{anchorLabel}</button>}
      defaultIsOpen={true}
      data-testid={popoverTestId}
      onClose={onCloseMock}
    >
      {popoverContent}
    </Popover>
  );

  screen.getByTestId(popoverTestId);

  userEvent.keyboard('{esc}');
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(screen.queryByTestId(popoverTestId)).toBeNull();
  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

it('should capture focus within popover', () => {
  const onCloseMock = jest.fn();
  const popoverTestId = 'popover';
  const inputTestId = 'input';
  const buttonTestId = 'button';
  render(
    <Popover
      anchor={<button>{anchorLabel}</button>}
      defaultIsOpen={true}
      data-testid={popoverTestId}
      onClose={onCloseMock}
    >
      <input data-testid={inputTestId} />
      <button data-testid={buttonTestId}>Add</button>
    </Popover>
  );

  const input = screen.getByTestId(inputTestId);
  const button = screen.getByTestId(buttonTestId);

  userEvent.tab();
  expect(input).toHaveFocus();
  userEvent.tab();
  expect(button).toHaveFocus();

  userEvent.tab({ shift: true });
  expect(input).toHaveFocus();
  userEvent.tab({ shift: true });
  expect(button).toHaveFocus();
});
