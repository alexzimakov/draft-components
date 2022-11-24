import { forwardRef } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Button, ButtonProps } from '../button';

export interface ScopeButtonProps extends Omit<ButtonProps, 'appearance'> {
  isActive?: boolean;
}

export const ScopeButton = forwardRef<HTMLButtonElement, ScopeButtonProps>(
  function ScopeButton({ isActive, className, children, ...props }, ref) {
    return (
      <Button
        {...props}
        ref={ref}
        className={classNames(className, 'dc-scope-button')}
        variant={isActive ? 'tinted' : 'plain'}
      >
        {children}
      </Button>
    );
  }
);
