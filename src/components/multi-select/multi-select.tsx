import {
  useId,
  useRef,
  useState,
  type ReactNode,
  type MouseEventHandler,
  type PointerEventHandler,
  type FocusEventHandler,
  type KeyboardEventHandler,
  type ChangeEventHandler,
  type CSSProperties,
} from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { Spinner } from '../spinner/index.js';
import { TextInput } from '../text-input/index.js';
import { Tag } from '../tag/index.js';
import { CheckIcon, ChevronDownIcon, XMarkIcon } from './icons.js';
import { getElementBoundingRect } from '../../lib/get-element-bounding-rect.js';

export type MultiSelectSize = 'sm' | 'md' | 'lg';

export type MultiSelectChipTint = | 'gray'
  | 'green'
  | 'lime'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow';

export type MultiSelectChipStyle = 'default' | 'filled' | 'tinted';

export type MultiSelectItem = { id: string | number };

export type MultiSelectItemFilter<T> = (searchQuery: string, item: T) => boolean;

export type MultiSelectItemIdGetter<T, R> = (item: T) => R;

export type MultiSelectItemLabelGetter<T> = (item: T) => ReactNode;

export type MultiSelectItemCaptionGetter<T> = (item: T) => ReactNode;

export type MultiSelectSelectedItemIdsChangeHandler<T> = (ids: T[]) => void;

export type MultiSelectOpenHandler = () => void;

export type MultiSelectCloseHandler = () => void;

export type MultiSelectMessages = {
  noData?: ReactNode;
  notFound?: ReactNode;
};

export function MultiSelect<IdType extends string | number, ItemType = unknown>({
  style,
  className,
  size = 'md',
  inputId: defaultInputId,
  inputAriaLabel,
  chipTint = 'blue',
  chipStyle = 'default',
  placeholder,
  noDataMessage = 'No data',
  notFoundMessage = 'Not found',
  itemsLoadingMessage = 'Loading...',
  items,
  itemsError,
  itemsLoading,
  invalid,
  disabled,
  selectedItemIds: checkedItemIds,
  onChangeSelectedItemIds: onChangeCheckedItemIds,
  filterItem,
  getItemId,
  getItemLabel,
  getItemCaption = () => undefined,
  onOpen,
  onClose,
}: {
  style?: CSSProperties;
  className?: string;
  size?: MultiSelectSize;
  inputId?: string;
  inputAriaLabel?: string;
  chipTint?: MultiSelectChipTint;
  chipStyle?: MultiSelectChipStyle;
  placeholder?: string;
  noDataMessage?: ReactNode;
  notFoundMessage?: ReactNode;
  itemsLoadingMessage?: ReactNode;
  items: ItemType[];
  itemsError?: ReactNode;
  itemsLoading?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  selectedItemIds: IdType[];
  onChangeSelectedItemIds: MultiSelectSelectedItemIdsChangeHandler<IdType>;
  filterItem: MultiSelectItemFilter<ItemType>;
  getItemId: MultiSelectItemIdGetter<ItemType, IdType>;
  getItemLabel: MultiSelectItemLabelGetter<ItemType>;
  getItemCaption?: MultiSelectItemCaptionGetter<ItemType>;
  onOpen?: MultiSelectOpenHandler;
  onClose?: MultiSelectCloseHandler;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const inputId = defaultInputId || `${id}-multi-select-input`;
  const buttonId = `${id}-multi-select-button`;
  const listBoxId = `${id}-multi-select-list-box`;
  const getOptionId = (itemId: IdType) => `${id}-multi-select-option-${itemId}`;
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<IdType | undefined>(undefined);

  const checkedItemIdSet = new Set(checkedItemIds);
  const checkedItems: ItemType[] = [];
  const filteredItems: ItemType[] = [];
  for (const item of items) {
    if (filterItem(search, item)) {
      filteredItems.push(item);
    }
    if (checkedItemIdSet.has(getItemId(item))) {
      checkedItems.push(item);
    }
  }

  const openListBox = () => {
    const containerEl = ref.current;
    if (!disabled && !expanded && containerEl) {
      const inputEl = document.getElementById(inputId);
      if (inputEl instanceof HTMLInputElement) {
        inputEl.focus();
      }
      setExpanded(true);
      if (typeof onOpen === 'function') {
        onOpen();
      }
    }
  };

  const closeListBox = () => {
    setExpanded(false);
    setSelectedItemId(undefined);

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const toggleItem = (itemId: IdType) => {
    const newCheckedItemIdSet = new Set(checkedItemIdSet);
    if (newCheckedItemIdSet.has(itemId)) {
      newCheckedItemIdSet.delete(itemId);
    } else {
      newCheckedItemIdSet.add(itemId);
    }
    onChangeCheckedItemIds(Array.from(newCheckedItemIdSet));
  };

  const selectItemAndScrollIfNeeded = (itemId: IdType) => {
    setSelectedItemId(itemId);
    const containerEl = ref.current;
    if (containerEl && itemId) {
      const optionId = getOptionId(itemId);
      const listBoxEl = containerEl.querySelector(`#${listBoxId}`) as HTMLElement;
      const optionEl = containerEl.querySelector(`#${optionId}`) as HTMLElement;
      if (listBoxEl && optionEl) {
        const isOptionVisible = isElementVisibleInsideParent(listBoxEl, optionEl);
        if (!isOptionVisible) {
          optionEl.scrollIntoView({ block: 'nearest' });
        }
      }
    }
  };

  const handleButtonPress: PointerEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (expanded) {
      closeListBox();
    } else {
      openListBox();
    }
  };

  const handleInputClick: MouseEventHandler<HTMLInputElement> = () => {
    openListBox();
  };

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = () => {
    closeListBox();
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
    setSelectedItemId(undefined);
    openListBox();
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.ctrlKey || event.shiftKey) {
      return;
    }

    let handled = false;
    switch (event.key) {
      case 'Enter':
      case ' ':
        if (expanded && selectedItemId) {
          toggleItem(selectedItemId);
          handled = true;
        }
        break;
      case 'Down':
      case 'ArrowDown':
        openListBox();
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
      case 'Up':
      case 'ArrowUp':
        openListBox();
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
      case 'Home':
        if (expanded && selectedItemId && filteredItems.length > 0) {
          const firstItem = filteredItems[0];
          selectItemAndScrollIfNeeded(getItemId(firstItem));
          handled = true;
        }
        break;
      case 'End':
        if (expanded && selectedItemId && filteredItems.length > 0) {
          const lastItem = filteredItems[filteredItems.length - 1];
          selectItemAndScrollIfNeeded(getItemId(lastItem));
          handled = true;
        }
        break;
      case 'Esc':
      case 'Escape':
        closeListBox();
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

  let listBoxContent: ReactNode;
  if (!expanded) {
    listBoxContent = null;
  } else if (itemsLoading) {
    listBoxContent = (
      <li className="dc-multi-select__empty-state dc-multi-select__empty-state_loading">
        <Spinner size="1em" /> {itemsLoadingMessage}
      </li>
    );
  } else if (itemsError) {
    listBoxContent = (
      <li className="dc-multi-select__empty-state dc-multi-select__empty-state_error">
        {itemsError}
      </li>
    );
  } else if (items.length === 0) {
    listBoxContent = (
      <li className="dc-multi-select__empty-state">
        {noDataMessage}
      </li>
    );
  } else if (filteredItems.length === 0) {
    listBoxContent = (
      <li className="dc-multi-select__empty-state">
        {notFoundMessage}
      </li>
    );
  } else {
    listBoxContent = filteredItems.map((item) => {
      const itemId = getItemId(item);
      return (
        <MultiSelectOption<IdType>
          key={itemId}
          id={getOptionId(itemId)}
          itemId={itemId}
          label={getItemLabel(item)}
          caption={getItemCaption(item)}
          checked={checkedItemIdSet.has(itemId)}
          selected={selectedItemId === itemId}
          onCheck={toggleItem}
          onSelect={setSelectedItemId}
        />
      );
    });
  }

  return (
    <div
      ref={ref}
      style={style}
      className={classNames('dc-multi-select', className)}
      data-expanded={expanded}
    >
      <div className="dc-multi-select__input-container">
        <TextInput
          id={inputId}
          fullWidth={true}
          size={size}
          placeholder={placeholder}
          type="text"
          role="combobox"
          aria-label={inputAriaLabel}
          aria-expanded={expanded}
          aria-controls={listBoxId}
          aria-activedescendant={selectedItemId ? getOptionId(selectedItemId) : undefined}
          value={search}
          invalid={invalid}
          disabled={disabled}
          data-1p-ignore={true}
          onClick={handleInputClick}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          slotRight={() => (
            <button
              id={buttonId}
              className="dc-multi-select__button"
              type="button"
              aria-expanded={expanded}
              aria-controls={listBoxId}
              tabIndex={-1}
              onPointerDown={handleButtonPress}
            >
              <ChevronDownIcon data-icon="chevron-down" width={20} height={20} />
            </button>
          )}
        />
        {listBoxContent && (
          <ul
            id={listBoxId}
            className="dc-multi-select__list-box"
            role="listbox"
          >
            {listBoxContent}
          </ul>
        )}
      </div>
      {checkedItems.length > 0 && (
        <div className="dc-multi-select__chips">
          {checkedItems.map((item) => {
            const itemId = getItemId(item);
            return (
              <MultiSelectChip
                key={itemId}
                itemId={itemId}
                tint={chipTint}
                style={chipStyle}
                onDelete={toggleItem}
              >
                {getItemLabel(item)}
              </MultiSelectChip>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MultiSelectOption<IdType extends string | number>({
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
      className="dc-multi-select__option"
      role="option"
      aria-checked={checked}
      aria-selected={selected}
      onPointerDown={handlePointerDown}
      onPointerOver={handlePointerOver}
    >
      <div className="dc-multi-select__option-checkbox">
        <CheckIcon data-icon="check" width={16} height={16} />
      </div>
      <div className="dc-multi-select__option-body">
        <span className="dc-multi-select__option-label">
          {label}
        </span>
        {caption
          ? <small className="dc-multi-select__option-caption">{caption}</small>
          : null}
      </div>
    </li>
  );
}

function MultiSelectChip<T extends string | number>({
  tint,
  style,
  itemId,
  children,
  onDelete,
}: {
  tint?: MultiSelectChipTint;
  style?: MultiSelectChipStyle;
  itemId: T;
  children: ReactNode;
  onDelete: (itemId: T) => void;
}) {
  const handleButtonClick = () => {
    onDelete(itemId);
  };

  return (
    <Tag
      className="dc-multi-select__chip"
      as="span"
      size="lg"
      tint={tint}
      tagStyle={style}
    >
      {children}
      <button
        className="dc-multi-select__chip-button"
        type="button"
        onClick={handleButtonClick}
      >
        <XMarkIcon data-icon="x-mark" width={18} height={18} />
      </button>
    </Tag>
  );
}

function isElementVisibleInsideParent(parent: HTMLElement, child: HTMLElement) {
  const parentRect = getElementBoundingRect(parent);
  const childRect = getElementBoundingRect(child);
  return childRect.top >= parentRect.top && childRect.bottom <= parentRect.bottom;
}
