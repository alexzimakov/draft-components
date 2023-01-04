import { type ComponentPropsWithoutRef } from 'react';
import { type TabName, type TabSetter } from './types';
import { classNames } from '../../shared/react-helpers';
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
