export interface IDateProvider {
  compareInHours(date: Date, dateToCompare: Date): number;
  dateNow(): Date;
  addHours(date: Date, hoursToAdd: number): Date;
}
