import { IAvailableCarsFiltersDTO } from "@modules/cars/dtos/IFilterCarsDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import BaseUseCase from "@shared/commons/BaseUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class ListAvailableCarsUseCase extends BaseUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {
    super();
  }

  async execute({
    brand,
    name,
    categoryId,
  }: IAvailableCarsFiltersDTO): Promise<Car[] | boolean> {
    const cars = await this.carsRepository.listAvailableCarsByFilters({
      brand,
      name,
      categoryId,
    });

    if (!cars.length) {
      return this.addError("no car was found by filter");
    }

    return cars;
  }
}
