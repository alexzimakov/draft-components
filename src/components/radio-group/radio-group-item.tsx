import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../../lib/react-helpers';
import { SvgIcon } from '../svg-icon';
import { checkCircleFill } from '../../icons/check-circle-fill';

export interface RadioGroupItemProps extends ComponentPropsWithoutRef<'div'> {
  value: string;
  label?: ReactNode;
  description?: ReactNode;
}

export function RadioGroupItem({
  className,
  value,
  label,
  description,
  children,
  ...props
}: RadioGroupItemProps) {
  return (
    <div {...props} className={classNames(className, 'dc-radio-group-item')}>
      <span className="dc-radio-group-item__check">
        <SvgIcon
          className="dc-radio-group-item__check-icon"
          icon={checkCircleFill}
          size={18}
        />
      </span>
      <div className="dc-radio-group-item__body">
        {label && <p className="dc-radio-group-item__label">{label}</p>}
        {description && (
          <div className="dc-radio-group-item__description">{description}</div>
        )}
      </div>
      {children}
    </div>
  );
}
