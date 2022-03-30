import CarsRepositoryInMemory from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import CategoriesRepositoryInMemory from "@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory";
import CreateCarUseCase from "./createCarUseCase";
import {v4 as uuid} from 'uuid'

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory

const category = {
  name: "category",
  description: "category"
}

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
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory, categoriesRepositoryInMemory);
  });

  it("should be not able create a car with license plate already existing", async () => {
    await createCarUseCase.execute(car);

    const result = await createCarUseCase.execute(car);

    expect(result).toBe(false);
  });

  it("should be able create a car", async () => {
    const createdCategory = await categoriesRepositoryInMemory.create(category)

    Object.assign(car, { categoryId: createdCategory.id })

    await createCarUseCase.execute(car);

    const carCreated = await carsRepositoryInMemory.findByLicensePlate(
      car.licensePlate
    );

    expect(carCreated).toHaveProperty("id");
    expect(carCreated.available).toBe(true);
  });

  it("should be not able create a car with nonexistent category", async () => {
    Object.assign(car, { categoryId: uuid() })

    const result = await createCarUseCase.execute(car);

    expect(result).toBe(false);
  });
});
