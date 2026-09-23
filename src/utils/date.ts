export function startOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0,
  );
}

export function endOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  );
}

export function addDays(date: Date, amount: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth() + amount,
    1,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );
}

export function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function startOfWeek(date: Date): Date {
  const day = date.getDay();
  const offset = day === 0 ? -6 : 1 - day;
  return startOfDay(addDays(date, offset));
}

export function endOfWeek(date: Date): Date {
  return endOfDay(addDays(startOfWeek(date), 6));
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return endOfDay(
    new Date(date.getFullYear(), date.getMonth() + 1, 0),
  );
}

export function getWeekDays(date: Date): Date[] {
  const firstDay = startOfWeek(date);

  return Array.from({ length: 7 }, (_, index) =>
    addDays(firstDay, index),
  );
}

export function getMonthGridDays(date: Date): Date[] {
  const firstVisibleDay = startOfWeek(startOfMonth(date));

  return Array.from({ length: 42 }, (_, index) =>
    addDays(firstVisibleDay, index),
  );
}

export function isDateInRange(
  date: Date,
  start: Date,
  end: Date,
): boolean {
  const timestamp = date.getTime();

  return timestamp >= start.getTime() && timestamp <= end.getTime();
}

export function formatDayTitle(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatWeekTitle(date: Date): string {
  const start = startOfWeek(date);
  const end = endOfWeek(date);

  const startLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(start);

  const endLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(end);

  return `${startLabel} — ${endLabel}`;
}

export function formatMonthTitle(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatShortWeekday(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
  }).format(date);
}

export function formatDayNumber(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function createDefaultScheduledDate(date: Date): Date {
  const now = new Date();

  if (isSameDay(date, now)) {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      now.getHours(),
      Math.ceil(now.getMinutes() / 15) * 15,
      0,
      0,
    );
  }

  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    9,
    0,
    0,
    0,
  );
}
