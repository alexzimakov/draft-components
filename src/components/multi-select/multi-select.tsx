import {
  useId,
  useRef,
  useState,
  useCallback,
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
import { IconButton } from '../button/index.js';
import { CheckIcon, ChevronDownIcon, XMarkIcon } from './icons.js';
import { getElementBoundingRect } from '../../lib/get-element-bounding-rect.js';

export type MultiSelectSize = 'sm' | 'md' | 'lg';

export type MultiSelectItem = { id: string | number };

export type MultiSelectItemFilter<T extends MultiSelectItem> = (searchQuery: string, item: T) => boolean;

export type MultiSelectItemLabelGetter<T extends MultiSelectItem> = (item: T) => ReactNode;

export type MultiSelectItemCaptionGetter<T extends MultiSelectItem> = (item: T) => ReactNode;

export type MultiSelectChangeCheckedItemsHandler<T extends MultiSelectItem> = (items: T[]) => void;

export type MultiSelectOpenHandler = () => void;

export type MultiSelectCloseHandler = () => void;

export type MultiSelectMessages = {
  noData?: ReactNode;
  notFound?: ReactNode;
};

export function MultiSelect<T extends MultiSelectItem>({
  id: defaultId,
  style,
  className,
  size = 'md',
  invalid,
  placeholder,
  noDataMessage = 'No data',
  notFoundMessage = 'Not found',
  itemsLoadingMessage = 'Loading...',
  items,
  itemsError,
  itemsLoading,
  checkedItems,
  filterItem,
  getItemLabel,
  getItemCaption,
  onChangeCheckedItems,
  onOpen,
  onClose,
}: {
  id?: string;
  style?: CSSProperties;
  className?: string;
  size?: MultiSelectSize;
  invalid?: boolean;
  placeholder?: string;
  noDataMessage?: ReactNode;
  notFoundMessage?: ReactNode;
  itemsLoadingMessage?: ReactNode;
  items: T[];
  itemsError?: ReactNode;
  itemsLoading?: boolean;
  checkedItems: T[];
  filterItem: MultiSelectItemFilter<T>;
  getItemLabel: MultiSelectItemLabelGetter<T>;
  getItemCaption?: MultiSelectItemCaptionGetter<T>;
  onChangeCheckedItems: MultiSelectChangeCheckedItemsHandler<T>;
  onOpen?: MultiSelectOpenHandler;
  onClose?: MultiSelectCloseHandler;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inputId = defaultId || `${id}multi-select-input`;
  const buttonId = `${id}multi-select-button`;
  const listBoxId = `${id}multi-select-list-box`;
  const getOptionId = useCallback((item: T) => `${id}multi-select-option-${item.id}`, [id]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | undefined>(undefined);
  const checkedItemSet = new Set(checkedItems);
  const filteredItems = items.filter((item) => filterItem(search, item));

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
    setSelectedItem(undefined);

    if (typeof onClose === 'function') {
      onClose();
    }
  };

  const toggleItem = (item: T) => {
    const newSelectedItemIdSet = new Set(checkedItemSet);
    if (newSelectedItemIdSet.has(item)) {
      newSelectedItemIdSet.delete(item);
    } else {
      newSelectedItemIdSet.add(item);
    }
    onChangeCheckedItems(Array.from(newSelectedItemIdSet));
  };

  const selectItemAndScrollIfNeeded = (item: T) => {
    setSelectedItem(item);
    const containerEl = ref.current;
    if (containerEl && item) {
      const optionId = getOptionId(item);
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
    setSelectedItem(undefined);
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
        if (expanded && selectedItem) {
          toggleItem(selectedItem);
          handled = true;
        }
        break;
      case 'Down':
      case 'ArrowDown':
        openListBox();
        if (filteredItems.length > 0 && !event.altKey) {
          const firstItemIndex = 0;
          const lastItemIndex = filteredItems.length - 1;
          const selectedItemIndex = filteredItems.findIndex((item) => item === selectedItem);
          const newSelectedItem = selectedItemIndex >= 0 && selectedItemIndex < lastItemIndex
            ? filteredItems[selectedItemIndex + 1]
            : filteredItems[firstItemIndex];
          selectItemAndScrollIfNeeded(newSelectedItem);
        }
        handled = true;
        break;
      case 'Up':
      case 'ArrowUp':
        openListBox();
        if (filteredItems.length > 0 && !event.altKey) {
          const firstItemIndex = 0;
          const lastItemIndex = filteredItems.length - 1;
          const selectedItemIndex = filteredItems.findIndex((item) => item === selectedItem);
          const newSelectedItem = selectedItemIndex >= 0 && selectedItemIndex > firstItemIndex
            ? filteredItems[selectedItemIndex - 1]
            : filteredItems[lastItemIndex];
          selectItemAndScrollIfNeeded(newSelectedItem);
        }
        handled = true;
        break;
      case 'Home':
        if (expanded && selectedItem && filteredItems.length > 0) {
          const firstItem = filteredItems[0];
          selectItemAndScrollIfNeeded(firstItem);
          handled = true;
        }
        break;
      case 'End':
        if (expanded && selectedItem && filteredItems.length > 0) {
          const lastItem = filteredItems[filteredItems.length - 1];
          selectItemAndScrollIfNeeded(lastItem);
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
      <MultiSelectOption<T>
        key={item.id}
        id={getOptionId(item)}
        item={item}
        checked={checkedItemSet.has(item)}
        selected={selectedItem === item}
        getLabel={getItemLabel}
        getCaption={getItemCaption}
        onCheck={toggleItem}
        onSelect={setSelectedItem}
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
          aria-expanded={expanded}
          aria-controls={listBoxId}
          aria-activedescendant={selectedItem ? getOptionId(selectedItem) : undefined}
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
      <div className="dc-multi-select__checked-items">
        {checkedItems.map((item) => (
          <Tag
            key={item.id}
            className="dc-multi-select__item"
            size="lg"
          >
            {getItemLabel(item)}
            <IconButton
              className="dc-multi-select__item-delete-button"
              buttonStyle="plain"
              size="xs"
              type="button"
              onClick={() => toggleItem(item)}
            >
              <XMarkIcon data-icon="x-mark" width={18} height={18} />
            </IconButton>
          </Tag>
        ))}
      </div>
    </div>
  );
}

function MultiSelectOption<T extends MultiSelectItem>({
  id,
  item,
  selected,
  checked,
  getLabel,
  getCaption,
  onCheck,
  onSelect,
}: {
  id: string;
  item: T;
  checked: boolean;
  selected: boolean;
  getLabel: MultiSelectItemLabelGetter<T>;
  getCaption?: MultiSelectItemCaptionGetter<T>;
  onCheck: (item: T) => void;
  onSelect: (item: T) => void;
}) {
  const handlePointerDown: PointerEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onCheck(item);
  };

  const handlePointerOver: PointerEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onSelect(item);
  };

  let caption: ReactNode;
  if (typeof getCaption === 'function') {
    caption = getCaption(item);
  }

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
        <b className="dc-multi-select__option-label">
          {getLabel(item)}
        </b>
        {caption
          ? <small className="dc-multi-select__option-caption">{caption}</small>
          : null}
      </div>
    </li>
  );
}

function isElementVisibleInsideParent(parent: HTMLElement, child: HTMLElement) {
  const parentRect = getElementBoundingRect(parent);
  const childRect = getElementBoundingRect(child);
  return childRect.top >= parentRect.top && childRect.bottom <= parentRect.bottom;
}
