import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { uniqueId } from '../../lib/util';

export type TabKey = string;

export type UnregisterTabCallback = () => void;

export type TabsState = {
  tabsOrder: TabKey[];
  selectedTabKey: TabKey;
  focusedTabKey: TabKey;
  selectTab(tabKey: TabKey): void;
  focusTab(tabKey: TabKey): void;
  getTabId(tabKey: TabKey, defaultId?: string): string;
  getTabPanelId(tabKey: TabKey, defaultId?: string): string;
  registerTab(tabKey: TabKey): UnregisterTabCallback;
};

export type TabsStateProviderProps = {
  children: ReactNode;
  selectedTabKey: TabKey;
  onSelectTab(tabKey: TabKey): void;
};

const TabsContext = createContext<TabsState | null>(null);

export function TabsStateProvider({
  children,
  selectedTabKey,
  onSelectTab,
}: TabsStateProviderProps) {
  const [focusedTabKey, setFocusedTabKey] = useState(selectedTabKey);
  const selectTabCallback = useRef(onSelectTab);
  selectTabCallback.current = onSelectTab;

  const deps = useMemo(() => {
    const prefix = uniqueId('dc-');
    const tabsOrder: TabKey[] = [];

    function getTabId(tabKey: TabKey, defaultId?: string): string {
      return defaultId || `${prefix}-${tabKey}-tab`;
    }

    function getTabPanelId(tabKey: TabKey, defaultId?: string): string {
      return defaultId || `${prefix}-${tabKey}-tab-panel`;
    }

    function registerTab(tabKey: TabKey): UnregisterTabCallback {
      tabsOrder.push(tabKey);
      return () => {
        const index = tabsOrder.indexOf(tabKey);
        if (~index) {
          tabsOrder.splice(index, 1);
        }
      };
    }

    function selectTab(tabKey: TabKey): void {
      selectTabCallback.current(tabKey);
      setFocusedTabKey(tabKey);
    }

    function focusTab(tabKey: TabKey): void {
      setFocusedTabKey(tabKey);
      document.getElementById(getTabId(tabKey))?.focus();
    }

    return {
      tabsOrder,
      selectTab,
      focusTab,
      getTabId,
      getTabPanelId,
      registerTab,
    };
  }, []);

  const state = useMemo(() => ({
    ...deps,
    selectedTabKey,
    focusedTabKey,
  }), [selectedTabKey, focusedTabKey, deps]);

  return (
    <TabsContext.Provider value={state}>
      {children}
    </TabsContext.Provider>
  );
}

export function useTabsState() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsState must be used within TabsStateProvider');
  }
  return context;
}
