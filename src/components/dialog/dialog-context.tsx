import { ReactNode, createContext, useContext } from 'react';

export type DialogContextValue = {
  titleId: string;
  descriptionId: string;
  isOpen: boolean;
  onClose: () => void;
};

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext(): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within DialogProvider');
  }
  return context;
}

export function DialogContextProvider(props: {
  children: ReactNode;
  titleId: string;
  descriptionId: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <DialogContext.Provider
      value={{
        titleId: props.titleId,
        descriptionId: props.descriptionId,
        isOpen: props.isOpen,
        onClose: props.onClose,
      }}
    >
      {props.children}
    </DialogContext.Provider>
  );
}
