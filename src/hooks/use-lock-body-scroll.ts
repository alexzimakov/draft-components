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
        const bodyStyle = window.getComputedStyle(document.body);
        initialOverflow = bodyStyle.overflow;
        initialPaddingRight = bodyStyle.paddingRight;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const initialPaddingRightPx = parseInt(initialPaddingRight, 10);
        const newPaddingRightPx = initialPaddingRightPx + scrollbarWidth;
        body.style.setProperty('overflow', 'hidden');
        body.style.setProperty('padding-right', `${newPaddingRightPx}px`);
      }

      return () => {
        lockAttempts -= 1;
        if (lockAttempts === 0) {
          const body = document.body;
          body.style.setProperty('overflow', initialOverflow);
          body.style.setProperty('padding-right', initialPaddingRight);
        }
      };
    }
  }, [disabled]);
}
