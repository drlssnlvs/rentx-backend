import { v4 as uuid } from "uuid";
import { ICarsRepository } from "../ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";

export default class CarsRepository implements ICarsRepository {
  cars: Car[] = [];

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
    });

    this.cars.push(car);

    return car;
  }
}
