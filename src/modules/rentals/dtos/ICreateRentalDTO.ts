export interface ICreateRentalDTO {
  userId: string;
  carId: string;
  expectReturnDate: Date;
  total?: number;
  endDate?: Date;
  id?: string;
}
