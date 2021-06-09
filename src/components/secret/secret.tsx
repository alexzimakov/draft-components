import * as React from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { Button } from '../button';

export interface SecretProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange'> {
  showButtonLabel: React.ReactNode;
  hideButtonLabel: React.ReactNode;
  defaultIsShown?: boolean;
  onChange?(isShown: boolean): void;
}

export function Secret({
  showButtonLabel,
  hideButtonLabel,
  defaultIsShown = false,
  onChange,
  className,
  children,
  ...props
}: SecretProps) {
  const [isShown, setIsShown] = React.useState(defaultIsShown);
  return (
    <div
      {...props}
      className={classNames(className, 'dc-secret', {
        'dc-secret_shown': isShown,
      })}
    >
      <div
        style={isShown ? undefined : { opacity: 0.3, filter: 'blur(4px)' }}
        className="dc-secret__content"
        aria-hidden={!isShown}
      >
        {children}
      </div>
      <Button
        className="dc-secret__btn"
        size="sm"
        type="button"
        onClick={() => {
          setIsShown(!isShown);
          isFunction(onChange) && onChange(!isShown);
        }}
      >
        {isShown ? hideButtonLabel : showButtonLabel}
      </Button>
    </div>
  );
}
