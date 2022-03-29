import { IDateProvider } from "../IDateProvider";
import { parseISO, differenceInHours, addHours } from "date-fns";

export default class DateProvider implements IDateProvider {
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
