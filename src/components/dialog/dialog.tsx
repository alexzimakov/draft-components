import { useRef } from 'react';
import { noop } from '../../lib/util';
import { classNames } from '../../lib/react-helpers';
import { useCaptureFocus } from '../../hooks/use-capture-focus';
import { useCloseOnEscPress } from '../../hooks/use-close-on-esc-press';
import { useDisableBodyScroll } from '../../hooks/use-disable-body-scroll';
import { Portal } from '../portal';
import { Box } from '../box';
import { Button } from '../button';
import { Headline, FormattedContent } from '../formatted-content';
import { SvgIcon } from '../svg-icon';
import { xLg } from '../../icons/x-lg';
import type {
  ReactNode,
  MutableRefObject,
  ComponentPropsWithoutRef,
} from 'react';

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

export function Dialog({
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
  style,
  className,
  ...props
}: DialogProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useDisableBodyScroll(isOpen);

  useCloseOnEscPress(onClose, isOpen);

  useCaptureFocus({
    isEnabled: isOpen,
    modalRef: dialogRef,
    focusAfterCaptureRef: focusElementRefAfterOpen,
    focusAfterReleaseRef: focusElementRefAfterClose,
  });

  if (!isOpen) {
    return null;
  }

  const labelId = '';
  const descriptionId = '';
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
          style={{ ...style, width: getDialogWidth(width) }}
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
                {heading && (
                  <Headline id={labelId} as="h2">
                    {heading}
                  </Headline>
                )}

                {description && (
                  <div
                    id={descriptionId}
                    className={classNames(
                      'dc-dialog__description',
                      FormattedContent.CSSClasses.subheadline
                    )}
                  >
                    {description}
                  </div>
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
                leadingIcon={<SvgIcon icon={xLg} />}
                onClick={onClose}
              />
            )}
          </div>
          <div className="dc-dialog__content">{children}</div>
          {actions ? <div className="dc-dialog__actions">{actions}</div> : null}
        </Box>
        <div tabIndex={0} />
      </div>
    </Portal>
  );
}

function getDialogWidth(width: DialogProps['width']): string {
  if (typeof width === 'number' && width > 0) {
    return `${(width / 16).toFixed(5)}rem`;
  }
  if (width === 'sm') {
    return '20rem';
  }
  if (width === 'lg') {
    return '60rem';
  }
  return '40rem';
}
