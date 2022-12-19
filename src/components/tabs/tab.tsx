import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { classNames } from '../../lib/react-helpers';
import { useTabsContext } from './tabs-context';
import { Counter } from '../counter';

export type TabProps = {
  icon?: ReactNode;
  counter?: number;
  name: string;
} & ComponentPropsWithoutRef<'button'>;

export function Tab({
  id,
  name,
  icon,
  counter,
  className,
  children,
  onClick,
  'aria-controls': ariaControls,
  ...props
}: TabProps) {
  const {
    getTabProps,
    selectedTab,
    setSelectedTab,
    tabListHasFocus,
  } = useTabsContext();
  const tabProps = getTabProps(name);
  const selected = name === selectedTab;

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    setSelectedTab(name);
    onClick?.(event);
  }

  return (
    <button
      {...props}
      className={classNames('dc-tab', className)}
      type="button"
      role="tab"
      name={name}
      id={id || tabProps.id}
      aria-controls={ariaControls || tabProps.ariaControls}
      aria-selected={selected}
      tabIndex={selected && !tabListHasFocus ? 0 : -1}
      onClick={handleClick}
    >
      <span className="dc-tab__layout">
        {icon != null && (
          <span className="dc-tab__icon">{icon}</span>
        )}
        {children != null && (
          <span className="dc-tab__label">{children} </span>
        )}
        {counter != null && counter !== 0 && (
          <Counter className="dc-tab__counter">{counter}</Counter>
        )}
      </span>
    </button>
  );
}
