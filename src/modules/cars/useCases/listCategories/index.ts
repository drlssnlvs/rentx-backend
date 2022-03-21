import CategoryRepository from "../../repositories/implementations/categoriesRepository";
import ListCategoriesController from "./listCategoriesController";
import ListCategoriesUseCase from "./listCategoriesUseCase";

const categoriesRepository = CategoryRepository.getInstance();
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase
);

export default listCategoriesController;
