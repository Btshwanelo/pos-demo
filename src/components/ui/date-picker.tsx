import * as React from 'react';
import { format, parse } from 'date-fns';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DynamicDatePickerProps {
  label?: string;
  value?: string | Date;
  onChange?: (date: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  dateFormat?: string; // Format for output (e.g., 'yyyy-MM-dd', 'MM/dd/yyyy')
  displayFormat?: string; // Format for display (e.g., 'PPP', 'MM/dd/yyyy')
  minDate?: Date;
  maxDate?: Date;
  yearRange?: { from: number; to: number };
  className?: string;
  buttonClassName?: string;
  name?: string;
  id?: string;
}

export function DynamicDatePicker({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  disabled = false,
  required = false,
  error,
  dateFormat = 'yyyy-MM-dd',
  displayFormat = 'PPP', // Jan 1, 2023
  minDate,
  maxDate,
  yearRange = { from: 1900, to: new Date().getFullYear() + 10 },
  className,
  buttonClassName,
  name,
  id,
}: DynamicDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Convert value to Date object
  const getDateValue = (): Date | undefined => {
    if (!value) return undefined;

    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string') {
      try {
        // Try parsing with the specified format first
        const parsedDate = parse(value, dateFormat, new Date());
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }

        // Fallback to native Date parsing
        const nativeDate = new Date(value);
        return isNaN(nativeDate.getTime()) ? undefined : nativeDate;
      } catch {
        return undefined;
      }
    }

    return undefined;
  };

  // Get display text for the button
  const getDisplayText = (): string => {
    const dateValue = getDateValue();
    if (!dateValue) return placeholder;

    try {
      return format(dateValue, displayFormat);
    } catch {
      return value?.toString() || placeholder;
    }
  };

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (onChange) {
      if (selectedDate) {
        const formattedDate = format(selectedDate, dateFormat);
        onChange(formattedDate);
      } else {
        onChange(undefined);
      }
    }
    setOpen(false);
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <Label htmlFor={id || name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id || name}
            className={cn(
              'w-full justify-between font-normal text-left bg-white border-gray-300 text-gray-600',
              'focus:ring-primary focus:border-primary hover:bg-gray-50',
              !value && 'text-gray-500',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              disabled && 'opacity-50 cursor-not-allowed',
              buttonClassName
            )}
            disabled={disabled}
          >
            <span className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              {getDisplayText()}
            </span>
            <ChevronDownIcon className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={getDateValue()}
            onSelect={handleDateSelect}
            captionLayout="dropdown"
            fromYear={yearRange.from}
            toYear={yearRange.to}
            fromDate={minDate}
            toDate={maxDate}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

// Usage examples:

// Basic usage
export function DatePickerExample() {
  const [date, setDate] = React.useState<string>('');

  return (
    <DynamicDatePicker
      label="Date of Birth"
      value={date}
      onChange={(newDate) => setDate(newDate || '')}
      placeholder="Select your birth date"
      required
    />
  );
}

// Advanced usage with custom formatting
export function AdvancedDatePickerExample() {
  const [startDate, setStartDate] = React.useState<string>('');

  return (
    <DynamicDatePicker
      label="Project Start Date"
      value={startDate}
      onChange={(newDate) => setStartDate(newDate || '')}
      placeholder="Select start date"
      dateFormat="yyyy-MM-dd" // Output format for form submission
      displayFormat="MMM dd, yyyy" // Display format (Jan 01, 2023)
      minDate={new Date()} // No past dates
      maxDate={new Date(2025, 11, 31)} // Max date
      yearRange={{ from: 2023, to: 2025 }}
      required
    />
  );
}

// US date format example
export function USDatePickerExample() {
  const [date, setDate] = React.useState<string>('');

  return (
    <DynamicDatePicker
      label="Event Date"
      value={date}
      onChange={(newDate) => setDate(newDate || '')}
      placeholder="MM/DD/YYYY"
      dateFormat="MM/dd/yyyy" // US format output
      displayFormat="MM/dd/yyyy" // US format display
    />
  );
}
