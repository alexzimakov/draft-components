import * as React from 'react';
import { classNames } from '../../lib/class-names';

export type CheckboxHtmlAttrs = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'accept'
  | 'alt'
  | 'capture'
  | 'dirname'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'height'
  | 'max'
  | 'maxLength'
  | 'min'
  | 'minLength'
  | 'multiple'
  | 'pattern'
  | 'placeholder'
  | 'size'
  | 'src'
  | 'step'
  | 'type'
  | 'width'
>;

export type CheckboxProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ label, description, style, className, ...props }, ref) {
    return (
      <div className={classNames(className, 'dc-checkbox')}>
        <label className="dc-checkbox__box">
          <input
            {...props}
            ref={ref}
            className="dc-checkbox__input"
            type="checkbox"
          />
          <span className="dc-checkbox__check" aria-hidden={true}>
            <svg
              className="dc-checkbox__check-icon"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={16}
              height={16}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
          {label ? <span className="dc-checkbox__label">{label}</span> : null}
        </label>
        {description ? (
          <div className="dc-checkbox__description">{description}</div>
        ) : null}
      </div>
    );
  }
);
