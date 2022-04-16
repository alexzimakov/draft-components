import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

let portalContainer: HTMLDivElement | null = null;

export type PortalProps = {
  children: ReactNode;
};

export function Portal({ children }: PortalProps) {
  if (!portalContainer) {
    portalContainer = document.createElement('div');
    portalContainer.dataset.testid = 'dc-portal-container';
    portalContainer.classList.add('dc-portal');
    document.body.appendChild(portalContainer);
  }

  return createPortal(children, portalContainer);
}
