import { ComponentPropsWithRef, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export type LabelProps = ComponentPropsWithRef<'label'> & {
  required?: boolean;
};

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label({
  required = false,
  className = '',
  children,
  ...props
}, ref) {
  return (
    <label
      {...props}
      ref={ref}
      className={classNames(className, 'dc-label', {
        'dc-label_required': required,
      })}
    >
      {children}
    </label>
  );
});
