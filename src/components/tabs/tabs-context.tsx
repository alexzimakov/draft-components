import { type ReactNode, createContext, useCallback, useContext, useId, useState } from 'react';
import { type TabName, type TabSetter } from './types.js';

export type GetTabProps = (tab: TabName) => ({
  id: string;
  ariaControls: string;
});
export type TabsContextValue = {
  getTabProps: GetTabProps;
  selectedTab: TabName;
  setSelectedTab: TabSetter;
  tabListHasFocus: boolean;
  setTabListHasFocus: (hasFocus: boolean) => void;
};

export type TabsStateProviderProps = {
  children: ReactNode;
  selectedTab: TabName;
  setSelectedTab: TabSetter;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export function TabsContextProvider({
  children,
  selectedTab,
  setSelectedTab,
}: TabsStateProviderProps) {
  const [tabListHasFocus, setTabListHasFocus] = useState(false);
  const id = useId();
  const getTabProps = useCallback<GetTabProps>((tab) => ({
    id: `${id}-tab[${tab}]`,
    ariaControls: `${id}-tabPanel[${tab}]`,
  }), [id]);

  return (
    <TabsContext.Provider value={{
      getTabProps,
      selectedTab,
      setSelectedTab,
      tabListHasFocus,
      setTabListHasFocus,
    }}
    >
      {children}
    </TabsContext.Provider>
  );
}

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within TabsContextProvider');
  }
  return context;
}
