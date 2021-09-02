import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { ActionButton } from './action-button';

export type ActionsGroupHtmlAttrs = ComponentPropsWithoutRef<'div'>;

export interface ActionsGroupProps extends ActionsGroupHtmlAttrs {}

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
