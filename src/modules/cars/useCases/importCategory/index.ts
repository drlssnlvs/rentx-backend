import CategoryRepository from "../../repositories/implementations/categoriesRepository";
import ImportCategoryController from "./importCategoryController";
import ImportCategoryUseCase from "./importCategoryUseCase";

const categoriesRepository = CategoryRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export default importCategoryController;
