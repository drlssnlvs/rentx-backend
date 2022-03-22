import CategoryRepository from "../../repositories/implementations/categoriesRepository";
import CreateCategoryController from "./createCategoryController";
import CreateCategoryUseCase from "./createCategoryUseCase";

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoryRepository();
  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase
  );

  return createCategoryController;
};
