import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { classNames } from '../../lib/react-helpers';

export function TableContainer({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  const [isScrollable, setIsScrollable] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
