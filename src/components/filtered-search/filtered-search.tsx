import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FocusEventHandler,
  JSX,
  KeyboardEventHandler,
  MouseEventHandler,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Filter, FilterConfig } from './types';
import { StringFilter } from './model/string-filter';
import { StringSetFilter } from './model/string-set-filter';
import { TranslationsProvider } from './use-translations';
import { useComboboxIds } from './use-combobox-ids';
import { IconButton } from '../button';
import { FilterItem } from './filter-item';
import { MagnifyingGlassIcon, TrashIcon } from './icons';
import { KeyboardKeys, classNames, exhaustiveCheck } from '../../lib';

export type FilteredSearchHTMLProps = ComponentPropsWithoutRef<'div'>;
export type FilteredSearchBaseProps = Omit<FilteredSearchHTMLProps,
  | 'children'
  | 'placeholder'>
export type FilteredSearchProps = FilteredSearchBaseProps & {
  placeholder?: string;
  applyButtonLabel?: string;
  cancelButtonLabel?: string;
  clearButtonAccessibleName?: string;
  removeFilterButtonAccessibleName?: string;
  filtersConfig: FilterConfig[];
  filters: Filter[];
  onChange: (filters: Filter[]) => void;
};

export function FilteredSearch({
  className,
  placeholder = 'Search and filter',
  applyButtonLabel = 'Apply',
  cancelButtonLabel = 'Cancel',
  clearButtonAccessibleName = 'Clear',
  removeFilterButtonAccessibleName = 'Remove filter',
  filtersConfig,
  filters,
  onChange,
  onMouseDown,
  ...props
}: FilteredSearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [hasFocus, setHasFocus] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const [activeField, setActiveField] = useState('');
  const { textBoxId, listBoxId, getOptionId } = useComboboxIds();

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

  const addFilter = (config: FilterConfig) => {
    const filter = createFilter(config);
    const textBoxElement = getTextBoxElement();
    onChange([...filters, filter]);
    textBoxElement.blur();
    setQuery('');
    setActiveField(filter.field);
  };

  const changeFilter = (changedFilter: Filter) => {
    const newFilters = filters.map((filter) => (
      filter.field === changedFilter.field ? changedFilter : filter
    ));
    onChange(newFilters);
  };

  const removeFilter = (filterToRemove: Filter) => {
    const newFilters = filters.filter((filter) => (
      filter.field !== filterToRemove.field
    ));
    onChange(newFilters);
  };

  const onFilterEditStarted = (filter: Filter) => {
    setActiveField(filter.field);
  };

  const onFilterEditCanceled = (filter: Filter) => {
    setActiveField('');
    if (filter.isEmpty()) {
      removeFilter(filter);
      getTextBoxElement().focus();
    }
  };

  const onFilterChanged = (filter: Filter) => {
    changeFilter(filter);
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
      addFilter(config);
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
        addFilter(config);
        isHandled = true;
      }
    } else if (key === KeyboardKeys.Backspace) {
      if (query === '' && filters.length > 0) {
        onChange(filters.slice(0, -1));
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
    onChange([]);
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
        onMouseDown={onContainerPressed}
        {...props}
      >
        <MagnifyingGlassIcon className="dc-filtered-search__icon" />
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
          icon={<TrashIcon />}
          size="sm"
          variant="plain"
          appearance="primary"
          onClick={onClearButtonPressed}
        />
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
