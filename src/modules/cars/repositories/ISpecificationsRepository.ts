import SpecificationModel from "../models/specificationsModel";

export interface ICreateSpecifiactionDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecifiactionDTO): void;
  findByName(name: string): SpecificationModel | void;
}
