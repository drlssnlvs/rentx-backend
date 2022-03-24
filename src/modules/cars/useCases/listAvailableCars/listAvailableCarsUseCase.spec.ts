import CarsRepositoryInMemory from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import ListAvailableCarsUseCase from "./listAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

const car = {
  name: "string",
  description: "string",
  dailyRate: 100,
  licensePlate: "string",
  fineAmount: 100,
  brand: "audi",
  categoryId: "string",
};

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("should be able list all available cars", async () => {
    await carsRepositoryInMemory.create(car);
    await carsRepositoryInMemory.create(car);

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars[0].available).toBe(true);
  });

  it("should be able list all available cars by brand", async () => {
    await carsRepositoryInMemory.create(car);

    car.brand = "ford";

    await carsRepositoryInMemory.create(car);

    const cars = await listAvailableCarsUseCase.execute({ brand: car.brand });

    expect(cars).toBeInstanceOf(Array);
    if (cars instanceof Array) expect(cars.length).toBe(1);
  });

  it("should be able list all available cars by name", async () => {
    await carsRepositoryInMemory.create(car);

    car.name = "audi a3";

    await carsRepositoryInMemory.create(car);

    const cars = await listAvailableCarsUseCase.execute({ name: car.name });

    expect(cars).toBeInstanceOf(Array);
    if (cars instanceof Array) expect(cars.length).toBe(1);
  });

  it("should be able list all available cars by categoryId", async () => {
    await carsRepositoryInMemory.create(car);

    car.categoryId = "dsakdosak";

    await carsRepositoryInMemory.create(car);

    const cars = await listAvailableCarsUseCase.execute({
      categoryId: car.categoryId,
    });

    expect(cars).toBeInstanceOf(Array);
    if (cars instanceof Array) expect(cars.length).toBe(1);
  });

  it("should be not able find car when there is not cars", async () => {
    const cars = await listAvailableCarsUseCase.execute({
      categoryId: car.categoryId,
    });

    expect(cars).toBe(false);
  });
});
