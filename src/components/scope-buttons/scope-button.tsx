import * as React from 'react';
import { Button, ButtonProps } from '../button';

export interface ScopeButtonProps extends Omit<ButtonProps, 'appearance'> {
  isActive?: boolean;
}

export function ScopeButton({
  isActive,
  type = 'button',
  children,
  ...props
}: ScopeButtonProps) {
  return (
    <Button
      {...props}
      type={type}
      appearance={isActive ? 'secondary' : 'minimal'}
    >
      {children}
    </Button>
  );
}
