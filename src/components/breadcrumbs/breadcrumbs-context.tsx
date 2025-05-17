import { type ReactNode, createContext, useContext } from 'react';

export type BreadcrumbsContextValue = { separator: ReactNode };

const BreadcrumbsContext = createContext<BreadcrumbsContextValue | null>(null);

export function useBreadcrumbsContext() {
  const context = useContext(BreadcrumbsContext);
  if (!context) {
    throw new Error(
      'useBreadcrumbsContext must be used withing BreadcrumbsContextProvider',
    );
  }
  return context;
}

export function BreadcrumbsContextProvider(props: {
  separator: ReactNode;
  children: ReactNode;
}) {
  return (
    <BreadcrumbsContext.Provider value={{ separator: props.separator }}>
      {props.children}
    </BreadcrumbsContext.Provider>
  );
}
