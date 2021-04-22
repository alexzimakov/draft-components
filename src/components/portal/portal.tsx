import * as React from 'react';
import * as ReactDOM from 'react-dom';

let portalsRoot: HTMLDivElement | undefined;

export const Portal = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithRef<'div'>
>(function Portal(props, ref) {
  if (!portalsRoot) {
    portalsRoot = document.createElement('div');
    portalsRoot.dataset.testid = 'portals-root';
    document.body.appendChild(portalsRoot);
  }

  return ReactDOM.createPortal(<div ref={ref} {...props} />, portalsRoot);
});
