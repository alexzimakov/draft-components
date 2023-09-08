import { AbstractFilter } from './abstract-filter.js';
import { ValidationResult } from './validation-result.js';

const TYPE = 'STRING' as const;
const OPERATORS = {
  equal: 'EQUAL',
  notEqual: 'NOT_EQUAL',
  contain: 'CONTAIN',
  notContain: 'NOT_CONTAIN',
} as const;

export type StringFilterType = typeof TYPE;
export type StringFilterOperator = typeof OPERATORS[keyof typeof OPERATORS];

export type StringFilterConfig = {
  type: StringFilterType;
  field: string;
  label: string;
  operators: StringFilterOperator[];
  valueInputPlaceholder?: string;
  valueInputAccessibleName?: string;
  operatorSelectAccessibleName?: string;
  valueValidator?: (value: string) => ValidationResult;
  operatorFormatter?: (operator: StringFilterOperator) => string;
};

export type StringFilterState = {
  value: string;
  operator: StringFilterOperator;
};

export class StringFilter extends AbstractFilter {
  static readonly Type = TYPE;
  static readonly Operators = OPERATORS;

  readonly config: Readonly<StringFilterConfig>;
  readonly state: Readonly<StringFilterState>;

  constructor(
    config: StringFilterConfig,
    state: StringFilterState,
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
    return new StringFilter(this.config, { ...this.state, value });
  }

  setOperator(operator: StringFilterOperator) {
    return new StringFilter(this.config, { ...this.state, operator });
  }

  isEmpty() {
    return this.value === '';
  }
}
