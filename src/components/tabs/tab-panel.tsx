import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { TabKey, useTabsState } from './tabs-state';

export interface TabPanelProps extends ComponentPropsWithoutRef<'div'> {
  associatedTabKey: TabKey;
}

export function TabPanel({
  associatedTabKey,
  id,
  className,
  children,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: TabPanelProps) {
  const { selectedTabKey, getTabPanelId, getTabId } = useTabsState();

  if (selectedTabKey !== associatedTabKey) {
    return null;
  }

  return (
    <div
      {...props}
      id={getTabPanelId(associatedTabKey, id)}
      className={classNames(className, 'dc-tabs__panel')}
      role="tabpanel"
      aria-labelledby={getTabId(associatedTabKey, ariaLabelledBy)}
    >
      {children}
    </div>
  );
}
