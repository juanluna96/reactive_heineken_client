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
    handleToggleOpen,
    handleSelectDay,
    handlePrevMonth,
    handleNextMonth,
    handleMonthChange,
    handleYearChange,
  } = useDatePicker(props);

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
                  <S.MonthSelect
                    aria-label="Month"
                    value={viewMonth}
                    onChange={(event) => handleMonthChange(Number(event.target.value))}
                  >
                    {monthOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </S.MonthSelect>
                  <S.YearSelect
                    aria-label="Year"
                    value={viewYear}
                    onChange={(event) => handleYearChange(Number(event.target.value))}
                  >
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </S.YearSelect>
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
