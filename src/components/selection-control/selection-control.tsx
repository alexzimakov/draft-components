import { type ComponentProps, type JSX, type ReactNode, cloneElement, useId } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { Label } from '../label/index.js';
import { Caption } from '../caption/index.js';

export type SelectionControlRenderer = (props: { id: string }) => JSX.Element;

type SelectionControlHTMLProps = ComponentProps<'div'>;

type SelectionControlBaseProps = {
  labelFor?: string;
  caption?: ReactNode;
  label: ReactNode;
  children: JSX.Element | SelectionControlRenderer;
};

export type SelectionControlProps =
  & SelectionControlBaseProps
  & Omit<SelectionControlHTMLProps, keyof SelectionControlBaseProps>;

export function SelectionControl({
  label,
  labelFor,
  caption,
  className,
  children,
  ...props
}: SelectionControlProps) {
  const defaultId = useId();
  const controlId = labelFor || defaultId;

  return (
    <div
      {...props}
      className={classNames(className, {
        'dc-selection-control': true,
        'dc-selection-control__with_caption': caption,
      })}
    >
      <div className="dc-selection-control__input">
        {typeof children === 'function'
          ? children({ id: controlId })
          : cloneElement(children, { id: children.props.id || controlId })}
      </div>
      <Label className="dc-selection-control__label" htmlFor={controlId}>
        {label}
      </Label>
      {caption
        ? (
            <Caption className="dc-selection-control__caption">
              {caption}
            </Caption>
          )
        : null}
    </div>
  );
}
