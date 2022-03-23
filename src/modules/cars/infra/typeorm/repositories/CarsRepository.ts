import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";

import Car from "../entities/Car";

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }
  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: ICreateCarDTO): Promise<boolean | Car> {
    const car = this.repository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({ licensePlate });

    return car;
  }
}
