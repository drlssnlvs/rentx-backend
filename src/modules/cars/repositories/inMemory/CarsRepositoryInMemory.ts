import { v4 as uuid } from "uuid";
import { ICarsRepository } from "../ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import { IAvailableCarsFiltersDTO } from "@modules/cars/dtos/IFilterCarsDTO";

export default class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findById(id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === id);

    return car;
  }

  async listAvailableCarsByFilters({
    brand,
    name,
    categoryId,
  }: IAvailableCarsFiltersDTO): Promise<Car[]> {
    let search: Car[];

    search = this.cars.filter((car) => car.available);

    if (brand || name || categoryId) {
      search = search.filter(
        (car) =>
          (brand && car.brand === brand) ||
          (name && car.name === name) ||
          (categoryId && car.categoryId === categoryId)
      );
    }

    return search;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
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
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id: uuid(),
      available: true,
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      specifications,
    });

    this.cars.push(car);

    return car;
  }
}
