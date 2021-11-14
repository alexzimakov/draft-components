import { ComponentPropsWithoutRef, ReactNode, useEffect } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { useTabsState } from './tabs-state';
import { key } from '../../bootstrap-icons';
import { Tag } from '../tag';

export interface TabProps extends ComponentPropsWithoutRef<'button'> {
  tabKey: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

export function Tab({
  tabKey,
  icon,
  badge,
  id,
  className,
  children,
  onClick,
  'aria-controls': ariaControls,
  ...props
}: TabProps) {
  const {
    selectedTabKey,
    focusedTabKey,
    getTabId,
    getTabPanelId,
    selectTab,
    registerTab,
  } = useTabsState();
  const selected = tabKey === selectedTabKey;
  const focused = tabKey === focusedTabKey;

  useEffect(() => {
    return registerTab(tabKey);
  }, [tabKey, registerTab]);

  return (
    <button
      {...props}
      id={getTabId(tabKey, id)}
      name={tabKey}
      className={classNames(
        className, 'dc-tabs__tab', 'dc-tab', selected && 'dc-tab_selected',
      )}
      role="tab"
      aria-selected={selected}
      aria-controls={getTabPanelId(tabKey, ariaControls)}
      tabIndex={focused ? 0 : -1}
      onClick={event => {
        selectTab(tabKey);
        isFunction(onClick) && onClick(event);
      }}
    >
      {icon && <div className="dc-tab__icon">{icon}</div>}
      {children}
      {badge && <div className="dc-tab__badge">{badge}</div>}
    </button>
  );
}
