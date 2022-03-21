import CategoryModel from "../models/categoriesModel";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export default class CategoryRepository {
  private categories: CategoryModel[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): CategoryModel {
    const category = new CategoryModel({ name, description });

    this.categories.push(category);

    return category;
  }

  list() {
    return this.categories;
  }

  findCategoryByName(name: string) {
    const findCategory = this.categories.find(
      (category) => category.name === name
    );

    return findCategory;
  }
}
