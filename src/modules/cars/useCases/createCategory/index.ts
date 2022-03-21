import CategoryRepository from "../../repositories/implementations/categoriesRepository";
import CreateCategoryController from "./createCategoryController";
import CreateCategoryUseCase from "./createCategoryUseCase";

const categoriesRepository = CategoryRepository.getInstance();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export default createCategoryController;
