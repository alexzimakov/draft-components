import { classNames } from '../../lib/react-helpers.js';
import { calcPopoverPosition, PopoverPlacement } from '../../lib/calc-popover-position.js';
import { useRefCallback } from '../../hooks/use-ref-callback.js';
import { useLockBodyScroll } from '../../hooks/use-lock-body-scroll.js';
import { useCloseOnEsc } from '../../hooks/use-close-on-esc.js';
import { useCloseOnClickOutside } from '../../hooks/use-close-on-click-outside.js';
import { CSSProperties, JSX, ReactNode, RefCallback, RefObject, useEffect, useRef, useState } from 'react';
import { Portal } from '../portal/portal.js';
import { useFocusTrap } from '../../hooks/use-focus-trap.js';

export { type PopoverPlacement };

export type PopoverCloseHandler = () => void;

export type PopoverUnmountHandler = () => void;

export type PopoverRenderAnchor = (props: { ref: RefCallback<HTMLElement> }) => JSX.Element;

export type PopoverBaseProps = {
  id?: string;
  style?: CSSProperties;
  className?: string;
  placement?: PopoverPlacement;
  anchorPadding?: number;
  viewportPadding?: number;
  openAnimationDuration?: number;
  closeAnimationDuration?: number;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: PopoverCloseHandler;
  onUnmount?: PopoverUnmountHandler;
};

export type PopoverProps = PopoverBaseProps & (
  | { anchorRef: RefObject<HTMLElement> }
  | { renderAnchor: PopoverRenderAnchor }
);

export function Popover({
  id,
  style,
  className,
  placement = 'bottom-start',
  anchorPadding = 4,
  viewportPadding = 4,
  openAnimationDuration = 50,
  closeAnimationDuration = 50,
  children = null,
  isOpen = false,
  onClose,
  onUnmount,
  ...props
}: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const defaultAnchorRef = useRef<HTMLElement | null>(null);
  const anchorRef = 'anchorRef' in props ? props.anchorRef : defaultAnchorRef;
  const [isMounted, setIsMounted] = useState(false);

  const close = useRefCallback(() => {
    if (typeof onClose === 'function') {
      onClose();
    }
  });

  const unmount = useRefCallback(() => {
    setIsMounted(false);
    if (typeof onUnmount === 'function') {
      onUnmount();
    }
  });

  useEffect(() => {
    if (isOpen) {
      const anchor = anchorRef.current;
      const popover = popoverRef.current;
      if (!anchor || !popover) {
        return;
      }

      setIsMounted(isOpen);

      const result = calcPopoverPosition(anchor, popover, {
        placement,
        anchorPadding,
        viewportPadding,
      });
      popover.style.setProperty('top', `${result.y}px`);
      popover.style.setProperty('left', `${result.x}px`);
      popover.animate({
        opacity: [0, 1],
        easing: 'ease',
      }, {
        duration: openAnimationDuration,
        fill: 'forwards',
      });

      return () => {
        const animation = popover.animate({
          opacity: [1, 0],
          easing: 'ease',
        }, {
          duration: closeAnimationDuration,
          fill: 'forwards',
        });
        animation.finished.then(() => {
          unmount();
          anchor.focus();
        });
      };
    }
  }, [
    placement,
    anchorPadding,
    viewportPadding,
    openAnimationDuration,
    closeAnimationDuration,
    isOpen,
    anchorRef,
    close,
    unmount,
  ]);

  useFocusTrap(popoverRef, {
    disabled: !isMounted,
  });

  useLockBodyScroll({
    disabled: !isMounted,
  });

  useCloseOnEsc(close, {
    disabled: !isMounted,
  });

  useCloseOnClickOutside(close, {
    ref: popoverRef,
    disabled: !isMounted,
    shouldIgnoreClick: (node) => anchorRef.current ? anchorRef.current.contains(node) : false,
  });

  return (
    <>
      {'renderAnchor' in props && props.renderAnchor({
        ref: (el) => {
          defaultAnchorRef.current = el;
        },
      })}
      {(isOpen || isMounted) && (
        <Portal>
          <div
            id={id}
            style={style}
            className={classNames('dc-popover', className)}
            aria-modal={true}
            role="dialog"
            ref={popoverRef}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
}
