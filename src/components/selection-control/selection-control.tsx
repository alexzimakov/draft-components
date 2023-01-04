import { type ComponentPropsWithoutRef, type ReactNode, useId } from 'react';
import { classNames } from '../../shared/react-helpers';
import { Label } from '../label';
import { Caption } from '../caption';

export type SelectionControlRenderFn = (props: {
  id: string;
}) => ReactNode;

type SelectionControlHTMLProps = ComponentPropsWithoutRef<'div'>;
type SelectionControlBaseProps = Omit<SelectionControlHTMLProps, 'children'>;
export type SelectionControlProps = {
  labelFor?: string;
  caption?: ReactNode;
  label: ReactNode;
  children: ReactNode | SelectionControlRenderFn
} & SelectionControlBaseProps;

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
  const shouldRenderCaption = Boolean(caption);

  return (
    <div {...props} className={classNames('dc-selection-control', className)}>
      <div className="dc-selection-control__input">
        {typeof children === 'function'
          ? children({ id: controlId })
          : children}
      </div>
      <Label className="dc-selection-control__label" htmlFor={controlId}>
        {label}
      </Label>
      {shouldRenderCaption && (
        <Caption className="dc-selection-control__caption">{caption}</Caption>
      )}
    </div>
  );
}
