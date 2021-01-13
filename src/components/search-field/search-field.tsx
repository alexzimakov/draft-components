import * as React from 'react';
import { SvgIcon } from '../svg-icon';
import { searchIcon } from '../svg-icon/icons';
import { TextField, TextFieldProps } from '../text-field';

export interface SearchFieldProps extends TextFieldProps {}

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    { leadingAddOn, type, ...props }: SearchFieldProps,
    ref
  ) {
    return (
      <TextField
        {...props}
        ref={ref}
        type={type || 'search'}
        leadingAddOn={
          leadingAddOn || <SvgIcon icon={searchIcon} size="1.2em" />
        }
      />
    );
  }
);
