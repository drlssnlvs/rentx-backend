import { v4 as uuid } from "uuid";

import CarsRepositoryInMemory from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import RentalsRepositoryInMemory from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import DevolutionRentalUseCase from "./devolutionRentalUseCase";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import DateProvider from "@shared/container/providers/dateProvider/implementations/DateProvider";
import UsersRepositoryInMemory from "@modules/accounts/repositories/inMemory/UsersRepositoryInMemory";

let devolutionRentalUseCase: DevolutionRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: IDateProvider

const user = {
  name: "Lelantos",
  email: "lelantos@current.com.br",
  password: "drowssap",
  driverLicense: "abc",
};

const car = {
  name: "string",
  description: "string",
  dailyRate: 100,
  licensePlate: "string",
  fineAmount: 100,
  brand: "string",
  categoryId: "string",
};

const rental = {
  carId: "carId",
  userId: "userId",
  expectReturnDate: new Date(),
};

describe("Devolution Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    dateProvider = new DateProvider()
    devolutionRentalUseCase = new DevolutionRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dateProvider
    );
  });

  it("should be not able give back a nonexistent rental", async () => {
    const result = await devolutionRentalUseCase.execute({
      rentalId: uuid(),
      userId: uuid(),
    });

    expect(result).toBe(false);
  });

  it("should be able give back a rental", async () => {
    const createdCar = await carsRepositoryInMemory.create(car);
    const createdUser = await usersRepositoryInMemory.create(user);

    const rentalTimeInHours = -50;

    rental.expectReturnDate = dateProvider.addHours(
      new Date(),
      rentalTimeInHours
    );

    const carId = createdCar.id;
    const userId = createdUser.id

    Object.assign(rental, { carId, userId, startDate: dateProvider.addHours(
      new Date(),
      -25
    ) });

    const createdRental = await rentalsRepositoryInMemory.create(rental);

    const result = await devolutionRentalUseCase.execute({ rentalId: createdRental.id, userId   })

    const getStatusCar = await carsRepositoryInMemory.findById(carId);

    expect(result).toHaveProperty("endDate")
    expect(getStatusCar.available).toBe(true)
  })
});
