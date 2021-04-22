import * as React from 'react';
import { util } from '../../lib';
import { usePositionElement, PositionElementParams } from '../../hooks';
import { Portal } from '../portal';

export interface PositionerProps extends React.ComponentPropsWithRef<'div'> {
  anchorRef: React.MutableRefObject<HTMLElement | null>;
  position?: PositionElementParams['position'];
  arrangement?: PositionElementParams['arrangement'];
  alignment?: PositionElementParams['alignment'];
  anchorOffset?: number;
  viewportOffset?: number;
  isShown?: boolean;
  shouldUpdatePositionWhenScroll?: boolean;
}

export const Positioner = React.forwardRef<HTMLDivElement, PositionerProps>(
  function Positioner(
    {
      anchorRef,
      anchorOffset = 4,
      viewportOffset = 8,
      position = 'absolute',
      arrangement = 'bottom',
      alignment = 'start',
      isShown = false,
      shouldUpdatePositionWhenScroll = false,
      style,
      children,
      ...props
    },
    ref
  ) {
    const targetRef = React.useRef<HTMLDivElement | null>(null);

    usePositionElement({
      anchorRef,
      targetRef,
      isShown,
      anchorOffset,
      viewportOffset,
      position,
      arrangement,
      alignment,
      shouldUpdatePositionWhenScroll,
    });

    if (!isShown) {
      return null;
    }

    return (
      <Portal
        {...props}
        ref={util.mergeRefs(targetRef, ref)}
        style={{
          ...style,
          position,
          top: 0,
          left: 0,
          width: 'auto',
          maxWidth: `calc(100% - ${2 * viewportOffset}px)`,
        }}
      >
        {children}
      </Portal>
    );
  }
);
