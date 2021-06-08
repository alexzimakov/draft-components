import * as React from 'react';
import { classNames } from '../../lib/react-helpers';
import { Button, ButtonProps } from '../button';

export interface ScopeButtonProps extends Omit<ButtonProps, 'appearance'> {
  isActive?: boolean;
}

export const ScopeButton = React.forwardRef<
  HTMLButtonElement,
  ScopeButtonProps
>(function ScopeButton({ isActive, className, children, ...props }, ref) {
  return (
    <Button
      ref={ref}
      type="button"
      className={classNames(className, 'dc-scope-button')}
      {...props}
      appearance={isActive ? 'secondary' : 'minimal'}
    >
      {children}
    </Button>
  );
});
