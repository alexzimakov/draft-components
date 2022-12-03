import { type ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type ButtonGroupBaseProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>;
export type ButtonGroupProps = ButtonGroupBaseProps & {
  children: JSX.Element | JSX.Element[];
};

export function ButtonGroup({
  className,
  children,
  ...props
}: ButtonGroupProps) {
  return (
    <div {...props} className={classNames(className, 'dc-button-group')}>
      {children}
    </div>
  );
}
