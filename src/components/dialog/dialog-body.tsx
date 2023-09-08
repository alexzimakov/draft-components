import { ComponentPropsWithoutRef, useRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';

type DialogBodyHTMLProps = ComponentPropsWithoutRef<'div'>;
export type DialogBodyProps = DialogBodyHTMLProps;

export function DialogBody({
  className,
  children,
}: DialogBodyProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className={classNames('dc-dialog-body', className)}>
      {children}
    </div>
  );
}
