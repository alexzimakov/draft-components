import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Styles } from '../formatted-content';

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
        Styles.subheadline,
        'dc-label',
        isRequired && 'dc-label_required'
      )}
    >
      {children}
    </label>
  );
}
