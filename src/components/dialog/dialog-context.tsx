import { type ReactNode, createContext, useContext, useState } from 'react';

export type DialogContextValue = {
  titleId: string;
  isOpen: boolean;
  onClose: () => void;
  isBodyHasTopScroll: boolean;
  setIsBodyHasTopScroll: (value: boolean) => void;
  isBodyHasBottomScroll: boolean;
  setIsBodyHasBottomScroll: (value: boolean) => void;
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
  const [isBodyHasTopScroll, setIsBodyHasTopScroll] = useState(false);
  const [isBodyHasBottomScroll, setIsBodyHasBottomScroll] = useState(false);

  return (
    <DialogContext.Provider
      value={{
        titleId,
        isOpen,
        onClose,
        isBodyHasTopScroll,
        setIsBodyHasTopScroll,
        isBodyHasBottomScroll,
        setIsBodyHasBottomScroll,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
