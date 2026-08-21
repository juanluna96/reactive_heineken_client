import { AnimatePresence } from 'framer-motion';
import { dropdownVariants, errorMessageVariants } from '../../animations/variants';
import * as S from './DatePicker.styles';
import { useDatePicker } from './DatePicker.hooks';
import type { DatePickerProps } from './DatePicker.types';

export const DatePicker = (props: DatePickerProps) => {
  const { icon: Icon, label, placeholder, error } = props;
  const {
    isOpen,
    containerRef,
    displayValue,
    days,
    weekdayLabels,
    monthLabel,
    monthOptions,
    yearOptions,
    viewMonth,
    viewYear,
    isMonthDropdownOpen,
    isYearDropdownOpen,
    yearListRef,
    handleToggleOpen,
    handleBackdropMouseDown,
    handleSelectDay,
    handlePrevMonth,
    handleNextMonth,
    handleToggleMonthDropdown,
    handleToggleYearDropdown,
    handleMonthDropdownBlur,
    handleYearDropdownBlur,
    handleSelectMonth,
    handleSelectYear,
  } = useDatePicker(props);

  const selectedMonthLabel = monthOptions.find((option) => option.value === viewMonth)?.label ?? '';

  return (
    <S.Field ref={containerRef}>
      <S.LabelRow>
        <S.Icon aria-hidden="true">
          <Icon />
        </S.Icon>
        <S.Label>{label}</S.Label>
      </S.LabelRow>
      <S.InputWrapper>
        <S.Trigger
          type="button"
          onClick={handleToggleOpen}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={label}
          $hasError={Boolean(error)}
          $hasValue={Boolean(displayValue)}
        >
          {displayValue || placeholder}
        </S.Trigger>
        <S.CalendarIcon aria-hidden="true" />

        <AnimatePresence>
          {isOpen && (
            <S.Backdrop onMouseDown={handleBackdropMouseDown}>
              <S.Popover
                role="dialog"
                aria-label={monthLabel}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={dropdownVariants}
              >
                <S.CalendarHeader>
                  <S.NavButton type="button" onClick={handlePrevMonth} aria-label="Previous month">
                    <S.PrevIcon />
                  </S.NavButton>

                  <S.MonthYearSelects>
                    <S.MonthSelectWrapper>
                      <S.MonthSelect
                        type="button"
                        aria-label="Month"
                        aria-haspopup="listbox"
                        aria-expanded={isMonthDropdownOpen}
                        onClick={handleToggleMonthDropdown}
                        onBlur={handleMonthDropdownBlur}
                      >
                        {selectedMonthLabel}
                      </S.MonthSelect>
                      <S.SelectChevron aria-hidden="true" />
                      <AnimatePresence>
                        {isMonthDropdownOpen && (
                          <S.OptionsDropdown
                            role="listbox"
                            aria-label="Month"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                          >
                            {monthOptions.map((option) => (
                              <S.OptionItem
                                key={option.value}
                                role="option"
                                aria-selected={option.value === viewMonth}
                                $highlighted={option.value === viewMonth}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => handleSelectMonth(option.value)}
                              >
                                {option.label}
                              </S.OptionItem>
                            ))}
                          </S.OptionsDropdown>
                        )}
                      </AnimatePresence>
                    </S.MonthSelectWrapper>
                    <S.YearSelectWrapper>
                      <S.YearSelect
                        type="button"
                        aria-label="Year"
                        aria-haspopup="listbox"
                        aria-expanded={isYearDropdownOpen}
                        onClick={handleToggleYearDropdown}
                        onBlur={handleYearDropdownBlur}
                      >
                        {viewYear}
                      </S.YearSelect>
                      <S.SelectChevron aria-hidden="true" />
                      <AnimatePresence>
                        {isYearDropdownOpen && (
                          <S.OptionsDropdown
                            ref={yearListRef}
                            role="listbox"
                            aria-label="Year"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                          >
                            {yearOptions.map((year) => (
                              <S.OptionItem
                                key={year}
                                role="option"
                                aria-selected={year === viewYear}
                                data-selected={year === viewYear}
                                $highlighted={year === viewYear}
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => handleSelectYear(year)}
                              >
                                {year}
                              </S.OptionItem>
                            ))}
                          </S.OptionsDropdown>
                        )}
                      </AnimatePresence>
                    </S.YearSelectWrapper>
                  </S.MonthYearSelects>

                  <S.NavButton type="button" onClick={handleNextMonth} aria-label="Next month">
                    <S.NextIcon />
                  </S.NavButton>
                </S.CalendarHeader>

                <S.WeekdaysRow>
                  {weekdayLabels.map((weekday, index) => (
                    <S.WeekdayLabel key={index}>{weekday}</S.WeekdayLabel>
                  ))}
                </S.WeekdaysRow>

                <S.DaysGrid role="grid">
                  {days.map((day) => (
                    <S.DayButton
                      key={day.iso}
                      type="button"
                      role="gridcell"
                      aria-selected={day.isSelected}
                      disabled={day.isDisabled}
                      $isCurrentMonth={day.isCurrentMonth}
                      $isToday={day.isToday}
                      $isSelected={day.isSelected}
                      onClick={() => handleSelectDay(day)}
                    >
                      {day.dayOfMonth}
                    </S.DayButton>
                  ))}
                </S.DaysGrid>
              </S.Popover>
            </S.Backdrop>
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
