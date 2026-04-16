import { type ComponentProps, useEffect, useRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { useDialogContext } from './dialog-context.js';
import { useCallbackRef } from '../../hooks/use-callback-ref.js';

type DialogBodyHTMLProps = ComponentProps<'div'>;

type DialogBodyBaseProps = {
  hasTopDelimiter?: boolean;
  hasBottomDelimiter?: boolean;
  shouldShowScrollShadow?: boolean;
};

export type DialogBodyProps =
  & DialogBodyBaseProps
  & Omit<DialogBodyHTMLProps, keyof DialogBodyBaseProps>;

export function DialogBody({
  className,
  hasTopDelimiter: hasBorderTop,
  hasBottomDelimiter: hasBorderBottom,
  shouldShowScrollShadow,
  onScroll,
  ...props
}: DialogBodyProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { setIsBodyHasTopScroll, setIsBodyHasBottomScroll } = useDialogContext();
  const updateBodyScrollState = useCallbackRef(() => {
    const el = ref.current;
    if (el) {
      setIsBodyHasTopScroll(el.scrollTop > 0);
      setIsBodyHasBottomScroll(el.scrollHeight - el.scrollTop - el.clientHeight > 0);
    }
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (shouldShowScrollShadow) {
      const ro = new ResizeObserver(updateBodyScrollState);
      ro.observe(el);

      return () => {
        setIsBodyHasTopScroll(false);
        setIsBodyHasBottomScroll(false);
        ro.disconnect();
      };
    }
  }, [shouldShowScrollShadow, setIsBodyHasTopScroll, setIsBodyHasBottomScroll, updateBodyScrollState]);

  return (
    <div
      ref={ref}
      className={classNames(className, {
        'dc-dialog__body': true,
        'dc-dialog__body_has_top-delimiter': hasBorderTop,
        'dc-dialog__body_has_bottom-delimiter': hasBorderBottom,
      })}
      onScroll={(ev) => {
        updateBodyScrollState();
        if (typeof onScroll === 'function') {
          onScroll(ev);
        }
      }}
      {...props}
    />
  );
}
