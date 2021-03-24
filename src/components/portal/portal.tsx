import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface PortalProps {
  children: React.ReactNode;
}

let portalsRoot: HTMLDivElement | undefined;

export function Portal({ children }: PortalProps) {
  if (!portalsRoot) {
    portalsRoot = document.createElement('div');
    portalsRoot.setAttribute('data-testid', 'portals-root');
    document.body.appendChild(portalsRoot);
  }

  const portalContainerRef = React.useRef(document.createElement('div'));
  portalContainerRef.current.setAttribute('data-testid', 'portal-container');
  portalsRoot.appendChild(portalContainerRef.current);

  React.useEffect(() => {
    const portalContainer = portalContainerRef.current;
    return () => {
      portalsRoot?.removeChild(portalContainer);
    };
  }, []);

  return ReactDOM.createPortal(children, portalContainerRef.current);
}
