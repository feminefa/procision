import { format } from "date-fns";

export function toSQLDate(_date: Date | number, dayOnly = false) {
  if (dayOnly) return format(_date, "yyyy-MM-dd");
  return format(_date, "yyyy-MM-dd HH:mm:ss");
}
