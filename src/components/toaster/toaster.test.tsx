import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import { Toaster } from './toaster';

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
  jest.useFakeTimers();

  const toaster = new Toaster();
  const toast = {
    title: 'Document saved',
    actions: [{ content: 'Close' }],
  };
  render(<div>{toaster.render({ toastPosition: 'top-right' })}</div>);

  await act(() => toaster.showToast(toast));
  await screen.findByRole('alert');
  await act(() => jest.runOnlyPendingTimers());
  await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());

  jest.useRealTimers();
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
  await screen.findByRole('alert');
  await user.click(screen.getByText(toast.actions[0].content));
  await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
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
  await screen.findByRole('alert');
  await user.click(screen.getByText(toast.actions[0].content));
  await screen.findByRole('alert');
});

it('invokes `onShowToast` and `onHideToast` callbacks', async () => {
  const user = userEvent.setup();
  const onShowToastMock = jest.fn();
  const onHideToastMock = jest.fn();
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
  await screen.findByRole('alert');
  await user.click(screen.getByText(toast.actions[0].content));
  await waitFor(() => expect(screen.queryByRole('alert')).toBeNull());
  expect(onShowToastMock).toHaveBeenCalledTimes(1);
  expect(onShowToastMock).toHaveBeenCalledWith({
    id: expect.any(Number),
    title: toast.title,
    actions: toast.actions,
  });
  expect(onHideToastMock).toHaveBeenCalledTimes(1);
  expect(onHideToastMock).toHaveBeenCalledWith(expect.any(Number));
});

it(
  'hides toast correctly when rendering 2 or more toasters on the page',
  async () => {
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
    await screen.findAllByText(toast1.title);
    await act(() => toaster2.showToast(toast2));
    await screen.findAllByText(toast2.title);
    await user.click(screen.getByText(toast1.actions[0].content));
    await waitFor(() => expect(screen.queryByText(toast1.title)).toBeNull());
    await screen.findAllByText(toast2.title);
  },
);
