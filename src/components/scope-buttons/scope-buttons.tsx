import * as React from 'react';
import { classNames } from '../../lib/react-helpers';
import { ScopeButton } from './scope-button';

export interface ScopeButtonsProps
  extends React.ComponentPropsWithoutRef<'div'> {}

export function ScopeButtons({
  className,
  children,
  ...props
}: ScopeButtonsProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const reel = ref.current;
    if (reel == null) {
      return;
    }

    const handleReelResize = (entries: { target: Node }[]) => {
      const target = entries[0]?.target;
      if (target instanceof HTMLElement) {
        target.classList.toggle(
          'dc-scope-buttons_overflowing',
          target.scrollWidth > target.clientWidth
        );
      }
    };
    if ('ResizeObserver' in window) {
      new ResizeObserver(handleReelResize).observe(reel);
    }
    if ('MutationObserver' in window) {
      new MutationObserver(handleReelResize).observe(reel, { childList: true });
    }
  }, []);

  return (
    <div
      {...props}
      ref={ref}
      className={classNames(className, 'dc-scope-buttons')}
      role="group"
    >
      {children}
    </div>
  );
}

ScopeButtons.Button = ScopeButton;
