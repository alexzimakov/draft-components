import { ComponentProps, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { useRefCallback } from '../../hooks/use-ref-callback.js';
import { useCloseOnEsc } from '../../hooks/use-close-on-esc.js';
import { useLockBodyScroll } from '../../hooks/use-lock-body-scroll.js';
import { useFocusTrap } from '../../hooks/use-focus-trap.js';
import { usePreservePropsWhenClosed } from '../../hooks/use-preserve-props-when-closed.js';
import { Portal } from '../portal/index.js';
import { DialogContextProvider } from './dialog-context.js';
import { DialogHeader } from './dialog-header.js';
import { DialogBody } from './dialog-body.js';
import { DialogFooter } from './dialog-footer.js';

export type DialogCloseHandler = () => void;

export type DialogUnmountHandler = () => void;

type DialogBaseProps = {
  role?: 'dialog' | 'alertdialog';
  size?: 'sm' | 'md' | 'lg';
  position?: 'centered' | 'left' | 'right';
  isOpen?: boolean;
  onClose?: DialogCloseHandler;
  onUnmount?: DialogUnmountHandler;
};

type DialogHTMLProps = ComponentProps<'div'>;

export type DialogProps =
  & DialogBaseProps
  & Omit<DialogHTMLProps, keyof DialogBaseProps>;

export function Dialog(props: DialogProps) {
  const {
    className,
    children,
    role = 'dialog',
    size = 'md',
    position = 'centered',
    isOpen = false,
    onClose,
    onUnmount,
    ...otherProps
  } = usePreservePropsWhenClosed(props, 'isOpen');
  const [isMounted, setIsMounted] = useState(isOpen);
  const defaultId = useId();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const backdropRef = useRef<HTMLDivElement | null>(null);

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

  useLayoutEffect(() => {
    const backdrop = backdropRef.current;
    const modal = modalRef.current;
    if (!backdrop || !modal) {
      return;
    }

    if (isOpen) {
      setIsMounted((isMounted) => {
        if (isMounted) {
          return isMounted;
        }

        modal.setAttribute('data-animation', 'enter');
        backdrop.setAttribute('data-animation', 'enter');
        return !isMounted;
      });
    } else {
      let isModalAnimationEnded = false;
      let isBackdropAnimationEnded = false;

      modal.setAttribute('data-animation', 'leave');
      modal.addEventListener('animationend', () => {
        isModalAnimationEnded = true;
        if (isModalAnimationEnded && isBackdropAnimationEnded) {
          unmount();
        }
      }, { once: true });

      backdrop.setAttribute('data-animation', 'leave');
      backdrop.addEventListener('animationend', () => {
        isBackdropAnimationEnded = true;
        if (isModalAnimationEnded && isBackdropAnimationEnded) {
          unmount();
        }
      }, { once: true });
    }
  }, [isOpen, unmount]);

  useFocusTrap(modalRef, {
    disabled: !isMounted,
  });

  useLockBodyScroll({
    disabled: !isMounted,
  });

  useCloseOnEsc(close, {
    disabled: !isMounted,
  });

  useEffect(() => {
    if (isOpen) {
      const prevFocusedElement = document.activeElement;
      if (prevFocusedElement instanceof HTMLElement) {
        prevFocusedElement.blur();
      }
      return () => {
        if (prevFocusedElement instanceof HTMLElement) {
          prevFocusedElement.focus();
        }
      };
    }
  }, [isOpen]);

  if (!isOpen && !isMounted) {
    return null;
  }

  const id = otherProps.id || defaultId;
  const titleId = `dialog-title-${id}`;
  return (
    <Portal>
      <DialogContextProvider
        titleId={titleId}
        isOpen={isOpen}
        onClose={close}
      >
        <div
          {...otherProps}
          id={id}
          className={classNames(className, {
            'dc-dialog': true,
            [`dc-dialog_size_${size}`]: size,
            [`dc-dialog_position_${position}`]: position,
          })}
          role={role}
          aria-modal={true}
          aria-labelledby={titleId}
        >
          <div className="dc-dialog__backdrop" ref={backdropRef} data-testid="dialog-backdrop" />
          <div className="dc-dialog__modal" ref={modalRef} data-testid="dialog-modal">
            {children}
          </div>
        </div>
      </DialogContextProvider>
    </Portal>
  );
}
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;
