import Category from "../../entities/Category";
import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

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
