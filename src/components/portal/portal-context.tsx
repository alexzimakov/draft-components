import { ReactNode, createContext, useContext } from 'react';

let root: HTMLElement | null = null;
const getPortalRoot = (): HTMLElement => {
  if (root == null) {
    root = document.createElement('div');
    root.id = 'portal-root';
    root.dataset.testid = 'portal-root';
    document.body.append(root);
  }
  return root;
};

const PortalContext = createContext(getPortalRoot);

export function usePortalRoot(): HTMLElement {
  const getRoot = useContext(PortalContext);
  return getRoot();
}

export function PortalRootProvider(props: {
  children?: ReactNode;
  getPortalRoot: () => HTMLElement;
}) {
  const { getPortalRoot, children } = props;
  return (
    <PortalContext.Provider value={getPortalRoot}>
      {children}
    </PortalContext.Provider>
  );
}
