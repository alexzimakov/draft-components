import { createContext, ReactNode, useContext, useMemo } from 'react';

type FileInputContext = {
  inputId: string;
};

type FileInputContextProviderProps = {
  inputId: string;
  children: ReactNode;
};

export const fileInputContext = createContext<FileInputContext | null>(null);

export function useFileInputContext(): FileInputContext {
  const value = useContext(fileInputContext);
  if (value == null) {
    throw new Error(
      'useFileInputContext must be used within FileInputContextProvider'
    );
  }
  return value;
}

export function FileInputContextProvider({
  inputId,
  children,
}: FileInputContextProviderProps) {
  const Provider = fileInputContext.Provider;
  const value = useMemo(() => ({ inputId }), [inputId]);
  return <Provider value={value}>{children}</Provider>;
}
