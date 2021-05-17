import * as React from 'react';
import { classNames, util } from '../../lib';
import {
  useCloseOnEscPress,
  useCloseOnClickOutside,
  useCaptureFocus,
} from '../../hooks';
import { Positioner, PositionerProps } from '../positioner';
import { Box, BoxProps } from '../box';

interface ElementWithRef extends JSX.Element {
  ref: React.MutableRefObject<HTMLElement | null> | null;
}

interface RenderChildren {
  (props: { ref: React.MutableRefObject<HTMLElement | null> }): JSX.Element;
}

export interface PopoverProps extends BoxProps {
  position?: PositionerProps['position'];
  arrangement?: PositionerProps['arrangement'];
  alignment?: PositionerProps['alignment'];
  anchorOffset?: number;
  viewportOffset?: number;
  isOpen?: boolean;
  shouldUpdatePositionWhenScroll?: boolean;
  shouldCaptureFocus?: boolean;
  onClose?: () => void;
  content: React.ReactNode;
  children: RenderChildren | ElementWithRef;
}

export function Popover({
  position,
  arrangement,
  alignment,
  anchorOffset,
  viewportOffset,
  isOpen,
  shouldUpdatePositionWhenScroll,
  shouldCaptureFocus = true,
  onClose = util.noop,
  content,
  children: anchor,
  className,
  ...props
}: PopoverProps) {
  const anchorRef = React.useRef<HTMLElement | null>(null);
  const popoverRef = React.useRef<HTMLDivElement | null>(null);

  useCloseOnEscPress(onClose, isOpen);

  useCloseOnClickOutside(onClose, popoverRef, {
    isEnabled: isOpen,
    ignoreElements: [anchorRef.current],
  });

  useCaptureFocus({
    modalRef: popoverRef,
    isEnabled: shouldCaptureFocus && isOpen,
    autoFocusAfterRelease: false,
  });

  const renderAnchor = () => {
    if (typeof anchor === 'function') {
      return anchor({ ref: anchorRef });
    }

    return React.cloneElement(anchor, {
      ref: util.mergeRefs(anchor.ref, anchorRef),
    });
  };

  return (
    <>
      {renderAnchor()}
      <Positioner
        className="dc-popover-container"
        anchorRef={anchorRef}
        position={position}
        arrangement={arrangement}
        alignment={alignment}
        anchorOffset={anchorOffset}
        viewportOffset={viewportOffset}
        isShown={isOpen}
        shouldUpdatePositionWhenScroll={shouldUpdatePositionWhenScroll}
      >
        <div tabIndex={0} />
        <Box
          ref={popoverRef}
          className={classNames(className, 'dc-popover')}
          borderRadius="lg"
          elevation="md"
          {...props}
        >
          {content}
        </Box>
        <div tabIndex={0} />
      </Positioner>
    </>
  );
}
