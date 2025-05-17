import { type ReactNode, createContext, useContext, useMemo } from 'react';

export type FilteredSearchMessages = {
  applyButton: string;
  cancelButton: string;
  removeFilterButton: string;
};

const Context = createContext<FilteredSearchMessages | null>(null);

export function useTranslations() {
  const ctx = useContext(Context);
  if (ctx == null) {
    throw new Error('useTranslations must be used within TranslationsProvider');
  }
  return ctx;
}

export function TranslationsProvider({
  applyButton,
  cancelButton,
  removeFilterButton,
  children,
}: {
  applyButton: string;
  cancelButton: string;
  removeFilterButton: string;
  children: ReactNode;
}) {
  const translations = useMemo((): FilteredSearchMessages => ({
    applyButton,
    cancelButton,
    removeFilterButton,
  }), [applyButton, cancelButton, removeFilterButton]);
  return (
    <Context.Provider value={translations}>
      {children}
    </Context.Provider>
  );
}
