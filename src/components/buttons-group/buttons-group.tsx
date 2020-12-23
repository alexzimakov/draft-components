import * as React from 'react';
import { classNames } from '../../lib/class-names';

export type ButtonsGroupProps = React.ComponentPropsWithoutRef<'div'>;

export function ButtonsGroup({ className, ...props }: ButtonsGroupProps) {
  return (
    <div {...props} className={classNames(className, 'dc-buttons-group')} />
  );
}
