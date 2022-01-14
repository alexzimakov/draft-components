import { ComponentPropsWithRef, forwardRef, useRef } from 'react';
import { mergeRefs } from '../../lib/react-helpers';
import {
  usePositionElement,
  UsePositionElementParams as BaseProps,
} from '../../hooks/use-position-element';
import { Portal } from '../portal';

export interface PositionerProps extends ComponentPropsWithRef<'div'> {
  anchorRef: BaseProps['anchorRef'];
  position?: BaseProps['position'];
  alignment?: BaseProps['alignment'];
  anchorOffset?: BaseProps['anchorOffset'];
  viewportOffset?: BaseProps['viewportOffset'];
  isShown?: BaseProps['isShown'];
  isPositionedRelativeToViewport?: BaseProps['isPositionedRelativeToViewport'];
  shouldUpdatePositionWhenScroll?: BaseProps['shouldUpdatePositionWhenScroll'];
}

export const Positioner = forwardRef<HTMLDivElement, PositionerProps>(
  function Positioner(
    {
      anchorRef,
      anchorOffset = 4,
      viewportOffset = 8,
      position = 'bottom',
      alignment = 'start',
      isShown = false,
      isPositionedRelativeToViewport = false,
      shouldUpdatePositionWhenScroll = false,
      style,
      children,
      ...props
    },
    ref
  ) {
    const targetRef = useRef<HTMLDivElement | null>(null);

    usePositionElement({
      targetRef,
      anchorRef,
      anchorOffset,
      viewportOffset,
      position,
      alignment,
      isShown,
      isPositionedRelativeToViewport,
      shouldUpdatePositionWhenScroll,
    });

    if (!isShown) {
      return null;
    }

    return (
      <Portal
        {...props}
        ref={mergeRefs(targetRef, ref)}
        style={{
          ...style,
          position: isPositionedRelativeToViewport ? 'fixed' : 'absolute',
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
