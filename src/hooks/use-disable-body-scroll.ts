import { useEffect } from 'react';
import { once } from '../lib/util';

export function useDisableBodyScroll(isEnabled: boolean = true) {
  useEffect(() => {
    if (isEnabled) {
      return disableBodyScroll();
    }
  }, [isEnabled]);
}

let disableAttempts = 0;
let initialOverflow = '';
let initialPaddingRight = '';

function disableBodyScroll() {
  if (!disableAttempts) {
    const bodyStyle = window.getComputedStyle(document.body);
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    initialOverflow = bodyStyle.overflow;
    initialPaddingRight = bodyStyle.paddingRight;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${
      parseInt(initialPaddingRight) + scrollbarWidth
    }px`;
  }
  disableAttempts += 1;

  return once(function enableBodyScroll() {
    disableAttempts -= 1;
    if (!disableAttempts) {
      document.body.style.overflow = initialOverflow;
      document.body.style.paddingRight = initialPaddingRight;
    }
  });
}
