import { MutableRefObject } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Popover } from './popover';

const popoverContent = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`;

it('<Popover /> renders without errors', () => {
  render(
    <Popover isShown={true} data-testid="popover" content={popoverContent}>
      <button>Show popover</button>
    </Popover>,
  );

  screen.getByRole('button');
  expect(screen.getByTestId('popover')).toHaveTextContent(popoverContent);
});

it('<Popover /> renders without errors when children prop is function', () => {
  render(
    <Popover isShown={true} data-testid="popover" content={popoverContent}>
      {({ ref }) => (
        <button ref={ref as MutableRefObject<HTMLButtonElement | null>}>
          Show popover
        </button>
      )}
    </Popover>,
  );

  screen.getByRole('button');
  expect(screen.getByTestId('popover')).toHaveTextContent(popoverContent);
});

it('should invoke onClose callback when click outside of popover', () => {
  const onClose = jest.fn();
  render(
    <div>
      <button data-testid="close-popover-btn">Close popover</button>
      <Popover
        isShown={true}
        data-testid="popover"
        content={popoverContent}
        onClose={onClose}
      >
        <button>Show popover</button>
      </Popover>
    </div>,
  );

  userEvent.click(screen.getByTestId('close-popover-btn'));
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('should invoke onClose callback when click press Esc button', () => {
  const onClose = jest.fn();
  render(
    <Popover
      isShown={true}
      data-testid="popover"
      content={popoverContent}
      onClose={onClose}
    >
      <button>Show popover</button>
    </Popover>,
  );

  userEvent.keyboard('{esc}');
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('should capture focus in the popover', () => {
  render(
    <Popover
      isShown={true}
      data-testid="popover"
      content={
        <div>
          <input data-testid="input-inside" />
          <button data-testid="button-inside">Button inside popover</button>
        </div>
      }
    >
      <button data-testid="button-outside">Button outside dialog</button>
    </Popover>,
  );

  const inputInsidePopover = screen.getByTestId('input-inside');
  const buttonInsidePopover = screen.getByTestId('button-inside');

  expect(inputInsidePopover).toHaveFocus();

  userEvent.tab(); // Move focus to the button in the popover.
  expect(buttonInsidePopover).toHaveFocus();

  userEvent.tab(); // Move focus to the button outside the popover.
  expect(inputInsidePopover).toHaveFocus();
});
