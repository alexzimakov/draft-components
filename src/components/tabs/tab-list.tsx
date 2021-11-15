import { ComponentPropsWithoutRef, useRef } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { useTabsState } from './tabs-state';
import { KeyCode } from '../../lib/keyboard-helpers';

export type TabListProps = ComponentPropsWithoutRef<'div'>

export function TabList({
  className,
  children,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: TabListProps) {
  const focused = useRef(false);
  const { tabsOrder, focusedTabKey, focusTab } = useTabsState();

  return (
    <div
      {...props}
      className={classNames(className, 'dc-tabs__list')}
      role="tablist"
      onFocus={event => {
        focused.current = true;
        isFunction(onFocus) && onFocus(event);
      }}
      onBlur={event => {
        focused.current = false;
        isFunction(onBlur) && onBlur(event);
      }}
      onKeyDown={event => {
        const focusedTabIndex = tabsOrder.indexOf(focusedTabKey);
        const firstTabIndex = 0;
        const lastTabIndex = tabsOrder.length - 1;
        let newFocusedTabIndex = focusedTabIndex;
        if (event.key === KeyCode.arrowRight) {
          newFocusedTabIndex += 1;
        } else if (event.key === KeyCode.arrowLeft) {
          newFocusedTabIndex -= 1;
        } else if (event.key === KeyCode.end) {
          newFocusedTabIndex = lastTabIndex;
        } else if (event.key === KeyCode.home) {
          newFocusedTabIndex = firstTabIndex;
        }

        if (newFocusedTabIndex < firstTabIndex) {
          newFocusedTabIndex = lastTabIndex;
        } else if (newFocusedTabIndex > lastTabIndex) {
          newFocusedTabIndex = firstTabIndex;
        }

        const newFocusableTabKey = tabsOrder[newFocusedTabIndex];
        if (newFocusableTabKey !== focusedTabKey) {
          event.preventDefault();
          focusTab(newFocusableTabKey);
        }

        isFunction(onKeyDown) && onKeyDown(event);
      }}
    >
      {children}
    </div>
  );
}
