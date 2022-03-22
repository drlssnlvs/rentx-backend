import CategoryRepository from "../../repositories/implementations/categoriesRepository";
import ImportCategoryController from "./importCategoryController";
import ImportCategoryUseCase from "./importCategoryUseCase";

export default () => {
  const categoriesRepository = new CategoryRepository();
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase
  );

  return importCategoryController;
};
