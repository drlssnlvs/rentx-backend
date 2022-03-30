import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import Rental from "../infra/typeorm/entities/Rental";

export interface IRentalsRepository {
  findOpenRentByCarId(carId: string): Promise<Rental>;
  findOpenRentByUserId(userId: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
  findByRentalIdAndUserId(rentalId?: string, userId?: string): Promise<Rental>;
}
