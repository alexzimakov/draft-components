import { type ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

type CounterBaseProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'>;
export type CounterProps = {
  children: number;
} & CounterBaseProps;

export function Counter({
  className,
  children: count,
  ...props
}: CounterProps) {
  return (
    <span
      {...props}
      className={classNames(className, {
        'dc-counter': true,
        'dc-counter_circle': count > 0 && count < 10,
      })}
    >
      {count}
    </span>
  );
}
