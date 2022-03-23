import CarsRepositoryInMemory from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import CreateCarUseCase from "./createCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const car = {
  name: "string",
  description: "string",
  dailyRate: 100,
  licensePlate: "string",
  fineAmount: 100,
  brand: "string",
  categoryId: "string",
};

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be not able create a car with license plate already existing", async () => {
    await createCarUseCase.execute(car);

    const result = await createCarUseCase.execute(car);

    expect(result).toBe(false);
  });

  it("should be able create a car", async () => {
    await createCarUseCase.execute(car);

    const carCreated = await carsRepositoryInMemory.findByLicensePlate(
      car.licensePlate
    );

    expect(carCreated).toHaveProperty("id");
    expect(carCreated.available).toBe(true);
  });
});
