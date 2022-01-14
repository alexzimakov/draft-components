import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { TabsStateProvider, TabsStateProviderProps } from './tabs-state';
import { TabList } from './tab-list';
import { Tab } from './tab';
import { TabPanel } from './tab-panel';

export interface TabsProps extends ComponentPropsWithoutRef<'div'> {
  selectedTabKey: TabsStateProviderProps['selectedTabKey'];
  onSelectTab: TabsStateProviderProps['onSelectTab'];
}

export function Tabs({
  className,
  children,
  selectedTabKey,
  onSelectTab,
  ...props
}: TabsProps) {
  return (
    <TabsStateProvider
      selectedTabKey={selectedTabKey}
      onSelectTab={onSelectTab}
    >
      <div {...props} className={classNames(className, 'dc-tabs')}>
        {children}
      </div>
    </TabsStateProvider>
  );
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
