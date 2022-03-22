import Category from "@modules/cars/infra/typeorm/entities/Category";
import BaseUseCase from "@shared/commons/BaseUseCase";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateCategoryUseCase extends BaseUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {
    super();
  }

  async execute({ name, description }: IRequest): Promise<Category | boolean> {
    const checkIfCategoryAlreadyRegister =
      await this.categoriesRepository.findByName(name);

    if (checkIfCategoryAlreadyRegister) {
      return this.addError("category already register");
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}
