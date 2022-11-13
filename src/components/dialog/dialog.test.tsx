import userEvent from '@testing-library/user-event';
import { act, render, screen, within } from '@testing-library/react';
import { Dialog } from './dialog';
import { useRef, useState } from 'react';

const heading = 'Title text';
const description = 'Description text';
const actions = <button>Confirm</button>;
const content = 'Dialog content';

it('renders with necessary elements', () => {
  render(
    <Dialog
      isOpen={true}
      width={320}
      heading={heading}
      description={description}
      footerButtons={actions}
    >
      {content}
    </Dialog>
  );

  const dialogEl = screen.getByRole('dialog');
  expect(within(dialogEl).getByRole('heading')).toHaveTextContent(heading);
  within(dialogEl).getByText(description);
  within(dialogEl).getByText(content);
  expect(within(dialogEl).getAllByRole('button')).toHaveLength(2);
});

it('renders nothing when `isOpen` prop is false', () => {
  render(<Dialog isOpen={false}>{content}</Dialog>);

  expect(screen.queryByRole('dialog')).toBeNull();
});

it('renders without close button', () => {
  render(
    <Dialog isOpen={true} showCloseButton={false}>
      {content}
    </Dialog>
  );

  expect(screen.queryByRole('button')).toBeNull();
});

it('renders only with heading', () => {
  render(<Dialog isOpen={true} heading={heading} />);

  expect(screen.getByRole('heading')).toHaveTextContent(heading);
});

it('renders only with description', () => {
  render(<Dialog isOpen={true} description={description} />);

  screen.getByText(description);
});

it('should close dialog when click on close button', () => {
  const onClose = jest.fn();
  render(
    <Dialog isOpen={true} onClose={onClose}>
      {content}
    </Dialog>
  );

  userEvent.click(screen.getByRole('button'));

  expect(onClose).toHaveBeenCalledTimes(1);
});

it('should close dialog when press Esc button', () => {
  const onClose = jest.fn();
  render(
    <Dialog isOpen={true} onClose={onClose}>
      {content}
    </Dialog>
  );

  userEvent.keyboard('{esc}');

  expect(onClose).toHaveBeenCalledTimes(1);
});

it('should not throw an error when `onClose` callback is not given', () => {
  render(<Dialog isOpen={true}>{content}</Dialog>);

  expect(() => {
    userEvent.click(screen.getByTestId('dialog-container'));
  }).not.toThrow();
});

it('should capture focus in the dialog', () => {
  render(
    <>
      <button data-testid="button-outside">Button outside dialog</button>
      <Dialog isOpen={true} footerButtons={actions} />
    </>
  );

  const dialogEl = screen.getByRole('dialog');
  const [closeButton, confirmButton] = within(dialogEl).getAllByRole('button');

  userEvent.tab();
  expect(closeButton).toHaveFocus();

  userEvent.tab();
  expect(confirmButton).toHaveFocus();

  userEvent.tab();
  expect(closeButton).toHaveFocus();
});

it(
  'when open more than one dialog should close only the top dialog ' +
  'when press Esc key',
  () => {
    const onDialog1Close = jest.fn();
    const onDialog2Close = jest.fn();
    render(
      <>
        <Dialog isOpen={true} onClose={onDialog1Close}>
          {content}
        </Dialog>
        <Dialog
          isOpen={true}
          footerButtons={actions}
          onClose={onDialog2Close}
        />
      </>
    );

    userEvent.keyboard('{esc}');

    expect(onDialog1Close).not.toHaveBeenCalled();
    expect(onDialog2Close).toHaveBeenCalled();
  }
);

it(
  'when open more than one dialog should capture focus only in the top dialog',
  () => {
    render(
      <>
        <Dialog isOpen={true} footerButtons={actions} />
        <Dialog isOpen={true} footerButtons={actions} />
      </>
    );

    const [, dialog2] = screen.getAllByRole('dialog');
    const [closeButtonOfDialog2, confirmButtonOfDialog2] = (
      within(dialog2).getAllByRole('button')
    );

    userEvent.tab();
    expect(closeButtonOfDialog2).toHaveFocus();

    userEvent.tab();
    expect(confirmButtonOfDialog2).toHaveFocus();

    userEvent.tab();
    expect(closeButtonOfDialog2).toHaveFocus();
  }
);

it('should focus a passed element after the dialog is opened', () => {
  const openButtonTestId = 'open-dialog';
  const focusElementTestId = 'focus-button';
  const TestDialog = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <button
          data-testid={openButtonTestId}
          onClick={() => setIsOpen(!isOpen)}
        >
          Open
        </button>
        <Dialog isOpen={isOpen} focusAfterOpen={ref} heading="Test dialog">
          <button ref={ref} data-testid={focusElementTestId}>
            Focus button
          </button>
        </Dialog>
      </div>
    );
  };

  render(<TestDialog />);

  userEvent.click(screen.getByTestId(openButtonTestId));
  expect(screen.getByTestId(focusElementTestId)).toHaveFocus();
});

it('should focus a passed element after the dialog is closed', () => {
  jest.useFakeTimers();

  const closeButtonTestId = 'close-dialog';
  const focusElementTestId = 'focus-button';
  const TestDialog = () => {
    const ref = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div>
        <button
          data-testid={closeButtonTestId}
          onClick={() => setIsOpen(!isOpen)}
        >
          Open
        </button>
        <button ref={ref} data-testid={focusElementTestId}>
          Focus button
        </button>
        <Dialog isOpen={isOpen} focusAfterClose={ref} heading="Test dialog" />
      </div>
    );
  };

  render(<TestDialog />);

  userEvent.click(screen.getByTestId(closeButtonTestId));
  act(() => {
    jest.runOnlyPendingTimers();
  });
  expect(screen.getByTestId(focusElementTestId)).toHaveFocus();
});
