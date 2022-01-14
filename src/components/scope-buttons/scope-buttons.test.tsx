import { act, render, screen, within } from '@testing-library/react';
import { ScopeButtons } from './scope-buttons';

function renderScopeButtons() {
  return render(
    <ScopeButtons>
      <ScopeButtons.Button isActive={true}>All</ScopeButtons.Button>
      <ScopeButtons.Button>Desktop</ScopeButtons.Button>
      <ScopeButtons.Button>Mobile</ScopeButtons.Button>
      <ScopeButtons.Button>Web</ScopeButtons.Button>
    </ScopeButtons>
  );
}

it('renders without errors', () => {
  renderScopeButtons();

  const container = screen.getByRole('group');
  const buttons = within(container).getAllByRole('button');
  expect(buttons).toHaveLength(4);
  expect(buttons[0]).toHaveTextContent('All');
  expect(buttons[1]).toHaveTextContent('Desktop');
  expect(buttons[2]).toHaveTextContent('Mobile');
  expect(buttons[3]).toHaveTextContent('Web');
});

it('should additionally style container when its scrollWidth is larger than clientWidth', () => {
  class ResizeObserverMock {
    static instance?: ResizeObserverMock;

    constructor(public readonly callback: () => void) {
      ResizeObserverMock.instance = this;
    }

    observe() {
      return;
    }

    unobserve() {
      return;
    }

    runCallback() {
      act(() => this.callback());
    }
  }

  Object.defineProperty(window, 'ResizeObserver', {
    value: ResizeObserverMock,
  });

  renderScopeButtons();
  const container = screen.getByRole('group');

  Object.defineProperties(container, {
    scrollWidth: { value: 120, configurable: true },
    clientWidth: { value: 100, configurable: true },
  });
  ResizeObserverMock.instance?.runCallback();
  expect(container).toHaveClass('dc-scope-buttons_bottom-pad');

  Object.defineProperties(container, {
    scrollWidth: { value: 120, configurable: true },
    clientWidth: { value: 120, configurable: true },
  });
  ResizeObserverMock.instance?.runCallback();
  expect(container).not.toHaveClass('dc-scope-buttons_bottom-pad');
});
