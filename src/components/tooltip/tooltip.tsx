import * as React from 'react';
import { guards, util, reactHelpers } from '../../lib';
import { Positioner, PositionerProps } from '../positioner';

interface ElementWithRef extends JSX.Element {
  ref: React.MutableRefObject<HTMLElement | null> | null;
}

interface RenderChildren {
  (props: {
    ref: React.MutableRefObject<HTMLElement | null>;
    showTooltip: () => void;
    hideTooltip: () => void;
    tooltipId: string | undefined;
  }): JSX.Element;
}

export interface TooltipProps extends React.ComponentPropsWithoutRef<'div'> {
  content: React.ReactNode;
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
  const anchorRef = React.useRef<HTMLElement | null>(null);
  const [isShown, setIsShown] = React.useState(false);
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);
  const tooltipId = isShown ? util.uniqueId('tooltip-') : undefined;

  const renderAnchor = () => {
    if (typeof anchor === 'function') {
      return anchor({
        ref: anchorRef,
        tooltipId,
        showTooltip: show,
        hideTooltip: hide,
      });
    }

    return React.cloneElement(anchor, {
      ref: reactHelpers.mergeRefs(anchor.ref, anchorRef),
      'aria-labelledby': tooltipId,
      onMouseEnter: (event: React.MouseEvent) => {
        show();
        const onMouseEnter = anchor.props.onMouseEnter;
        guards.isFunction(onMouseEnter) && onMouseEnter(event);
      },
      onMouseLeave: (event: React.MouseEvent) => {
        hide();
        const onMouseLeave = anchor.props.onMouseLeave;
        guards.isFunction(onMouseLeave) && onMouseLeave(event);
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
          className={reactHelpers.classNames(className, 'dc-tooltip')}
          role="tooltip"
        >
          {content}
        </div>
      </Positioner>
    </>
  );
}
