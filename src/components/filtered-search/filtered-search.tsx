import {
  ChangeEventHandler,
  ComponentProps,
  FocusEventHandler,
  JSX,
  KeyboardEventHandler,
  MouseEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Filter, FilterConfig } from './types.js';
import { StringFilter } from './model/string-filter.js';
import { StringSetFilter } from './model/string-set-filter.js';
import { TranslationsProvider } from './use-translations.js';
import { useComboboxIds } from './use-combobox-ids.js';
import { IconButton } from '../button/index.js';
import { FilterItem } from './filter-item.js';
import { TrashIcon } from '../hero-icons/24/outline/trash-icon.js';
import { MagnifyingGlassIcon } from '../hero-icons/24/outline/magnifying-glass-icon.js';
import { KeyboardKeys, classNames, exhaustiveCheck } from '../../lib/index.js';

type FilteredSearchHTMLProps = ComponentProps<'div'>;

type FilteredSearchBaseProps = {
  placeholder?: string;
  applyButtonLabel?: string;
  cancelButtonLabel?: string;
  clearButtonAccessibleName?: string;
  removeFilterButtonAccessibleName?: string;
  filtersConfig: FilterConfig[];
  filters: Filter[];
  onChangeFilters: (filters: Filter[]) => void;
};

export type FilteredSearchProps =
  & FilteredSearchBaseProps
  & Omit<FilteredSearchHTMLProps, (keyof FilteredSearchBaseProps) | 'children'>;

export function FilteredSearch({
  filters: appliedFilters,
  className,
  placeholder = 'Search and filter',
  applyButtonLabel = 'Apply',
  cancelButtonLabel = 'Cancel',
  clearButtonAccessibleName = 'Clear',
  removeFilterButtonAccessibleName = 'Remove filter',
  filtersConfig,
  onChangeFilters,
  onMouseDown,
  ...props
}: FilteredSearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [newFilter, setNewFilter] = useState<Filter | null>(null);
  const [query, setQuery] = useState('');
  const [hasFocus, setHasFocus] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [activeField, setActiveField] = useState('');
  const { textBoxId, listBoxId, getOptionId } = useComboboxIds();

  let filters: Filter[];
  if (newFilter) {
    filters = [...appliedFilters, newFilter];
  } else {
    filters = appliedFilters;
  }

  const filtersConfigMap = useMemo(() => {
    const map = new Map<string, FilterConfig>();
    for (const config of filtersConfig) {
      map.set(getOptionId(config.field), config);
    }
    return map;
  }, [filtersConfig, getOptionId]);

  const getTextBoxElement = () => {
    const textBox = document.getElementById(textBoxId);
    if (!(textBox instanceof HTMLInputElement)) {
      throw new Error(`Unable to find input element with ID ${textBoxId}.`);
    }
    return textBox;
  };

  const addFilter = (filter: Filter) => {
    const newFilters = [...appliedFilters, filter];
    onChangeFilters(newFilters);
  };

  const updateFilter = (updatedFilter: Filter) => {
    const newFilters = appliedFilters.map((filter) => (
      filter.field === updatedFilter.field ? updatedFilter : filter
    ));
    onChangeFilters(newFilters);
  };

  const removeFilter = (removedFilter: Filter) => {
    const newFilters = appliedFilters.filter((filter) => (
      filter.field !== removedFilter.field
    ));
    onChangeFilters(newFilters);
  };

  const onFilterEditStarted = (filter: Filter) => {
    setActiveField(filter.field);
  };

  const onFilterEditCanceled = (filter: Filter) => {
    setActiveField('');
    if (filter.isEmpty()) {
      if (newFilter && filter.field === newFilter.field) {
        setNewFilter(null);
      } else {
        removeFilter(filter);
      }
      getTextBoxElement().focus();
    }
  };

  const onFilterChanged = (filter: Filter) => {
    if (newFilter && filter.field === newFilter.field) {
      addFilter(filter);
      setNewFilter(null);
    } else {
      updateFilter(filter);
    }
    setActiveField('');
  };

  const renderedFilters: JSX.Element[] = [];
  const fieldsWithAppliedFilters = new Set<string>();
  for (const filter of filters) {
    const field = filter.field;
    fieldsWithAppliedFilters.add(field);
    renderedFilters.push(
      <FilterItem
        key={field}
        filter={filter}
        isEditing={activeField === field}
        onEditStart={onFilterEditStarted}
        onEditCancel={onFilterEditCanceled}
        onChange={onFilterChanged}
        onRemove={removeFilter}
      />,
    );
  }

  const onOptionSelected = (config: FilterConfig) => {
    const filter = createFilter(config);
    const textBoxElement = getTextBoxElement();
    setQuery('');
    setNewFilter(filter);
    setActiveField(filter.field);
    textBoxElement.blur();
  };

  const onOptionHovered: MouseEventHandler<HTMLLIElement> = (event) => {
    const listItemElement = event.currentTarget;
    setSelectedId(listItemElement.id);
  };

  const onOptionPressed: MouseEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const listItemElement = event.currentTarget;
    const config = filtersConfigMap.get(listItemElement.id);
    if (config) {
      onOptionSelected(config);
    }
  };

  const renderedOptions: JSX.Element[] = [];
  const search = query.toLowerCase();
  for (const [id, config] of filtersConfigMap) {
    if (fieldsWithAppliedFilters.has(config.field)) {
      continue;
    }
    if (!config.label.toLowerCase().includes(search)) {
      continue;
    }
    renderedOptions.push(
      <li
        key={id}
        id={id}
        role="option"
        data-field={config.field}
        aria-selected={selectedId === id}
        onMouseEnter={onOptionHovered}
        onMouseDown={onOptionPressed}
      >
        {config.label}
      </li>,
    );
  }

  const onInputFocused: FocusEventHandler<HTMLInputElement> = () => {
    setHasFocus(true);
    setExpanded(true);
  };

  const onInputBlurred: FocusEventHandler<HTMLInputElement> = () => {
    setExpanded(false);
    setHasFocus(false);
    setQuery('');
    setSelectedId('');
  };

  const onInputKeyPressed: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const key = event.key;
    const inputElement = event.currentTarget;
    const optionIds = renderedOptions.map((opt) => opt.props.id);
    const firstIndex = 0;
    const lastIndex = optionIds.length - 1;
    const selectedIdIndex = optionIds.findIndex((id) => id === selectedId);

    let isHandled = false;
    let nextIdIndex = selectedIdIndex;
    if (key === KeyboardKeys.ArrowDown) {
      nextIdIndex = selectedIdIndex + 1;
      isHandled = true;
    } else if (key === KeyboardKeys.ArrowUp) {
      nextIdIndex = selectedIdIndex - 1;
      isHandled = true;
    } else if (key === KeyboardKeys.Enter) {
      const config = filtersConfigMap.get(selectedId);
      if (config) {
        onOptionSelected(config);
        isHandled = true;
      }
    } else if (key === KeyboardKeys.Backspace) {
      if (query === '' && filters.length > 0) {
        onChangeFilters(filters.slice(0, -1));
        isHandled = true;
      }
    } else if (key === KeyboardKeys.Escape) {
      inputElement.blur();
      isHandled = true;
    }

    if (nextIdIndex !== selectedIdIndex) {
      if (nextIdIndex < firstIndex) {
        nextIdIndex = lastIndex;
      }
      if (nextIdIndex > lastIndex) {
        nextIdIndex = firstIndex;
      }
      setSelectedId(optionIds[nextIdIndex]);
    } else if (renderedOptions.length === 0) {
      setSelectedId('');
    }

    if (isHandled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const onInputChanged: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
  };

  const onClearButtonPressed: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    event.stopPropagation();
    onChangeFilters([]);
  };

  const onContainerPressed: MouseEventHandler<HTMLDivElement> = (event) => {
    if (event.currentTarget === event.target) {
      const textBoxElement = getTextBoxElement();
      textBoxElement.focus();
      event.stopPropagation();
      event.preventDefault();
    }
    if (typeof onMouseDown === 'function') {
      onMouseDown(event);
    }
  };

  return (
    <TranslationsProvider
      applyButton={applyButtonLabel}
      cancelButton={cancelButtonLabel}
      removeFilterButton={removeFilterButtonAccessibleName}
    >
      <div
        ref={containerRef}
        data-testid="combobox-container"
        className={classNames(className, {
          'dc-filtered-search': true,
          'dc-filtered-search_has_focus': hasFocus,
        })}
        role="presentation"
        onMouseDown={onContainerPressed}
        {...props}
      >
        <MagnifyingGlassIcon
          className="dc-filtered-search__icon"
          width={18}
          height={18}
        />
        <div className="dc-filtered-search__filters">
          {renderedFilters}
          <input
            className="dc-filtered-search__input"
            id={textBoxId}
            placeholder={placeholder}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={expanded}
            aria-controls={listBoxId}
            aria-activedescendant={selectedId}
            value={query}
            onFocus={onInputFocused}
            onBlur={onInputBlurred}
            onKeyDown={onInputKeyPressed}
            onChange={onInputChanged}
          />
        </div>
        <IconButton
          className="dc-filtered-search__clear-button"
          aria-label={clearButtonAccessibleName}
          buttonStyle="plain"
          tint="blue"
          size="sm"
          onClick={onClearButtonPressed}
        >
          <TrashIcon width={18} height={18} />
        </IconButton>
        {expanded && renderedOptions.length > 0 && (
          <ul
            className="dc-filtered-search__list-box"
            id={listBoxId}
            role="listbox"
          >
            {renderedOptions}
          </ul>
        )}
      </div>
    </TranslationsProvider>
  );
}

function createFilter(config: FilterConfig): Filter {
  const filterType = config.type;
  switch (filterType) {
    case StringFilter.Type:
      return new StringFilter(config, {
        value: '',
        operator: config.operators[0] || StringFilter.Operators.equal,
      });
    case StringSetFilter.Type:
      return new StringSetFilter(config, {
        value: [],
        operator: config.operators[0] || StringSetFilter.Operators.in,
      });
    default:
      exhaustiveCheck(filterType, `Unable to create a filter with ${filterType} type.`);
  }
}
