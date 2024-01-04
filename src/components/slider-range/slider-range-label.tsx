import { ReactNode, forwardRef } from 'react';
import { classNames } from '../../lib/index.js';

type SliderRangeLabelProps = {
  className?: string;
  hidden?: boolean;
  htmlFor: string | string[];
  children: ReactNode;
};

export const SliderRangeLabel = forwardRef<
  HTMLOutputElement,
  SliderRangeLabelProps
>(({
  className,
  hidden,
  htmlFor,
  children,
}, ref) => (
  <output
    ref={ref}
    hidden={hidden}
    htmlFor={Array.isArray(htmlFor) ? htmlFor.join(' ') : htmlFor}
    className={classNames('dc-slider-range__label', className)}
  >
    <span className="dc-slider-range__label-text">{children}</span>
  </output>
));
SliderRangeLabel.displayName = 'SliderRangeLabel';
