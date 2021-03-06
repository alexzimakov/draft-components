import { classNames } from '../../lib/react-helpers';
import { FormattedContent } from '../formatted-content';
import { SvgIcon } from '../svg-icon';
import { exclamationCircleFill } from '../../icons/exclamation-circle-fill';
import { exclamationTriangleFill } from '../../icons/exclamation-triangle-fill';
import { checkCircleFill } from '../../icons/check-circle-fill';
import { infoCircleFill } from '../../icons/info-circle-fill';
import type { ComponentPropsWithoutRef } from 'react';
import type { Icon } from '../svg-icon';

export interface InlineMessageProps extends ComponentPropsWithoutRef<'small'> {
  appearance?: 'default' | 'warning' | 'error' | 'info' | 'success';
  shouldShowIcon?: boolean;
}

const inlineMessageIcons: Record<
  NonNullable<InlineMessageProps['appearance']>,
  Icon
> = {
  error: exclamationCircleFill,
  warning: exclamationTriangleFill,
  success: checkCircleFill,
  info: infoCircleFill,
  default: infoCircleFill,
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
