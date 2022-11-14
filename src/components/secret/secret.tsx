import { ComponentPropsWithoutRef, ReactNode, useState } from 'react';
import { isFunction } from '../../lib/guards';
import { classNames } from '../../lib/react-helpers';
import { Button } from '../Button';

export interface SecretProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  showButtonLabel: ReactNode;
  hideButtonLabel: ReactNode;
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
  const [isShown, setIsShown] = useState(defaultIsShown);
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
