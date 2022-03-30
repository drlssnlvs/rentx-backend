import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IDevolutionRentalDTO } from "@modules/rentals/dtos/IDevolutionRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import BaseUseCase from "@shared/commons/BaseUseCase";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";

@injectable()
export default class DevolutionRentalUseCase extends BaseUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {
    super();
  }

  async execute({
    userId,
    rentalId,
  }: IDevolutionRentalDTO): Promise<Rental | boolean> {
    let valueMinimalToPay: number = 0;
    let total: number = 0;
    let valueRentalsDaily: number = 0;
    let fineAmount: number = 0;

    const graceHoursToGiveBack = 1.599999999;
    const hoursInOneDay = 24
    const qtdDaysThatExceedsMinToPay = 1

    const rental = await this.rentalsRepository.findByRentalIdAndUserId(rentalId, userId);

    if (!rental) {
      return this.addError("rental does not exists");
    }

    const car = await this.carsRepository.findById(rental.carId)

    valueMinimalToPay = car.dailyRate

    const hoursOfRental = this.dateProvider.compareInHours(rental.startDate, rental.expectReturnDate)
    const daysInHoursRental = hoursOfRental / hoursInOneDay

    if(daysInHoursRental > qtdDaysThatExceedsMinToPay) {
      const rentalsDailyToCharge = Math.floor(daysInHoursRental)

      valueRentalsDaily += rentalsDailyToCharge * car.dailyRate

      const hoursOutRental = this.dateProvider.compareInHours(this.dateProvider.addHours(rental.expectReturnDate, graceHoursToGiveBack), this.dateProvider.dateNow())
      const daysOutRental = Math.ceil(hoursOutRental / hoursInOneDay)

      if(daysOutRental) {
        fineAmount += daysOutRental * car.fineAmount
      }

      total += valueRentalsDaily + fineAmount
    } else {
      total += valueMinimalToPay
    }

    Object.assign(rental, { total, endDate: this.dateProvider.dateNow() })

    await this.carsRepository.changeAvailable(car.id, true)
    await this.rentalsRepository.create(rental)

    return rental;
  }
}
