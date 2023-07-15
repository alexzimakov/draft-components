import { ComponentPropsWithoutRef } from 'react';
import { TabName, TabSetter } from './types';
import { classNames } from '../../lib/react-helpers';
import { TabsContextProvider } from './tabs-context';

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
