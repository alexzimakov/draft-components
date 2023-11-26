import { useRef } from 'react';

export function usePreservePropsWhenClosed<T extends Record<string, unknown>>(
  props: T,
  openProp: keyof T,
): T {
  const savedProps = useRef(props);
  if (props[openProp]) {
    savedProps.current = props;
  } else {
    savedProps.current = {
      ...savedProps.current,
      [openProp]: false,
    };
  }
  return savedProps.current;
}
