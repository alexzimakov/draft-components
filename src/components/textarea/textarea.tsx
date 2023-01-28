import {
  type ComponentPropsWithRef,
  type ReactNode,
  forwardRef,
  useState,
} from 'react';
import { classNames } from '../../lib/react-helpers';
import { Caption } from '../caption';

type TextareaHTMLProps = ComponentPropsWithRef<'textarea'>;
export type TextareaSize = 'sm' | 'md' | 'lg';
export type TextareaWidth =
  | '30ch'
  | '40ch'
  | '60ch'
  | '80ch';
export type TextAreaChangeValueHandler = (value: string) => void;
export type CharacterCountRenderFn = (params: {
  maxCharacters: number;
  characterCount: number;
}) => ReactNode;
export type TextareaProps = TextareaHTMLProps & {
  hasError?: boolean;
  isBlock?: boolean;
  showCharacterCount?: boolean;
  renderCharacterCount?: CharacterCountRenderFn;
  size?: TextareaSize;
  width?: TextareaWidth;
  onChangeValue?: TextAreaChangeValueHandler;
};

const getCharactersCountMessage: CharacterCountRenderFn = ({
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
    hasError = false,
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
    renderCharacterCount = getCharactersCountMessage,
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

    return (
      <div
        style={style}
        className={classNames(className, 'dc-textarea__container', {
          [`dc-textarea__container_size_${size}`]: size !== undefined,
          'dc-textarea__container_disabled': disabled,
          'dc-textarea__container_has_error': hasError,
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
          onChange={(event) => {
            const value = event.target.value;
            onChange?.(event);
            onChangeValue?.(value);
            setCharacterCount(value.length);
          }}
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
  }
);
