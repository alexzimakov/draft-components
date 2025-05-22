import { classNames, tryToFocusElement } from '../../lib/react-helpers.js';
import { observeElementMove } from '../../lib/observe-element-move.js';
import { calcElementPosition, type ElementPlacement } from '../../lib/calc-element-position.js';
import { deleteKeys } from '../../lib/helpers.js';
import { useRefCallback } from '../../hooks/use-ref-callback.js';
import { useFocusTrap } from '../../hooks/use-focus-trap.js';
import { useLockBodyScroll } from '../../hooks/use-lock-body-scroll.js';
import { useCloseOnEsc } from '../../hooks/use-close-on-esc.js';
import { useCloseOnClickOutside } from '../../hooks/use-close-on-click-outside.js';
import { type ComponentProps, type JSX, type RefCallback, type RefObject, useEffect, useRef, useState } from 'react';
import { Portal } from '../portal/portal.js';

export { type ElementPlacement as PopoverPlacement };

export type PopoverCloseHandler = () => void;

export type PopoverUnmountHandler = () => void;

export type PopoverRenderAnchor = (props: { ref: RefCallback<HTMLElement | null> }) => JSX.Element;

type PopoverHTMLProps = ComponentProps<'div'>;

type PopoverCommonProps = {
  placement?: ElementPlacement;
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
  | { anchorRef: RefObject<HTMLElement | null> }
  | { renderAnchor: PopoverRenderAnchor }
);

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
  const [isMounted, setIsMounted] = useState(isOpen);
  const defaultAnchorRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);

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
    const anchor = anchorRef.current;
    const popover = popoverRef.current;
    if (!anchor || !popover) {
      return;
    }

    if (isOpen) {
      setIsMounted((isMounted) => {
        if (isMounted) {
          return isMounted;
        }

        popover.dataset.animation = 'enter';
        return !isMounted;
      });

      const positionPopover = () => {
        popover.style.removeProperty('max-width');
        popover.style.removeProperty('max-height');
        const result = calcElementPosition(anchor, popover, {
          placement,
          anchorPadding,
          viewportPadding,
        });
        popover.style.setProperty('top', `${result.y}px`);
        popover.style.setProperty('left', `${result.x}px`);
        popover.style.setProperty('max-width', `${result.maxWidth}px`);
        popover.style.setProperty('max-height', `${result.maxHeight}px`);
      };

      positionPopover();
      return observeElementMove(anchor, positionPopover);
    } else {
      popover.dataset.animation = 'leave';
      popover.addEventListener('animationend', unmount);
      return () => {
        popover.removeEventListener('animationend', unmount);
      };
    }
  }, [
    anchorRef,
    isOpen,
    placement,
    anchorPadding,
    viewportPadding,
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

  useEffect(() => {
    if (isOpen) {
      const prevFocusedElement = document.activeElement;
      return () => {
        tryToFocusElement(prevFocusedElement);
      };
    }
  }, [isOpen]);

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
            {...isAnchorRefProvided ? deleteKeys(props, 'anchorRef') : deleteKeys(props, 'renderAnchor')}
          >
            {children}
          </div>
        </Portal>
      )}
    </>
  );
}
