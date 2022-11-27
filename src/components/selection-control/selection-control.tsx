import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Label } from '../label';
import { Caption } from '../caption';

export type SelectionControlProps = ComponentPropsWithoutRef<'div'> & {
  htmlFor?: string;
  caption?: ReactNode;
  label: ReactNode;
};

export function SelectionControl({
  htmlFor = '',
  className = '',
  label,
  caption,
  children,
  ...props
}: SelectionControlProps) {
  const shouldRenderCaption = Boolean(caption);

  return (
    <div {...props} className={classNames('dc-selection-control', className)}>
      <div className="dc-selection-control__input">{children}</div>
      <Label className="dc-selection-control__label" htmlFor={htmlFor}>
        {label}
      </Label>
      {shouldRenderCaption && (
        <Caption className="dc-selection-control__caption">{caption}</Caption>
      )}
    </div>
  );
}
