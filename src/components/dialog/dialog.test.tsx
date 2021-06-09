import userEvent from '@testing-library/user-event';
import { render, within, screen } from '@testing-library/react';
import { Dialog } from './dialog';

const heading = 'Title text';
const description = 'Description text';
const actions = <button>Confirm</button>;
const content = 'Dialog content';

it('renders with necessary elements', () => {
  render(
    <Dialog
      isOpen={true}
      heading={heading}
      description={description}
      actions={actions}
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
    <Dialog isOpen={true} shouldShowCloseButton={false}>
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

it('should close dialog when click on outside the dialog', () => {
  const onClose = jest.fn();
  render(
    <Dialog isOpen={true} onClose={onClose}>
      {content}
    </Dialog>
  );

  userEvent.click(screen.getByTestId('dialog-container'));

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
      <Dialog isOpen={true} actions={actions} />
    </>
  );

  const dialogEl = screen.getByRole('dialog');
  const [closeButton, confirmButton] = within(dialogEl).getAllByRole('button');

  expect(closeButton).toHaveFocus();

  userEvent.tab(); // Move focus to the confirm button in the dialog.
  expect(confirmButton).toHaveFocus();

  userEvent.tab(); // Move focus to the button outside the dialog.
  expect(closeButton).toHaveFocus();
});

it('when open more than one dialog should close only the top dialog when press Esc key', () => {
  const onDialog1Close = jest.fn();
  const onDialog2Close = jest.fn();
  render(
    <>
      <Dialog isOpen={true} onClose={onDialog1Close}>
        {content}
      </Dialog>
      <Dialog isOpen={true} actions={actions} onClose={onDialog2Close} />
    </>
  );

  userEvent.keyboard('{esc}');

  expect(onDialog1Close).not.toHaveBeenCalled();
  expect(onDialog2Close).toHaveBeenCalled();
});

it('when open more than one dialog should capture focus only in the top dialog', () => {
  render(
    <>
      <Dialog isOpen={true} actions={actions} />
      <Dialog isOpen={true} actions={actions} />
    </>
  );

  const [, dialog2] = screen.getAllByRole('dialog');
  const [closeButtonOfDialog2, confirmButtonOfDialog2] = within(
    dialog2
  ).getAllByRole('button');

  expect(closeButtonOfDialog2).toHaveFocus();

  userEvent.tab(); // Move focus to confirm button in the dialog 2.
  expect(confirmButtonOfDialog2).toHaveFocus();

  userEvent.tab(); // Move focus to close button in the dialog 1.
  expect(closeButtonOfDialog2).toHaveFocus();
});
