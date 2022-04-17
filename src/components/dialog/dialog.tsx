import {
  ComponentPropsWithoutRef,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { useDisableBodyScroll } from '../../hooks/use-disable-body-scroll';
import { useEscKeyDown } from '../../hooks/use-esc-key-down';
import { useFocusTrap } from '../../hooks/use-focus-trap';
import { Portal } from '../portal';
import { Box } from '../box';
import { Button } from '../button';
import { Headline, Subheadline } from '../formatted-content';
import { SvgIcon } from '../svg-icon';
import { x as close } from '../../bootstrap-icons/x';
import { useCloseAnimation } from '../../hooks';

export type DialogProps = {
  /**
   * A ref to an element that should receive focus after open.
   */
  focusAfterOpen?: RefObject<HTMLElement>;
  /**
   * A ref to an element that should receive focus after close.
   */
  focusAfterClose?: RefObject<HTMLElement>;
  isOpen?: boolean;
  showCloseButton?: boolean;
  width?: 'sm' | 'md' | 'lg' | number;
  heading?: ReactNode;
  description?: ReactNode;
  footerButtons?: ReactNode;
  onClose?(): void;
} & ComponentPropsWithoutRef<'div'>;

const DIALOG_WIDTH = {
  sm: 320,
  md: 640,
  lg: 960,
};

export function Dialog({
  style,
  className,
  isOpen = false,
  showCloseButton = true,
  focusAfterOpen,
  focusAfterClose,
  width = 'md',
  heading,
  description,
  footerButtons,
  children,
  onClose,
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const { shouldRender, animationClassName } = useCloseAnimation({
    isOpen,
    closeDurationMs: 200,
    className: 'dc-dialog-container_with-animation',
    openClassName: 'dc-dialog-container_open',
    closingClassName: 'dc-dialog-container_closing',
  });

  useDisableBodyScroll(isOpen);

  useEscKeyDown(() => isFunction(onClose) && onClose(), isOpen);

  useFocusTrap(dialogRef, isOpen);

  useEffect(() => {
    if (shouldRender) {
      if (focusAfterOpen?.current) {
        focusAfterOpen.current.focus();
      }
    } else {
      if (focusAfterClose?.current) {
        focusAfterClose.current.focus();
      }
    }
  }, [shouldRender, focusAfterOpen, focusAfterClose]);

  if (!shouldRender) {
    return null;
  }

  let widthPx: number;
  if (typeof width === 'string') {
    widthPx = DIALOG_WIDTH[width] || DIALOG_WIDTH.md;
  } else {
    widthPx = width || DIALOG_WIDTH.md;
  }
  return (
    <Portal>
      <div
        data-testid="dialog-container"
        className={classNames('dc-dialog-container', animationClassName)}
      >
        <Box
          {...props}
          ref={dialogRef}
          style={{ ...style, width: widthPx }}
          className={classNames(className, 'dc-dialog')}
          aria-modal={true}
          role="dialog"
          padding="none"
          elevation="lg"
          borderRadius="lg"
        >
          <div className="dc-dialog__header">
            {Boolean(heading || description) && (
              <div className="dc-dialog__header-content">
                {heading && <Headline as="h2">{heading}</Headline>}
                {description && (
                  <Subheadline as="div" className="dc-dialog__description">
                    {description}
                  </Subheadline>
                )}
              </div>
            )}

            {showCloseButton && (
              <Button
                className="dc-dialog__close-btn"
                size="sm"
                noPadding={true}
                appearance="minimal"
                data-testid="dialog-close-button"
                leadingIcon={<SvgIcon size="2x" icon={close} />}
                onClick={onClose}
              />
            )}
          </div>

          <div className="dc-dialog__content">{children}</div>

          {footerButtons && (
            <div className="dc-dialog__actions">{footerButtons}</div>
          )}
        </Box>
      </div>
    </Portal>
  );
}
