import { v4 as uuid } from "uuid";

import CarsRepositoryInMemory from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import RentalsRepositoryInMemory from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import DateProvider from "@shared/container/providers/dateProvider/implementations/DateProvider";
import CreateRentalUseCase from "./createRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DateProvider;

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

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dateProvider = new DateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory
    );
  });

  it("should be not able create a rental with nonexistent car", async () => {
    const rentalTimeInHours = 30;

    rental.expectReturnDate = dateProvider.addHours(
      new Date(),
      rentalTimeInHours
    );

    const result = await createRentalUseCase.execute(rental);

    expect(result).toBe(false);
  });

  it("should be able create a rental", async () => {
    const createdCar = await carsRepositoryInMemory.create(car);

    const rentalTimeInHours = 30;

    rental.expectReturnDate = dateProvider.addHours(
      new Date(),
      rentalTimeInHours
    );

    const carId = createdCar.id;

    Object.assign(rental, { carId });

    const result = await createRentalUseCase.execute(rental);

    const getStatusCar = await carsRepositoryInMemory.findById(carId);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("startDate");
    expect(getStatusCar.available).toBe(false);
  });

  it("should be not able create a rental if user has opened rent", async () => {
    await createRentalUseCase.execute(rental);
    const result = await createRentalUseCase.execute(rental);

    expect(result).toBe(false);
  });

  it("should be not able create a rental if car is unavailable", async () => {
    await createRentalUseCase.execute(rental);

    rental.userId = "otherUserId";

    const result = await createRentalUseCase.execute(rental);

    expect(result).toBe(false);
  });

  it("should be not able create a rental if minimal time in hours is invalid", async () => {
    const rentalTimeInHours = 13;

    rental.expectReturnDate = dateProvider.addHours(
      new Date(),
      rentalTimeInHours
    );

    const result = await createRentalUseCase.execute(rental);

    expect(result).toBe(false);
  });
});
