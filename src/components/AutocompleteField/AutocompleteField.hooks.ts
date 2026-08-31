import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import type { AutocompleteFieldOption, AutocompleteFieldProps } from './AutocompleteField.types';

interface DropdownRect {
  top: number;
  left: number;
  width: number;
}

// Lower-cased and with accents stripped, so "mexico" matches "México" and
// "peru" matches "Perú" — country names, especially, get typed unaccented.
const forMatching = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

export const useAutocompleteField = ({
  options,
  value,
  onChange,
  allowCustomValue = false,
  freeTextValue,
  onCustomValueChange,
  dropdownMinWidth,
  collapsedLabel,
}: AutocompleteFieldProps) => {
  const selectedOption = options.find((option) => option.value === value);
  // What the input shows for the current selection when it isn't being
  // searched: `collapsedLabel` when the caller wants the collapsed field more
  // compact than its dropdown rows, otherwise the selected option's label.
  const collapsedText = selectedOption ? (collapsedLabel ?? selectedOption.label) : undefined;
  const [query, setQuery] = useState(collapsedText ?? freeTextValue ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const highlightedOptionRef = useRef<HTMLLIElement>(null);
  // The dropdown is portaled to <body> (see AutocompleteField.tsx) so it
  // isn't clipped by an ancestor with overflow:hidden/auto — a modal's
  // scrollable panel, for instance — so its position is computed in
  // viewport coordinates instead of relying on CSS position:absolute.
  const [dropdownRect, setDropdownRect] = useState<DropdownRect | null>(null);

  useEffect(() => {
    setQuery(collapsedText ?? freeTextValue ?? '');
  }, [collapsedText, freeTextValue]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updateRect = () => {
      const rect = inputWrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      const width = Math.max(rect.width, dropdownMinWidth ?? 0);
      // Nudge left so a dropdown wider than its field doesn't spill off-screen.
      const left = Math.min(rect.left, Math.max(8, window.innerWidth - width - 8));
      setDropdownRect({ top: rect.bottom + 8, left, width });
    };

    updateRect();
    // capture:true so this also fires for scrolls inside a nested scroll
    // container (e.g. a modal panel), not just the window itself.
    window.addEventListener('scroll', updateRect, true);
    window.addEventListener('resize', updateRect);
    return () => {
      window.removeEventListener('scroll', updateRect, true);
      window.removeEventListener('resize', updateRect);
    };
  }, [isOpen, dropdownMinWidth]);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = forMatching(query.trim());
    if (!normalizedQuery || query === collapsedText) return options;
    return options.filter((option) => forMatching(option.label).includes(normalizedQuery));
  }, [options, query, collapsedText]);

  useEffect(() => {
    // While searching, start at the first match; when the field is just
    // showing its current selection, start on that selection instead so
    // opening the list lands on the active option, not the top of the list.
    const showingSelection = query === collapsedText || query.trim() === '';
    const selectedIndex = showingSelection ? filteredOptions.findIndex((option) => option.value === value) : -1;
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [filteredOptions, value, query, collapsedText]);

  useEffect(() => {
    if (!isOpen) return;
    // Let the portaled dropdown mount first, then bring the highlighted row
    // (the active option, on open) into view.
    const frame = requestAnimationFrame(() => {
      highlightedOptionRef.current?.scrollIntoView({ block: 'nearest' });
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen, highlightedIndex]);

  const selectOption = (option: AutocompleteFieldOption) => {
    onChange(option.value);
    // Show the picked option's label right away; if the caller uses
    // `collapsedLabel`, the effect above collapses it once the new `value`
    // propagates back on the next render.
    setQuery(option.label);
    setIsOpen(false);
    if (allowCustomValue) onCustomValueChange?.('');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = event.target.value;
    setQuery(next);
    setIsOpen(true);
    if (allowCustomValue) {
      onCustomValueChange?.(next);
      if (value !== '') onChange('');
    }
  };

  const handleFocus = () => setIsOpen(true);

  // Clicking an already-focused field (e.g. after Escape closed the list, or
  // to reopen it after picking) should bring the options back.
  const handleClick = () => setIsOpen(true);

  const handleBlur = () => {
    setIsOpen(false);
    // Field is already showing the current selection's collapsed text —
    // leave it (its label won't literally match any option's `label`).
    if (collapsedText !== undefined && query === collapsedText) return;
    const matched = options.find((option) => option.label === query);
    if (matched) {
      if (matched.value !== value) onChange(matched.value);
      setQuery(matched.label);
      if (allowCustomValue) onCustomValueChange?.('');
      return;
    }
    if (allowCustomValue) return;
    if (query !== '') {
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
    inputWrapperRef,
    highlightedOptionRef,
    dropdownRect,
    handleInputChange,
    handleFocus,
    handleClick,
    handleBlur,
    handleKeyDown,
    handleSelect: selectOption,
  };
};
