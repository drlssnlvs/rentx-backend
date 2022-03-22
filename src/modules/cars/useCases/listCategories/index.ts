import CategoryRepository from "../../repositories/implementations/categoriesRepository";
import ListCategoriesController from "./listCategoriesController";
import ListCategoriesUseCase from "./listCategoriesUseCase";

export default (): ListCategoriesController => {
  const categoriesRepository = new CategoryRepository();
  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);
  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
  );

  return listCategoriesController;
};
