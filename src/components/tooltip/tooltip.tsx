import * as React from 'react';
import { classNames, guards, uniqueId, util } from '../../lib';
import { Positioner } from '../positioner';

type RenderChildren = (props: {
  ref: React.MutableRefObject<HTMLElement | null>;
  showTooltip: () => void;
  hideTooltip: () => void;
  tooltipId: string | undefined;
}) => JSX.Element;

export interface TooltipProps extends React.ComponentPropsWithoutRef<'div'> {
  content: React.ReactNode;
  children: RenderChildren | JSX.Element;
}

export function Tooltip({
  content,
  children: anchor,
  className,
  ...props
}: TooltipProps) {
  const anchorRef = React.useRef<HTMLElement | null>(null);
  const [isShown, setIsShown] = React.useState(false);
  const show = () => setIsShown(true);
  const hide = () => setIsShown(false);
  const tooltipId = isShown ? uniqueId('tooltip-') : undefined;

  return (
    <>
      {typeof anchor === 'function'
        ? anchor({
            ref: anchorRef,
            showTooltip: show,
            hideTooltip: hide,
            tooltipId,
          })
        : React.cloneElement(anchor, {
            ref: util.mergeRefs(anchor.props.ref, anchorRef),
            onMouseEnter: (event: React.MouseEvent) => {
              const onMouseEnter = anchor.props.onMouseEnter;
              guards.isFunction(onMouseEnter) && onMouseEnter(event);
              show();
            },
            onMouseLeave: (event: React.MouseEvent) => {
              const onMouseLeave = anchor.props.onMouseLeave;
              guards.isFunction(onMouseLeave) && onMouseLeave(event);
              hide();
            },
            'aria-labelledby': tooltipId,
          })}
      <Positioner
        anchorRef={anchorRef}
        isShown={isShown}
        arrangement="bottom"
        alignment="center"
        anchorOffset={8}
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
