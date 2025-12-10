import {
  useId,
  type ComponentProps,
  type CSSProperties,
  type KeyboardEventHandler,
  type MouseEventHandler,
} from 'react';
import { classNames } from '../../lib/react-helpers.js';

type HTMLInputProps = ComponentProps<'input'>;

export type TokenInputSize = 'sm' | 'md' | 'lg';

export type TokenInputChangeHandler = (tokens: string[]) => void;

export type TokenInputGetRemoveButtonAriaLabel = (token: string) => string;

export type TokenInputProps = {
  id?: string;
  style?: CSSProperties;
  className?: string;
  size?: TokenInputSize;
  ariaLabel?: string;
  placeholder?: string;
  defaultValue?: string;
  inputMode?: HTMLInputProps['inputMode'];
  autoComplete?: HTMLInputProps['autoComplete'];
  invalid?: boolean;
  disabled?: boolean;
  allowDuplicateTokens?: boolean;
  tokens: string[];
  onChange: TokenInputChangeHandler;
  getRemoveButtonAriaLabel?: TokenInputGetRemoveButtonAriaLabel;
};

export function TokenInput({
  id: defaultInputId,
  style,
  className,
  size,
  ariaLabel,
  placeholder,
  defaultValue,
  inputMode,
  autoComplete = 'off',
  invalid,
  disabled,
  allowDuplicateTokens,
  tokens,
  onChange,
  getRemoveButtonAriaLabel,
}: TokenInputProps) {
  const id = useId();
  const inputId = defaultInputId || `${id}token-input`;

  const focus = () => {
    const input = document.getElementById(inputId);
    if (input instanceof HTMLInputElement) {
      input.focus();
    }
  };

  const removeToken = (index: number) => {
    if (!disabled && index >= 0 && index < tokens.length) {
      const newTokens = [...tokens];
      newTokens.splice(index, 1);
      onChange(newTokens);
      focus();
    }
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const input = event.currentTarget;

    if (event.key === 'Enter') {
      if (input.value) {
        if (allowDuplicateTokens || !tokens.includes(input.value)) {
          onChange([...tokens, input.value]);
        }
        input.value = '';
      }
      event.preventDefault();
      event.stopPropagation();
    }

    if (event.key === 'Backspace') {
      if (!input.value) {
        onChange(tokens.slice(0, -1));
      }
    }
  };

  return (
    <label
      style={style}
      className={classNames(className, {
        'dc-token-input': true,
        [`dc-token-input_size_${size}`]: size,
      })}
      htmlFor={inputId}
      data-invalid={invalid}
      data-disabled={disabled}
    >
      {tokens.map((token, index) => (
        <Token
          key={token}
          value={token}
          disabled={disabled}
          onRemove={() => removeToken(index)}
          getRemoveButtonAriaLabel={getRemoveButtonAriaLabel}
        />
      ))}
      <input
        aria-label={ariaLabel}
        placeholder={placeholder}
        id={inputId}
        defaultValue={defaultValue}
        inputMode={inputMode}
        autoComplete={autoComplete}
        disabled={disabled}
        onKeyDown={handleKeyDown}
      />
    </label>
  );
}

function Token({
  value,
  disabled,
  onRemove,
  getRemoveButtonAriaLabel,
}: {
  value: string;
  disabled?: boolean;
  onRemove: () => void;
  getRemoveButtonAriaLabel?: TokenInputGetRemoveButtonAriaLabel;
}) {
  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onRemove();
  };

  let buttonAriaLabel: string | undefined;
  if (typeof getRemoveButtonAriaLabel === 'function') {
    buttonAriaLabel = getRemoveButtonAriaLabel(value);
  }

  return (
    <div className="dc-token-input__token">
      <span>
        {value}
      </span>
      <button
        aria-label={buttonAriaLabel}
        type="button"
        disabled={disabled}
        onClick={handleButtonClick}
      >
        <XMarkIcon width="1em" height="1em" />
      </button>
    </div>
  );
}

function XMarkIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      stroke="currentColor"
      strokeWidth={2}
      fill="none"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
