import {
  type ComponentProps,
  type FocusEventHandler,
  type MouseEventHandler,
  type ReactNode,
  type RefCallback,
  type JSX,
  useState,
  useId,
  useRef,
  useMemo,
  useLayoutEffect,
} from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { calcPopoverPosition, type PopoverPlacement } from '../../lib/calc-popover-position.js';
import { observeMove } from '../popover/observe-move.js';
import { Portal } from '../portal/portal.js';
import { useCloseOnEsc } from '../../hooks/use-close-on-esc.js';

export type TooltipPlacement = PopoverPlacement;

export type TooltipApi = {
  show: () => void;
  hide: () => void;
};

export type TooltipChildrenRenderer = (
  props: {
    'ref': RefCallback<HTMLElement | SVGElement>;
    'aria-describedby': string;
    'onFocus': FocusEventHandler<HTMLElement | SVGElement>;
    'onBlur': FocusEventHandler<HTMLElement | SVGElement>;
    'onMouseEnter': MouseEventHandler<HTMLElement | SVGElement>;
    'onMouseLeave': MouseEventHandler<HTMLElement | SVGElement>;
  },
  api: TooltipApi,
) => JSX.Element;

type TooltipHTMLProps = ComponentProps<'div'>;

type TooltipBaseProps = {
  anchorPadding?: number;
  viewportPadding?: number;
  placement?: TooltipPlacement;
  isOpen?: boolean;
  defaultIsVisible?: boolean;
  title: ReactNode;
  children: TooltipChildrenRenderer;
};

export type TooltipProps =
  & TooltipBaseProps
  & Omit<TooltipHTMLProps, keyof TooltipBaseProps>;

export function Tooltip({
  className,
  placement = 'top',
  anchorPadding = 6,
  viewportPadding = 4,
  defaultIsVisible = false,
  title,
  children,
  ...props
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(defaultIsVisible);
  const [isMounted, setIsMounted] = useState(isVisible);
  const id = useId();
  const tooltipId = props.id || id;
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<HTMLElement | SVGElement | null>(null);
  const api = useMemo((): TooltipApi => ({
    show: () => {
      setIsVisible(true);
    },
    hide: () => {
      setIsVisible(false);
    },
  }), []);

  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    const anchor = anchorRef.current;
    if (!tooltip || !anchor) {
      return;
    }

    if (isVisible) {
      tooltip.dataset.animation = 'enter';
      setIsMounted((isMounted) => {
        if (isMounted) {
          return isMounted;
        }
        tooltip.dataset.animation = 'enter';
        return !isMounted;
      });

      return observeMove(anchor, () => {
        tooltip.style.removeProperty('max-width');
        tooltip.style.removeProperty('max-height');
        const result = calcPopoverPosition(anchor, tooltip, {
          placement,
          anchorPadding,
          viewportPadding,
        });
        tooltip.dataset.placement = result.placement;
        tooltip.dataset.alignment = result.alignment;
        tooltip.style.setProperty('--anchor-offset', `${anchorPadding}px`);
        tooltip.style.setProperty('top', `${result.y}px`);
        tooltip.style.setProperty('left', `${result.x}px`);
        tooltip.style.setProperty('max-width', `${result.maxWidth}px`);
        tooltip.style.setProperty('max-height', `${result.maxHeight}px`);
      });
    } else {
      const handleAnimationEnd = () => {
        setIsMounted(false);
      };
      tooltip.dataset.animation = 'leave';
      tooltip.addEventListener('animationend', handleAnimationEnd);
      return () => {
        tooltip.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [isVisible, placement, anchorPadding, viewportPadding]);

  useCloseOnEsc(api.hide, {
    disabled: !isMounted,
  });

  return (
    <>
      {(isVisible || isMounted) && (
        <Portal>
          <div
            {...props}
            className={classNames('dc-tooltip', className)}
            ref={tooltipRef}
            role="tooltip"
            onMouseEnter={api.show}
            onMouseLeave={api.hide}
          >
            {title}
          </div>
        </Portal>
      )}
      {children({
        'ref': (el) => {
          anchorRef.current = el;
        },
        'aria-describedby': tooltipId,
        'onFocus': api.show,
        'onBlur': api.hide,
        'onMouseEnter': api.show,
        'onMouseLeave': api.hide,
      }, api)}
    </>
  );
}
