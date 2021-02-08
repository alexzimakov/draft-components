import * as React from 'react';
import { ScopeButton } from './scope-button';
import { classNames } from '../../lib';

export interface ScopeButtonsProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export function ScopeButtons({
  className,
  children,
  ...props
}: ScopeButtonsProps) {
  return (
    <div
      {...props}
      role="group"
      className={classNames(className, 'dc-scope-buttons')}
    >
      {children}
    </div>
  );
}

ScopeButtons.Button = ScopeButton;
