import React from 'react';
import { StyledButton } from './button-styles';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    return <StyledButton ref={ref} {...props} />;
  }
);
