import { SlideOverCloseCallback } from './types';
import { ComponentPropsWithoutRef, useCallback, useEffect, useId, useMemo, useRef } from 'react';
import { SlideOverContextProvider } from './slide-over-context';
import { classNames, getRefElement } from '../../lib';
import { useDisableBodyScroll, useEscKeyDown, useFocusTrap } from '../../hooks';
import { Portal } from '../portal';
import { SlideOverHeader } from './slide-over-header';
import { SlideOverBody } from './slide-over-body';

export type SlideOverHTMLProps = ComponentPropsWithoutRef<'div'>;
export type SlideOverProps = SlideOverHTMLProps & {
  animationDurationMs?: number;
  animationDisabled?: boolean;
  onClose: SlideOverCloseCallback;
};

const panelSlideIn: Keyframe[] = [
  { transform: 'translateX(100%)' },
  { transform: 'translateX(0%)' },
];

const backdropFade: Keyframe[] = [
  { opacity: 0 },
  { opacity: 1 },
];

export function SlideOver({
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  animationDurationMs = 350,
  animationDisabled = false,
  className,
  children,
  onClose,
  ...props
}: SlideOverProps) {
  const id = useId();
  const titleId = ariaLabelledby || `${id}dialogTitle`;
  const descriptionId = ariaDescribedby || `${id}dialogDescription`;

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isAnimationDisabled = useRef(animationDisabled);

  const shouldPlayAnimations = useCallback(() => {
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion)');
    return !isAnimationDisabled.current && !mediaQueryList.matches;
  }, []);

  const closePanel = useMemo<SlideOverCloseCallback>(() => {
    let isClosing = false;
    return (source) => {
      if (isClosing) {
        return;
      }
      if (!shouldPlayAnimations()) {
        onClose(source);
      }

      isClosing = true;

      const backdrop = getRefElement(backdropRef);
      const backdropAnimations = backdrop.getAnimations();
      if (backdropAnimations.length === 0) {
        backdropAnimations.push(backdrop.animate(backdropFade, {
          direction: 'reverse',
          fill: 'both',
          easing: 'ease-in-out',
          duration: animationDurationMs,
        }));
      } else {
        backdropAnimations.forEach((animation) => animation.reverse());
      }

      const panel = getRefElement(panelRef);
      const panelAnimations = panel.getAnimations();
      if (panelAnimations.length === 0) {
        backdropAnimations.push(panel.animate(panelSlideIn, {
          direction: 'reverse',
          fill: 'both',
          easing: 'ease-in-out',
          duration: animationDurationMs,
        }));
      } else {
        panelAnimations.forEach((animation) => animation.reverse());
      }

      const animations = [...backdropAnimations, ...panelAnimations];
      Promise.all(
        animations.map((animation) => animation.finished),
      ).then(() => {
        onClose(source);
        isClosing = false;
      });
    };
  }, [animationDurationMs, onClose, shouldPlayAnimations]);

  useEffect(() => {
    isAnimationDisabled.current = animationDisabled;
  }, [animationDisabled]);

  useEffect(() => {
    if (shouldPlayAnimations()) {
      const backdrop = getRefElement(backdropRef);
      backdrop.animate(backdropFade, {
        fill: 'both',
        easing: 'ease-in-out',
        duration: animationDurationMs,
      });

      const panel = getRefElement(panelRef);
      panel.animate(panelSlideIn, {
        fill: 'both',
        easing: 'ease-in-out',
        duration: animationDurationMs,
      });
    }
  }, [shouldPlayAnimations, animationDurationMs]);

  useEscKeyDown(() => closePanel('escape'));

  useFocusTrap(panelRef);

  useDisableBodyScroll();

  const onClickBackdrop = () => {
    closePanel('backdrop');
  };

  return (
    <Portal>
      <div className="dc-slide-over">
        <div
          className="dc-slide-over__backdrop"
          ref={backdropRef}
          onClick={onClickBackdrop}
        />
        <div
          {...props}
          className={classNames('dc-slide-over__panel', className)}
          role="dialog"
          ref={panelRef}
          aria-modal={true}
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
        >
          <SlideOverContextProvider
            titleId={titleId}
            descriptionId={descriptionId}
            closePanel={closePanel}
          >
            {children}
          </SlideOverContextProvider>
        </div>
      </div>
    </Portal>
  );
}
SlideOver.Header = SlideOverHeader;
SlideOver.Body = SlideOverBody;
