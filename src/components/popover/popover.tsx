import { cloneElement, MutableRefObject, ReactNode, useRef } from 'react';
import { noop } from '../../lib/util';
import { classNames, mergeRefs } from '../../lib/react-helpers';
import { useCloseOnEscPress } from '../../hooks/use-close-on-esc-press';
import { useCloseOnClickOutside } from '../../hooks/use-close-on-click-outside';
import { useCaptureFocus } from '../../hooks/use-capture-focus';
import { Positioner, PositionerProps } from '../positioner';
import { Box, BoxProps } from '../box';

interface ElementWithRef extends JSX.Element {
  ref?: MutableRefObject<HTMLElement | null> | null;
}

interface RenderChildren {
  (props: { ref: MutableRefObject<HTMLElement | null> }): JSX.Element;
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
  content: ReactNode;
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
  onClose = noop,
  content,
  children: anchor,
  className,
  ...props
}: PopoverProps) {
  const anchorRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

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

    return cloneElement(anchor, {
      ref: mergeRefs(anchor.ref, anchorRef),
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
