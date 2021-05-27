import * as React from 'react';
import { classNames } from '../../lib/react-helpers';

export type ButtonsGroupHtmlAttrs = React.ComponentPropsWithoutRef<'div'>;

export interface ButtonsGroupProps extends ButtonsGroupHtmlAttrs {}

export function ButtonsGroup({ className, ...props }: ButtonsGroupProps) {
  return (
    <div {...props} className={classNames(className, 'dc-buttons-group')} />
  );
}
