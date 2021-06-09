import { classNames } from '../../lib/react-helpers';
import type { ComponentPropsWithoutRef } from 'react';

export interface ButtonsGroupProps extends ComponentPropsWithoutRef<'div'> {}

export function ButtonsGroup({ className, ...props }: ButtonsGroupProps) {
  return (
    <div {...props} className={classNames(className, 'dc-buttons-group')} />
  );
}
