import CategoriesRepositoryInMemory from "@modules/cars/repositories/inMemory/CategoriesRepositoryInMemory";
import CreateCategoryUseCase from "../createCategory/createCategoryUseCase";
import ListCategoryUseCase from "./listCategoriesUseCase";

let listCategoryUseCase: ListCategoryUseCase;
let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

const category = {
  name: "Pickup",
  description: "a nice off-road car",
};

describe("List Categories", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
    listCategoryUseCase = new ListCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("should be able get all categories", async () => {
    await createCategoryUseCase.execute(category);

    const categories = await listCategoryUseCase.execute();

    expect(categories[0]).toHaveProperty("id");
  });
});
