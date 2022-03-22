import { inject, injectable } from "tsyringe";

import Specification from "../../entities/Specification";
import SpecificationsRepository from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
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
