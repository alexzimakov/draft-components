import { expect, it, vi } from 'vitest';
import { Toaster } from './toaster.js';
import { act, render, screen, userEvent, within } from '../../test/test-utils.js';

it('renders without errors', async () => {
  const toaster = new Toaster();
  const toast = {
    title: 'Document saved',
    actions: [{ content: 'Close' }],
  };
  render(<div>{toaster.render()}</div>);

  await act(() => toaster.showToast(toast));
  const alert = screen.getByRole('alert');
  within(alert).getByText(toast.title);
  within(alert).getByText(toast.actions[0].content);
});

it('should hide toast by timeout', async () => {
  vi.useFakeTimers();

  const toaster = new Toaster();
  const toast = {
    title: 'Document saved',
    actions: [{ content: 'Close' }],
  };
  render(<div>{toaster.render({ toastPosition: 'top-right' })}</div>);

  await act(() => toaster.showToast(toast));
  screen.getByRole('alert');

  await act(() => vi.runOnlyPendingTimers());
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  vi.useRealTimers();
});

it('should hide toast when click on action', async () => {
  const user = userEvent.setup();
  const toaster = new Toaster();
  const toast = {
    title: 'Document saved',
    actions: [{ content: 'Got it' }],
  };
  render(<div>{toaster.render({ toastPosition: 'bottom-left' })}</div>);

  await act(() => toaster.showToast(toast));
  screen.getByRole('alert');

  await user.click(screen.getByText(toast.actions[0].content));
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});

it('should not hide toast when click on action', async () => {
  const user = userEvent.setup();
  const toaster = new Toaster();
  const toast = {
    title: 'Document saved',
    actions: [{ shouldHideAfterClick: false, content: 'Got it' }],
  };
  render(<div>{toaster.render({ toastPosition: 'bottom-left' })}</div>);

  await act(() => toaster.showToast(toast));
  screen.getByRole('alert');

  await user.click(screen.getByText(toast.actions[0].content));
  screen.getByRole('alert');
});

it('invokes `onShowToast` and `onHideToast` callbacks', async () => {
  const user = userEvent.setup();
  const onShowToastMock = vi.fn();
  const onHideToastMock = vi.fn();
  const toaster = new Toaster({
    onShowToast: onShowToastMock,
    onHideToast: onHideToastMock,
  });
  const toast = {
    title: 'Document saved',
    actions: [{ content: 'Got it' }],
  };
  render(<div>{toaster.render()}</div>);

  await act(() => toaster.showToast(toast));
  screen.getByRole('alert');

  await user.click(screen.getByText(toast.actions[0].content));
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();

  expect(onShowToastMock).toHaveBeenCalledTimes(1);
  expect(onShowToastMock).toHaveBeenCalledWith({
    id: expect.any(Number),
    title: toast.title,
    actions: toast.actions,
  });

  expect(onHideToastMock).toHaveBeenCalledTimes(1);
  expect(onHideToastMock).toHaveBeenCalledWith(expect.any(Number));
});

it('hides toast correctly when rendering 2 or more toasters on the page', async () => {
  const user = userEvent.setup();
  const toaster1 = new Toaster();
  const toast1 = {
    title: 'Document saved',
    actions: [{ content: 'Got it' }],
  };
  const toaster2 = new Toaster();
  const toast2 = {
    title: 'Photo deleted',
    actions: [{ content: 'Undo' }],
  };
  render(
    <div>
      {toaster1.render({ toastPosition: 'top-right' })}
      {toaster2.render({ toastPosition: 'bottom-left' })}
    </div>,
  );

  await act(() => toaster1.showToast(toast1));
  screen.getByText(toast1.title);

  await act(() => toaster2.showToast(toast2));
  screen.getByText(toast2.title);

  await user.click(screen.getByText(toast1.actions[0].content));
  expect(screen.queryByText(toast1.title)).not.toBeInTheDocument();
  screen.getByText(toast2.title);
});
