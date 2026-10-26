// en-GB: English names to match the UI copy, but day-before-month and 24h time
const dateFormat = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
const numberFormat = new Intl.NumberFormat("de-DE");

// Separate pieces so ticket stubs can style weekday, day and month individually
export function dateParts(iso: string) {
  const parts = Object.fromEntries(dateFormat.formatToParts(new Date(iso)).map((p) => [p.type, p.value]));
  return {
    weekday: parts.weekday,
    day: parts.day,
    month: parts.month,
    year: parts.year,
    time: `${parts.hour}:${parts.minute}`,
  };
}

export function formatNumber(value: number) {
  return numberFormat.format(value);
}
