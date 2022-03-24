import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

import BaseUseCase from "@shared/commons/BaseUseCase";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateSpecificationToCarUseCase extends BaseUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {
    super();
  }

  async execute(carId: string, specificationsId: string[]) {
    const car = await this.carsRepository.findById(carId);

    if (!car) {
      return this.addError("car does not exists");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specificationsId
    );

    car.specifications = specifications;

    await this.carsRepository.create(car);

    return car;
  }
}
