import { v4 as uuid } from "uuid";

import Category from "@modules/cars/infra/typeorm/entities/Category";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

export default class CategoriesRepositoryInMemory
  implements ICategoriesRepository
{
  categories: Category[] = [];

  async findById(id: string): Promise<Category> {
    return this.categories.find((category) => category.id === id);
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      id: uuid(),
      name,
      description,
    });

    this.categories.push(category);

    return category;
  }
}
