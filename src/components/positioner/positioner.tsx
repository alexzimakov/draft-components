import {
  ComponentPropsWithRef,
  forwardRef,
  MutableRefObject,
  useRef,
} from 'react';
import { mergeRefs } from '../../lib/react-helpers';
import {
  PositionElementParams,
  usePositionElement,
} from '../../hooks/use-position-element';
import { Portal } from '../portal';

export interface PositionerProps extends ComponentPropsWithRef<'div'> {
  anchorRef: MutableRefObject<HTMLElement | null>;
  position?: PositionElementParams['position'];
  arrangement?: PositionElementParams['arrangement'];
  alignment?: PositionElementParams['alignment'];
  anchorOffset?: number;
  viewportOffset?: number;
  isShown?: boolean;
  shouldUpdatePositionWhenScroll?: boolean;
}

export const Positioner = forwardRef<HTMLDivElement, PositionerProps>(
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
    const targetRef = useRef<HTMLDivElement | null>(null);

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
        ref={mergeRefs(targetRef, ref)}
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
