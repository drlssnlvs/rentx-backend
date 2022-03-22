import Category from "../../entities/Category";
import CategoryRepository from "../../repositories/implementations/categoriesRepository";

export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();

    return categories;
  }
}
