import {
  cloneElement,
  ComponentPropsWithoutRef,
  ReactNode,
  RefObject,
  useRef,
  useState,
} from 'react';
import { uniqueId } from '../../lib/util';
import { isFunction } from '../../lib/guards';
import { classNames, mergeRefs } from '../../lib/react-helpers';
import { Positioner, PositionerProps } from '../positioner';

type RenderFn = (props: {
  ref: RefObject<HTMLElement>;
  tooltipId?: string;
  hideTooltip(): void;
  showTooltip(): void;
}) => JSX.Element;

interface JSXElementWithRef extends JSX.Element {
  ref?: RefObject<HTMLElement>;
}

export interface TooltipProps extends ComponentPropsWithoutRef<'div'> {
  position?: PositionerProps['position'];
  alignment?: PositionerProps['alignment'];
  anchorOffset?: PositionerProps['anchorOffset'];
  content: ReactNode;
  children: RenderFn | JSXElementWithRef;
}

export function Tooltip({
  className,
  position = 'bottom',
  alignment = 'center',
  anchorOffset = 8,
  content,
  children,
  ...props
}: TooltipProps) {
  const anchorRef = useRef<HTMLElement | null>(null);

  const [isShown, setIsShown] = useState(false);
  const tooltipId = isShown ? uniqueId('tooltip-') : undefined;

  function showTooltip(): void {
    setIsShown(true);
  }

  function hideTooltip(): void {
    setIsShown(false);
  }

  function renderAnchor(): JSX.Element {
    if (typeof children === 'function') {
      return children({
        tooltipId,
        showTooltip,
        hideTooltip,
        ref: anchorRef,
      });
    }

    return cloneElement(children, {
      ref: mergeRefs(children.ref, anchorRef),
      onMouseEnter: (event: MouseEvent) => {
        showTooltip();
        if (isFunction(children.props.onMouseEnter)) {
          children.props.onMouseEnter(event);
        }
      },
      onMouseLeave: (event: MouseEvent) => {
        hideTooltip();
        if (isFunction(children.props.onMouseLeave)) {
          children.props.onMouseLeave(event);
        }
      },
      'aria-labelledby': tooltipId,
    });
  }

  return (
    <>
      {renderAnchor()}
      <Positioner
        anchorRef={anchorRef}
        isShown={isShown}
        position={position}
        alignment={alignment}
        anchorOffset={anchorOffset}
      >
        <div
          {...props}
          id={tooltipId}
          role="tooltip"
          className={classNames(className, 'dc-tooltip')}
        >
          {content}
        </div>
      </Positioner>
    </>
  );
}
