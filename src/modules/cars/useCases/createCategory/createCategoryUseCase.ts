import CategoryRepository from "../../repositories/implementations/categoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute({ name, description }: IRequest) {
    const checkIfCategoryAlreadyRegister =
      this.categoryRepository.findByName(name);

    if (checkIfCategoryAlreadyRegister) {
      throw new Error("category already register");
    }

    const category = this.categoryRepository.create({ name, description });

    return category;
  }
}