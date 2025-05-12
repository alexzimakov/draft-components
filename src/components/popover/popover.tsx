import { classNames } from '../../lib/react-helpers.js';
import { observeMove } from './observe-move.js';
import { calcPopoverPosition, PopoverPlacement } from '../../lib/calc-popover-position.js';
import { useRefCallback } from '../../hooks/use-ref-callback.js';
import { useFocusTrap } from '../../hooks/use-focus-trap.js';
import { useLockBodyScroll } from '../../hooks/use-lock-body-scroll.js';
import { useCloseOnEsc } from '../../hooks/use-close-on-esc.js';
import { useCloseOnClickOutside } from '../../hooks/use-close-on-click-outside.js';
import { ComponentProps, JSX, RefCallback, RefObject, useEffect, useRef, useState } from 'react';
import { Portal } from '../portal/portal.js';
import { omit } from '../../lib/helpers.js';

type PopoverHTMLProps = ComponentProps<'div'>;

type PopoverCommonProps = {
  placement?: PopoverPlacement;
  anchorPadding?: number;
  viewportPadding?: number;
  openAnimationDuration?: number;
  closeAnimationDuration?: number;
  shouldTrapFocus?: boolean;
  shouldLockBodyScroll?: boolean;
  shouldCloseOnEsc?: boolean;
  shouldCloseOnClickOutside?: boolean;
  isOpen?: boolean;
  onClose?: PopoverCloseHandler;
  onUnmount?: PopoverUnmountHandler;
};

type PopoverBaseProps = PopoverCommonProps & (
  | { anchorRef: RefObject<HTMLElement> }
  | { renderAnchor: PopoverRenderAnchor }
);

export { type PopoverPlacement };

export type PopoverCloseHandler = () => void;

export type PopoverUnmountHandler = () => void;

export type PopoverRenderAnchor = (props: { ref: RefCallback<HTMLElement> }) => JSX.Element;

export type PopoverProps =
  & PopoverBaseProps
  & Omit<PopoverHTMLProps, keyof PopoverBaseProps>;

export function Popover({
  className,
  role = 'dialog',
  'aria-modal': ariaModal = true,
  placement = 'bottom-start',
  anchorPadding = 4,
  viewportPadding = 4,
  openAnimationDuration = 50,
  closeAnimationDuration = 50,
  shouldTrapFocus = true,
  shouldLockBodyScroll = true,
  shouldCloseOnEsc = true,
  shouldCloseOnClickOutside = true,
  children = null,
  isOpen = false,
  onClose,
  onUnmount,
  ...props
}: PopoverProps) {
  const [isMounted, setIsMounted] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const defaultAnchorRef = useRef<HTMLElement | null>(null);

  const isAnchorRefProvided = 'anchorRef' in props;
  let anchorRef: RefObject<HTMLElement | null>;
  if (isAnchorRefProvided) {
    anchorRef = props.anchorRef;
  } else {
    anchorRef = defaultAnchorRef;
  }

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

      const positionPopover = () => {
        popover.style.removeProperty('max-width');
        popover.style.removeProperty('max-height');
        const result = calcPopoverPosition(anchor, popover, {
          placement,
          anchorPadding,
          viewportPadding,
        });
        popover.style.setProperty('top', `${result.y}px`);
        popover.style.setProperty('left', `${result.x}px`);
        popover.style.setProperty('max-width', `${result.maxWidth}px`);
        popover.style.setProperty('max-height', `${result.maxHeight}px`);
      };

      setIsMounted(isOpen);
      const unobserve = observeMove(anchor, positionPopover);
      popover.animate({
        opacity: [0, 1],
        easing: 'ease',
      }, {
        duration: openAnimationDuration,
        fill: 'forwards',
      });

      return () => {
        unobserve();
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
    disabled: !shouldTrapFocus || !isMounted,
  });

  useLockBodyScroll({
    disabled: !shouldLockBodyScroll || !isMounted,
  });

  useCloseOnEsc(close, {
    disabled: !shouldCloseOnEsc || !isMounted,
  });

  useCloseOnClickOutside(close, {
    ref: popoverRef,
    disabled: !shouldCloseOnClickOutside || !isMounted,
    shouldIgnoreClick: (node) => anchorRef.current ? anchorRef.current.contains(node) : false,
  });

  return (
    <>
      {!isAnchorRefProvided && props.renderAnchor({
        ref: (el) => {
          defaultAnchorRef.current = el;
        },
      })}
      {(isOpen || isMounted) && (
        <Portal>
          <div
            className={classNames('dc-popover', className)}
            ref={popoverRef}
            role={role}
            aria-modal={ariaModal}
            {...isAnchorRefProvided ? omit(props, 'anchorRef') : omit(props, 'renderAnchor')}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
}
