import { createContext, type ReactNode, useContext } from 'react';

let defaultContainer: HTMLElement | null = null;

const PortalContext = createContext<HTMLElement | null>(null);

export function usePortalContainer(): HTMLElement {
  const className = 'dc-portals-container';
  const container = useContext(PortalContext);
  if (container) {
    if (!container.classList.contains(className)) {
      container.classList.add(className);
    }
    return container;
  }

  if (!defaultContainer) {
    defaultContainer = document.createElement('div');
    defaultContainer.dataset.testid = 'portals-container';
    defaultContainer.className = className;
    document.body.append(defaultContainer);
  }
  return defaultContainer;
}

export function PortalContainerProvider(props: {
  children?: ReactNode;
  value: HTMLElement;
}) {
  return <PortalContext.Provider {...props} />;
}
