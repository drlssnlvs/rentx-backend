import { inject, injectable } from "tsyringe";
import Category from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({
    name,
    description,
  }: IRequest): Promise<Category | undefined> {
    const checkIfCategoryAlreadyRegister =
      await this.categoriesRepository.findByName(name);

    if (checkIfCategoryAlreadyRegister) {
      throw new Error("category already register");
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}
