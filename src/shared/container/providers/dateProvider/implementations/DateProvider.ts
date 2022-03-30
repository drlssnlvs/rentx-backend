import { IDateProvider } from "../IDateProvider";
import { parseISO, differenceInHours, addHours, differenceInDays } from "date-fns";

export default class DateProvider implements IDateProvider {
  parseISO(date: string): Date {
    return parseISO(date)
  }
  compareInDays(date: Date, dateToCompare: Date): number {
    return differenceInDays(
      parseISO(dateToCompare.toISOString()),
      parseISO(date.toISOString())
    );
  }
  addHours(date: Date, hoursToAdd: number): Date {
    return addHours(parseISO(date.toISOString()), hoursToAdd);
  }
  compareInHours(date: Date, dateToCompare: Date): number {
    return differenceInHours(
      parseISO(dateToCompare.toISOString()),
      parseISO(date.toISOString())
    );
  }
  dateNow(): Date {
    return new Date();
  }
}
