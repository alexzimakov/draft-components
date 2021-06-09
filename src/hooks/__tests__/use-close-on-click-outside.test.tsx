import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { useRef, useState } from 'react';
import { useCloseOnClickOutside } from '../use-close-on-click-outside';

it('should invoke the passed callback when click outside of container element', () => {
  const onClose = jest.fn();
  const Example = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useCloseOnClickOutside(onClose, containerRef, { isEnabled: true });

    return (
      <div>
        <div ref={containerRef} data-testid="container">
          <h2>Container title</h2>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
        <button>Button outside container</button>
      </div>
    );
  };
  render(<Example />);

  const containerEl = screen.getByTestId('container');
  const containerTitleEl = screen.getByRole('heading');
  const buttonEl = screen.getByRole('button');

  userEvent.click(containerEl);
  userEvent.click(containerTitleEl);
  expect(onClose).not.toHaveBeenCalled();

  userEvent.click(buttonEl);
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('should not invoke the passed callback when click outside of container element but isEnabled is false', () => {
  const onClose = jest.fn();
  const Example = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useCloseOnClickOutside(onClose, containerRef, { isEnabled: false });

    return (
      <div>
        <div ref={containerRef} data-testid="container">
          <h2>Container title</h2>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
        <button>Button outside container</button>
      </div>
    );
  };
  render(<Example />);

  const buttonEl = screen.getByRole('button');

  userEvent.click(buttonEl);
  expect(onClose).not.toHaveBeenCalled();
});

it('should not invoke the passed callback when click on an ignoring element', () => {
  const onClose = jest.fn();
  const Example = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [buttonEl, setButtonEl] = useState<HTMLButtonElement | null>(null);

    useCloseOnClickOutside(onClose, containerRef, {
      ignoreElements: [buttonEl],
    });

    return (
      <div>
        <div ref={containerRef} data-testid="container">
          <h2>Container title</h2>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </div>
        <button ref={setButtonEl}>Button outside container</button>
      </div>
    );
  };
  render(<Example />);

  const buttonEl = screen.getByRole('button');

  userEvent.click(buttonEl);
  expect(onClose).not.toHaveBeenCalled();
});
