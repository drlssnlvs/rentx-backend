import RentalsRepositoryInMemory from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import DateProvider from "@shared/container/providers/dateProvider/implementations/DateProvider";
import CreateRentalUseCase from "./createRentalUseCase";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dateProvider: DateProvider;

const rental = {
  carId: "carId",
  userId: "userId",
  expectReturnDate: new Date(),
};

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dateProvider = new DateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able create a rental", async () => {
    const rentalTimeInHours = 30;

    rental.expectReturnDate = dateProvider.addHours(
      new Date(),
      rentalTimeInHours
    );

    const result = await createRentalUseCase.execute(rental);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("startDate");
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
