import * as React from 'react';
import { FormattedContent } from '../formatted-content';
import { classNames } from '../../lib';
import { Icon, SvgIcon } from '../svg-icon';
import { errorIcon } from '../svg-icon/icons/error';
import { warningIcon } from '../svg-icon/icons/warning';
import { successIcon } from '../svg-icon/icons/success';
import { infoIcon } from '../svg-icon/icons/info';

export interface InlineMessageProps
  extends React.ComponentPropsWithoutRef<'small'> {
  appearance?: 'default' | 'warning' | 'error' | 'info' | 'success';
  shouldShowIcon?: boolean;
}

const inlineMessageIcons: Record<
  NonNullable<InlineMessageProps['appearance']>,
  Icon
> = {
  error: errorIcon,
  warning: warningIcon,
  success: successIcon,
  info: infoIcon,
  default: infoIcon,
};

export function InlineMessage({
  appearance = 'default',
  shouldShowIcon = false,
  className,
  children,
  ...props
}: InlineMessageProps) {
  return (
    <small
      {...props}
      className={classNames(
        className,
        FormattedContent.CSSClasses.footnote,
        'dc-inline-message',
        `dc-inline-message_${appearance}`
      )}
    >
      {shouldShowIcon ? (
        <SvgIcon
          className="dc-inline-message__icon"
          data-testid="inline-message-icon"
          icon={inlineMessageIcons[appearance] ?? inlineMessageIcons.default}
          width={16}
          height={16}
        />
      ) : null}
      {children}
    </small>
  );
}
