import { CSSProperties, ComponentPropsWithoutRef, RefObject, useEffect, useId, useRef } from 'react';
import { classNames, focusElement } from '../../lib/react-helpers.js';
import { useCloseOnEsc } from '../../hooks/use-close-on-esc.js';
import { useLockBodyScroll } from '../../hooks/use-lock-body-scroll.js';
import { useFocusTrap } from '../../hooks/use-focus-trap.js';
import { usePreservePropsWhenClosed } from '../../hooks/use-preserve-props-when-closed.js';
import { useShowTransition } from '../../hooks/use-show-transition.js';
import { Portal } from '../portal/index.js';
import { DialogContextProvider } from './dialog-context.js';
import { DialogHeader } from './dialog-header.js';
import { DialogBody } from './dialog-body.js';
import { DialogFooter } from './dialog-footer.js';

type DialogHTMLProps = ComponentPropsWithoutRef<'section'>;
type ContainerProps = ComponentPropsWithoutRef<'div'>;
type BackdropProps = ComponentPropsWithoutRef<'div'>;
export type DialogWidth = 'sm' | 'md' | 'lg';
export type DialogProps = {
  width?: DialogWidth;
  focusAfterOpenRef?: RefObject<HTMLElement>;
  focusAfterCloseRef?: RefObject<HTMLElement>;
  openAnimationDurationMs?: number;
  closeAnimationDurationMs?: number;
  containerProps?: ContainerProps;
  backdropProps?: BackdropProps;
  isOpen: boolean;
  onClose: () => void;
  onOpenAnimationEnd?: () => void;
  onCloseAnimationEnd?: () => void;
} & DialogHTMLProps;

export function Dialog(props: DialogProps) {
  const {
    className,
    width = 'md',
    isOpen = false,
    focusAfterOpenRef,
    focusAfterCloseRef,
    openAnimationDurationMs = 250,
    closeAnimationDurationMs = 150,
    containerProps = {},
    backdropProps = {},
    children,
    onClose,
    onOpenAnimationEnd,
    onCloseAnimationEnd,
    ...otherProps
  } = usePreservePropsWhenClosed(props, 'isOpen');
  const defaultId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { shouldRender, transitionClassName } = useShowTransition({
    isOpen,
    enterDurationMs: openAnimationDurationMs,
    leaveDurationMs: closeAnimationDurationMs,
    onEnterTransitionEnd: onOpenAnimationEnd,
    onLeaveTransitionEnd: onCloseAnimationEnd,
  });

  useLockBodyScroll({ disabled: !shouldRender });

  useCloseOnEsc(onClose, { disabled: !shouldRender });

  useFocusTrap(modalRef, { disabled: !shouldRender });

  useEffect(() => {
    if (shouldRender) {
      const focusAfterOpen = focusAfterOpenRef?.current;
      const focusAfterClose = focusAfterCloseRef?.current;
      focusElement(focusAfterOpen);
      return () => {
        focusElement(focusAfterClose);
      };
    }
  }, [shouldRender, focusAfterOpenRef, focusAfterCloseRef]);

  if (!shouldRender) {
    return null;
  }

  const id = otherProps.id || defaultId;
  const titleId = `dialog-title-${id}`;
  const descriptionId = `dialog-description-${id}`;
  return (
    <Portal>
      <div
        {...containerProps}
        ref={dialogRef}
        className={classNames('dc-dialog', transitionClassName, containerProps.className)}
        style={{
          '--dc-dialog-open-transition-duration': `${openAnimationDurationMs}ms`,
          '--dc-dialog-close-transition-duration': `${closeAnimationDurationMs}ms`,
          ...containerProps.style,
        } as CSSProperties}
      >
        <div
          {...backdropProps}
          className={classNames('dc-dialog__backdrop', backdropProps.className)}
        />
        <div
          {...otherProps}
          id={id}
          className={classNames(className, {
            'dc-dialog__modal': true,
            [`dc-dialog__modal_${width}`]: width,
          })}
          ref={modalRef}
          role="dialog"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          aria-modal={true}
        >
          <DialogContextProvider
            titleId={titleId}
            descriptionId={descriptionId}
            isOpen={isOpen}
            onClose={onClose}
          >
            {children}
          </DialogContextProvider>
        </div>
      </div>
    </Portal>
  );
}
Dialog.Header = DialogHeader;
Dialog.Body = DialogBody;
Dialog.Footer = DialogFooter;
