import { StringFilter, StringFilterConfig } from './model/string-filter.js';
import { StringSetFilter, StringSetFilterConfig } from './model/string-set-filter.js';

export type FilterConfig =
  | StringFilterConfig
  | StringSetFilterConfig;

export type Filter =
  | StringFilter
  | StringSetFilter;
