import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { usePortalRoot } from './portal-context.js';

export type PortalProps = {
  children: ReactNode;
};

export function Portal({ children }: PortalProps) {
  const container = usePortalRoot();
  return createPortal(children, container);
}
