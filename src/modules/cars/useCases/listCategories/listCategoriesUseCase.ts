import { inject, injectable } from "tsyringe";
import Category from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

import BaseUseCase from "../../../../commons/BaseUseCase";

@injectable()
export default class CreateCategoryUseCase extends BaseUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {
    super();
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}
