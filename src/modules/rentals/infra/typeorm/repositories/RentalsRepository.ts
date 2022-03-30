import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import Rental from "../entities/Rental";

export default class RentalsRepository implements IRentalsRepository {
  repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findByRentalIdAndUserId(id: string, userId: string): Promise<Rental> {
    const query = this.repository.createQueryBuilder("c")

    query.andWhere("c.id = :id", { id })
    query.andWhere("c.userId = :userId", { userId })

    const rental = await query.getOne()

    return rental
  }

  async findOpenRentByCarId(carId: string): Promise<Rental> {
    return await this.repository.findOne({ carId, endDate: null });
  }
  async findOpenRentByUserId(userId: string): Promise<Rental> {
    return await this.repository.findOne({ userId, endDate: null });
  }
  async create({
    carId,
    expectReturnDate,
    userId,
    id,
    endDate,
    total
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({ carId, expectReturnDate, userId, id,
      endDate,
      total });

    await this.repository.save(rental);

    return rental;
  }
}
