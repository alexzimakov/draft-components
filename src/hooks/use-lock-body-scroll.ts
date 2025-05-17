import { useEffect } from 'react';

let lockAttempts = 0;
let initialOverflow = '';
let initialPaddingRight = '';

export function useLockBodyScroll(opts: { disabled?: boolean } = {}) {
  const disabled = opts.disabled || false;

  useEffect(() => {
    if (!disabled) {
      lockAttempts += 1;
      if (lockAttempts === 1) {
        const body = document.body;
        initialOverflow = body.style.getPropertyValue('overflow');
        initialPaddingRight = body.style.getPropertyValue('padding-right');

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const initialPaddingRightPx = parseInt(initialPaddingRight || '0px', 10);
        const newPaddingRightPx = initialPaddingRightPx + scrollbarWidth;
        body.style.setProperty('overflow', 'hidden');
        body.style.setProperty('padding-right', `${newPaddingRightPx}px`);
      }

      return () => {
        lockAttempts -= 1;
        if (lockAttempts === 0) {
          const body = document.body;

          if (initialOverflow) {
            body.style.setProperty('overflow', initialOverflow);
          } else {
            body.style.removeProperty('overflow');
          }

          if (initialPaddingRight) {
            body.style.setProperty('padding-right', initialPaddingRight);
          } else {
            body.style.removeProperty('padding-right');
          }
        }
      };
    }
  }, [disabled]);
}
