import * as React from 'react';

export type ComponentWithForwardRef<
  T,
  P = {}
> = React.ForwardRefExoticComponent<P & React.RefAttributes<T>>;
