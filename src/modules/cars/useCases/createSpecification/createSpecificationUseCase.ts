import { inject, injectable } from "tsyringe";

import Specification from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const checkIfSpecificationAlreadyRegister =
      await this.specificationsRepository.findByName(name);

    if (checkIfSpecificationAlreadyRegister) {
      throw new Error("specification already register");
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}
