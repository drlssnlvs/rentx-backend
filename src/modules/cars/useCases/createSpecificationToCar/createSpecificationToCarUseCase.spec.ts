import Car from "@modules/cars/infra/typeorm/entities/Car";

import CarsRepositoryInMemory from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import SpecificationsRepositoryInMemory from "@modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory";
import CreateSpecificationToCarUseCase from "./createSpecificationToCarUseCase";

let createSpecificationToCarUseCase: CreateSpecificationToCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

const car = {
  name: "string",
  description: "string",
  dailyRate: 100,
  licensePlate: "string",
  fineAmount: 100,
  brand: "string",
  categoryId: "string",
};

const specification = {
  name: "Auto Transmission",
  description: "8 speed automatic transmission",
};

describe("Create Specification To Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationToCarUseCase = new CreateSpecificationToCarUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able create a specification to car", async () => {
    const createdCar = await carsRepositoryInMemory.create(car);
    const createdSpecification = await specificationsRepositoryInMemory.create(
      specification
    );

    const result = (await createSpecificationToCarUseCase.execute(
      createdCar.id,
      [createdSpecification.id]
    )) as Car;

    expect(result).toHaveProperty("specifications");
    expect(result.specifications.length).toBe(1);
  });

  it("should be not able create a specification to car not existing", async () => {
    const result = await createSpecificationToCarUseCase.execute("carId", []);

    expect(result).toBe(false);
  });
});
