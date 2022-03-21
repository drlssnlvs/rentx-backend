import CategoryModel from "../../models/categoriesModel";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

export default class CategoryRepository implements ICategoriesRepository {
  private categories: CategoryModel[];

  private static INSTANCE: CategoryRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoryRepository {
    if (!CategoryRepository.INSTANCE)
      CategoryRepository.INSTANCE = new CategoryRepository();

    return CategoryRepository.INSTANCE;
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
