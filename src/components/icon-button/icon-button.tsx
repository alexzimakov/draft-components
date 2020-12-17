import * as React from 'react';
import { Button, ButtonProps } from '../button';
import { CloseIcon, MinusIcon } from './default-icons';
import { classNames } from '../../lib/class-names';

export type IconButtonProps = {
  icon: 'close' | 'minus' | React.ReactNode;
  isRounded?: boolean;
} & Omit<
  ButtonProps,
  'hasFullWidth' | 'leadingIcon' | 'trailingIcon' | 'children'
>;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { isRounded, className, type = 'button', icon, ...props },
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
  }
);
