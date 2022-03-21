import CategoryModel from "../models/categoriesModel";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): void;
  findByName(name: string): CategoryModel | void;
  list(): CategoryModel[];
}
