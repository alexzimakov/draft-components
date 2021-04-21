import * as React from 'react';
import { SvgIcon } from '../svg-icon';
import { searchIcon } from '../svg-icon/icons/search';
import { TextField, TextFieldProps } from '../text-field';

export interface SearchFieldProps extends TextFieldProps {}

const iconSize: Record<NonNullable<SearchFieldProps['size']>, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    { size = 'md', leadingAddOn, type, ...props }: SearchFieldProps,
    ref
  ) {
    return (
      <TextField
        {...props}
        ref={ref}
        size={size}
        type={type || 'search'}
        leadingAddOn={
          leadingAddOn || (
            <SvgIcon icon={searchIcon} size={iconSize[size] || iconSize.md} />
          )
        }
      />
    );
  }
);
