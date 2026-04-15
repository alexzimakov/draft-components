import { KeyboardKey } from '../../lib/keyboard-key.js';
import { classNames, tryToFocusElement } from '../../lib/react-helpers.js';
import { getElementBoundingRect } from '../../lib/get-element-bounding-rect.js';
import {
  useId,
  useRef,
  useState,
  useEffect,
  useCallback,
  type CSSProperties,
  type ReactNode,
  type PointerEventHandler,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  type MouseEventHandler,
  type ComponentProps,
} from 'react';
import { useSafeRef } from '../../hooks/use-safe-ref.js';
import { useCallbackRef } from '../../hooks/use-callback-ref.js';
import { useCloseOnEsc } from '../../hooks/use-close-on-esc.js';
import { useCloseOnClickOutside } from '../../hooks/use-close-on-click-outside.js';
import { Spinner } from '../spinner/spinner.js';

export type SearchSelectSize = 'sm' | 'md' | 'lg';

export type SearchSelectItem = { id: string | number };

export type SearchSelectItemFilter<T> = (searchQuery: string, item: T) => boolean;

export type SearchSelectItemIdGetter<T, R> = (item: T) => R;

export type SearchSelectItemLabelGetter<T> = (item: T) => ReactNode;

export type SearchSelectItemCaptionGetter<T> = (item: T) => ReactNode;

export type SearchSelectRenderButtonLabel<T> = (item: T | null) => ReactNode;

export type SearchSelectChangeHandler<T> = (id: T) => void;

export type SearchSelectOpenHandler = () => void;

export type SearchSelectCloseHandler = () => void;

export function SearchSelect<IdType extends string | number, ItemType = unknown>({
  style,
  className,
  fullWidth = false,
  size = 'md',
  inputId: defaultInputId,
  inputAriaLabel,
  inputPlaceholder,
  noDataMessage = 'No data',
  notFoundMessage = 'Not found',
  itemsLoadingMessage = 'Loading data...',
  items,
  itemsError,
  itemsLoading,
  loading,
  invalid,
  disabled,
  readOnly,
  icon,
  value,
  onChange,
  filterItem,
  getItemId,
  getItemLabel,
  getItemCaption = () => undefined,
  buttonLabel = (item) => item ? getItemLabel(item) : '',
  onOpen = () => undefined,
  onClose = () => undefined,
}: {
  style?: CSSProperties;
  className?: string;
  fullWidth?: boolean;
  size?: SearchSelectSize;
  inputId?: string;
  inputAriaLabel?: string;
  inputPlaceholder?: string;
  noDataMessage?: ReactNode;
  notFoundMessage?: ReactNode;
  itemsLoadingMessage?: ReactNode;
  items: ItemType[];
  itemsError?: ReactNode;
  itemsLoading?: boolean;
  loading?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  icon?: ReactNode;
  value: IdType | null;
  onChange: SearchSelectChangeHandler<IdType>;
  filterItem: SearchSelectItemFilter<ItemType>;
  getItemId: SearchSelectItemIdGetter<ItemType, IdType>;
  getItemLabel: SearchSelectItemLabelGetter<ItemType>;
  getItemCaption?: SearchSelectItemCaptionGetter<ItemType>;
  buttonLabel?: SearchSelectRenderButtonLabel<ItemType>;
  onOpen?: SearchSelectOpenHandler;
  onClose?: SearchSelectCloseHandler;
}) {
  const id = useId();
  const inputId = defaultInputId || `${id}-search-select-input`;
  const listBoxId = defaultInputId || `${id}-search-select-list-box`;
  const getOptionId = useCallback((itemId: IdType) => `${id}-search-select-option-${itemId}`, [id]);
  const containerRef = useSafeRef<HTMLDivElement>('SearchSelect: containerRef is not set.');
  const buttonRef = useSafeRef<HTMLButtonElement>('SearchSelect: buttonRef is not set.');
  const inputRef = useSafeRef<HTMLInputElement>('SearchSelect: inputRef is not set.');
  const popupRef = useSafeRef<HTMLDivElement>('SearchSelect: popupRef is not set.');
  const valueRef = useRef(value);
  const [expanded, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemId, setSelectedItemId] = useState<IdType | undefined>(undefined);

  const filteredItems: ItemType[] = [];
  let checkedItem: ItemType | null = null;
  for (const item of items) {
    if (filterItem(searchQuery, item)) {
      filteredItems.push(item);
    }
    if (value === getItemId(item)) {
      checkedItem = item;
    }
  }

  const scrollToItem = useCallbackRef((itemId: IdType, options: ScrollIntoViewOptions = { block: 'nearest' }) => {
    const optionId = getOptionId(itemId);
    const listBoxEl = containerRef.current.querySelector(`#${listBoxId}`);
    const optionEl = containerRef.current.querySelector(`#${optionId}`);
    if (
      listBoxEl instanceof HTMLElement
      && optionEl instanceof HTMLElement
      && !isElementVisibleInsideParent(listBoxEl, optionEl)
    ) {
      optionEl.scrollIntoView(options);
    }
  });

  const openPopup = () => {
    setIsOpen(true);
    onOpen();
  };

  const closePopup = () => {
    setIsOpen(false);
    setSearchQuery('');
    setSelectedItemId(undefined);
    onClose();
  };

  const checkItem = (itemId: IdType) => {
    onChange(itemId);
    closePopup();
  };

  const selectItemAndScrollIfNeeded = (itemId: IdType) => {
    setSelectedItemId(itemId);
    scrollToItem(itemId);
  };

  const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (readOnly) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (expanded) {
      closePopup();
    } else {
      openPopup();
    }
  };

  const handleButtonKeyDown: KeyboardEventHandler<HTMLButtonElement> = (event) => {
    if (readOnly) {
      return;
    }
    if (
      event.key === KeyboardKey.SPACE
      || event.key === KeyboardKey.ARROW_UP
      || event.key === KeyboardKey.ARROW_DOWN
    ) {
      event.preventDefault();
      event.stopPropagation();
      openPopup();
    }
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchQuery(event.target.value);
    setSelectedItemId(undefined);
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.ctrlKey || event.shiftKey) {
      return;
    }

    let handled = false;
    switch (event.key) {
      case KeyboardKey.ENTER:
        if (expanded && selectedItemId) {
          checkItem(selectedItemId);
          handled = true;
        }
        break;
      case KeyboardKey.ARROW_DOWN:
        if (filteredItems.length > 0 && !event.altKey) {
          const firstItemIndex = 0;
          const lastItemIndex = filteredItems.length - 1;
          const selectedItemIndex = filteredItems.findIndex((item) => getItemId(item) === selectedItemId);
          const newSelectedItem = selectedItemIndex >= 0 && selectedItemIndex < lastItemIndex
            ? filteredItems[selectedItemIndex + 1]
            : filteredItems[firstItemIndex];
          selectItemAndScrollIfNeeded(getItemId(newSelectedItem));
        }
        handled = true;
        break;
      case KeyboardKey.ARROW_UP:
        if (filteredItems.length > 0 && !event.altKey) {
          const firstItemIndex = 0;
          const lastItemIndex = filteredItems.length - 1;
          const selectedItemIndex = filteredItems.findIndex((item) => getItemId(item) === selectedItemId);
          const newSelectedItem = selectedItemIndex >= 0 && selectedItemIndex > firstItemIndex
            ? filteredItems[selectedItemIndex - 1]
            : filteredItems[lastItemIndex];
          selectItemAndScrollIfNeeded(getItemId(newSelectedItem));
        }
        handled = true;
        break;
      case KeyboardKey.HOME:
        if (expanded && filteredItems.length > 0) {
          const firstItem = filteredItems[0];
          selectItemAndScrollIfNeeded(getItemId(firstItem));
          handled = true;
        }
        break;
      case KeyboardKey.END:
        if (expanded && filteredItems.length > 0) {
          const lastItem = filteredItems[filteredItems.length - 1];
          selectItemAndScrollIfNeeded(getItemId(lastItem));
          handled = true;
        }
        break;
      case KeyboardKey.ESCAPE:
        closePopup();
        handled = true;
        break;
      default:
        break;
    }

    if (handled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (expanded) {
      const inputEl = inputRef.current;
      const buttonEl = buttonRef.current;
      tryToFocusElement(inputEl);
      return () => {
        tryToFocusElement(buttonEl);
      };
    }
  }, [expanded, inputRef, buttonRef]);

  useEffect(() => {
    if (expanded && valueRef.current) {
      setSelectedItemId(valueRef.current);
      scrollToItem(valueRef.current, { block: 'center' });
    }
  }, [expanded, scrollToItem]);

  useCloseOnEsc(closePopup, {
    disabled: !expanded,
  });

  useCloseOnClickOutside(closePopup, {
    ref: popupRef,
    disabled: !expanded,
    shouldIgnoreClick: (node) => containerRef.current.contains(node) === true,
  });

  let content: ReactNode;
  if (!expanded) {
    content = null;
  } else if (itemsLoading) {
    content = (
      <div className="dc-search-select__empty-state">
        {itemsLoadingMessage}
      </div>
    );
  } else if (itemsError) {
    content = (
      <div className="dc-search-select__empty-state dc-search-select__empty-state_error">
        {itemsError instanceof Error ? itemsError.message : String(itemsError)}
      </div>
    );
  } else if (items.length === 0) {
    content = (
      <div className="dc-search-select__empty-state">
        {noDataMessage}
      </div>
    );
  } else if (filteredItems.length === 0) {
    content = (
      <div className="dc-search-select__empty-state">
        {notFoundMessage}
      </div>
    );
  } else {
    content = (
      <ul
        id={listBoxId}
        className="dc-search-select__list-box"
        role="listbox"
      >
        {filteredItems.map((item) => {
          const itemId = getItemId(item);
          return (
            <SearchSelectOption
              key={itemId}
              id={getOptionId(itemId)}
              itemId={itemId}
              label={getItemLabel(item)}
              caption={getItemCaption(item)}
              checked={itemId === value}
              selected={selectedItemId === itemId}
              onCheck={checkItem}
              onSelect={setSelectedItemId}
            />
          );
        })}
      </ul>
    );
  }

  return (
    <div
      ref={containerRef}
      style={style}
      className={classNames(className, {
        'dc-search-select': true,
        'dc-search-select_full-width': fullWidth,
      })}
    >
      <button
        ref={buttonRef}
        className={classNames({
          'dc-search-select__button': true,
          [`dc-search-select__button_size_${size}`]: size,
        })}
        type="button"
        disabled={disabled}
        data-invalid={invalid}
        aria-haspopup="listbox"
        aria-expanded={expanded}
        aria-controls={listBoxId}
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
      >
        {icon && (
          <span className="dc-search-select__button-slot">
            {icon}
          </span>
        )}
        <span className="dc-search-select__button-label">
          {buttonLabel(checkedItem)}
        </span>
        <span className="dc-search-select__button-slot">
          {loading
            ? <Spinner size="1em" />
            : <CaretDownFillIcon className="dc-search-select__caret" width="0.75em" height="0.75em" />}
        </span>
      </button>
      {expanded && (
        <div ref={popupRef} className="dc-search-select__popup">
          <input
            ref={inputRef}
            id={inputId}
            className="dc-search-select__input"
            placeholder={inputPlaceholder}
            role="combobox"
            aria-label={inputAriaLabel}
            aria-controls={listBoxId}
            aria-expanded={expanded}
            aria-activedescendant={checkedItem ? getOptionId(getItemId(checkedItem)) : undefined}
            aria-autocomplete="none"
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <div className="dc-search-select__content">
            {content}
          </div>
        </div>
      )}
    </div>
  );
}

function SearchSelectOption<IdType extends string | number>({
  id,
  itemId,
  label,
  caption,
  checked,
  selected,
  onCheck,
  onSelect,
}: {
  id: string;
  itemId: IdType;
  label: ReactNode;
  caption?: ReactNode;
  checked: boolean;
  selected: boolean;
  onCheck: (itemId: IdType) => void;
  onSelect: (itemId: IdType) => void;
}) {
  const handlePointerDown: PointerEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onCheck(itemId);
  };

  const handlePointerOver: PointerEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(itemId);
  };

  return (
    <li
      id={id}
      className="dc-search-select__option"
      role="option"
      aria-checked={checked}
      aria-selected={selected}
      onPointerDown={handlePointerDown}
      onPointerOver={handlePointerOver}
    >
      <div className="dc-search-select__option-label">
        {label}
      </div>
      {caption && <div className="dc-search-select__option-caption">{caption}</div>}
    </li>
  );
}

function CaretDownFillIcon({
  width = 24,
  height = 24,
  ...props
}: ComponentProps<'svg'>) {
  return (
    <svg fill="currentColor" width={width} height={height} {...props} viewBox="0 0 16 16">
      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>
  );
}

function isElementVisibleInsideParent(parent: HTMLElement, child: HTMLElement) {
  const parentRect = getElementBoundingRect(parent);
  const childRect = getElementBoundingRect(child);
  return childRect.top >= parentRect.top && childRect.bottom <= parentRect.bottom;
}
