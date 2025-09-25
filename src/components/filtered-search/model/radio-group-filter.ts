import type { ReactNode } from 'react';
import { AbstractFilter } from './abstract-filter.js';

const TYPE = 'RADIO_GROUP' as const;
const OPERATORS = {
  equal: 'EQUAL',
  notEqual: 'NOT_EQUAL',
} as const;

export type RadioGroupFilterType = typeof TYPE;
export type RadioGroupFilterOperator = typeof OPERATORS[keyof typeof OPERATORS];

export type RadioGroupOption = string | {
  value: string;
  label: ReactNode;
  caption?: ReactNode;
};

export type RadioGroupFilterConfig = {
  type: RadioGroupFilterType;
  field: string;
  label: string;
  options: RadioGroupOption[];
  operators: RadioGroupFilterOperator[];
  operatorSelectAccessibleName?: string;
  valueFormatter?: (value: string) => ReactNode;
  operatorFormatter?: (operator: RadioGroupFilterOperator) => string;
};

export type RadioGroupFilterState = {
  value: string;
  operator: RadioGroupFilterOperator;
};

export class RadioGroupFilter extends AbstractFilter {
  static readonly Type = TYPE;
  static readonly Operators = OPERATORS;

  readonly config: Readonly<RadioGroupFilterConfig>;
  readonly state: Readonly<RadioGroupFilterState>;

  constructor(
    config: RadioGroupFilterConfig,
    state: RadioGroupFilterState,
  ) {
    super();
    this.config = config;
    this.state = state;
  }

  get type() {
    return this.config.type;
  }

  get field() {
    return this.config.field;
  }

  get label() {
    return this.config.label;
  }

  get value() {
    return this.state.value;
  }

  get operator() {
    return this.state.operator;
  }

  setValue(value: string) {
    return new RadioGroupFilter(this.config, { ...this.state, value });
  }

  setOperator(operator: RadioGroupFilterOperator) {
    return new RadioGroupFilter(this.config, { ...this.state, operator });
  }

  isEmpty() {
    return !this.config.options.includes(this.value);
  }
}
