import {
  useId,
  useState,
  ReactNode,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
} from 'react';
import {
  useSearchSelectContext,
  SearchSelectContextProvider,
  SearchSelectContext,
  OptionStore,
} from './context.js';
import { classNames } from '../../lib/react-helpers.js';
import { Popover } from '../popover/popover.js';
import { TextInput } from '../text-input/text-input.js';
import { Spinner } from '../spinner/spinner.js';
import { ChevronDown, MagnifyingGlass } from './icons.js';

type RenderLabelFn<Value> = (value: Value) => ReactNode;

type RenderOptionsFn = (props: {
  searchQuery: string;
  searchQueryLowerCased: string;
}) => ReactNode;

export type SearchSelectSize = 'sm' | 'md' | 'lg';

export type SearchSelectProps<Value> = {
  className?: string;
  size?: SearchSelectSize;
  fullWidth?: boolean;
  invalid?: boolean;
  loading?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  textboxIcon?: ReactNode;
  textboxAriaLabel?: string;
  textboxPlaceholder?: string;
  labelledBy?: string;
  displayedValue?: ReactNode | RenderLabelFn<Value>;
  children?: ReactNode | RenderOptionsFn;
  value: Value;
  onChange: (value: Value) => void;
};

export function SearchSelect<Value>({
  className,
  size = 'md',
  fullWidth,
  invalid,
  loading,
  disabled,
  readOnly,
  textboxIcon,
  textboxAriaLabel,
  textboxPlaceholder = '',
  labelledBy,
  displayedValue,
  children,
  value: selectedValue,
  onChange: onSelectedValueChange,
}: SearchSelectProps<Value>) {
  const id = useId();
  const buttonId = `${id}button`;
  const textboxId = `${id}textbox`;
  const listboxId = `${id}listbox`;
  const [options] = useState(() => new OptionStore<Value>(`${id}option-`));
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedValue, setHighlightedValue] = useState(selectedValue);

  const openPopover = () => {
    if (readOnly || disabled || loading) {
      return;
    }
    options.clear();
    setSearchQuery('');
    setHighlightedValue(selectedValue);
    setIsOpen(true);
    window.setTimeout(() => {
      const textbox = window.document.getElementById(textboxId);
      if (textbox) {
        textbox.focus();
      }
    });
  };

  const closePopover = () => {
    setIsOpen(false);
    window.setTimeout(() => {
      const button = window.document.getElementById(buttonId);
      if (button) {
        button.focus();
      }
    });
  };

  const setSelectedValue = (value: Value) => {
    onSelectedValueChange(value);
    closePopover();
  };

  const handleButtonClick = () => {
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  };

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    let handled = false;
    if (event.key === 'ArrowUp') {
      handled = true;
      openPopover();
    } else if (event.key === 'ArrowDown') {
      handled = true;
      openPopover();
    }
    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleTextboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    options.clear();
    setSearchQuery(event.target.value);
  };

  const handleTextboxKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    let handled = false;
    if (event.key === 'ArrowUp') {
      handled = true;
      const values = options.values;
      const index = values.indexOf(highlightedValue) - 1;
      setHighlightedValue(index >= 0
        ? values[index]
        : values[values.length - 1]);
    }
    if (event.key === 'ArrowDown') {
      handled = true;
      const values = options.values;
      const index = values.indexOf(highlightedValue) + 1;
      setHighlightedValue(index < values.length
        ? values[index]
        : values[0]);
    }
    if (event.key === 'Home') {
      handled = true;
      const values = options.values;
      setHighlightedValue(values[0]);
    }
    if (event.key === 'End') {
      handled = true;
      const values = options.values;
      setHighlightedValue(values[values.length - 1]);
    }
    if (event.key === 'Enter') {
      handled = true;
      setSelectedValue(highlightedValue);
    }
    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    const optionId = options.idOf(highlightedValue);
    if (!optionId) {
      return;
    }

    const listbox = window.document.getElementById(listboxId);
    const option = window.document.getElementById(optionId);
    if (!listbox || !option) {
      return;
    }

    const listboxRect = listbox.getBoundingClientRect();
    const optionRect = option.getBoundingClientRect();
    if (optionRect.top < listboxRect.top) {
      listbox.scrollTo({
        top: optionRect.top - listboxRect.top + listbox.scrollTop,
      });
    } else
      if (optionRect.bottom > listboxRect.bottom) {
        listbox.scrollTo({
          top: optionRect.bottom - listboxRect.bottom + listbox.scrollTop,
        });
      }
  }, [listboxId, options, highlightedValue]);

  const ctx: SearchSelectContext<Value> = {
    options: options,
    selectedValue,
    highlightedValue,
    setSelectedValue: setSelectedValue,
    setHighlightedValue: setHighlightedValue,
  };
  return (
    <Popover
      className="dc-search-select__popover"
      placement="bottom-start"
      isOpen={isOpen}
      onClose={closePopover}
      renderAnchor={({ ref }) => (
        <button
          ref={ref}
          className={classNames(className, {
            'dc-search-select': true,
            'dc-search-select_full-width': fullWidth,
            'dc-search-select_invalid': invalid,
            'dc-search-select_loading': loading,
            'dc-search-select_disabled': disabled,
            [`dc-search-select_size_${size}`]: size,
          })}
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-labelledby={labelledBy}
          tabIndex={disabled || loading ? -1 : undefined}
          type="button"
          onClick={handleButtonClick}
          onKeyDown={handleButtonKeyDown}
        >
          {typeof displayedValue === 'function'
            ? displayedValue(selectedValue)
            : displayedValue}
          <span className="dc-search-select__slot-right">
            {loading
              ? (
                  <Spinner
                    className="dc-search-select__spinner"
                    width="1.05em"
                    height="1.05em"
                  />
                )
              : (
                  <ChevronDown
                    className="dc-search-select__arrow"
                    width="1.05em"
                    height="1.05em"
                    strokeWidth={2}
                  />
                )}
          </span>
        </button>
      )}
    >
      <>
        <div className="dc-search-select__textbox">
          <TextInput
            id={textboxId}
            fullWidth={true}
            slotLeft={textboxIcon || <MagnifyingGlass width={16} height={16} />}
            placeholder={textboxPlaceholder}
            size="sm"
            type="text"
            role="combobox"
            aria-controls={listboxId}
            aria-expanded="true"
            aria-autocomplete="list"
            aria-activedescendant={options.idOf(highlightedValue)}
            aria-label={textboxAriaLabel}
            value={searchQuery}
            onChange={handleTextboxChange}
            onKeyDown={handleTextboxKeyDown}
          />
        </div>
        <SearchSelectContextProvider value={ctx}>
          <ul
            className="dc-search-select__listbox"
            id={listboxId}
            role="listbox"
          >
            {typeof children === 'function'
              ? children({
                  searchQuery,
                  searchQueryLowerCased: searchQuery.toLowerCase(),
                })
              : children}
          </ul>
        </SearchSelectContextProvider>
      </>
    </Popover>
  );
}

SearchSelect.Option = function SearchSelectOption<T>({
  className,
  value,
  children,
  caption,
}: {
  className?: string;
  value: T;
  children: ReactNode;
  caption?: ReactNode;
}) {
  const {
    options,
    selectedValue,
    highlightedValue,
    setSelectedValue,
    setHighlightedValue,
  } = useSearchSelectContext();
  const id = options.append(value);
  const selected = value === selectedValue;
  const highlighted = value === highlightedValue;
  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <li
      className={classNames(className, {
        'dc-search-select-option': true,
        'dc-search-select-option_selected': selected,
        'dc-search-select-option_highlighted': highlighted,
      })}
      id={id}
      role="option"
      aria-selected={highlighted}
      onClick={() => setSelectedValue(value)}
      onMouseEnter={() => setHighlightedValue(value)}
    >
      <div className="dc-search-select-option__label">
        {children}
      </div>
      {caption
        ? <div className="dc-search-select-option__caption">{caption}</div>
        : null}
    </li>
  );
};

SearchSelect.Separator = function SearchSelectSeparator({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <li
      className={classNames('dc-search-select-separator', className)}
      role="separator"
    >
      {children
        ? <div className="dc-search-select-separator__label">{children}</div>
        : null}
    </li>
  );
};

SearchSelect.ButtonLabel = function SearchSelectButtonLabel({
  className,
  icon,
  value,
  children,
}: {
  className?: string;
  icon?: ReactNode;
  value: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={classNames('dc-search-select-button-label', className)}>
      {icon}
      <span>
        {children} <b>{value}</b>
      </span>
    </div>
  );
};
