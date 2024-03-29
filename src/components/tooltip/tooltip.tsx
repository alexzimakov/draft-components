import {
  CSSProperties,
  ComponentPropsWithoutRef,
  FocusEvent,
  MouseEvent,
  ReactNode,
  RefCallback,
  cloneElement,
  useId,
  useMemo,
  useState,
} from 'react';
import { classNames, isReactElementWithRef, mergeRefs } from '../../lib/react-helpers.js';
import { useMountTransition } from '../../hooks/index.js';
import { Positioner, PositionerAnchorRenderFn, PositionerContentRenderFn, PositionerProps } from '../positioner/index.js';

type TooltipChildrenRenderFn = (
  props: { ref: RefCallback<HTMLElement> },
  context: {
    isShown: boolean;
    tooltipId: string;
    hideTooltip: () => void;
    showTooltip: () => void;
  }
) => ReactNode;

type TooltipHTMLProps = ComponentPropsWithoutRef<'div'>;
type TooltipBaseProps = Omit<TooltipHTMLProps, 'children' | 'content'>;
export type TooltipPlacement = PositionerProps['placement'];
export type TooltipAlignment = PositionerProps['alignment'];
export type TooltipProps = {
  htmlContent?: TooltipHTMLProps['content'];
  anchorGap?: number;
  placement?: TooltipPlacement;
  alignment?: TooltipAlignment;
  defaultIsShown?: boolean;
  isShown?: boolean;
  content: ReactNode;
  children: ReactNode | TooltipChildrenRenderFn;
} & TooltipBaseProps;

export function Tooltip({
  anchorGap = 8,
  placement = 'top',
  alignment = 'center',
  style,
  className,
  htmlContent,
  content,
  children,
  ...props
}: TooltipProps) {
  const [defaultShow, setDefaultShow] = useState(
    props.defaultIsShown ?? false,
  );
  const defaultId = useId();
  const tooltipId = props.id || defaultId;
  const isShown = props.isShown ?? defaultShow;
  const durationMs = 100;
  const { isMounted, className: transitionClass } = useMountTransition({
    isShown,
    durationMs,
    enterFrom: 'dc-tooltip_hidden',
    enterTo: 'dc-tooltip_visible',
  });

  const { showTooltip, hideTooltip } = useMemo(() => ({
    showTooltip: () => setDefaultShow(true),
    hideTooltip: () => setDefaultShow(false),
  }), []);

  const renderAnchor: PositionerAnchorRenderFn = ({ setRef }) => {
    if (typeof children === 'function') {
      return children({
        ref: setRef,
      }, {
        tooltipId,
        showTooltip,
        hideTooltip,
        isShown: isShown || isMounted,
      });
    }

    if (isReactElementWithRef(children)) {
      const props = children.props;
      return cloneElement(children, {
        'ref': mergeRefs(setRef, children.ref),
        'onFocus': (event: FocusEvent) => {
          showTooltip();
          props.onFocus?.(event);
        },
        'onBlur': (event: FocusEvent) => {
          hideTooltip();
          props.onBlur?.(event);
        },
        'onMouseEnter': (event: MouseEvent) => {
          showTooltip();
          props.onMouseEnter?.(event);
        },
        'onMouseLeave': (event: MouseEvent) => {
          hideTooltip();
          props.onMouseLeave?.(event);
        },
        'aria-describedby': props['aria-describedby'] || tooltipId,
      });
    }

    return children;
  };

  const renderContent: PositionerContentRenderFn = ({
    setRef: portalRef,
    style: portalStyle,
  }) => {
    if (isShown || isMounted) {
      delete props.defaultIsShown;
      delete props.isShown;
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
          className={classNames('dc-tooltip', transitionClass, className)}
          content={htmlContent}
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
