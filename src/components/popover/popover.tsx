import {
  cloneElement,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type RefCallback,
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
  type PositionerProps,
  type RenderAnchorFn,
  type RenderContentFn,
} from '../positioner';

type PopoverAnchorRenderFn = (props: {
  setRef: RefCallback<HTMLElement>;
  openPopover: () => void;
  closePopover: () => void;
  togglePopover: () => void;
}) => ReactNode;

export type PopoverRef = {
  open(): void;
  close(): void;
  toggle(): void;
};

export type PopoverPlacement = PositionerProps['placement'];
export type PopoverAlignment = PositionerProps['alignment'];
export type OpenCallback = () => void;
export type CloseCallback = () => void;
export type PopoverProps = {
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  shouldTrapFocus?: boolean;
  shouldFocusAnchorAfterClose?: boolean;
  anchorGap?: number;
  viewportGap?: number;
  placement?: PopoverPlacement;
  alignment?: PopoverAlignment;
  anchor: ReactNode | PopoverAnchorRenderFn;
  children: ReactNode;
  onOpen?: OpenCallback;
  onClose?: CloseCallback;
} & ComponentPropsWithoutRef<'div'>;

export const Popover = forwardRef<
  PopoverRef,
  PopoverProps
>(function Popover({
  shouldTrapFocus = true,
  shouldFocusAnchorAfterClose = true,
  placement = 'bottom',
  alignment = 'start',
  anchorGap,
  viewportGap,
  defaultIsOpen,
  isOpen,
  anchor,
  style,
  className,
  children,
  onOpen,
  onClose,
  ...props
}, ref) {
  const [defaultShow, setDefaultShow] = useState(defaultIsOpen ?? false);
  const anchorRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const show = isOpen ?? defaultShow;
  const durationMs = 100;
  const { isMounted, className: transitionClass } = useMountTransition({
    show,
    durationMs,
    enterFrom: 'dc-popover_closed',
    enterTo: 'dc-popover_opened',
  });

  const openPopover = useCallback(() => {
    setDefaultShow(true);
    onOpen?.();
  }, [onOpen]);

  const closePopover = useCallback(() => {
    setDefaultShow(false);
    onClose?.();
  }, [onClose]);

  const togglePopover = useCallback(() => {
    if (show) {
      closePopover();
    } else {
      openPopover();
    }
  }, [show, closePopover, openPopover]);

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
  }, { isEnabled: show });

  useEscKeyDown(() => {
    closePopover();
    if (shouldFocusAnchorAfterClose && anchorRef.current) {
      focusElement(anchorRef.current);
    }
  }, { isEnabled: show });

  useFocusTrap(contentRef, { isEnabled: shouldTrapFocus && show });

  const renderAnchor: RenderAnchorFn = ({ setRef }) => {
    if (typeof anchor === 'function') {
      return anchor({
        openPopover,
        closePopover,
        togglePopover,
        setRef: mergeRefs(setRef, anchorRef),
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

  const renderContent: RenderContentFn = ({
    setRef: portalRef,
    style: portalStyle,
    className: portalClass,
  }) => {
    if (show || isMounted) {
      return (
        <div
          ref={portalRef}
          style={portalStyle}
          className={classNames('dc-popover__container', portalClass)}
        >
          <div
            {...props}
            ref={contentRef}
            style={{
              '--dc-popover-transition-duration': `${durationMs}ms`,
              ...style,
            } as CSSProperties}
            className={classNames('dc-popover', transitionClass, className)}
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
