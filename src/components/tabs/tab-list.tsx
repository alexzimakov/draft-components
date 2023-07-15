import { ComponentPropsWithoutRef, FocusEvent, KeyboardEvent, useRef } from 'react';
import { KeyboardKeys } from '../../lib/keyboard-keys';
import { assertIfNullable } from '../../lib/helpers';
import { classNames, focusElement } from '../../lib/react-helpers';
import { useTabsContext } from './tabs-context';

export type TabListProps = ComponentPropsWithoutRef<'div'>;

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
    onFocus?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLDivElement>): void {
    setTabListHasFocus(false);
    onBlur?.(event);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    const tabList = ref.current;
    assertIfNullable(tabList, 'ref.current is null or undefined');

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
    if (event.key === KeyboardKeys.ArrowRight) {
      index += 1;
    } else if (event.key === KeyboardKeys.ArrowLeft) {
      index -= 1;
    } else if (event.key === KeyboardKeys.End) {
      index = tabs.length - 1;
    } else if (event.key === KeyboardKeys.Home) {
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
      assertIfNullable(newFocusTab, `Unable to get tab at index ${index}`);
      focusElement(newFocusTab);
    }

    onKeyDown?.(event);
  }

  return (
    <div
      {...props}
      ref={ref}
      role="tablist"
      className={classNames('dc-tab-list', className)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
