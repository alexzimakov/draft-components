import { ChangeEventHandler, ComponentPropsWithRef, ReactNode, forwardRef, useState } from 'react';
import { classNames } from '../../lib/react-helpers';
import { Caption } from '../caption';

type TextareaHTMLProps = ComponentPropsWithRef<'textarea'>;
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaWidth =
  | '30ch'
  | '40ch'
  | '60ch'
  | '80ch';
export type TextareaChangeValueHandler = (value: string) => void;
export type TextareaCharacterCountRenderer = (params: {
  maxCharacters: number;
  characterCount: number;
}) => ReactNode;
export type TextareaProps = TextareaHTMLProps & {
  isBlock?: boolean;
  showCharacterCount?: boolean;
  renderCharacterCount?: TextareaCharacterCountRenderer;
  size?: TextareaSize;
  width?: TextareaWidth;
  onChangeValue?: TextareaChangeValueHandler;
};

const defaultCharacterCountRenderer: TextareaCharacterCountRenderer = ({
  maxCharacters,
  characterCount,
}) => {
  const charsRemaining = maxCharacters - characterCount;
  const characters = (
    <span style={{ fontVariant: 'tabular-nums' }}>
      {charsRemaining === 1
        ? `${charsRemaining} character`
        : `${charsRemaining} characters`}
    </span>
  );
  return <>You have {characters} remaining</>;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({
    disabled = false,
    isBlock = false,
    showCharacterCount = false,
    size = 'md',
    rows = 3,
    width,
    style,
    className,
    maxLength,
    onChange,
    onChangeValue,
    renderCharacterCount = defaultCharacterCountRenderer,
    ...props
  }, ref) {
    const shouldRenderCharacterCount = (
      showCharacterCount &&
      maxLength != null && maxLength > 0
    );
    const [characterCount, setCharacterCount] = useState(() => {
      const value = props.value || props.defaultValue;
      return typeof value === 'string' ? value.length : 0;
    });

    const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
      const value = event.target.value;
      onChange?.(event);
      onChangeValue?.(value);
      setCharacterCount(value.length);
    };

    return (
      <div
        style={style}
        className={classNames(className, 'dc-textarea__container', {
          [`dc-textarea__container_size_${size}`]: size,
          'dc-textarea__container_disabled': disabled,
          'dc-textarea__container_invalid': props['aria-invalid'],
          'dc-textarea__container_block': isBlock,
        })}
      >
        <textarea
          {...props}
          ref={ref}
          className={classNames('dc-textarea', {
            [`dc-textarea_width_${width}`]: width !== undefined,
          })}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          onChange={handleChange}
        />
        {shouldRenderCharacterCount && (
          <Caption
            data-testid="textarea-character-count"
            className="dc-textarea__character-count"
          >
            {renderCharacterCount({
              characterCount,
              maxCharacters: maxLength,
            })}
          </Caption>
        )}
      </div>
    );
  },
);
