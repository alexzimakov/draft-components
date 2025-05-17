import { ReactNode, createContext, useContext, useState } from 'react';

export type DialogContextValue = {
  titleId: string;
  isOpen: boolean;
  onClose: () => void;
  isBodyHasScroll: boolean;
  setIsBodyHasScroll: (value: boolean) => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext(): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within DialogProvider');
  }
  return context;
}

export function DialogContextProvider({
  children,
  titleId,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  titleId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [isBodyHasScroll, setIsBodyHasScroll] = useState(false);

  return (
    <DialogContext.Provider
      value={{
        titleId,
        isOpen,
        onClose,
        isBodyHasScroll,
        setIsBodyHasScroll,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
