import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { assertIfNullable } from '../../shared/util';
import { classNames } from '../../shared/react-helpers';

type DialogBodyHTMLProps = ComponentPropsWithoutRef<'div'>;
export type DialogBodyProps = {
  scrollShadowTop?: boolean;
  scrollShadowBottom?: boolean;
} & DialogBodyHTMLProps;

export function DialogBody({
  scrollShadowTop = false,
  scrollShadowBottom = false,
  className,
  children,
}: DialogBodyProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollShadowTop && !scrollShadowBottom) {
      return;
    }

    const el = ref.current;
    assertIfNullable(el, 'DialogBody ref was not set');

    const topShadowClass = 'dc-dialog-body_scroll-shadow-top';
    const bottomShadowClass = 'dc-dialog-body_scroll-shadow-bottom';
    const changeShadowsVisibility = () => {
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;

      if (scrollShadowTop) {
        if (scrollTop > 0) {
          el.classList.add(topShadowClass);
        } else {
          el.classList.remove(topShadowClass);
        }
      }

      if (scrollShadowBottom) {
        if (scrollTop + clientHeight < scrollHeight) {
          el.classList.add(bottomShadowClass);
        } else {
          el.classList.remove(bottomShadowClass);
        }
      }
    };

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(changeShadowsVisibility)
      : null;

    resizeObserver?.observe(el);
    el.addEventListener('scroll', changeShadowsVisibility);

    return () => {
      resizeObserver?.unobserve(el);
      el.removeEventListener('scroll', changeShadowsVisibility);
    };
  }, [scrollShadowTop, scrollShadowBottom]);

  return (
    <div ref={ref} className={classNames('dc-dialog-body', className)}>
      {children}
    </div>
  );
}
