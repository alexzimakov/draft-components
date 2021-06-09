import { classNames } from '../../lib/react-helpers';
import { FormattedContent } from '../formatted-content';
import type { ComponentPropsWithoutRef } from 'react';

export interface LabelProps extends ComponentPropsWithoutRef<'label'> {
  isRequired?: boolean;
}

export function Label({
  isRequired,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      {...props}
      className={classNames(
        className,
        FormattedContent.CSSClasses.subheadline,
        'dc-label',
        { 'dc-label_required': isRequired }
      )}
    >
      {children}
    </label>
  );
}
