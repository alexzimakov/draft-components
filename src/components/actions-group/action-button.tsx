import * as React from 'react';
import { IconButton, IconButtonProps } from '../icon-button';
import { classNames } from '../../lib';

export type ActionButtonBaseProps = Omit<
  IconButtonProps,
  'icon' | 'appearance' | 'isLoading'
>;

export interface ActionButtonProps extends ActionButtonBaseProps {
  title: string;
  icon: JSX.Element;
}

export function ActionButton({ className, ...props }: ActionButtonProps) {
  return (
    <IconButton
      {...props}
      className={classNames(className, 'dc-actions-group__btn')}
    />
  );
}
