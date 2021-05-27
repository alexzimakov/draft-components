import * as React from 'react';
import { classNames } from '../../lib/react-helpers';

export function TableContainer({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [isScrollable, setIsScrollable] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const containerEl = ref.current;
    if (!containerEl) {
      return;
    }

    const updateTabIndex = () => {
      setIsScrollable(containerEl.scrollWidth > containerEl.clientWidth);
    };
    updateTabIndex();

    window.addEventListener('resize', updateTabIndex);
    return () => {
      window.removeEventListener('resize', updateTabIndex);
    };
  }, []);

  return (
    <div
      tabIndex={isScrollable ? 0 : undefined}
      role="group"
      {...props}
      ref={ref}
      className={classNames(className, 'dc-table-container')}
    >
      {children}
    </div>
  );
}
