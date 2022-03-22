import Category from "../../entities/Category";
import CategoryRepository from "../../repositories/implementations/categoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute({
    name,
    description,
  }: IRequest): Promise<Category | undefined> {
    const checkIfCategoryAlreadyRegister =
      await this.categoryRepository.findByName(name);

    if (checkIfCategoryAlreadyRegister) {
      throw new Error("category already register");
    }

    const category = await this.categoryRepository.create({
      name,
      description,
    });

    return category;
  }
}
