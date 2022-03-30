import Category from "../infra/typeorm/entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | undefined>;
  findById(id: string): Promise<Category>;
  list(): Promise<Category[]>;
}
