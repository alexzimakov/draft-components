import { SlideOverCloseCallback } from './types.js';
import { ReactNode, createContext, useContext, useMemo } from 'react';

export type SlideOverContext = {
  titleId: string;
  descriptionId: string;
  closePanel: SlideOverCloseCallback;
};

const Context = createContext<SlideOverContext | null>(null);

export function useSlideOverContext() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error(
      'useSlideOverContext must be used within SlideOverContextProvider',
    );
  }
  return ctx;
}

export function SlideOverContextProvider({
  titleId,
  descriptionId,
  closePanel,
  children,
}: {
  titleId: string;
  descriptionId: string;
  closePanel: SlideOverCloseCallback;
  children: ReactNode;
}) {
  const ctx = useMemo(() => ({
    titleId,
    descriptionId,
    closePanel,
  }), [titleId, descriptionId, closePanel]);
  return (
    <Context.Provider value={ctx}>
      {children}
    </Context.Provider>
  );
}
