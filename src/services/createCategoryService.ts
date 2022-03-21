import CategoryRepository from "../repositories/categoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export default class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  execute({ name, description }: IRequest) {
    const checkIfCategoryAlreadyRegister =
      this.categoryRepository.findCategoryByName(name);

    if (checkIfCategoryAlreadyRegister) {
      throw new Error("category already register");
    }

    const category = this.categoryRepository.create({ name, description });

    return category;
  }
}
