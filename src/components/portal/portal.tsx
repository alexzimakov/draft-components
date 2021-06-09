import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import type { ComponentPropsWithRef } from 'react';

let portalsRoot: HTMLDivElement | undefined;

export const Portal = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'>>(
  function Portal(props, ref) {
    if (!portalsRoot) {
      portalsRoot = document.createElement('div');
      portalsRoot.dataset.testid = 'portals-root';
      document.body.appendChild(portalsRoot);
    }

    return createPortal(<div ref={ref} {...props} />, portalsRoot);
  }
);
