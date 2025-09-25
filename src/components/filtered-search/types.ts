import type { RadioGroupFilter, RadioGroupFilterConfig } from './model/radio-group-filter.js';
import type { StringFilter, StringFilterConfig } from './model/string-filter.js';
import type { StringSetFilter, StringSetFilterConfig } from './model/string-set-filter.js';

export type FilterConfig =
  | StringFilterConfig
  | StringSetFilterConfig
  | RadioGroupFilterConfig;

export type Filter =
  | StringFilter
  | StringSetFilter
  | RadioGroupFilter;
