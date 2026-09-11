import { useState } from 'react';

export function usePreservePropsWhenClosed<T extends Record<string, unknown>>(
  props: T,
  isOpenKey: keyof T,
): T {
  const [savedProps, setSavedProps] = useState(props);

  if (props[isOpenKey] && savedProps !== props) {
    setSavedProps(props);
  }

  if (props[isOpenKey]) {
    return props;
  }

  return {
    ...savedProps,
    [isOpenKey]: false,
  };
}
