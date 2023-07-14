import { useCallback, useId } from 'react';

export function useComboboxIds() {
  const id = useId();
  const textBoxId = `${id}textBox`;
  const listBoxId = `${id}listBox`;
  const getOptionId = useCallback((key: string) => `${id}option[${key}]`, [id]);
  return {
    textBoxId,
    listBoxId,
    getOptionId,
  };
}
