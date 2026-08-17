import { AnimatePresence } from 'framer-motion';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { dropdownVariants, errorMessageVariants } from '../../animations/variants';
import * as S from './AutocompleteField.styles';
import { useAutocompleteField } from './AutocompleteField.hooks';
import type { AutocompleteFieldProps } from './AutocompleteField.types';

export const AutocompleteField = (props: AutocompleteFieldProps) => {
  const { icon: Icon, label, placeholder, error, noResultsText } = props;
  const {
    query,
    isOpen,
    filteredOptions,
    highlightedIndex,
    containerRef,
    handleInputChange,
    handleFocus,
    handleBlur,
    handleKeyDown,
    handleSelect,
  } = useAutocompleteField(props);

  return (
    <S.Field ref={containerRef}>
      <S.LabelRow>
        <S.Icon aria-hidden="true">
          <Icon />
        </S.Icon>
        <S.Label>{label}</S.Label>
      </S.LabelRow>
      <S.InputWrapper>
        <S.Input
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          $hasError={Boolean(error)}
        />
        <S.SearchIcon aria-hidden="true">
          <FaMagnifyingGlass />
        </S.SearchIcon>
        <AnimatePresence>
          {isOpen && (
            <S.Dropdown role="listbox" initial="hidden" animate="visible" exit="exit" variants={dropdownVariants}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <S.Option
                    key={option.value}
                    role="option"
                    aria-selected={index === highlightedIndex}
                    $highlighted={index === highlightedIndex}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => handleSelect(option)}
                  >
                    {option.label}
                  </S.Option>
                ))
              ) : (
                <S.NoResults>{noResultsText}</S.NoResults>
              )}
            </S.Dropdown>
          )}
        </AnimatePresence>
      </S.InputWrapper>
      <AnimatePresence>
        {error && (
          <S.ErrorText initial="hidden" animate="visible" exit="exit" variants={errorMessageVariants}>
            {error}
          </S.ErrorText>
        )}
      </AnimatePresence>
    </S.Field>
  );
};
