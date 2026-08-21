import { AnimatePresence } from 'framer-motion';
import { dropdownVariants } from '../../animations/variants';
import * as S from './FilterDropdown.styles';
import { useFilterDropdown } from './FilterDropdown.hooks';
import type { FilterDropdownProps } from './FilterDropdown.types';

export const FilterDropdown = (props: FilterDropdownProps) => {
  const { icon: Icon, label, value, options } = props;
  const { isOpen, selectedLabel, handleToggle, handleBlur, handleSelect } = useFilterDropdown(props);

  return (
    <S.Container>
      <S.Trigger
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={handleToggle}
        onBlur={handleBlur}
      >
        <S.Icon aria-hidden="true">
          <Icon />
        </S.Icon>
        <S.Label>{selectedLabel}</S.Label>
        <S.Chevron aria-hidden="true" $open={isOpen} />
      </S.Trigger>

      <AnimatePresence>
        {isOpen && (
          <S.OptionsDropdown
            role="listbox"
            aria-label={label}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
          >
            {options.map((option) => (
              <S.OptionItem
                key={option.value}
                role="option"
                aria-selected={option.value === value}
                $highlighted={option.value === value}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </S.OptionItem>
            ))}
          </S.OptionsDropdown>
        )}
      </AnimatePresence>
    </S.Container>
  );
};
