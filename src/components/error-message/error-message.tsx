import * as React from 'react';
import { SvgIcon } from '../svg-icon';
import { errorIcon } from '../svg-icon/icons/error';
import { classNames } from '../../lib';

export interface ErrorMessageProps
  extends React.ComponentPropsWithoutRef<'span'> {
  shouldShowIcon?: boolean;
}

export function ErrorMessage({
  shouldShowIcon = true,
  className,
  children,
  ...props
}: ErrorMessageProps) {
  return (
    <span {...props} className={classNames(className, 'dc-error-message')}>
      {shouldShowIcon ? (
        <SvgIcon
          className="dc-error-message__icon"
          icon={errorIcon}
          size="1rem"
          data-testid="error-message-icon"
        />
      ) : null}
      {children}
    </span>
  );
}
