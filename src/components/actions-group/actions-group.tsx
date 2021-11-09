import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { ActionButton } from './action-button';

export type ActionsGroupProps = ComponentPropsWithoutRef<'div'>;

export function ActionsGroup({ className, ...props }: ActionsGroupProps) {
  return (
    <div
      {...props}
      className={classNames(className, 'dc-actions-group')}
      role="group"
    />
  );
}

ActionsGroup.Button = ActionButton;
