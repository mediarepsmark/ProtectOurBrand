"use client";

import { CalendarDays, ChevronLeft, ChevronRight, Clock3 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const timeWindows = ["Morning, 9 AM - 12 PM PT", "Afternoon, 12 PM - 3 PM PT", "Late day, 3 PM - 5 PM PT"];
const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const fullDateFormatter = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });

type DayCell = {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  isDisabled: boolean;
};

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function buildMonthGrid(monthAnchor: Date): DayCell[] {
  const today = startOfDay(new Date());
  const firstOfMonth = new Date(monthAnchor.getFullYear(), monthAnchor.getMonth(), 1);
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const isCurrentMonth = date.getMonth() === monthAnchor.getMonth();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isPast = startOfDay(date).getTime() < today.getTime();
    return {
      date,
      day: date.getDate(),
      isCurrentMonth,
      isDisabled: !isCurrentMonth || isWeekend || isPast
    };
  });
}

function toDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function firstAvailableDateKey(monthAnchor: Date) {
  const firstOpenDay = buildMonthGrid(monthAnchor).find((cell) => !cell.isDisabled);
  return firstOpenDay ? toDateKey(firstOpenDay.date) : "";
}

export function SchedulingPicker({ formId }: { formId: string }) {
  const [monthAnchor, setMonthAnchor] = useState<Date | null>(null);
  const [selectedDateKey, setSelectedDateKey] = useState("");
  const [selectedWindow, setSelectedWindow] = useState(timeWindows[0]);

  useEffect(() => {
    const today = new Date();
    const anchor = new Date(today.getFullYear(), today.getMonth(), 1);
    setMonthAnchor(anchor);
    setSelectedDateKey(firstAvailableDateKey(anchor));
  }, []);

  const days = useMemo(() => (monthAnchor ? buildMonthGrid(monthAnchor) : []), [monthAnchor]);
  const selectedDate = useMemo(() => {
    if (!selectedDateKey) return null;
    const [year, month, day] = selectedDateKey.split("-").map(Number);
    return new Date(year, month - 1, day);
  }, [selectedDateKey]);

  function changeMonth(offset: number) {
    setMonthAnchor((current) => {
      const base = current ?? new Date();
      const next = new Date(base.getFullYear(), base.getMonth() + offset, 1);
      setSelectedDateKey(firstAvailableDateKey(next));
      return next;
    });
  }

  return (
    <div className="border-t border-slateLine bg-white p-6 sm:p-8 lg:border-l lg:border-t-0">
      <input form={formId} type="hidden" name="preferredReviewDate" value={selectedDateKey} readOnly />
      <input form={formId} type="hidden" name="preferredReviewWindow" value={selectedWindow} readOnly />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-cyan">Pick a review window</p>
          <h2 className="mt-2 text-2xl font-bold text-ink">{monthAnchor ? monthFormatter.format(monthAnchor) : "Loading calendar"}</h2>
        </div>
        <CalendarDays aria-hidden="true" className="size-8 shrink-0 text-blue" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="grid size-10 place-items-center rounded-md border border-slateLine bg-white text-ink transition hover:border-cyan hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          aria-label="Previous month"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <p className="text-sm font-semibold text-slate-600">Choose a preferred date</p>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="grid size-10 place-items-center rounded-md border border-slateLine bg-white text-ink transition hover:border-cyan hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          aria-label="Next month"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-[0.08em] text-slate-400">
        {weekdayLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2 text-center text-sm">
        {days.map((cell) => {
          const dateKey = toDateKey(cell.date);
          const isSelected = selectedDateKey === dateKey;
          return (
            <button
              type="button"
              key={dateKey}
              disabled={cell.isDisabled}
              onClick={() => setSelectedDateKey(dateKey)}
              className={cn(
                "min-h-11 rounded-md px-2 py-2 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                !cell.isCurrentMonth && "text-slate-300",
                cell.isCurrentMonth && !cell.isDisabled && "bg-slate-50 text-slate-700 hover:bg-cyan/10 hover:text-ink",
                isSelected && "bg-blue text-white shadow-glow hover:bg-blue hover:text-white",
                cell.isDisabled && "cursor-not-allowed bg-white text-slate-300"
              )}
              aria-pressed={isSelected}
              aria-label={`${isSelected ? "Selected" : "Choose"} ${fullDateFormatter.format(cell.date)}`}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Clock3 aria-hidden="true" className="size-4 text-cyan" />
          Preferred time window
        </div>
        <div className="mt-3 grid gap-2">
          {timeWindows.map((window) => {
            const isSelected = selectedWindow === window;
            return (
              <button
                type="button"
                key={window}
                onClick={() => setSelectedWindow(window)}
                className={cn(
                  "rounded-md border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan",
                  isSelected ? "border-blue bg-blue text-white shadow-sm" : "border-slateLine bg-slate-50 text-slate-700 hover:border-cyan hover:bg-cyan/10"
                )}
                aria-pressed={isSelected}
              >
                {window}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-8 rounded-md border border-slateLine bg-slate-50 p-4 text-sm leading-6 text-slate-700 shadow-sm">
        <p className="font-bold text-ink">Selected review preference</p>
        <p className="mt-1">
          {selectedDate ? fullDateFormatter.format(selectedDate) : "Choose a date"} - {selectedWindow}
        </p>
        <p className="mt-3 text-xs leading-5 text-slate-500">
          This is a preferred review window. The team will confirm availability after the intake is reviewed.
        </p>
      </div>
    </div>
  );
}
