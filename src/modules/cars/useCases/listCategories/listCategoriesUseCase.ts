import { inject, injectable } from "tsyringe";

import BaseUseCase from "@shared/commons/BaseUseCase";
import Category from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

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
