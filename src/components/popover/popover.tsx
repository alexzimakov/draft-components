import * as React from 'react';
import { classNames, util } from '../../lib';
import { useCloseOnEscPress, useCloseOnClickOutside } from '../../hooks';
import { Positioner, PositionerProps } from '../positioner';
import { Box, BoxProps } from '../box';

type RenderChildren = (props: {
  ref: React.MutableRefObject<HTMLElement | null>;
}) => JSX.Element;

export interface PopoverProps extends BoxProps {
  position?: PositionerProps['position'];
  arrangement?: PositionerProps['arrangement'];
  alignment?: PositionerProps['alignment'];
  anchorOffset?: number;
  viewportOffset?: number;
  isOpen?: boolean;
  shouldUpdatePositionWhenScroll?: boolean;
  onClose?: () => void;
  content: React.ReactNode;
  children: JSX.Element | RenderChildren;
}

export function Popover({
  position,
  arrangement,
  alignment,
  anchorOffset,
  viewportOffset,
  isOpen,
  shouldUpdatePositionWhenScroll,
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

  return (
    <>
      {typeof anchor === 'function'
        ? anchor({ ref: anchorRef })
        : React.cloneElement(anchor, {
            ref: util.mergeRefs(anchorRef, anchor.props.ref),
          })}
      <Positioner
        className="dc-popover-container"
        ref={popoverRef}
        anchorRef={anchorRef}
        position={position}
        arrangement={arrangement}
        alignment={alignment}
        anchorOffset={anchorOffset}
        viewportOffset={viewportOffset}
        isShown={isOpen}
        shouldUpdatePositionWhenScroll={shouldUpdatePositionWhenScroll}
      >
        <Box
          className={classNames(className, 'dc-popover')}
          borderRadius="lg"
          elevation="md"
          {...props}
        >
          {content}
        </Box>
      </Positioner>
    </>
  );
}
