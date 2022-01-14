import {
  ComponentPropsWithoutRef,
  MutableRefObject,
  ReactNode,
  useRef,
} from 'react';
import { noop } from '../../lib/util';
import { classNames } from '../../lib/react-helpers';
import { useCaptureFocus } from '../../hooks/use-capture-focus';
import { useCloseOnEscPress } from '../../hooks/use-close-on-esc-press';
import { useDisableBodyScroll } from '../../hooks/use-disable-body-scroll';
import { Portal } from '../portal';
import { Box } from '../box';
import { Button } from '../button';
import { Headline, Subheadline } from '../formatted-content';
import { SvgIcon } from '../svg-icon';
import { x } from '../../bootstrap-icons/x';

export interface DialogProps extends ComponentPropsWithoutRef<'div'> {
  isOpen?: boolean;
  onClose?: () => void;
  shouldShowCloseButton?: boolean;
  focusElementRefAfterOpen?: MutableRefObject<Element | null>;
  focusElementRefAfterClose?: MutableRefObject<Element | null>;
  width?: 'sm' | 'md' | 'lg' | number;
  heading?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}

const dialogWidths = {
  sm: 320,
  md: 640,
  lg: 960,
};

const closeIcon = <SvgIcon size="2x" icon={x} />;

export function Dialog({
  style,
  className,
  isOpen,
  onClose = noop,
  shouldShowCloseButton = true,
  focusElementRefAfterOpen,
  focusElementRefAfterClose,
  width = 'md',
  heading,
  description,
  children,
  actions,
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const widthInPx =
    (typeof width === 'string' ? dialogWidths[width] : width) ||
    dialogWidths.md;

  useDisableBodyScroll(isOpen);

  useCloseOnEscPress(onClose, isOpen);

  useCaptureFocus({
    isEnabled: isOpen,
    modalRef: dialogRef,
    focusElementRefAfterCapture: focusElementRefAfterOpen,
    focusElementRefAfterRelease: focusElementRefAfterClose,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div
        data-testid="dialog-container"
        className="dc-dialog-container"
        onClick={(event) => {
          if (!dialogRef.current?.contains(event.target as Node)) {
            onClose();
          }
        }}
      >
        <div tabIndex={0} />
        <Box
          {...props}
          ref={dialogRef}
          style={{ ...style, width: widthInPx }}
          className={classNames(className, 'dc-dialog')}
          borderRadius="lg"
          padding="none"
          elevation="lg"
          role="dialog"
          aria-modal={true}
        >
          <div className="dc-dialog__header">
            {(heading || description) && (
              <div className="dc-dialog__header-content">
                {heading && <Headline as="h2">{heading}</Headline>}
                {description && (
                  <Subheadline as="div" className="dc-dialog__description">
                    {description}
                  </Subheadline>
                )}
              </div>
            )}

            {shouldShowCloseButton && (
              <Button
                data-testid="dialog-close-button"
                className="dc-dialog__close-btn"
                appearance="minimal"
                size="sm"
                noPadding={true}
                leadingIcon={closeIcon}
                onClick={onClose}
              />
            )}
          </div>

          <div className="dc-dialog__content">{children}</div>

          {actions && <div className="dc-dialog__actions">{actions}</div>}
        </Box>
        <div tabIndex={0} />
      </div>
    </Portal>
  );
}
