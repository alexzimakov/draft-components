import {
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefCallback,
  cloneElement,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  classNames,
  focusElement,
  isReactElementWithRef,
  mergeRefs,
} from '../../lib/react-helpers';
import { useMountTransition } from '../../hooks/use-mount-transition';
import { useEscKeyDown } from '../../hooks/use-esc-key-down';
import { useFocusTrap } from '../../hooks/use-focus-trap';
import { usePageClick } from './use-page-click';
import {
  Positioner,
  type PositionerAnchorRenderFn,
  type PositionerContentRenderFn,
  type PositionerProps,
} from '../positioner';

export type PopoverRef = {
  open(): void;
  close(): void;
  toggle(): void;
};

export type PopoverAnchorRenderFn = (props: {
  ref: RefCallback<HTMLElement>;
}, context: {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  togglePopover: () => void;
}) => ReactNode;

type PopoverHTMLProps = ComponentPropsWithoutRef<'div'>;
export type PopoverPlacement = PositionerProps['placement'];
export type PopoverAlignment = PositionerProps['alignment'];
export type PopoverOpenCallback = () => void;
export type PopoverCloseCallback = () => void;
export type PopoverProps = {
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  shouldTrapFocus?: boolean;
  shouldFocusAnchorAfterEscPress?: boolean;
  anchorGap?: number;
  viewportGap?: number;
  placement?: PopoverPlacement;
  alignment?: PopoverAlignment;
  anchor: ReactNode | PopoverAnchorRenderFn;
  children: ReactNode;
  onOpen?: PopoverOpenCallback;
  onClose?: PopoverCloseCallback;
} & PopoverHTMLProps;

export const Popover = forwardRef<
  PopoverRef,
  PopoverProps
>(function Popover({
  shouldTrapFocus = true,
  shouldFocusAnchorAfterEscPress = true,
  placement = 'bottom',
  alignment = 'start',
  anchorGap,
  viewportGap,
  anchor,
  className,
  children,
  onOpen,
  onClose,
  ...props
}, ref) {
  const [defaultIsOpen, setDefaultIsOpen] = useState(
    props.defaultIsOpen ?? false,
  );
  const anchorRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isOpen = props.isOpen ?? defaultIsOpen;
  const durationMs = 100;
  const { isMounted, className: transitionClass } = useMountTransition({
    durationMs,
    isShown: isOpen,
    enterFrom: 'dc-popover_closed',
    enterTo: 'dc-popover_opened',
  });

  const openPopover = useCallback(() => {
    setDefaultIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const closePopover = useCallback(() => {
    setDefaultIsOpen(false);
    onClose?.();
  }, [onClose]);

  const togglePopover = useCallback(() => {
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  }, [isOpen, closePopover, openPopover]);

  useImperativeHandle(ref, () => ({
    open: openPopover,
    close: closePopover,
    toggle: togglePopover,
  }), [openPopover, closePopover, togglePopover]);

  usePageClick((event) => {
    const target = event.target;
    const anchor = anchorRef.current;
    const content = contentRef.current;
    if (
      target instanceof Node &&
      !anchor?.contains(target) &&
      !content?.contains(target)
    ) {
      closePopover();
    }
  }, { isEnabled: isOpen });

  useEscKeyDown(() => {
    closePopover();
    if (shouldFocusAnchorAfterEscPress && anchorRef.current) {
      focusElement(anchorRef.current);
    }
  }, { isEnabled: isOpen });

  useFocusTrap(contentRef, { isEnabled: shouldTrapFocus && isOpen });

  const renderAnchor: PositionerAnchorRenderFn = ({ setRef }) => {
    if (typeof anchor === 'function') {
      return anchor({
        ref: mergeRefs(setRef, anchorRef),
      }, {
        isOpen: isOpen || isMounted,
        openPopover,
        closePopover,
        togglePopover,
      });
    }

    if (isReactElementWithRef(anchor)) {
      return cloneElement(anchor, {
        ref: mergeRefs(setRef, anchorRef, anchor.ref),
        onClick: (event: MouseEvent): void => {
          togglePopover();
          anchor.props.onClick?.(event);
        },
      });
    }

    return anchor;
  };

  const renderContent: PositionerContentRenderFn = ({
    setRef: portalRef,
    style: portalStyle,
  }) => {
    if (isOpen || isMounted) {
      delete props.defaultIsOpen;
      delete props.isOpen;
      return (
        <div
          ref={portalRef}
          style={{
            '--dc-popover-transition-duration': `${durationMs}ms`,
            ...portalStyle,
          } as CSSProperties}
          className={classNames('dc-popover', transitionClass)}
        >
          <div
            {...props}
            ref={contentRef}
            className={classNames('dc-popover-modal', className)}
          >
            {children}
          </div>
        </div>
      );
    }
  };

  return (
    <Positioner
      position="absolute"
      placement={placement}
      alignment={alignment}
      anchorGap={anchorGap}
      viewportGap={viewportGap}
      renderAnchor={renderAnchor}
      renderContent={renderContent}
    />
  );
});
