import {
  cloneElement,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type ComponentPropsWithoutRef,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
  type RefCallback,
} from 'react';
import {
  classNames,
  isReactElementWithRef,
  mergeRefs,
} from '../../lib/react-helpers';
import { useMountTransition } from '../../hooks';
import {
  Positioner,
  type PositionerProps,
  type RenderAnchorFn,
  type RenderContentFn,
} from '../positioner';

type TooltipBaseProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>;

type TooltipChildrenRenderFn = (props: {
  setRef: RefCallback<HTMLElement>;
  tooltipId: string;
  hideTooltip: () => void;
  showTooltip: () => void;
}) => ReactNode;

export type TooltipPlacement = PositionerProps['placement'];
export type TooltipAlignment = PositionerProps['alignment'];
export type TooltipProps = {
  anchorGap?: number;
  placement?: TooltipPlacement;
  alignment?: TooltipAlignment;
  isDefaultShown?: boolean;
  isShown?: boolean;
  content: ReactNode;
  children: ReactNode | TooltipChildrenRenderFn;
} & TooltipBaseProps;

export function Tooltip({
  isDefaultShown,
  isShown,
  anchorGap = 8,
  placement = 'top',
  alignment = 'center',
  id,
  style,
  className,
  content,
  children,
  ...props
}: TooltipProps) {
  const [defaultShow, setDefaultShow] = useState(isDefaultShown ?? false);
  const defaultId = useId();
  const tooltipId = id || defaultId;
  const show = isShown ?? defaultShow;
  const durationMs = 100;
  const { isMounted, className: transitionClass } = useMountTransition({
    show,
    durationMs,
    enterFrom: 'dc-tooltip_hidden',
    enterTo: 'dc-tooltip_visible',
  });

  const { showTooltip, hideTooltip } = useMemo(() => ({
    showTooltip: () => setDefaultShow(true),
    hideTooltip: () => setDefaultShow(false),
  }), []);

  const renderAnchor: RenderAnchorFn = ({ setRef }) => {
    if (typeof children === 'function') {
      return children({
        setRef,
        tooltipId,
        showTooltip,
        hideTooltip,
      });
    }

    if (isReactElementWithRef(children)) {
      const props = children.props;
      return cloneElement(children, {
        ref: mergeRefs(setRef, children.ref),
        onFocus: (event: FocusEvent) => {
          showTooltip();
          props.onFocus?.(event);
        },
        onBlur: (event: FocusEvent) => {
          hideTooltip();
          props.onBlur?.(event);
        },
        onMouseEnter: (event: MouseEvent) => {
          showTooltip();
          props.onMouseEnter?.(event);
        },
        onMouseLeave: (event: MouseEvent) => {
          hideTooltip();
          props.onMouseLeave?.(event);
        },
        'aria-describedby': props['aria-describedby'] || tooltipId,
      });
    }

    return children;
  };

  const renderContent: RenderContentFn = ({
    setRef: portalRef,
    style: portalStyle,
    className: portalClass,
  }) => {
    if (show || isMounted) {
      return (
        <div
          {...props}
          ref={portalRef}
          id={tooltipId}
          style={{
            '--dc-tooltip-transition-duration': `${durationMs}ms`,
            ...portalStyle,
            ...style,
          } as CSSProperties}
          className={classNames(
            'dc-tooltip',
            transitionClass,
            portalClass,
            className
          )}
          role="tooltip"
        >
          {content}
        </div>
      );
    }
  };

  return (
    <Positioner
      placement={placement}
      alignment={alignment}
      anchorGap={anchorGap}
      renderAnchor={renderAnchor}
      renderContent={renderContent}
    />
  );
}
