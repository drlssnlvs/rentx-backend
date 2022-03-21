import CategoryModel from "../../models/categoriesModel";
import CategoryRepository from "../../repositories/implementations/categoriesRepository";

export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(): CategoryModel[] {
    const categories = this.categoryRepository.list();

    return categories;
  }
}
