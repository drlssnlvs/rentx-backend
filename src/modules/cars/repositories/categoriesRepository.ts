import CategoryModel from "../models/categoriesModel";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "./ICategoriesRepository";

export default class CategoryRepository implements ICategoriesRepository {
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

  findByName(name: string) {
    const findCategory = this.categories.find(
      (category) => category.name === name
    );

    return findCategory;
  }
}
