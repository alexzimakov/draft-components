import * as React from 'react';
import { classNames } from '../../lib/react-helpers';
import { ScopeButton } from './scope-button';

export interface ScopeButtonsProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export function ScopeButtons({
  className,
  children,
  onKeyDown,
  ...props
}: ScopeButtonsProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [overflowed, setOverflowed] = React.useState(false);

  React.useEffect(() => {
    const container = containerRef.current;
    if (container && 'ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(() => {
        setOverflowed(container.scrollWidth > container.clientWidth);
      });

      resizeObserver.observe(container);
      return () => {
        resizeObserver.unobserve(container);
      };
    }
  }, []);

  return (
    <div
      {...props}
      ref={containerRef}
      className={classNames(className, 'dc-scope-buttons', {
        'dc-scope-buttons_bottom-pad': overflowed,
      })}
      role="group"
    >
      {children}
    </div>
  );
}

ScopeButtons.Button = ScopeButton;
