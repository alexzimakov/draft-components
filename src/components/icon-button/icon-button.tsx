import * as React from 'react';
import { ComponentWithForwardRef } from '../../common-types';
import { Button, ButtonProps } from '../button';
import { CloseIcon, MinusIcon } from './default-icons';
import { classNames } from '../../lib';

export type IconButtonProps = {
  icon: 'close' | 'minus' | React.ReactNode;
  isRounded?: boolean;
} & Omit<
  ButtonProps,
  'hasFullWidth' | 'leadingIcon' | 'trailingIcon' | 'children'
>;

export const IconButton: ComponentWithForwardRef<
  HTMLButtonElement,
  IconButtonProps
> = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    appearance = 'minimal',
    isRounded,
    icon,
    className,
    type = 'button',
    ...props
  },
  ref
) {
  return (
    <Button
      {...props}
      className={classNames(className, 'dc-icon-button', {
        'dc-icon-button_rounded': isRounded,
      })}
      ref={ref}
      type={type}
      appearance={appearance}
    >
      {(function () {
        if (icon === 'close') {
          return <CloseIcon />;
        }
        if (icon === 'minus') {
          return <MinusIcon />;
        }
        return icon;
      })()}
    </Button>
  );
});
