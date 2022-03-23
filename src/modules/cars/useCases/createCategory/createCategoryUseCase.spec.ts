import CategoriesRepositoryInMemory from "@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory";
import CreateCategoryUseCase from "./createCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

const category = {
  name: "Pickup",
  description: "a nice off-road car",
};

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should be not able create a new category if she already existing", async () => {
    await createCategoryUseCase.execute(category);

    expect(await createCategoryUseCase.execute(category)).toBe(false);
  });
});
