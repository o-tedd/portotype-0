import { describe, expect, it } from "vitest";
import {
  addDays,
  addMonths,
  createDefaultScheduledDate,
  getMonthGridDays,
  getWeekDays,
  isSameDay,
  startOfWeek,
} from "./date";

describe("date utils", () => {
  it("starts the week on Monday", () => {
    const wednesday = new Date(2026, 8, 23, 12, 0);
    const monday = startOfWeek(wednesday);

    expect(monday.getDay()).toBe(1);
    expect(monday.getDate()).toBe(21);
  });

  it("handles Sunday as part of the previous Monday-based week", () => {
    const sunday = new Date(2026, 8, 27, 12, 0);
    const monday = startOfWeek(sunday);

    expect(monday.getDay()).toBe(1);
    expect(monday.getDate()).toBe(21);
  });

  it("returns seven consecutive days for a week", () => {
    const days = getWeekDays(new Date(2026, 8, 23));

    expect(days).toHaveLength(7);
    expect(days[0].getDay()).toBe(1);
    expect(days[6].getDay()).toBe(0);
  });

  it("returns a 42-day month grid starting on Monday", () => {
    const days = getMonthGridDays(new Date(2026, 8, 1));

    expect(days).toHaveLength(42);
    expect(days[0].getDay()).toBe(1);
    expect(days[41].getDay()).toBe(0);
  });

  it("moves dates without mutating the original date", () => {
    const original = new Date(2026, 8, 23, 10, 30);

    const nextDay = addDays(original, 1);
    const nextMonth = addMonths(original, 1);

    expect(original.getDate()).toBe(23);
    expect(nextDay.getDate()).toBe(24);
    expect(nextMonth.getMonth()).toBe(9);
    expect(nextMonth.getDate()).toBe(1);
  });

  it("compares only the calendar day", () => {
    expect(
      isSameDay(
        new Date(2026, 8, 23, 8, 0),
        new Date(2026, 8, 23, 22, 0),
      ),
    ).toBe(true);
  });

  it("defaults future planned dates to 09:00", () => {
    const future = new Date(2030, 0, 10, 17, 45);
    const scheduled = createDefaultScheduledDate(future);

    expect(scheduled.getFullYear()).toBe(2030);
    expect(scheduled.getMonth()).toBe(0);
    expect(scheduled.getDate()).toBe(10);
    expect(scheduled.getHours()).toBe(9);
    expect(scheduled.getMinutes()).toBe(0);
  });
});
