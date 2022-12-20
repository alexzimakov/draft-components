import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { usePortalContainer } from './portal-context';

export type PortalProps = {
  children: ReactNode;
};

export function Portal({ children }: PortalProps) {
  const container = usePortalContainer();
  return createPortal(children, container);
}
