import { v4 as uuid } from "uuid";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

export default class rentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findByRentalIdAndUserId(id: string, userId: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id && rental.userId === userId);
  }

  async create({
    carId,
    userId,
    expectReturnDate,
    endDate,
    total,
    id
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      startDate: new Date(),
      id: id ? id : uuid(),
      userId,
      carId,
      expectReturnDate,
      endDate,
      total
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentByCarId(carId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.carId === carId && !rental.endDate
    );
  }
  async findOpenRentByUserId(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.userId === userId && !rental.endDate
    );
  }
}
