import { createContext, type ReactNode, useContext } from 'react';

export class OptionStore<T> {
  private _map: Map<T, string>;
  readonly idPrefix: string;

  constructor(idPrefix = '') {
    this._map = new Map();
    this.idPrefix = idPrefix;
  }

  private _generateId(): string {
    const count = this._map.size;
    return `${this.idPrefix}${count + 1}`;
  }

  get ids() {
    return Array.from(this._map.values());
  }

  get values() {
    return Array.from(this._map.keys());
  }

  idOf(value: T): string | undefined {
    return this._map.get(value);
  }

  append(value: T): string {
    let id = this._map.get(value);
    if (id) {
      return id;
    }
    id = this._generateId();
    this._map.set(value, id);
    return id;
  }

  clear(): void {
    this._map.clear();
  }
}

export type SearchSelectContext<T> = {
  options: OptionStore<T>;
  selectedValue: T;
  highlightedValue: T;
  setSelectedValue: (value: T) => void;
  setHighlightedValue: (value: T) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchSelectContext = createContext<SearchSelectContext<any> | null>(null);

export function useSearchSelectContext() {
  const ctx = useContext(searchSelectContext);
  if (ctx === null) {
    throw new Error('useSearchSelectContext must be used within SearchSelectContextProvider');
  }
  return ctx;
}

export function SearchSelectContextProvider<T>({
  value,
  children,
}: {
  value: SearchSelectContext<T>;
  children: ReactNode;
}) {
  return (
    <searchSelectContext.Provider value={value}>
      {children}
    </searchSelectContext.Provider>
  );
}
