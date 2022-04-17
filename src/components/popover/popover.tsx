import {
  cloneElement,
  forwardRef,
  isValidElement,
  ReactNode,
  RefCallback,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { isFunction } from '../../lib/guards';
import { classNames, mergeRefs } from '../../lib/react-helpers';
import { useIsFirstRender } from '../../hooks/use-is-first-render';
import { useCloseAnimation } from '../../hooks/use-close-animation';
import { useEscKeyDown } from '../../hooks/use-esc-key-down';
import { useFocusTrap } from '../../hooks/use-focus-trap';
import { useBodyClick } from './use-body-click';
import { Box, BoxProps } from '../box';
import { Positioner } from '../positioner';
import { Alignment, Placement } from '../positioner/types';

type RenderFn = (props: {
  setRef: RefCallback<HTMLElement>;
  openPopover(): void;
  closePopover(): void;
  togglePopover(): void;
}) => ReactNode;

export type PopoverRef = {
  open(): void;
  close(): void;
  toggle(): void;
};

export type PopoverProps = {
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  shouldTrapFocus?: boolean;
  shouldFocusAnchorAfterClose?: boolean;
  placement?: Placement;
  alignment?: Alignment;
  anchor: ReactNode | RenderFn;
  children: ReactNode;
  onOpen?(): void;
  onClose?(): void;
} & BoxProps;

export const Popover = forwardRef<PopoverRef, PopoverProps>(function Popover(
  {
    className,
    shouldTrapFocus = true,
    shouldFocusAnchorAfterClose = true,
    placement = 'bottom',
    alignment = 'start',
    borderRadius = 'lg',
    elevation = 'md',
    anchor,
    children,
    onOpen,
    onClose,
    ...props
  },
  ref
) {
  const anchorRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useIsFirstRender();
  const [defaultIsOpen, setDefaultIsOpen] = useState(props.defaultIsOpen);
  const isOpen = props.isOpen ?? defaultIsOpen ?? false;
  const { shouldRender, animationClassName } = useCloseAnimation({
    isOpen,
    closeDurationMs: 150,
    className: !isFirstRender && 'dc-popover_bubble-transition',
    openClassName: 'dc-popover_open',
    closingClassName: 'dc-popover_closing',
  });

  const openPopover = useCallback(() => {
    setDefaultIsOpen(true);
    isFunction(onOpen) && onOpen();
  }, [onOpen]);

  const closePopover = useCallback(() => {
    setDefaultIsOpen(false);
    isFunction(onClose) && onClose();
  }, [onClose]);

  const togglePopover = useCallback(() => {
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  }, [isOpen, openPopover, closePopover]);

  useImperativeHandle(
    ref,
    () => ({
      open: openPopover,
      close: closePopover,
      toggle: togglePopover,
    }),
    [openPopover, closePopover, togglePopover]
  );

  useBodyClick((event) => {
    const target = event.target as Element;
    const anchor = anchorRef.current;
    const content = contentRef.current;
    if (
      (anchor && anchor.contains(target)) ||
      (content && content.contains(target))
    ) {
      return false;
    } else {
      closePopover();
    }
  }, isOpen);

  useEscKeyDown(() => {
    closePopover();
    if (shouldFocusAnchorAfterClose && anchorRef.current) {
      anchorRef.current.focus();
    }
  }, isOpen);

  useFocusTrap(contentRef, shouldTrapFocus ? isOpen : false);

  return (
    <Positioner
      placement={placement}
      alignment={alignment}
      renderAnchor={({ setRef }) => {
        if (isFunction(anchor)) {
          return anchor({
            openPopover,
            closePopover,
            togglePopover,
            setRef: mergeRefs(setRef, anchorRef),
          });
        }

        if (isValidElement(anchor)) {
          return cloneElement(anchor, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref: mergeRefs(setRef, anchorRef, (anchor as any).ref),
            onClick: (event: MouseEvent): void => {
              const onClick = anchor.props.onClick;
              if (isFunction(onClick)) {
                onClick(event);
              }

              togglePopover();
            },
          });
        }

        return (
          <span ref={setRef} onClick={togglePopover}>
            {anchor}
          </span>
        );
      }}
      renderContent={({ style, setRef }) => {
        if (shouldRender) {
          delete props.defaultIsOpen;
          delete props.isOpen;

          return (
            <div ref={setRef} style={style} className="dc-popover-container">
              <Box
                ref={contentRef}
                className={classNames(
                  'dc-popover',
                  animationClassName,
                  className
                )}
                borderRadius={borderRadius}
                elevation={elevation}
                {...props}
              >
                {children}
              </Box>
            </div>
          );
        }
      }}
    />
  );
});
