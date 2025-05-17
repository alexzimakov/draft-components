import { ComponentProps, useEffect, useRef } from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { useDialogContext } from './dialog-context.js';

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
  ...props
}: DialogBodyProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { setIsBodyHasScroll: setShouldShowScrollShadow } = useDialogContext();

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (shouldShowScrollShadow) {
      const ro = new ResizeObserver(() => {
        setShouldShowScrollShadow(el.scrollHeight !== el.offsetHeight);
      });
      ro.observe(el);

      return () => {
        setShouldShowScrollShadow(false);
        ro.disconnect();
      };
    }
  }, [shouldShowScrollShadow, setShouldShowScrollShadow]);

  return (
    <div
      ref={ref}
      className={classNames(className, {
        'dc-dialog__body': true,
        'dc-dialog__body_has_top-delimiter': hasBorderTop,
        'dc-dialog__body_has_bottom-delimiter': hasBorderBottom,
      })}
      {...props}
    />
  );
}
