import { ComponentProps, forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type LabelHTMLProps = ComponentProps<'label'>;

type LabelBaseProps = {
  required?: boolean;
};

export type LabelProps =
  & LabelBaseProps
  & Omit<LabelHTMLProps, keyof LabelBaseProps>;

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
      className={classNames(className, {
        'dc-label': true,
        'dc-label_required': required,
      })}
    >
      {children}
    </label>
  );
});
