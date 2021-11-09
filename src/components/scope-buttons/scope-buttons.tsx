import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { classNames } from '../../lib/react-helpers';
import { ScopeButton } from './scope-button';

export type ScopeButtonsProps = ComponentPropsWithoutRef<'div'>

export function ScopeButtons({
  className,
  children,
  ...props
}: ScopeButtonsProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (container && 'ResizeObserver' in window) {
      const resizeObserver = new ResizeObserver(() => {
        setHasScroll(container.scrollWidth > container.clientWidth);
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
      className={classNames(
        className,
        'dc-scope-buttons',
        hasScroll && 'dc-scope-buttons_bottom-pad',
      )}
      role="group"
    >
      {children}
    </div>
  );
}

ScopeButtons.Button = ScopeButton;
