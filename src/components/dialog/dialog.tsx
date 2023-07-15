import { CSSProperties, ComponentPropsWithoutRef, RefObject, useEffect, useId, useRef } from 'react';
import { classNames, focusElement } from '../../lib/react-helpers';
import { useDisableBodyScroll, useEscKeyDown, useFocusTrap, useMountTransition } from '../../hooks';
import { Portal } from '../portal';
import { DialogContextProvider } from './dialog-context';

type DialogHTMLProps = ComponentPropsWithoutRef<'section'>;
export type DialogWidth = 'sm' | 'md' | 'lg';
export type DialogProps = {
  width?: DialogWidth;
  openFocusRef?: RefObject<HTMLElement>;
  closeFocusRef?: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
} & DialogHTMLProps;

export function Dialog({
  width = 'md',
  isOpen = false,
  openFocusRef,
  closeFocusRef,
  onClose,
  className,
  children,
  ...props
}: DialogProps) {
  const defaultId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const durationMs = 200;
  const { isMounted, className: transitionClass } = useMountTransition({
    durationMs,
    isShown: isOpen,
    enterFrom: 'dc-dialog_closed',
    enterTo: 'dc-dialog_opened',
  });

  useEffect(() => {
    if (isOpen) {
      const openFocus = openFocusRef?.current;
      const closeFocus = closeFocusRef?.current;

      focusElement(openFocus);
      return () => focusElement(closeFocus);
    }
  }, [isOpen, openFocusRef, closeFocusRef]);

  useEscKeyDown(() => {
    onClose();
  }, { isEnabled: isOpen });

  useFocusTrap(dialogRef, { isEnabled: isOpen });

  useDisableBodyScroll({ isEnabled: isOpen });

  if (!isOpen && !isMounted) {
    return null;
  }

  const id = props.id || defaultId;
  const titleId = `dialog-title-${id}`;
  const descriptionId = `dialog-description-${id}`;
  return (
    <Portal>
      <div
        style={{
          '--dc-dialog-transition-duration': `${durationMs}ms`,
        } as CSSProperties}
        className={classNames('dc-dialog', transitionClass)}
      >
        <div className="dc-dialog-backdrop" />
        <div
          {...props}
          ref={dialogRef}
          className={classNames(className, {
            'dc-dialog-modal': true,
            [`dc-dialog-modal_${width}`]: width,
          })}
          role="dialog"
          id={id}
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
