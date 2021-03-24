import * as React from 'react';
import { SvgIcon } from '../svg-icon';
import { searchIcon } from '../svg-icon/icons/search';
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
          leadingAddOn || (
            <SvgIcon icon={searchIcon} size={getIconSizeInPixels(props.size)} />
          )
        }
      />
    );
  }
);

function getIconSizeInPixels(size: SearchFieldProps['size']): number {
  switch (size) {
    case 'lg':
      return 20;
    case 'sm':
      return 14;
    case 'md':
    default:
      return 16;
  }
}
