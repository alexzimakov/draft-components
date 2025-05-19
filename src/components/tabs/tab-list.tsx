import { type ComponentProps, type FocusEvent, type KeyboardEvent, useRef } from 'react';
import { KeyboardKey } from '../../lib/keyboard-key.js';
import { assertNullOrUndefined } from '../../lib/helpers.js';
import { classNames, tryToFocusElement } from '../../lib/react-helpers.js';
import { useTabsContext } from './tabs-context.js';

type TabListHTMLProps = ComponentProps<'div'>;

export type TabListProps = TabListHTMLProps;

export function TabList({
  className,
  children,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: TabListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { selectedTab, setTabListHasFocus } = useTabsContext();

  function handleFocus(event: FocusEvent<HTMLDivElement>): void {
    setTabListHasFocus(true);
    if (typeof onFocus === 'function') {
      onFocus(event);
    }
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>): void {
    setTabListHasFocus(false);
    if (typeof onBlur === 'function') {
      onBlur(event);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    const tabList = ref.current;
    assertNullOrUndefined(tabList, 'ref.current is null or undefined');

    let focusTabIndex = 0;
    const tabs = tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    for (let index = 0; index < tabs.length; index += 1) {
      const tab = tabs[index];
      if (document.activeElement === tab) {
        focusTabIndex = index;
        break;
      }
      if (tab.name === selectedTab) {
        focusTabIndex = index;
      }
    }

    let index = focusTabIndex;
    if (event.key === KeyboardKey.ARROW_RIGHT) {
      index += 1;
    } else if (event.key === KeyboardKey.ARROW_LEFT) {
      index -= 1;
    } else if (event.key === KeyboardKey.END) {
      index = tabs.length - 1;
    } else if (event.key === KeyboardKey.HOME) {
      index = 0;
    }

    if (index < 0) {
      index = tabs.length - 1;
    } else if (index >= tabs.length) {
      index = 0;
    }

    if (index !== focusTabIndex) {
      event.preventDefault();
      event.stopPropagation();

      const newFocusTab = tabs[index];
      assertNullOrUndefined(newFocusTab, `Unable to get tab at index ${index}`);
      tryToFocusElement(newFocusTab);
    }

    if (typeof onKeyDown === 'function') {
      onKeyDown(event);
    }
  }

  return (
    <div
      {...props}
      ref={ref}
      role="tablist"
      tabIndex={-1}
      className={classNames('dc-tab-list', className)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
