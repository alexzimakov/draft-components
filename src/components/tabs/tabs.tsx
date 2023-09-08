import { ComponentPropsWithoutRef } from 'react';
import { TabName, TabSetter } from './types.js';
import { classNames } from '../../lib/react-helpers.js';
import { TabsContextProvider } from './tabs-context.js';

export interface TabsProps extends ComponentPropsWithoutRef<'div'> {
  selectedTab: TabName;
  onSelectTab: TabSetter;
}

export function Tabs({
  className,
  children,
  selectedTab,
  onSelectTab,
  ...props
}: TabsProps) {
  return (
    <TabsContextProvider
      selectedTab={selectedTab}
      setSelectedTab={onSelectTab}
    >
      <div {...props} className={classNames('dc-tabs', className)}>
        {children}
      </div>
    </TabsContextProvider>
  );
}
