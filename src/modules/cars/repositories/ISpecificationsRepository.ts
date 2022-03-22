import Specification from "../infra/typeorm/entities/Specification";

export interface ICreateSpecifiactionDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecifiactionDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
}
