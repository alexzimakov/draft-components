import {
  ComponentPropsWithRef,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames, mergeRefs } from '../../lib/react-helpers';

export type TableContainerProps = ComponentPropsWithRef<'div'>;

export const TableContainer = forwardRef<HTMLDivElement, TableContainerProps>(
  function TableContainer({ className, children, ...props }, ref) {
    const [isScrollable, setIsScrollable] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const containerEl = containerRef.current;
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
        ref={mergeRefs(containerRef, ref)}
        className={classNames(className, 'dc-table-container')}
      >
        {children}
      </div>
    );
  }
);
