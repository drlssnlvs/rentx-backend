import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IAvailableCarsFiltersDTO } from "@modules/cars/dtos/IFilterCarsDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";

import Car from "../entities/Car";

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async changeAvailable(id: string, status: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder("c")
      .update({ available: status })
      .where("id = :id", { id })
      .execute();
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);

    return car;
  }

  async listAvailableCarsByFilters({
    brand,
    name,
    categoryId,
  }: IAvailableCarsFiltersDTO): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) carsQuery.andWhere("c.brand = :brand", { brand });
    if (name) carsQuery.andWhere("c.name = :name", { name });
    if (categoryId)
      carsQuery.andWhere("c.categoryId = :categoryId", { categoryId });

    const cars = await carsQuery.getMany();

    return cars;
  }

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
    specifications,
  }: ICreateCarDTO): Promise<boolean | Car> {
    const car = this.repository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      specifications,
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({ licensePlate });

    return car;
  }
}
