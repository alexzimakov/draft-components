import { type ComponentProps } from 'react';
import { type TabName } from './types.js';
import { classNames } from '../../lib/react-helpers.js';
import { useTabsContext } from './tabs-context.js';

type TabPanelHTMLProps = ComponentProps<'div'>;

type TabPanelBaseProps = {
  tab: TabName;
};

export type TabPanelProps =
  & TabPanelBaseProps
  & Omit<TabPanelHTMLProps, keyof TabPanelBaseProps>;

export function TabPanel({
  tab,
  id,
  className,
  children,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: TabPanelProps) {
  const { selectedTab, getTabProps } = useTabsContext();

  if (selectedTab !== tab) {
    return null;
  }

  const tabProps = getTabProps(tab);
  return (
    <div
      {...props}
      className={classNames('dc-tab-panel', className)}
      role="tabpanel"
      id={id || tabProps.ariaControls}
      aria-labelledby={ariaLabelledBy || tabProps.id}
    >
      {children}
    </div>
  );
}
