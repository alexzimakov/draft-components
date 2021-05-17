// noinspection ES6PreferShortImport

import * as React from 'react';
import { util, classNames } from '../../lib';
import {
  useCaptureFocus,
  useCloseOnEscPress,
  useDisableBodyScroll,
} from '../../hooks';
import { Portal } from '../portal';
import { Box } from '../box';
import { Button } from '../button';
import { Headline, FormattedContent } from '../formatted-content';
import { SvgIcon } from '../svg-icon';
import { xLg } from '../../icons/x-lg';

export interface DialogProps extends React.ComponentPropsWithRef<'div'> {
  isOpen?: boolean;
  onClose?: () => void;
  shouldShowCloseButton?: boolean;
  focusElementRefAfterOpen?: React.MutableRefObject<Element | null>;
  focusElementRefAfterClose?: React.MutableRefObject<Element | null>;
  width?: 'sm' | 'md' | 'lg' | number;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
}

export function Dialog({
  isOpen,
  onClose = util.noop,
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
  const dialogRef = React.useRef<HTMLDivElement | null>(null);

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
