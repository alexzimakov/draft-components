import { cloneElement, useRef, useState } from 'react';
import { uniqueId } from '../../lib/util';
import { isFunction } from '../../lib/guards';
import { classNames, mergeRefs } from '../../lib/react-helpers';
import { Positioner } from '../positioner';
import type {
  ReactNode,
  MutableRefObject,
  ComponentPropsWithoutRef,
} from 'react';
import type { PositionerProps } from '../positioner';

interface ElementWithRef extends JSX.Element {
  ref?: MutableRefObject<HTMLElement | null> | null;
}

interface RenderChildren {
  (props: {
    ref: MutableRefObject<HTMLElement | null>;
    showTooltip: () => void;
    hideTooltip: () => void;
    tooltipId: string | undefined;
  }): JSX.Element;
}

export interface TooltipProps extends ComponentPropsWithoutRef<'div'> {
  content: ReactNode;
  children: RenderChildren | ElementWithRef;
  arrangement?: PositionerProps['arrangement'];
  alignment?: PositionerProps['alignment'];
  anchorOffset?: PositionerProps['anchorOffset'];
}

export function Tooltip({
  content,
  children: anchor,
  arrangement = 'bottom',
  alignment = 'center',
  anchorOffset = 8,
  className,
  ...props
}: TooltipProps) {
  const anchorRef = useRef<HTMLElement | null>(null);
  const [isShown, setIsShown] = useState(false);
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);
  const tooltipId = isShown ? uniqueId('tooltip-') : undefined;

  const renderAnchor = () => {
    if (typeof anchor === 'function') {
      return anchor({
        ref: anchorRef,
        tooltipId,
        showTooltip: show,
        hideTooltip: hide,
      });
    }

    return cloneElement(anchor, {
      ref: mergeRefs(anchor.ref, anchorRef),
      'aria-labelledby': tooltipId,
      onMouseEnter: (event: MouseEvent) => {
        show();
        const onMouseEnter = anchor.props.onMouseEnter;
        isFunction(onMouseEnter) && onMouseEnter(event);
      },
      onMouseLeave: (event: MouseEvent) => {
        hide();
        const onMouseLeave = anchor.props.onMouseLeave;
        isFunction(onMouseLeave) && onMouseLeave(event);
      },
    });
  };

  return (
    <>
      {renderAnchor()}
      <Positioner
        anchorRef={anchorRef}
        isShown={isShown}
        arrangement={arrangement}
        alignment={alignment}
        anchorOffset={anchorOffset}
      >
        <div
          {...props}
          id={tooltipId}
          className={classNames(className, 'dc-tooltip')}
          role="tooltip"
        >
          {content}
        </div>
      </Positioner>
    </>
  );
}
