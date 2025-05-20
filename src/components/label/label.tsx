import { type ComponentProps } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type LabelHTMLProps = ComponentProps<'label'>;

type LabelBaseProps = {
  required?: boolean;
};

export type LabelProps =
  & LabelBaseProps
  & Omit<LabelHTMLProps, keyof LabelBaseProps>;

export function Label({
  required = false,
  className = '',
  children,
  ...props
}: LabelProps) {
  return (
    <label
      {...props}
      className={classNames(className, {
        'dc-label': true,
        'dc-label_required': required,
      })}
    >
      {children}
    </label>
  );
}
