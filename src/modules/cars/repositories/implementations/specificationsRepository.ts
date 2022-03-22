import { getRepository, Repository } from "typeorm";
import Specification from "../../entities/Specification";

import {
  ISpecificationsRepository,
  ICreateSpecifiactionDTO,
} from "../ISpecificationsRepository";

export default class SpecificationRepository
  implements ISpecificationsRepository
{
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecifiactionDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}
