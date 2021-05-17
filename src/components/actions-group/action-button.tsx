import * as React from 'react';
import { Button, ButtonProps } from '../button';
import { classNames } from '../../lib';

export type ActionButtonBaseProps = Omit<
  ButtonProps,
  'leadingIcon' | 'trailingIcon' | 'appearance' | 'isLoading'
>;

export interface ActionButtonProps extends ActionButtonBaseProps {
  title: string;
  icon: JSX.Element;
}

export function ActionButton({
  className,
  noPadding = true,
  icon,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      {...props}
      className={classNames(className, 'dc-actions-group__btn')}
      noPadding={noPadding}
      leadingIcon={icon}
      appearance="minimal"
    />
  );
}
