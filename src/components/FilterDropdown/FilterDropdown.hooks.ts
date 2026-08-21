import { useMemo, useState } from 'react';
import type { FilterDropdownProps } from './FilterDropdown.types';

export const useFilterDropdown = ({ value, options, onChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = useMemo(
    () => options.find((option) => option.value === value)?.label ?? '',
    [options, value],
  );

  const handleToggle = () => setIsOpen((open) => !open);
  const handleBlur = () => setIsOpen(false);
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return { isOpen, selectedLabel, handleToggle, handleBlur, handleSelect };
};
