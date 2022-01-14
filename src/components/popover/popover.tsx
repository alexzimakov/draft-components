import {
  cloneElement,
  forwardRef,
  MutableRefObject,
  ReactNode,
  RefObject,
  useRef,
} from 'react';
import { noop } from '../../lib/util';
import { isFunction } from '../../lib/guards';
import { classNames, mergeRefs } from '../../lib/react-helpers';
import { useCloseOnEscPress } from '../../hooks/use-close-on-esc-press';
import { useCloseOnClickOutside } from '../../hooks/use-close-on-click-outside';
import { useCaptureFocus } from '../../hooks/use-capture-focus';
import { Positioner, PositionerProps } from '../positioner';
import { Box, BoxProps } from '../box';

type BaseProps = Omit<PositionerProps, 'anchorRef'>;

type RenderFn = (props: { ref: RefObject<HTMLElement> }) => JSX.Element;

interface JSXElementWithRef extends JSX.Element {
  ref?: RefObject<HTMLElement>;
}

export interface PopoverProps extends BaseProps, BoxProps {
  isShown?: boolean;
  shouldCaptureFocus?: boolean;
  focusElementRefAfterOpen?: MutableRefObject<Element | null>;
  focusElementRefAfterClose?: MutableRefObject<Element | null>;
  content: ReactNode;
  children: RenderFn | JSXElementWithRef;
  onClose?(): void;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(
    {
      className,
      isShown,
      position,
      alignment,
      anchorOffset,
      viewportOffset,
      shouldCaptureFocus = true,
      shouldUpdatePositionWhenScroll = false,
      isPositionedRelativeToViewport = false,
      focusElementRefAfterOpen,
      focusElementRefAfterClose,
      content,
      children,
      onClose = noop,
      ...props
    },
    ref
  ) {
    const anchorRef = useRef<HTMLElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    useCloseOnEscPress(onClose, isShown);

    useCloseOnClickOutside(onClose, popoverRef, {
      isEnabled: isShown,
      ignoreElements: [anchorRef.current],
    });

    useCaptureFocus({
      isEnabled: shouldCaptureFocus && isShown,
      modalRef: popoverRef,
      focusElementRefAfterCapture: focusElementRefAfterOpen,
      focusElementRefAfterRelease: focusElementRefAfterClose,
    });

    function render(): JSX.Element {
      if (isFunction(children)) {
        return children({ ref: anchorRef });
      } else {
        return cloneElement(children, {
          ref: mergeRefs(children.ref, anchorRef),
        });
      }
    }

    return (
      <>
        {render()}
        <Positioner
          className="dc-popover-container"
          anchorRef={anchorRef}
          position={position}
          alignment={alignment}
          anchorOffset={anchorOffset}
          viewportOffset={viewportOffset}
          isShown={isShown}
          isPositionedRelativeToViewport={isPositionedRelativeToViewport}
          shouldUpdatePositionWhenScroll={shouldUpdatePositionWhenScroll}
        >
          <div tabIndex={0} />
          <Box
            ref={mergeRefs(ref, popoverRef)}
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
);
