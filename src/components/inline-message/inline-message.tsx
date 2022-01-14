import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Footnote } from '../formatted-content';
import { Icon, SvgIcon } from '../svg-icon';
import { exclamationCircleFill } from '../../bootstrap-icons/exclamation-circle-fill';
import { exclamationTriangleFill } from '../../bootstrap-icons/exclamation-triangle-fill';
import { checkCircleFill } from '../../bootstrap-icons/check-circle-fill';
import { infoCircleFill } from '../../bootstrap-icons/info-circle-fill';

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
    <Footnote
      {...props}
      className={classNames(
        className,
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
    </Footnote>
  );
}
