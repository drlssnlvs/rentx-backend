import { inject, injectable } from "tsyringe";

import BaseUseCase from "@shared/commons/BaseUseCase";
import Specification from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase extends BaseUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {
    super();
  }

  async execute({
    name,
    description,
  }: IRequest): Promise<Specification | boolean> {
    const checkIfSpecificationAlreadyRegister =
      await this.specificationsRepository.findByName(name);

    if (checkIfSpecificationAlreadyRegister) {
      return this.addError("specification already register");
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}
