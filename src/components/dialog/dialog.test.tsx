import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, within } from '@testing-library/react';
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

it('should close dialog when click on close button', async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();
  render(
    <Dialog isOpen={true} onClose={onClose}>
      {content}
    </Dialog>
  );

  await user.click(screen.getByRole('button'));

  expect(onClose).toHaveBeenCalledTimes(1);
});

it('should close dialog when press Esc button', async () => {
  const user = userEvent.setup();
  const onClose = jest.fn();
  render(
    <Dialog isOpen={true} onClose={onClose}>
      {content}
    </Dialog>
  );

  await user.keyboard('{Escape}');

  expect(onClose).toHaveBeenCalledTimes(1);
});

it(
  'should not throw an error when `onClose` callback is not given',
  async () => {
    const user = userEvent.setup();
    render(<Dialog isOpen={true}>{content}</Dialog>);

    await user.click(screen.getByTestId('dialog-container'));
  }
);

it('should capture focus in the dialog', async () => {
  const user = userEvent.setup();
  render(
    <>
      <button data-testid="button-outside">Button outside dialog</button>
      <Dialog isOpen={true} footerButtons={actions} />
    </>
  );

  const dialogEl = screen.getByRole('dialog');
  const [closeButton, confirmButton] = within(dialogEl).getAllByRole('button');

  await user.tab();
  expect(closeButton).toHaveFocus();

  await user.tab();
  expect(confirmButton).toHaveFocus();

  await user.tab();
  expect(closeButton).toHaveFocus();
});

it(
  'when open more than one dialog should close only the top dialog ' +
  'when press Esc key',
  async () => {
    const user = userEvent.setup();
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

    await user.keyboard('{Escape}');

    expect(onDialog1Close).not.toHaveBeenCalled();
    expect(onDialog2Close).toHaveBeenCalled();
  }
);

it(
  'when open more than one dialog should capture focus only in the top dialog',
  async () => {
    const user = userEvent.setup();
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

    await user.tab();
    expect(closeButtonOfDialog2).toHaveFocus();

    await user.tab();
    expect(confirmButtonOfDialog2).toHaveFocus();

    await user.tab();
    expect(closeButtonOfDialog2).toHaveFocus();
  }
);

it('should focus a passed element after the dialog is opened', async () => {
  const user = userEvent.setup();
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

  await user.click(screen.getByTestId(openButtonTestId));
  expect(screen.getByTestId(focusElementTestId)).toHaveFocus();
});

it('should focus a passed element after the dialog is closed', async () => {
  const user = userEvent.setup();
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

  await user.click(screen.getByTestId(closeButtonTestId));
  await waitFor(() => expect(
    screen.getByTestId(focusElementTestId)
  ).toHaveFocus());
});
