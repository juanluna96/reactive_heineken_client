import { AnimatePresence } from 'framer-motion';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { createPortal } from 'react-dom';
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
    inputWrapperRef,
    highlightedOptionRef,
    dropdownRect,
    handleInputChange,
    handleFocus,
    handleClick,
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
      <S.InputWrapper ref={inputWrapperRef}>
        <S.Input
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onClick={handleClick}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          $hasError={Boolean(error)}
        />
        <S.SearchIcon aria-hidden="true">
          <FaMagnifyingGlass />
        </S.SearchIcon>
      </S.InputWrapper>
      {createPortal(
        <AnimatePresence>
          {isOpen && dropdownRect && (
            <S.Dropdown
              role="listbox"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              style={{ top: dropdownRect.top, left: dropdownRect.left, width: dropdownRect.width }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <S.Option
                    key={option.value}
                    ref={index === highlightedIndex ? highlightedOptionRef : undefined}
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
        </AnimatePresence>,
        document.body,
      )}
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
