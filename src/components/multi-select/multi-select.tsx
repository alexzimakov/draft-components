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

export type MultiSelectItemFilter<T extends MultiSelectItem> = (searchQuery: string, item: T) => boolean;

export type MultiSelectItemLabelGetter<T extends MultiSelectItem> = (item: T) => ReactNode;

export type MultiSelectItemCaptionGetter<T extends MultiSelectItem> = (item: T) => ReactNode;

export type MultiSelectSelectedItemIdsChangeHandler<T extends MultiSelectItem> = (ids: T['id'][]) => void;

export type MultiSelectOpenHandler = () => void;

export type MultiSelectCloseHandler = () => void;

export type MultiSelectMessages = {
  noData?: ReactNode;
  notFound?: ReactNode;
};

export function MultiSelect<T extends MultiSelectItem>({
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
  selectedItemIds: checkedItemIds,
  onChangeSelectedItemIds: onChangeCheckedItemIds,
  filterItem,
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
  items: T[];
  itemsError?: ReactNode;
  itemsLoading?: boolean;
  invalid?: boolean;
  selectedItemIds: T['id'][];
  onChangeSelectedItemIds: MultiSelectSelectedItemIdsChangeHandler<T>;
  filterItem: MultiSelectItemFilter<T>;
  getItemLabel: MultiSelectItemLabelGetter<T>;
  getItemCaption?: MultiSelectItemCaptionGetter<T>;
  onOpen?: MultiSelectOpenHandler;
  onClose?: MultiSelectCloseHandler;
}) {
  type ItemId = T['id'];

  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const inputId = defaultInputId || `${id}-multi-select-input`;
  const buttonId = `${id}-multi-select-button`;
  const listBoxId = `${id}-multi-select-list-box`;
  const getOptionId = (itemId: ItemId) => `${id}-multi-select-option-${itemId}`;
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<ItemId | undefined>(undefined);

  const checkedItemIdSet = new Set(checkedItemIds);
  const checkedItems: T[] = [];
  const filteredItems: T[] = [];
  for (const item of items) {
    if (filterItem(search, item)) {
      filteredItems.push(item);
    }
    if (checkedItemIdSet.has(item.id)) {
      checkedItems.push(item);
    }
  }

  const openListBox = () => {
    if (expanded) {
      return;
    }

    const containerEl = ref.current;
    if (!containerEl) {
      return;
    }

    const inputEl = document.getElementById(inputId);
    if (inputEl instanceof HTMLInputElement) {
      inputEl.focus();
    }
    setExpanded(true);

    if (typeof onOpen === 'function') {
      onOpen();
    }
  };

  const closeListBox = () => {
    setExpanded(false);
    setSelectedItemId(undefined);

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const toggleItem = (itemId: ItemId) => {
    const newCheckedItemIdSet = new Set(checkedItemIdSet);
    if (newCheckedItemIdSet.has(itemId)) {
      newCheckedItemIdSet.delete(itemId);
    } else {
      newCheckedItemIdSet.add(itemId);
    }
    onChangeCheckedItemIds(Array.from(newCheckedItemIdSet));
  };

  const selectItemAndScrollIfNeeded = (itemId: ItemId) => {
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
          const selectedItemIndex = filteredItems.findIndex((item) => item.id === selectedItemId);
          const newSelectedItem = selectedItemIndex >= 0 && selectedItemIndex < lastItemIndex
            ? filteredItems[selectedItemIndex + 1]
            : filteredItems[firstItemIndex];
          selectItemAndScrollIfNeeded(newSelectedItem.id);
        }
        handled = true;
        break;
      case 'Up':
      case 'ArrowUp':
        openListBox();
        if (filteredItems.length > 0 && !event.altKey) {
          const firstItemIndex = 0;
          const lastItemIndex = filteredItems.length - 1;
          const selectedItemIndex = filteredItems.findIndex((item) => item.id === selectedItemId);
          const newSelectedItem = selectedItemIndex >= 0 && selectedItemIndex > firstItemIndex
            ? filteredItems[selectedItemIndex - 1]
            : filteredItems[lastItemIndex];
          selectItemAndScrollIfNeeded(newSelectedItem.id);
        }
        handled = true;
        break;
      case 'Home':
        if (expanded && selectedItemId && filteredItems.length > 0) {
          const firstItem = filteredItems[0];
          selectItemAndScrollIfNeeded(firstItem.id);
          handled = true;
        }
        break;
      case 'End':
        if (expanded && selectedItemId && filteredItems.length > 0) {
          const lastItem = filteredItems[filteredItems.length - 1];
          selectItemAndScrollIfNeeded(lastItem.id);
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
    listBoxContent = filteredItems.map((item) => (
      <MultiSelectOption<ItemId>
        key={item.id}
        id={item.id}
        label={getItemLabel(item)}
        caption={getItemCaption(item)}
        optionId={getOptionId(item.id)}
        checked={checkedItemIdSet.has(item.id)}
        selected={selectedItemId === item.id}
        onCheck={toggleItem}
        onSelect={setSelectedItemId}
      />
    ));
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
        <ul
          id={listBoxId}
          className="dc-multi-select__list-box"
          role="listbox"
          hidden={!expanded}
        >
          {listBoxContent}
        </ul>
      </div>
      {checkedItems.length > 0 && (
        <div className="dc-multi-select__chips">
          {checkedItems.map((item) => (
            <MultiSelectChip
              key={item.id}
              itemId={item.id}
              tint={chipTint}
              style={chipStyle}
              onDelete={toggleItem}
            >
              {getItemLabel(item)}
            </MultiSelectChip>
          ))}
        </div>
      )}
    </div>
  );
}

function MultiSelectOption<T extends string | number>({
  id,
  label,
  caption,
  optionId,
  checked,
  selected,
  onCheck,
  onSelect,
}: {
  id: T;
  label: ReactNode;
  caption?: ReactNode;
  optionId: string;
  checked: boolean;
  selected: boolean;
  onCheck: (itemId: T) => void;
  onSelect: (itemId: T) => void;
}) {
  const handlePointerDown: PointerEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onCheck(id);
  };

  const handlePointerOver: PointerEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(id);
  };

  return (
    <li
      id={optionId}
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
