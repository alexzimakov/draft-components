import { forwardRef } from 'react';
import { TextInput, TextInputProps } from '../text-input';
import { SvgIcon } from '../svg-icon';
import { search } from '../../icons/search';

export interface SearchFieldProps extends TextInputProps {}

const iconSize: Record<NonNullable<SearchFieldProps['size']>, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    { size = 'md', leadingAddOn, type, ...props }: SearchFieldProps,
    ref
  ) {
    return (
      <TextInput
        {...props}
        ref={ref}
        size={size}
        type={type || 'search'}
        leadingAddOn={
          leadingAddOn || (
            <SvgIcon icon={search} size={iconSize[size] || iconSize.md} />
          )
        }
      />
    );
  }
);
