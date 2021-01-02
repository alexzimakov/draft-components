import * as React from 'react';
import { ActionButton } from './action-button';
import { classNames } from '../../lib';

export type ActionsGroupHtmlAttrs = React.ComponentPropsWithoutRef<'div'>;

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
