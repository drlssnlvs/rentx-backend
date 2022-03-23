import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

import Car from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import BaseUseCase from "@shared/commons/BaseUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateCarUseCase extends BaseUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {
    super();
  }

  async execute({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: ICreateCarDTO): Promise<Car | boolean> {
    const checkIfCarLicensePlateAlreadyRegister =
      await this.carsRepository.findByLicensePlate(licensePlate);

    if (checkIfCarLicensePlateAlreadyRegister)
      return this.addError("a car with this license plate already register");

    const car = await this.carsRepository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return car;
  }
}
