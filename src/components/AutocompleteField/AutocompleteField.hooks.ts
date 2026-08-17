import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type { AutocompleteFieldOption, AutocompleteFieldProps } from './AutocompleteField.types';

export const useAutocompleteField = ({ options, value, onChange }: AutocompleteFieldProps) => {
  const selectedOption = options.find((option) => option.value === value);
  const [query, setQuery] = useState(selectedOption?.label ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(selectedOption?.label ?? '');
  }, [selectedOption?.label]);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery || query === selectedOption?.label) return options;
    return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
  }, [options, query, selectedOption?.label]);

  useEffect(() => {
    setHighlightedIndex(0);
  }, [filteredOptions]);

  const selectOption = (option: AutocompleteFieldOption) => {
    onChange(option.value);
    setQuery(option.label);
    setIsOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setIsOpen(true);
  };

  const handleFocus = () => setIsOpen(true);

  const handleBlur = () => {
    setIsOpen(false);
    const matched = options.find((option) => option.label === query);
    if (matched) {
      if (matched.value !== value) onChange(matched.value);
      setQuery(matched.label);
    } else if (query !== '') {
      onChange('');
      setQuery('');
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      setHighlightedIndex((index) => Math.min(index + 1, filteredOptions.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === 'Enter') {
      const option = filteredOptions[highlightedIndex];
      if (isOpen && option) {
        event.preventDefault();
        selectOption(option);
      }
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return {
    query,
    isOpen,
    filteredOptions,
    highlightedIndex,
    containerRef,
    handleInputChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleSelect: selectOption,
  };
};
