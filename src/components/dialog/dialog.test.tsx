import { expect, it, vi } from 'vitest';
import { useRef, useState } from 'react';
import { Dialog } from './dialog.js';
import { fireEvent, render, screen, userEvent, waitFor, within } from '../../test/test-utils.js';

it('renders with necessary elements', () => {
  const title = 'New user';
  const subTitle = 'Enter information about a new user';
  const namePlaceholder = 'Full name';
  const bioPlaceholder = 'Bio';
  render(
    <Dialog isOpen={true} onClose={vi.fn()}>
      <Dialog.Header title={title}>
        {subTitle}
      </Dialog.Header>
      <Dialog.Body>
        <input placeholder={namePlaceholder} />
        <textarea placeholder={bioPlaceholder} />
      </Dialog.Body>
      <Dialog.Footer>
        <button>Cancel</button>
        <button>Save</button>
      </Dialog.Footer>
    </Dialog>,
  );

  const dialogEl = screen.getByRole('dialog');
  within(dialogEl).getByText(title);
  within(dialogEl).getByText(subTitle);
  within(dialogEl).getByPlaceholderText(namePlaceholder);
  within(dialogEl).getByPlaceholderText(bioPlaceholder);
  // 2 action buttons and 1 close button
  expect(within(dialogEl).getAllByRole('button')).toHaveLength(3);
});

it('renders nothing when `isOpen` prop is false', () => {
  const content = 'Closed dialog content';
  render(
    <Dialog isOpen={false} onClose={vi.fn()}>
      {content}
    </Dialog>,
  );
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(screen.queryByText(content)).toBeNull();
});

it('should invoke `onClose` callback when click on close button', async () => {
  const user = userEvent.setup();
  const onCloseMock = vi.fn();
  render(
    <Dialog isOpen={true} onClose={onCloseMock}>
      <Dialog.Header title="Dialog title" />
      <Dialog.Body>Dialog content</Dialog.Body>
    </Dialog>,
  );

  await user.click(screen.getByRole('button'));

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

it('should invoke `onClose` callback when press Esc button', async () => {
  const user = userEvent.setup();
  const onCloseMock = vi.fn();
  render(
    <Dialog isOpen={true} onClose={onCloseMock}>
      <Dialog.Header title="Dialog title" />
      <Dialog.Body>Dialog content</Dialog.Body>
    </Dialog>,
  );

  await user.keyboard('{Escape}');

  expect(onCloseMock).toHaveBeenCalledTimes(1);
});

it('should capture focus within the dialog', async () => {
  const user = userEvent.setup();
  render(
    <>
      <button data-testid="button-outside">Button outside dialog</button>
      <Dialog isOpen={true} onClose={vi.fn()}>
        <Dialog.Header title="New user">
          Enter information about a new user
        </Dialog.Header>
        <Dialog.Body>
          <input placeholder="Full name" />
        </Dialog.Body>
        <Dialog.Footer>
          <button>Save</button>
        </Dialog.Footer>
      </Dialog>
    </>,
  );

  const dialogEl = screen.getByRole('dialog');
  const [nameInput] = within(dialogEl).getAllByRole('textbox');
  const [closeButton, saveButton] = within(dialogEl).getAllByRole('button');

  await user.tab();
  expect(closeButton).toHaveFocus();

  await user.tab();
  expect(nameInput).toHaveFocus();

  await user.tab();
  expect(saveButton).toHaveFocus();

  await user.tab();
  expect(closeButton).toHaveFocus();

  await user.tab({ shift: true });
  expect(saveButton).toHaveFocus();
});

it(
  'should invoke the `onClose` callback only for the top dialog '
  + 'when opening one or more dialogs and press the Esc key',
  async () => {
    const user = userEvent.setup();
    const closeFirstDialogMock = vi.fn();
    const closeSecondDialogMock = vi.fn();
    render(
      <>
        <Dialog isOpen={true} onClose={closeFirstDialogMock}>
          First dialog content
        </Dialog>
        <Dialog isOpen={true} onClose={closeSecondDialogMock}>
          Second dialog content
        </Dialog>
      </>,
    );

    await user.keyboard('{Escape}');

    expect(closeFirstDialogMock).toHaveBeenCalledTimes(0);
    expect(closeSecondDialogMock).toHaveBeenCalledTimes(1);
  },
);

it(
  'should capture focus only within the top dialog when open one '
  + 'or more dialogs',
  async () => {
    const user = userEvent.setup();
    render(
      <>
        <Dialog isOpen={true} onClose={vi.fn()}>
          <button>Cancel</button>
          <button>Save</button>
        </Dialog>
        <Dialog isOpen={true} onClose={vi.fn()}>
          <button>Cancel</button>
          <button>Save</button>
        </Dialog>
      </>,
    );

    const [, secondDialog] = screen.getAllByRole('dialog');
    const [
      secondDialogCancelButton,
      secondDialogSaveButton,
    ] = within(secondDialog).getAllByRole('button');

    await user.tab();
    expect(secondDialogCancelButton).toHaveFocus();

    await user.tab();
    expect(secondDialogSaveButton).toHaveFocus();

    await user.tab();
    expect(secondDialogCancelButton).toHaveFocus();

    await user.tab({ shift: true });
    expect(secondDialogSaveButton).toHaveFocus();
  },
);

it('should return focus back to the previously focused element when dialog was closed', async () => {
  const user = userEvent.setup();
  const triggerButtonLabel = 'Open Dialog';
  const TestDialog = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button ref={buttonRef} onClick={() => setIsOpen(true)}>
          {triggerButtonLabel}
        </button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Dialog.Header title="New user" />
          <input placeholder="Full name" />
        </Dialog>
      </div>
    );
  };

  render(<TestDialog />);

  await user.click(screen.getByText(triggerButtonLabel));

  const closeButton = within(screen.getByRole('dialog')).getByRole('button');
  await user.click(closeButton);
  fireEvent.animationEnd(screen.getByTestId('dialog-backdrop'));
  fireEvent.animationEnd(screen.getByTestId('dialog-modal'));

  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());

  expect(screen.getByText(triggerButtonLabel)).toHaveFocus();
});
