import * as React from 'react';
import { classNames } from '../../lib';
import { FormattedContent } from '../formatted-content';

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
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
        FormattedContent.styles.subheadline,
        'dc-label',
        { 'dc-label_required': isRequired }
      )}
    >
      {children}
    </label>
  );
}
