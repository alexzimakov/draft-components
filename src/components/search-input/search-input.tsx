import { forwardRef } from 'react';
import { TextInput, TextInputProps } from '../text-input';
import { SvgIcon } from '../svg-icon';
import { search } from '../../icons/search';

export interface SearchInputProps extends TextInputProps {}

const iconSize: Record<NonNullable<SearchInputProps['size']>, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ size = 'md', leadingAddOn, type, ...props }, ref) {
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
