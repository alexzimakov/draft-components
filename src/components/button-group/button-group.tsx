import { ComponentProps, JSX } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type ButtonGroupHTMLProps = ComponentProps<'div'>;

type ButtonGroupBaseProps = {
  children: JSX.Element | JSX.Element[];
};

export type ButtonGroupProps =
  & ButtonGroupBaseProps
  & Omit<ButtonGroupHTMLProps, keyof ButtonGroupBaseProps>;

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
