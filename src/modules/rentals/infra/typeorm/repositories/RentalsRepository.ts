import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import Rental from "../entities/Rental";

export default class RentalsRepository implements IRentalsRepository {
  repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentByCarId(carId: string): Promise<Rental> {
    return await this.repository.findOne({ carId });
  }
  async findOpenRentByUserId(userId: string): Promise<Rental> {
    return await this.repository.findOne({ userId });
  }
  async create({
    carId,
    expectReturnDate,
    userId,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({ carId, expectReturnDate, userId });

    await this.repository.save(rental);

    return rental;
  }
}
