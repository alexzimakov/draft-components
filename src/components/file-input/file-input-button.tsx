import { ComponentPropsWithoutRef } from 'react';
import { useFileInputContext } from './file-input-context';

export type FileInputButtonProps = ComponentPropsWithoutRef<'label'>;

export function FileInputButton({ htmlFor, children }: FileInputButtonProps) {
  const { inputId } = useFileInputContext();
  return (
    <label
      role="button"
      className="dc-file-input__button"
      htmlFor={htmlFor || inputId}
    >
      {children}
    </label>
  );
}
