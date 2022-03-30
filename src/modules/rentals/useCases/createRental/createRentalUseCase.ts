import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import BaseUseCase from "@shared/commons/BaseUseCase";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

@injectable()
export default class CreateRentalUseCase extends BaseUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {
    super();
  }

  async execute({
    carId,
    userId,
    expectReturnDate,
  }: ICreateRentalDTO): Promise<Rental | boolean> {
    const minHoursToRent = 24;

    const diffDatesInHours = this.dateProvider.compareInHours(
      this.dateProvider.dateNow(),
      expectReturnDate
    );

    if (diffDatesInHours < minHoursToRent) {
      return this.addError("minimal time to rent is invalid");
    }

    const checkCarUnavailable =
      await this.rentalsRepository.findOpenRentByCarId(carId);

    if (checkCarUnavailable) {
      return this.addError("car be already rented");
    }

    const checkIfUserHasOpenRent =
      await this.rentalsRepository.findOpenRentByUserId(userId);

    if (checkIfUserHasOpenRent) {
      return this.addError("user be already rent in progress");
    }

    const checkIfCarExists = await this.carsRepository.findById(carId);

    if (!checkIfCarExists) {
      return this.addError("car does not exists");
    }

    await this.carsRepository.changeAvailable(carId, false);

    const rental = await this.rentalsRepository.create({
      carId,
      userId,
      expectReturnDate,
    });

    return rental;
  }
}
