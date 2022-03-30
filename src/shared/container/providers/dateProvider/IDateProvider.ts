export interface IDateProvider {
  compareInHours(date: Date, dateToCompare: Date): number;
  dateNow(): Date;
  addHours(date: Date, hoursToAdd: number): Date;
  compareInDays(date: Date, dateToCompare: Date): number;
  parseISO(date: string): Date;
}
