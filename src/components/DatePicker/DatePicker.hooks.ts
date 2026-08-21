import { useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { useTranslation } from '../../i18n';
import type { DatePickerDay, DatePickerProps } from './DatePicker.types';

const pad2 = (value: number) => String(value).padStart(2, '0');

const toIso = (date: Date): string => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

// Parsed as local-time components, not `new Date(iso)` — that parses as UTC
// midnight, which can land on the previous day once converted to a
// negative-UTC-offset local time (most of the Americas).
const fromIso = (iso: string): Date => {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Remaps JS's Sunday-first getDay() (0-6) to a Monday-first index (0-6).
const mondayFirstWeekday = (date: Date): number => (date.getDay() + 6) % 7;

const TOTAL_CALENDAR_CELLS = 42; // 6 fixed weeks, so the grid height never jumps between months.
const YEAR_RANGE_SPAN = 120; // Reasonable birthdate-sized range when no `min` is given.

export const useDatePicker = ({ value, onChange, min, max }: DatePickerProps) => {
  const { language } = useTranslation();

  const today = useMemo(() => new Date(), []);
  const selectedDate = value ? fromIso(value) : null;
  const minDate = min ? fromIso(min) : null;
  const maxDate = max ? fromIso(max) : null;

  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => selectedDate ?? (maxDate ?? today));
  const containerRef = useRef<HTMLDivElement>(null);

  // Month/year are custom dropdowns (not native <select>) so their option
  // lists can actually be styled — native <option> popups are rendered by
  // the OS and ignore CSS almost entirely.
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const yearListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Tapping the dimmed backdrop closes the calendar in its mobile
  // (TABLET_BREAKPOINT-and-below) modal presentation — see DatePicker.styles.ts.
  // The document mousedown listener above already covers the desktop
  // anchored-dropdown case, but there "outside" the field is also outside
  // Backdrop; here Backdrop fills the viewport, so a dedicated check for
  // "clicked Backdrop itself, not something inside it" is needed instead.
  const handleBackdropMouseDown = (event: ReactMouseEvent) => {
    if (event.target === event.currentTarget) setIsOpen(false);
  };

  const handleToggleOpen = () => {
    if (!isOpen) setViewDate(selectedDate ?? viewDate);
    setIsOpen((open) => !open);
  };

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();

  const isDateDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const days: DatePickerDay[] = useMemo(() => {
    const firstOfMonth = new Date(viewYear, viewMonth, 1);
    const leadingCells = mondayFirstWeekday(firstOfMonth);

    return Array.from({ length: TOTAL_CALENDAR_CELLS }, (_, index) => {
      const cellDate = new Date(viewYear, viewMonth, index - leadingCells + 1);
      const iso = toIso(cellDate);
      return {
        iso,
        dayOfMonth: cellDate.getDate(),
        isCurrentMonth: cellDate.getMonth() === viewMonth,
        isToday: iso === toIso(today),
        isSelected: value !== '' && iso === value,
        isDisabled: isDateDisabled(cellDate),
      };
    });
    // min/max (not minDate/maxDate — fresh Date objects every render) are the
    // real inputs to isDateDisabled here, so they're what should invalidate the cache.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewYear, viewMonth, value, min, max, today]);

  const weekdayLabels = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(language, { weekday: 'short' });
    // 1970-01-05 was a Monday — an arbitrary but stable Monday-first reference week.
    return Array.from({ length: 7 }, (_, index) => formatter.format(new Date(1970, 0, 5 + index)));
  }, [language]);

  const monthLabel = useMemo(
    () => new Intl.DateTimeFormat(language, { month: 'long', year: 'numeric' }).format(viewDate),
    [language, viewDate],
  );

  const monthOptions = useMemo(() => {
    const formatter = new Intl.DateTimeFormat(language, { month: 'long' });
    return Array.from({ length: 12 }, (_, month) => ({ value: month, label: formatter.format(new Date(2000, month, 1)) }));
  }, [language]);

  const yearOptions = useMemo(() => {
    const latestYear = maxDate ? maxDate.getFullYear() : today.getFullYear();
    const earliestYear = minDate ? minDate.getFullYear() : latestYear - YEAR_RANGE_SPAN;
    return Array.from({ length: latestYear - earliestYear + 1 }, (_, index) => latestYear - index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max, today]);

  const displayValue = useMemo(() => {
    if (!selectedDate) return '';
    return new Intl.DateTimeFormat(language, { day: '2-digit', month: '2-digit', year: 'numeric' }).format(
      selectedDate,
    );
  }, [selectedDate, language]);

  const handleSelectDay = (day: DatePickerDay) => {
    if (day.isDisabled) return;
    onChange(day.iso);
    setIsOpen(false);
  };

  const handlePrevMonth = () => setViewDate(new Date(viewYear, viewMonth - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewYear, viewMonth + 1, 1));

  const handleToggleMonthDropdown = () => {
    setIsYearDropdownOpen(false);
    setIsMonthDropdownOpen((open) => !open);
  };
  const handleToggleYearDropdown = () => {
    setIsMonthDropdownOpen(false);
    setIsYearDropdownOpen((open) => !open);
  };
  const handleMonthDropdownBlur = () => setIsMonthDropdownOpen(false);
  const handleYearDropdownBlur = () => setIsYearDropdownOpen(false);

  const handleSelectMonth = (month: number) => {
    setViewDate(new Date(viewYear, month, 1));
    setIsMonthDropdownOpen(false);
  };
  const handleSelectYear = (year: number) => {
    setViewDate(new Date(year, viewMonth, 1));
    setIsYearDropdownOpen(false);
  };

  // Jumps the year list to the currently viewed year on open — with up to
  // ~120 entries, starting scrolled to the top every time would defeat the
  // point of a quick year jump for anyone born decades ago.
  useEffect(() => {
    if (!isYearDropdownOpen) return;
    yearListRef.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: 'center' });
  }, [isYearDropdownOpen]);

  return {
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
  };
};
