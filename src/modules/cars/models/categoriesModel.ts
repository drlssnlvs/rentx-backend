import { v4 as uuid } from "uuid";

export default class CategoryModel {
  id?: string;

  name: string;

  description: string;

  createdAt?: Date;

  constructor({ description, name }: CategoryModel) {
    this.id = uuid();

    this.createdAt = new Date();

    this.name = name;
    this.description = description;
  }
}
