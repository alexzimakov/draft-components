import * as React from 'react';
import { Button, ButtonProps } from '../button';
import { SvgIcon } from '../svg-icon';
import { classNames } from '../../lib';

export type IconButtonBaseProps = Omit<
  ButtonProps,
  'hasFullWidth' | 'leadingIcon' | 'trailingIcon' | 'children'
>;

export interface IconButtonProps extends IconButtonBaseProps {
  icon: 'delete' | 'minus' | React.ReactNode;
  isRounded?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
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
          if (icon === 'delete') {
            return <SvgIcon icon="delete" data-testid="icon-button-delete" />;
          }
          if (icon === 'minus') {
            return <SvgIcon icon="minus" data-testid="icon-button-minus" />;
          }
          return icon;
        })()}
      </Button>
    );
  }
);
