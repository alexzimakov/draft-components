import { ComponentProps } from 'react';
import { TabName, TabSetter } from './types.js';
import { classNames } from '../../lib/react-helpers.js';
import { TabsContextProvider } from './tabs-context.js';
import { TabList } from './tab-list.js';
import { Tab } from './tab.js';
import { TabPanel } from './tab-panel.js';

type TabsHTMLProps = ComponentProps<'div'>;

type TabsBaseProps = {
  selectedTab: TabName;
  onSelectTab: TabSetter;
};

export type TabsProps =
  & TabsBaseProps
  & Omit<TabsHTMLProps, keyof TabsBaseProps>;

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
Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;
