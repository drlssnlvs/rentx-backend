import { v4 as uuid } from "uuid";

import {
  ICreateSpecifiactionDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";
import Specification from "@modules/cars/infra/typeorm/entities/Specification";

export default class SpecificationsRepositoryInMemory
  implements ISpecificationsRepository
{
  specifications: Specification[] = [];

  async findByIds(ids: string[]): Promise<Specification[]> {
    const all = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return all;
  }

  async create({
    name,
    description,
  }: ICreateSpecifiactionDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      id: uuid(),
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}
