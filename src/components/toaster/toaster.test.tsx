import userEvent from '@testing-library/user-event';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import { Toaster } from './toaster';
import { ToastId, ToastRenderFn } from './use-toasts';

it(
  'throws an error when trying to show toast ' +
  'but not render <Toaster />',
  () => {
    expect(() => {
      Toaster.show(() => <div>Toast mock</div>);
    }).toThrow();
  }
);

it('should show/dismiss toasts components', () => {
  const renderToast: ToastRenderFn = () => (
    <div data-testid="test-toast">Toast message</div>
  );
  render(<Toaster />);

  const toastIds: ToastId[] = [];
  act(() => {
    toastIds.push(Toaster.show(renderToast), Toaster.show(renderToast));
  });

  expect(screen.getAllByTestId('test-toast')).toHaveLength(2);

  act(() => {
    toastIds.forEach(Toaster.dismiss);
  });

  expect(screen.queryAllByTestId('test-toast')).toHaveLength(0);
});

it(
  'should dismiss toast using `dismiss` callback from render function props',
  async () => {
    const user = userEvent.setup();
    const renderToast: ToastRenderFn = (props) => (
      <div data-testid="test-toast">
        Toast message
        <button onClick={props.dismiss}>Close</button>
      </div>
    );
    render(<Toaster position="bottom-center" />);

    act(() => {
      Toaster.show(renderToast);
    });

    const toast = screen.getByTestId('test-toast');

    await user.click(within(toast).getByRole('button'));
    await waitFor(() => expect(screen.queryByTestId('test-toast')).toBeNull());
  }
);

it('should dismiss toast by timeout', () => {
  jest.useFakeTimers();

  const renderToast: ToastRenderFn = () => (
    <div data-testid="test-toast">Toast message</div>
  );
  render(<Toaster />);

  act(() => {
    Toaster.show(renderToast, 1000);
  });

  screen.getByTestId('test-toast');

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.queryByTestId('test-toast')).toBeNull();
});
