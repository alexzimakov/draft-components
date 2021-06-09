import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { useCaptureFocus } from '../use-capture-focus';
import type { ReactNode } from 'react';
import type { CaptureFocusParams } from '../use-capture-focus';

const elementsOutOfDialog = createElements();

beforeEach(() => {
  /* Test DOM tree
  <body>
    <button>Button outside modal</button>
    <div>
      <!-- Modal element -->
    </div>
    <a href="/">Link outside modal</a>
  </body>
  */
  document.body.append(
    elementsOutOfDialog.button,
    elementsOutOfDialog.container,
    elementsOutOfDialog.link
  );
});

it('should capture and release focus', () => {
  const { unmount } = render(<CaptureFocusExample />, {
    container: elementsOutOfDialog.container,
  });
  const [textInput, checkboxInput] = screen.getAllByTestId('focusable');

  expect(textInput).toHaveFocus();

  userEvent.tab(); // Move focus to the checkbox element.
  expect(checkboxInput).toHaveFocus();

  userEvent.tab(); // Move focus to the link element.
  expect(textInput).toHaveFocus();

  userEvent.tab({ shift: true }); // Move focus to the button element.
  expect(checkboxInput).toHaveFocus();

  unmount();
  expect(document.body).toHaveFocus();

  userEvent.tab(); // Move focus to the link element.
  expect(elementsOutOfDialog.button).toHaveFocus();
});

it('should set focus on the passed element when capture focus', () => {
  const buttonRef = { current: null };
  render(
    <CaptureFocusExample focusAfterCaptureRef={buttonRef}>
      <button ref={buttonRef}>Button inside modal</button>
    </CaptureFocusExample>,
    { container: elementsOutOfDialog.container }
  );

  expect(buttonRef.current).toHaveFocus();
});

it('should set focus on the passed element when release focus', () => {
  const { unmount } = render(
    <CaptureFocusExample
      focusAfterReleaseRef={{ current: elementsOutOfDialog.button }}
    />,
    { container: elementsOutOfDialog.container }
  );

  unmount();

  expect(elementsOutOfDialog.button).toHaveFocus();
});

it('should not set focus automatically', () => {
  const buttonRef = { current: null };
  render(
    <CaptureFocusExample autoFocusAfterCapture={false}>
      <button ref={buttonRef}>Button inside modal</button>
    </CaptureFocusExample>,
    { container: elementsOutOfDialog.container }
  );

  expect(document.body).toHaveFocus();
});

function CaptureFocusExample(props: {
  children?: ReactNode;
  autoFocusAfterCapture?: boolean;
  focusAfterCaptureRef?: CaptureFocusParams['focusAfterCaptureRef'];
  focusAfterReleaseRef?: CaptureFocusParams['focusAfterReleaseRef'];
}) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useCaptureFocus({
    modalRef,
    isEnabled: true,
    autoFocusAfterCapture: props.autoFocusAfterCapture,
    focusAfterCaptureRef: props?.focusAfterCaptureRef,
    focusAfterReleaseRef: props?.focusAfterReleaseRef,
  });

  return (
    <div ref={modalRef} data-testid="modal">
      <input data-testid="focusable" type="text" />
      <input data-testid="focusable" type="checkbox" />
      {props?.children}
    </div>
  );
}

function createElements() {
  const button = document.createElement('button');
  button.innerHTML = 'Button outside modal';

  const link = document.createElement('a');
  link.setAttribute('href', '/');
  link.innerHTML = 'Link outside modal';

  const container = document.createElement('div');

  return { button, link, container };
}
