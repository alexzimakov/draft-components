import {
  cloneElement,
  ComponentPropsWithoutRef,
  isValidElement,
  MouseEvent,
  ReactNode,
  RefCallback,
  useCallback,
  useRef,
  useState,
} from 'react';
import { uniqueId } from '../../lib/util';
import { isFunction } from '../../lib/guards';
import { classNames, mergeRefs } from '../../lib/react-helpers';
import { useCloseTransition } from '../../hooks/use-close-transition';
import { Positioner } from '../positioner';
import { Alignment, Placement } from '../positioner/types';

type RenderFn = (props: {
  setRef: RefCallback<HTMLElement>;
  tooltipId: string;
  hideTooltip(): void;
  showTooltip(): void;
}) => ReactNode;

export type TooltipProps = {
  placement?: Placement;
  alignment?: Alignment;
  anchorGap?: number;
  label: ReactNode;
  children: RenderFn | ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export function Tooltip({
  id = uniqueId('dc_tooltip_'),
  className,
  placement = 'top',
  alignment = 'center',
  anchorGap = 8,
  label,
  children,
  ...props
}: TooltipProps) {
  const tooltipId = useRef(id);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isShown, setIsShown] = useState(false);
  const { isMounted, transitionClassName } = useCloseTransition({
    isOpen: isShown,
    closeDurationMs: 150,
    className: 'dc-tooltip_fade-transition',
    openClassName: 'dc-tooltip_show',
  });

  const showTooltip = useCallback(() => {
    setIsShown(true);
  }, []);

  const hideTooltip = useCallback(() => {
    setIsShown(false);
  }, []);

  return (
    <Positioner
      placement={placement}
      alignment={alignment}
      anchorGap={anchorGap}
      renderAnchor={({ setRef }) => {
        if (isFunction(children)) {
          return children({
            setRef,
            showTooltip,
            hideTooltip,
            tooltipId: tooltipId.current,
          });
        }

        if (isValidElement(children)) {
          return cloneElement(children, {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            ref: mergeRefs(setRef, (children as any).ref),
            onMouseEnter: (event: MouseEvent): void => {
              const onMouseEnter = children.props.onMouseEnter;
              isFunction(onMouseEnter) && onMouseEnter(event);
              showTooltip();
            },
            onMouseLeave: (event: MouseEvent): void => {
              const onMouseLeave = children.props.onMouseLeave;
              isFunction(onMouseLeave) && onMouseLeave(event);
              hideTooltip();
            },
            'aria-labelledby': tooltipId.current,
          });
        }

        return (
          <span
            ref={setRef}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
          >
            {children}
          </span>
        );
      }}
      renderContent={({ style, setRef }) => {
        if (isMounted) {
          return (
            <div ref={setRef} style={style} className="dc-tooltip-container">
              <div
                {...props}
                ref={tooltipRef}
                id={tooltipId.current}
                className={classNames(
                  'dc-tooltip',
                  transitionClassName,
                  className
                )}
                role="tooltip"
              >
                {label}
              </div>
            </div>
          );
        }
      }}
    />
  );
}
