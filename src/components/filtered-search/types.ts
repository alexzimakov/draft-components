import { StringFilter, StringFilterConfig } from './model/string-filter';
import { StringSetFilter, StringSetFilterConfig } from './model/string-set-filter';

export type FilterConfig =
  | StringFilterConfig
  | StringSetFilterConfig;

export type Filter =
  | StringFilter
  | StringSetFilter;
