import { beforeAll, expect, it, vi } from 'vitest';
import { useRef, useState } from 'react';
import { Dialog } from './dialog.js';
import { DialogHeader } from './dialog-header.js';
import { DialogBody } from './dialog-body.js';
import { DialogFooter } from './dialog-footer.js';
import { mockMatchMedia } from '../../test/mock-match-media.js';
import { render, screen, userEvent, waitFor, within } from '../../test/test-utils.js';

beforeAll(() => {
  mockMatchMedia();
});

it('renders with necessary elements', () => {
  const heading = 'New user';
  const subheading = 'Enter information about a new user';
  const namePlaceholder = 'Full name';
  const bioPlaceholder = 'Bio';
  render(
    <Dialog isOpen={true} onClose={vi.fn()}>
      <DialogHeader
        title={heading}
        subtitle={subheading}
      />
      <DialogBody>
        <input placeholder={namePlaceholder} />
        <textarea placeholder={bioPlaceholder} />
      </DialogBody>
      <DialogFooter>
        <button>Cancel</button>
        <button>Save</button>
      </DialogFooter>
    </Dialog>,
  );

  const dialogEl = screen.getByRole('dialog');
  within(dialogEl).getByText(heading);
  within(dialogEl).getByText(subheading);
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
      <DialogHeader title="Dialog title" />
      <DialogBody>Dialog content</DialogBody>
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
      <DialogHeader title="Dialog title" />
      <DialogBody>Dialog content</DialogBody>
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
        <DialogHeader title="New user">
          Enter information about a new user
        </DialogHeader>
        <DialogBody>
          <input placeholder="Full name" />
        </DialogBody>
        <DialogFooter>
          <button>Save</button>
        </DialogFooter>
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

it('should focus a given element after the dialog is opened', async () => {
  const user = userEvent.setup();
  const placeholder = 'Full name';
  const TestDialog = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button onClick={() => setIsOpen(true)}>
          Open
        </button>
        <Dialog
          focusAfterOpenRef={inputRef}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <DialogHeader title="New user" />
          <input ref={inputRef} placeholder={placeholder} />
        </Dialog>
      </div>
    );
  };

  render(<TestDialog />);

  await user.click(screen.getByRole('button'));
  expect(screen.getByPlaceholderText(placeholder)).toHaveFocus();
});

it('should focus a given element after the dialog is closed', async () => {
  const user = userEvent.setup();
  const TestDialog = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div>
        <button ref={buttonRef} onClick={() => setIsOpen(true)}>
          Open
        </button>
        <Dialog
          focusAfterCloseRef={buttonRef}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <DialogHeader title="New user" />
          <input placeholder="Full name" />
        </Dialog>
      </div>
    );
  };

  render(<TestDialog />);

  const closeButton = within(screen.getByRole('dialog')).getByRole('button');
  await user.click(closeButton);
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  expect(screen.getByRole('button')).toHaveFocus();
});
