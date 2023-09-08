import { AbstractFilter } from './abstract-filter.js';

const TYPE = 'STRING_SET' as const;
const OPERATORS = {
  in: 'IN',
  notIn: 'NOT_IN',
} as const;

export type StringSetFilterType = typeof TYPE;
export type StringSetFilterOperator = typeof OPERATORS[keyof typeof OPERATORS];

export type StringSetFilterConfig = {
  type: StringSetFilterType;
  field: string;
  label: string;
  values: string[];
  valueFormatter?: (value: string) => string;
  valuesFormatter?: (values: string[]) => string;
  operatorSelectAccessibleName?: string;
  operators: StringSetFilterOperator[];
  operatorFormatter?: (operator: StringSetFilterOperator) => string;
};

export type StringSetFilterState = {
  value: string[];
  operator: StringSetFilterOperator;
};

export class StringSetFilter extends AbstractFilter {
  static readonly Type = TYPE;
  static readonly Operators = OPERATORS;

  readonly config: Readonly<StringSetFilterConfig>;
  readonly state: Readonly<StringSetFilterState>;

  constructor(
    config: StringSetFilterConfig,
    state: StringSetFilterState,
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

  setValue(value: string[]) {
    return new StringSetFilter(this.config, { ...this.state, value });
  }

  setOperator(operator: StringSetFilterOperator) {
    return new StringSetFilter(this.config, { ...this.state, operator });
  }

  isEmpty() {
    return this.value.length === 0;
  }
}
