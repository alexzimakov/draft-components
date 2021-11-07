import { forwardRef } from 'react';
import { TextInput, TextInputProps } from '../text-input';
import { SvgIcon } from '../svg-icon';
import { search } from '../../bootstrap-icons/search';

export interface SearchInputProps extends TextInputProps {}

const iconSize: Record<NonNullable<SearchInputProps['size']>, number> = {
  sm: 14,
  md: 16,
  lg: 20,
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  function SearchInput({ size = 'md', ...props }, ref) {
    const leadingIcon = (
      <SvgIcon icon={search} size={iconSize[size] || iconSize.md} />
    );
    return (
      <TextInput
        {...props}
        ref={ref}
        size={size}
        type="search"
        leadingAddOn={leadingIcon}
      />
    );
  }
);
